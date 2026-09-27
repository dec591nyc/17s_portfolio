export type Note = {
  id: string; title: string; body: string; category: string;
  tags: string[]; status: "draft" | "published"; author_id: string;
  created_at: string; updated_at: string; published_at: string | null; deleted_at: string | null;
};

export const noteFields = "id,title,body,category,tags,status,author_id,created_at,updated_at,published_at,deleted_at";
export function validateNote(title: string, body: string, category: string, tags: string[]) {
  return title.trim().length > 0 && title.trim().length <= 160 && body.trim().length > 0 && body.length <= 100000
    && category.trim().length > 0 && category.length <= 60
    && tags.length <= 12 && tags.every(tag => tag.length > 0 && tag.length <= 40);
}
