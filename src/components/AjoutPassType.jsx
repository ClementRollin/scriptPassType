import React, { useState } from 'react';

const AjoutPassType = ({ ajouterPassType }) => {
  const [passType, setPassType] = useState('');

  const handleSubmit = () => {
    if (passType.trim() !== '') {
      ajouterPassType(passType.trim());
      setPassType('');
    }
  };

  return (
    <div className='inputPassType'>
      <input
        type="text"
        value={passType}
        onChange={(e) => setPassType(e.target.value)}
        placeholder="Entrer un passType"
      />
      <button onClick={handleSubmit}>Ajouter</button>
    </div>
  );
};

export default AjoutPassType;