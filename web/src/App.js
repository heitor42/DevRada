import React, { useState, useEffect } from 'react';
import api from './services/api'

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';
/**
 * Componente
 *  sempre com letra maiuscula
 * Estado
 * Propiedade
 */



function App() {
  const [ devs, setDevs ] = useState([])

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs()
  }, []);

  async function handleAddDev(data) {

    const response = await api.post('/devs', data)

    setDevs([...devs, response.data]);
  }
  
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
        <li className="dev-item">
            <header>
              <img src="https://avatars3.githubusercontent.com/u/4248081?s=460&v=4" alt="Michael Telo"/>
              <div className="user-info">
                <strong>Michel Teló 1.0</strong>
                <span>Node.js, PHP, JavaScript</span>
              </div>
            </header>
            <p>A nice guy.</p>
            <a href="https://github.com/filipedeschamps">Acessar perfil no Github</a>
          </li>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
