@echo off
echo ===================================================
echo   Starting Portfolio Application (17s_workplace)
echo ===================================================

echo [1/2] Launching Python FastAPI Backend on http://localhost:8000 ...
start "Portfolio Backend - FastAPI" cmd /k "cd backend && .venv\Scripts\python.exe -m uvicorn main:app --port 8000 --reload"

echo [2/2] Launching Next.js Frontend on http://localhost:3000 ...
start "Portfolio Frontend - Next.js" cmd /k "cd frontend && npm run dev"

echo ===================================================
echo   Both services initiated. 
echo   - Backend docs: http://localhost:8000/docs
echo   - Frontend UI:  http://localhost:3000
echo ===================================================
pause
