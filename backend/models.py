from pydantic import BaseModel
from typing import Optional

# Modelo base para criação/atualização de cursos
class CursoBase(BaseModel):
    codigo: str
    nome: str
    descricao: Optional[str] = None
    carga_horaria: int
    periodo: int

# Modelo completo incluindo ID para respostas
class Curso(CursoBase):
    id: int

    class Config:
        from_attributes = True
