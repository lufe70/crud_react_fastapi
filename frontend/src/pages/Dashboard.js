import React from 'react';
import Header from '../components/Header';

const Dashboard = () => {
  return (
    <div>
      <Header title="Dashboard" />
      <div className="card">
        <h2>Bem-vindo ao Sistema de Gerenciamento de Cursos</h2>
        <p>Este é um projeto para a disciplina de PROJETO DE CLOUD do IBMEC.</p>
        <p>Utilize o menu lateral para navegar entre as funcionalidades.</p>
      </div>
      <div className="row">
        <div className="card">
          <h3>Funcionalidades disponí­veis:</h3>
          <ul>
            <li>Listagem de cursos</li>
            <li>Cadastro de novos cursos</li>
            <li>Edição de cursos existentes</li>
            <li>Exclusão de cursos</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
