import React, { useState } from 'react';
import AjoutPassType from './components/AjoutPassType';
import Modal from './components/modal';
import Tableau from './components/Tableau';
import './App.css'; 

const App = () => {
  const [dataSets, setDataSets] = useState([{ nom: 'passes1', passTypes: [] }]);
  const [showModal, setShowModal] = useState(false);
  const [passTypeTemp, setPassTypeTemp] = useState('');

  const addDataSet = (nomTableau) => {
    if (!nomTableau) return;
    const nouveauTableau = { nom: nomTableau, passTypes: [] };
    setDataSets([...dataSets, nouveauTableau]);
  };

  const ajouterPassType = (passType) => {
    setPassTypeTemp(passType);
    setShowModal(true);
  };

  const ajouterPassTypeAuTableau = (index, passType) => {
    const updatedPasses = [...dataSets];
    let found = false;

    updatedPasses[index].passTypes.forEach(pt => {
      if (pt.type.toUpperCase() === passType.toUpperCase()) {
        pt.count += 1;
        found = true;
      }
    });

    if (!found) {
      updatedPasses[index].passTypes.push({ type: passType, count: 1 });
    }

    setDataSets(updatedPasses);
    setShowModal(false);
  };

  const creerTableauEtAjouterPassType = (nomTableau) => {
    const nouveauTableau = { nom: nomTableau, passTypes: [{ type: passTypeTemp, count: 1 }] };
    const updatedDataSets = [...dataSets, nouveauTableau];
    setDataSets(updatedDataSets); // Ajoute immédiatement le nouveau tableau à l'état
    setShowModal(false);
  };

  return (
    <div>
      <AjoutPassType ajouterPassType={ajouterPassType} />
      {dataSets.map((dataSet, index) => (
        <Tableau key={index} nom={dataSet.nom} passTypes={dataSet.passTypes} />
      ))}
      {showModal && (
        <Modal
          dataSets={dataSets}
          onClose={() => setShowModal(false)}
          ajouterPassTypeAuTableau={ajouterPassTypeAuTableau}
          creerTableauEtAjouterPassType={creerTableauEtAjouterPassType}
          passTypeTemp={passTypeTemp}
        />
      )}
    </div>
  );
};

export default App;