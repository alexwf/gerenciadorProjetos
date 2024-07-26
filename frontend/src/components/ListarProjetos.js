import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListarProjetos = () => {
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjetos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/listarProjetos');
        setProjetos(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar projetos');
        setLoading(false);
      }
    };

    fetchProjetos();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Projetos</h1>
      <ul>
        {projetos.map(projeto => (
          <li key={projeto.id}>
            <h2>{projeto.nome}</h2>
            <p>Data Início: {projeto.data_inicio}</p>
            <p>Data Fim: {projeto.data_fim}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListarProjetos;