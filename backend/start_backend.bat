@echo off
echo.
echo === Iniciando Backend (FastAPI) ===
echo.
pip install -r requirements.txt
echo.
echo === Servidor rodando em http://localhost:8000 ===
echo === Documentação API: http://localhost:8000/docs ===
echo.
uvicorn main:app --reload --host 0.0.0.0 --port 8000
