import React, { useEffect, useState } from "react";

import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState({});

  useEffect(() => {
    api.get('/repositories').then(repo => {
      setRepositories(repo.data);
    })
  }, [])

  async function handleAddRepository() {
    try {
      const response = await api.post('/repositories', {
        title: `Teste ${Date.now()}`,
	      url: "http://github.com/pedromeneghel",
	      techs: ["Node", "ReactJS"]
      });

      const repository = response.data;

      setRepositories([...repositories, repository]);
    }
    catch {
      alert('Add error');
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);
      const repositoriesTmp = repositories.filter(repo => repo.id !== id);
      
      setRepositories(repositoriesTmp);
    }
    catch {
      alert('Delete error');
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.length > 0 && repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
