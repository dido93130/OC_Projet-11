// Import de React et des hooks useState et useEffect depuis React
import React, { useState, useEffect } from 'react';
// Import du composant Account
import Account from './Account';
// Import des données d'accounts
import accountsData from '../data/accountsData.json';
// Import des hooks useSelector et useDispatch pour accéder à l'état global Redux et dispatcher des actions
import { useSelector, useDispatch } from 'react-redux';
// Import de l'action updateUserProfile depuis authActions pour mettre à jour le profil utilisateur
import { updateUserProfile } from '../actions/authActions'; 

// Import du composant EditUserInfoForm
import EditUserInfoForm from './EditUserInfoForm';

const UserAccount = () => {
  // Extraction des données d'utilisateur depuis le state Redux
  const { userName, firstName, lastName } = useSelector(state => state.user); 
  // Initialisation du dispatch pour l'utilisation des actions Redux
  const dispatch = useDispatch();

  // Initialisation de l'état de l'édition du profil et des données du formulaire
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    newUserName: userName,
    newFirstName: firstName,
    newLastName: lastName,
  });

  // Mettre à jour les données du formulaire lorsque les données du profil utilisateur changent
  useEffect(() => {
    setFormData({
      newUserName: userName,
      newFirstName: firstName,
      newLastName: lastName,
    });
  }, [userName, firstName, lastName]);
  
  // Gérer le clic sur le bouton d'édition
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Gérer le changement dans les champs du formulaire
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Gérer le clic sur le bouton de sauvegarde
  const handleSaveClick = () => {
    dispatch(updateUserProfile(formData));
    setIsEditing(false);
  };

  // Gérer le clic sur le bouton d'annulation
  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div>
      <div className="header">
        {!isEditing && (
          <>
            <h1>Welcome back, {firstName} Jarvis!</h1>
            <button className="edit-button" onClick={handleEditClick}>
              Edit Name
            </button>
          </>
        )}
        {isEditing && (
          <h1>Edit User Info</h1>
        )}
         {isEditing && (
        <EditUserInfoForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSaveClick={handleSaveClick}
          handleCancelClick={handleCancelClick}
        />
      )}    
      </div>
      <h2 className="sr-only">Accounts</h2>
      {/* Map des données d'accounts pour afficher chaque compte */}
      {accountsData.map((account) => (
        <Account
          key={account.id}
          id={account.id}
          type={account.type}
          number={account.number}
          balance={account.balance}
          description={account.description}
        />
      ))}       
    </div>
  );
};

export default UserAccount;
