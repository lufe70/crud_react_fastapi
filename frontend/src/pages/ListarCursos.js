import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import FiltroCursos from '../components/FiltroCursos';

const ListarCursos = () => {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtroNome, setFiltroNome] = useState('');
  
  
    const fetchCursos = async (nome = '') => {
      setLoading(true);
      try {
        const url = nome 
          ? `http://localhost:8000/cursos/filtro/${encodeURIComponent(nome)}`
          : 'http://localhost:8000/cursos';
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Erro ao carregar cursos');
        }
        
        const data = await response.json();
        setCursos(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    useEffect(() => {
    fetchCursos();
   }, []);

  const handleFiltrar = (nome) => {
    setFiltroNome(nome);
    fetchCursos(nome);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este curso?')) {
      try {
        const response = await fetch(`http://localhost:8000/cursos/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Erro ao excluir curso');
        }
        
        // Atualizar a lista de cursos após a exclusÃ£o
        setCursos(cursos.filter(curso => curso.id !== id));
        
      } catch (error) {
        alert('Erro ao excluir curso: ' + error.message);
      }
    }
  };

  return (
    <div>
      <Header 
        title="Cursos" 
        button={
          <Link to="/cursos/cadastrar" className="btn btn-primary">
            Novo Curso
          </Link>
        } 
      />
      
      <FiltroCursos onFiltrar={handleFiltrar} />
      
      <div className="card">
        {loading ? (
          <p>Carregando cursos...</p>
        ) : error ? (
          <p>Erro: {error}</p>
        ) : cursos.length === 0 ? (
          <p>Nenhum curso cadastrado.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Carga Horária</th>
                <th>Perí­odo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {cursos.map((curso) => (
                <tr key={curso.id}>
                  <td>{curso.codigo}</td>
                  <td>{curso.nome}</td>
                  <td>{curso.carga_horaria}h</td>
                  <td>{curso.periodo}º</td>
                  <td className="actions">
                    <Link to={`/cursos/editar/${curso.id}`} className="btn btn-edit">
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(curso.id)}
                      className="btn btn-danger"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ListarCursos;
