@echo off
setlocal

echo ===================================================
echo   Starting Portfolio Application (17s_portfolio)
echo ===================================================

where node >nul 2>nul
if errorlevel 1 (
    echo [ERROR] Node.js was not found in PATH.
    echo Install Node.js or run nvm use before starting the frontend.
    pause
    exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
    echo [ERROR] npm was not found in PATH.
    echo Install Node.js or make sure npm is available in PATH.
    pause
    exit /b 1
)

echo [1/2] Launching Python FastAPI Backend on http://localhost:8000 ...
start "Portfolio Backend - FastAPI" cmd /k "cd /d ""%~dp0backend"" && .venv\Scripts\python.exe -m uvicorn main:app --port 8000 --reload"

echo [2/2] Launching Next.js Frontend on http://localhost:3000 ...
start "Portfolio Frontend - Next.js" cmd /k "cd /d ""%~dp0frontend"" && if exist node_modules (npm run dev) else (npm ci && npm run dev)"

echo ===================================================
echo   Both services initiated. 
echo   - Backend docs: http://localhost:8000/docs
echo   - Frontend UI:  http://localhost:3000
echo ===================================================
pause
