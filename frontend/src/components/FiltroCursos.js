import React, { useState } from 'react';

const FiltroCursos = ({ onFiltrar }) => {
  const [nome, setNome] = useState('');

  return (
    <div className="card mb-3">
      <form onSubmit={(e) => {
        e.preventDefault();
        onFiltrar(nome);
      }} className="p-3">
        <div className="form-group mb-3">
          <label>Filtrar por Nome</label>
          <div className="d-flex">
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="form-control"
              placeholder="Nome do curso"
            />
            <button type="submit" className="btn btn-primary" style={{ marginLeft: '10px' }}>
              Filtrar
            </button>
            <button 
              type="button" 
              className="btn btn-danger" 
              onClick={() => {
                setNome('');
                onFiltrar('');
              }}
              style={{ marginLeft: '10px' }}
            >
              Limpar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FiltroCursos;