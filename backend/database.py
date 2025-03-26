import sqlite3
import os
from typing import List, Dict, Any, Optional

# Função para configurar o banco de dados
def setup_database():
    if not os.path.exists('database.db'):
        conn = sqlite3.connect('database.db')
        cursor = conn.cursor()
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS cursos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            codigo TEXT NOT NULL,
            nome TEXT NOT NULL,
            descricao TEXT,
            carga_horaria INTEGER,
            periodo INTEGER
        )
        ''')
        conn.commit()
        conn.close()
        print("Banco de dados criado com sucesso!")

# Função para obter conexão com o banco
def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

# Funções de CRUD para cursos
def get_all_cursos() -> List[Dict[str, Any]]:
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM cursos")
    cursos = cursor.fetchall()
    
    conn.close()
    
    resultado = []
    for curso in cursos:
        resultado.append({
            "id": curso["id"],
            "codigo": curso["codigo"],
            "nome": curso["nome"],
            "descricao": curso["descricao"],
            "carga_horaria": curso["carga_horaria"],
            "periodo": curso["periodo"]
        })
    
    return resultado

def get_curso_by_id(curso_id: int) -> Optional[Dict[str, Any]]:
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM cursos WHERE id = ?", (curso_id,))
    curso = cursor.fetchone()
    
    conn.close()
    
    if curso is None:
        return None
    
    return {
        "id": curso["id"],
        "codigo": curso["codigo"],
        "nome": curso["nome"],
        "descricao": curso["descricao"],
        "carga_horaria": curso["carga_horaria"],
        "periodo": curso["periodo"]
    }

def create_curso(curso_data: Dict[str, Any]) -> Dict[str, Any]:
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute(
        "INSERT INTO cursos (codigo, nome, descricao, carga_horaria, periodo) VALUES (?, ?, ?, ?, ?)",
        (curso_data["codigo"], curso_data["nome"], curso_data["descricao"], 
         curso_data["carga_horaria"], curso_data["periodo"])
    )
    
    curso_id = cursor.lastrowid
    conn.commit()
    conn.close()
    
    return {
        "id": curso_id,
        **curso_data
    }

def update_curso(curso_id: int, curso_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Verificar se o curso existe
    cursor.execute("SELECT * FROM cursos WHERE id = ?", (curso_id,))
    if cursor.fetchone() is None:
        conn.close()
        return None
    
    # Atualizar o curso
    cursor.execute(
        "UPDATE cursos SET codigo = ?, nome = ?, descricao = ?, carga_horaria = ?, periodo = ? WHERE id = ?",
        (curso_data["codigo"], curso_data["nome"], curso_data["descricao"],
         curso_data["carga_horaria"], curso_data["periodo"], curso_id)
    )
    
    conn.commit()
    conn.close()
    
    return {
        "id": curso_id,
        **curso_data
    }

def delete_curso(curso_id: int) -> bool:
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Verificar se o curso existe
    cursor.execute("SELECT * FROM cursos WHERE id = ?", (curso_id,))
    if cursor.fetchone() is None:
        conn.close()
        return False
    
    # Deletar o curso
    cursor.execute("DELETE FROM cursos WHERE id = ?", (curso_id,))
    
    conn.commit()
    conn.close()
    
    return True
