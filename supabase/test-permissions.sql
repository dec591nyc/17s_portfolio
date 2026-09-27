-- Run as postgres in a disposable transaction. All fixtures are rolled back.
begin;
insert into auth.users (id, email) values
  ('11111111-1111-4111-8111-111111111111', 'notes-owner@example.invalid'),
  ('22222222-2222-4222-8222-222222222222', 'notes-reader@example.invalid');
insert into public.site_admins (user_id) values ('11111111-1111-4111-8111-111111111111');
insert into public.notes (id, author_id, title, body, category, status, published_at, deleted_at) values
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1', '11111111-1111-4111-8111-111111111111', 'RLS published fixture', 'Test only', 'test', 'published', now(), null),
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa2', '11111111-1111-4111-8111-111111111111', 'RLS draft fixture', 'Test only', 'test', 'draft', null, null),
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa3', '11111111-1111-4111-8111-111111111111', 'RLS trash fixture', 'Test only', 'test', 'draft', null, now());

set local role anon;
do $$ begin
  if (select count(*) from public.notes where category='test') <> 1 then raise exception 'Anonymous draft/trash leakage'; end if;
  begin
    insert into public.notes (title,body,category) values ('Forbidden','test','test');
    raise exception 'Anonymous INSERT allowed';
  exception when insufficient_privilege then null; end;
  begin
    update public.notes set title='Forbidden' where category='test';
    raise exception 'Anonymous UPDATE allowed';
  exception when insufficient_privilege then null; end;
  begin
    delete from public.notes where category='test';
    raise exception 'Anonymous DELETE allowed';
  exception when insufficient_privilege then null; end;
end $$;
reset role;

select set_config('request.jwt.claim.sub','22222222-2222-4222-8222-222222222222',true);
set local role authenticated;
do $$ declare affected integer; begin
  if (select count(*) from public.notes where category='test') <> 1 then raise exception 'Non-admin draft/trash leakage'; end if;
  if (select count(*) from public.site_admins) <> 0 then raise exception 'Admin roster leakage'; end if;
  begin
    insert into public.site_admins (user_id) values (auth.uid());
    raise exception 'Self-promotion allowed';
  exception when insufficient_privilege then null; end;
  begin
    insert into public.notes (title,body,category) values ('Forbidden','test','test');
    raise exception 'Non-admin INSERT allowed';
  exception when insufficient_privilege then null; end;
  update public.notes set title='Forbidden' where category='test';
  get diagnostics affected = row_count;
  if affected <> 0 then raise exception 'Non-admin UPDATE allowed'; end if;
end $$;
reset role;

select set_config('request.jwt.claim.sub','11111111-1111-4111-8111-111111111111',true);
set local role authenticated;
do $$ declare affected integer; old_stamp timestamptz; begin
  if (select count(*) from public.notes where category='test') <> 3 then raise exception 'Admin cannot read drafts/trash'; end if;
  insert into public.notes (title,body,category) values ('Admin-created fixture','test','test');
  select updated_at into old_stamp from public.notes where id='aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1';
  update public.notes set title='Updated fixture' where id='aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1' and updated_at=old_stamp;
  get diagnostics affected = row_count;
  if affected <> 1 then raise exception 'Admin update failed'; end if;
  update public.notes set title='Stale edit' where id='aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1' and updated_at=old_stamp;
  get diagnostics affected = row_count;
  if affected <> 0 then raise exception 'Stale edit overwrote newer data'; end if;
  update public.notes set status='draft',published_at=null,deleted_at=now() where id='aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1';
  update public.notes set deleted_at=null where id='aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1';
  begin
    update public.notes set author_id='22222222-2222-4222-8222-222222222222' where category='test';
    raise exception 'Ownership reassignment allowed';
  exception when insufficient_privilege then null; end;
  begin
    insert into public.notes (title,body,category,tags) values ('Bad tag','test','test',array[repeat('x',41)]);
    raise exception 'Oversized tag accepted';
  exception when check_violation then null; end;
end $$;
reset role;
select 'PASS: public read, draft/trash isolation, no self-promotion, owner writes, stale-edit protection, restore, tag validation' as permission_tests;
rollback;
