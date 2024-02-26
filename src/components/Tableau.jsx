import React from 'react';

const Tableau = ({ nom, passTypes, onDelete }) => {
  return (
    <div className="tableau">
      <h3>{nom}</h3>
      <table>
        <tbody>
          {passTypes.map((pt, index) => (
            <tr key={index}>
              <td>{pt.type}: {pt.count}</td>
              <td><button onClick={() => onDelete(index, pt.type)}>Supprimer</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tableau;