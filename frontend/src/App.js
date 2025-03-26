import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ListarCursos from './pages/ListarCursos';
import CadastrarCurso from './pages/CadastrarCurso';
import EditarCurso from './pages/EditarCurso';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/cursos" element={<ListarCursos />} />
            <Route path="/cursos/cadastrar" element={<CadastrarCurso />} />
            <Route path="/cursos/editar/:id" element={<EditarCurso />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
