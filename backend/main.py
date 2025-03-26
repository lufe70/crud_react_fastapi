from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List

# Importar modelos e funções do banco de dados
from models import Curso, CursoBase
import database

# Inicializar banco de dados
database.setup_database()

# Criar a aplicação FastAPI
app = FastAPI(title="Sistema de Gerenciamento de Cursos")

# Configurar CORS para permitir requisições do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, especificar apenas a origem do frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Endpoints da API

@app.get("/")
async def root():
    return {"message": "API de Gerenciamento de Cursos"}

@app.get("/cursos", response_model=List[Curso])
async def listar_cursos():
    return database.get_all_cursos()

@app.get("/cursos/{curso_id}", response_model=Curso)
async def obter_curso(curso_id: int):
    curso = database.get_curso_by_id(curso_id)
    if curso is None:
        raise HTTPException(status_code=404, detail="Curso não encontrado")
    return curso

@app.post("/cursos", response_model=Curso)
async def criar_curso(curso: CursoBase):
    return database.create_curso(curso.dict())

@app.put("/cursos/{curso_id}", response_model=Curso)
async def atualizar_curso(curso_id: int, curso: CursoBase):
    curso_atualizado = database.update_curso(curso_id, curso.dict())
    if curso_atualizado is None:
        raise HTTPException(status_code=404, detail="Curso não encontrado")
    return curso_atualizado

@app.delete("/cursos/{curso_id}")
async def deletar_curso(curso_id: int):
    if not database.delete_curso(curso_id):
        raise HTTPException(status_code=404, detail="Curso não encontrado")
    return {"message": "Curso deletado com sucesso"}
