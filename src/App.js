import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://admin.neostore.cloud/api/demo/passes/passType', {
          headers: { Authorization: 'Bearer 0L0pLvWByOnxU7weByZAjxhMfeIHv_r-oVZ2wgSvzK9c3ixgqoKG1ntNdLXACYoY' }
        });
        const counts = response.data.reduce((acc, { passType }) => {
          acc[passType] = (acc[passType] || 0) + 1;
          return acc;
        }, {});
        setData(counts);
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Comptage des items par type de pass</h1>
      <ul>
        {Object.entries(data).map(([key, value]) => (
          <li key={key}>{key}: {value}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;