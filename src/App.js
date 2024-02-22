import React, { useState, useEffect } from 'react';

const CompteurPassType = () => {
  const [compteurs, setCompteurs] = useState({});

  useEffect(() => {
    // Remplacer par une récupération réelle des données de l'API
    const donneesMock = [
      { passType: 'TypeA' },
      { passType: 'TypeB' },
      { passType: 'TypeA' },
      { passType: 'TypeB' },
      { passType: 'TypeC' },
      { passType: 'TypeB' },
      { passType: 'TypeA' },
      { passType: 'TypeC' },
      { passType: 'TypeC' },
      { passType: 'TypeD' },
      { passType: 'TypeA' },
      { passType: 'TypeB' },
      { passType: 'TypeA' },
      { passType: 'TypeD' },
      { passType: 'TypeD' },
      { passType: 'TypeD' },
      { passType: 'TypeC' },
      { passType: 'TypeA' },
      { passType: 'TypeC' },
      { passType: 'TypeA' },
      { passType: 'TypeD' },
      { passType: 'TypeB' },
      { passType: 'TypeB' },
      { passType: 'TypeA' }
    ];

    const calculerCompteurs = (donnees) => {
      const resultats = {};

      donnees.forEach(({ passType }) => {
        if (resultats[passType]) {
          resultats[passType] += 1;
        } else {
          resultats[passType] = 1;
        }
      });

      return resultats;
    };

    const compteursCalculés = calculerCompteurs(donneesMock);
    setCompteurs(compteursCalculés);
  }, []);

  return (
    <div>
      {Object.entries(compteurs).map(([type, compteur]) => (
        <p key={type}>{`${type}: ${compteur}`}</p>
      ))}
    </div>
  );
};

export default CompteurPassType;