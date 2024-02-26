import React, { useState } from 'react';

const ConfirmDeletePopup = ({ isOpen, onClose, passType, onDeleteConfirm, onDeleteSingle }) => {
  const [step, setStep] = useState('confirm'); // Étapes : 'confirm', 'validate'
  const [inputValue, setInputValue] = useState('');

  // Passe à l'étape de validation
  const handleConfirm = () => {
    setStep('validate');
  };

  // Valide l'entrée et procède à la suppression globale
  const validateInput = () => {
    if (inputValue.trim() === passType?.trim()) {
      onDeleteConfirm(passType); // Suppression globale
    } else {
      alert("Le nom du passType ne correspond pas.");
    }
  };

  // Valide l'entrée et procède à la suppression unitaire
  const validateAndDeleteSingle = () => {
    if (inputValue.trim() === passType?.trim()) {
      onDeleteSingle(passType); // Suppression unitaire
    } else {
      alert("Le nom du passType ne correspond pas.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        {/* Étape de confirmation */}
        {step === 'confirm' && (
          <>
            <h3 className='question'>Êtes-vous sûr de vouloir supprimer ce passType : {passType} ?</h3>
            <div className='buttonConfirm'>
                <button onClick={handleConfirm}>Oui</button>
                <button onClick={onClose}>Non</button>
            </div>
          </>
        )}
        {/* Étape de validation */}
        {step === 'validate' && (
          <>
            <p>Veuillez entrer le nom du passType afin de valider sa suppression :</p>
            <div className='inputValidation'>
                <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Nom du passType"
                />
                <div className='buttonValidation'>
                    <button onClick={validateInput}>Valider pour Suppression Globale</button>
                    <button onClick={validateAndDeleteSingle}>Valider pour Suppression Unité</button>
                </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmDeletePopup;