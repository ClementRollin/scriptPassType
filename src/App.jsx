import React, { useState } from 'react';
import AjoutPassType from './components/AjoutPassType';
import Modal from './components/modal';
import Tableau from './components/Tableau';
import ConfirmDeletePopup from './components/deletePassType';

const App = () => {
  const [dataSets, setDataSets] = useState([{ nom: 'passes1', passTypes: [] }]);
  const [showModal, setShowModal] = useState(false);
  const [passTypeTemp, setPassTypeTemp] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentDeleting, setCurrentDeleting] = useState({ index: null, type: '' });

  const addDataSet = (nomTableau) => {
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

  const handleDeleteRequest = (index, type) => {
    setCurrentDeleting({ index, type });
    setShowDeleteConfirm(true);
  };

  const handleDeleteSingle = (passType) => {
    const updatedDataSets = dataSets.map(dataSet => {
      // Mise à jour des passTypes en décrémentant le compteur si nécessaire
      const updatedPassTypes = dataSet.passTypes.map(pt => {
        if (pt.type === passType && pt.count > 1) {
          // Décrémentez le compteur si le passType correspond et que le compteur est > 1
          return { ...pt, count: pt.count - 1 };
        } else {
          // Sinon, retournez le passType tel quel
          return pt;
        }
      });
  
      return { ...dataSet, passTypes: updatedPassTypes };
    });
  
    setDataSets(updatedDataSets); // Mettez à jour l'état avec les dataSet modifiés
    setShowDeleteConfirm(false); // Fermez la fenêtre de confirmation de suppression
  };
  
  

  const handleConfirmDelete = () => {
    // Copie profonde de dataSets pour éviter les mutations directes
    const updatedDataSets = [...dataSets.map(dataSet => ({
      ...dataSet,
      passTypes: dataSet.passTypes.filter(pt => pt.type !== currentDeleting.type)
    }))];
  
    // Mise à jour de l'état avec les nouveaux dataSets
    setDataSets(updatedDataSets);
    setShowDeleteConfirm(false);
    setCurrentDeleting({ index: null, type: '' }); // Réinitialisation après la suppression
  };

  return (
    <div>
      <AjoutPassType ajouterPassType={ajouterPassType} />
      {dataSets.map((dataSet, index) => (
        <Tableau key={index} nom={dataSet.nom} passTypes={dataSet.passTypes} onDelete={handleDeleteRequest} />
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
      {showDeleteConfirm && (
        <ConfirmDeletePopup
          isOpen={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          passType={currentDeleting.type}
          onDeleteConfirm={handleConfirmDelete}
          onDeleteSingle={handleDeleteSingle}
        />
      )}
    </div>
  );
};

export default App;