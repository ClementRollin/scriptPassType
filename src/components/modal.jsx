import React, { useState } from 'react';

const Modal = ({ dataSets, onClose, ajouterPassTypeAuTableau, creerTableauEtAjouterPassType, passTypeTemp }) => {
  const [nouveauNomTableau, setNouveauNomTableau] = useState('');

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div style={{ backgroundColor: '#fff', padding: '20px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <h2>Ajouter "{passTypeTemp}" à :</h2>
        {dataSets.map((dataSet, index) => (
          <button className='btnAjoutInput' key={index} onClick={() => ajouterPassTypeAuTableau(index, passTypeTemp)}>
            {dataSet.nom}
          </button>
        ))}
        <div className='ajoutTableau'>
          <input className='nouveauTableau'
            type="text"
            value={nouveauNomTableau}
            onChange={(e) => setNouveauNomTableau(e.target.value)}
            placeholder="Nouveau tableau..."
          />
          <button onClick={() => creerTableauEtAjouterPassType(nouveauNomTableau)}>Créer et ajouter</button>
        </div>
        <button onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
};

export default Modal;