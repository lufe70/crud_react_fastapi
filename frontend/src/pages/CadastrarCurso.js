import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const CadastrarCurso = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    codigo: '',
    nome: '',
    descricao: '',
    carga_horaria: '',
    periodo: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar campos
    if (!formData.codigo || !formData.nome || !formData.carga_horaria || !formData.periodo) {
      alert('Por favor, preencha todos os campos obrigatÃ³rios.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/cursos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          carga_horaria: parseInt(formData.carga_horaria),
          periodo: parseInt(formData.periodo)
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar curso');
      }

      // Redirecionar para a página de listagem
      navigate('/cursos');
    } catch (error) {
      alert('Erro ao cadastrar curso: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header title="Cadastrar Curso" />
      
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="codigo">Código*</label>
            <input
              type="text"
              id="codigo"
              name="codigo"
              value={formData.codigo}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="nome">Nome*</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="descricao">Descrição</label>
            <textarea
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              className="form-control"
              rows="3"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="carga_horaria">Carga Horária (horas)*</label>
            <input
              type="number"
              id="carga_horaria"
              name="carga_horaria"
              value={formData.carga_horaria}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="periodo">Perí­odo*</label>
            <input
              type="number"
              id="periodo"
              name="periodo"
              value={formData.periodo}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          
          <div className="form-group">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
            <button 
              type="button" 
              className="btn btn-danger" 
              onClick={() => navigate('/cursos')}
              style={{ marginLeft: '10px' }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastrarCurso;
