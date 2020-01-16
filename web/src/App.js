import React, { useState, useEffect } from 'react';
import api from './services/api'

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';
/**
 * Componente
 *  sempre com letra maiuscula
 * Estado
 * Propiedade
 */



function App() {
  const [ devs, setDevs ] = useState([])

  const [ github_username, setGithub_username ] = useState('');
  const [ techs, setTechs ] = useState('');

  const [ latitude, setLatitude ] = useState('');
  const [ longitude, setLongitude ] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position)
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },

      (err) => {
        console.log(err)
      },
      {
        timeout: 30000,
      }
    )
  }, []);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs()
  }, []);

  async function handleAddDev(e) {
    e.preventDefault();

    const response = await api.post('/devs', {
      github_username,
      techs,
      latitude,
      longitude,
    })

    setTechs('');
    setGithub_username('');

    setDevs([...devs, response.data]);
  }
  
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleAddDev}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do Github</label>
            <input 
             name="github_username" 
             id="github_username" 
             required 
             value={github_username}
             onChange={ e => setGithub_username(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologia</label>
            <input 
             name="techs" 
             id="techs" 
             required 
             value={techs}
             onChange={ e => setTechs(e.target.value)}
            />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input 
                type="number" 
                name="latitude" 
                id="latitude" 
                required value={latitude}
                onChange={ e => setLatitude(e.target.value) }
              />
            </div>

            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input 
               type="number" 
               name="longitude" 
               id="longitude" 
               required value={longitude}
               onChange={ e => setLongitude(e.target.value)}
              />
            </div>
          </div>

          <button type="submit">Salvar</button>
        </form>
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
            <li key={dev._id}className="dev-item">
            <header>
              <img src={dev.avatar_url} alt="Michael Telo"/>
              <div className="user-info">
                <strong>{dev.name}</strong>
                <span>{dev.techs.join(', ')}</span>
              </div>
            </header>
          <p>{dev.bio}</p>
            <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a>
          </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
