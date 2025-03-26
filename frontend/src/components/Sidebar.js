import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>IBMEC Admin</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/cursos">Listar Cursos</Link>
          </li>
          <li>
            <Link to="/cursos/cadastrar">Cadastrar Curso</Link>
          </li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <p>Projeto de Cloud - 2025</p>
      </div>
    </div>
  );
};

export default Sidebar;
