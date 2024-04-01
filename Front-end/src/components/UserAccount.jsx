import React, { useState, useEffect } from 'react';
import Account from './Account';
import accountsData from '../data/accountsData.json';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from '../actions/authActions'; 

import EditUserInfoForm from './EditUserInfoForm';

const UserAccount = () => {
  const { userName, firstName, lastName } = useSelector(state => state.user); 
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    newUserName: userName,
    newFirstName: firstName,
    newLastName: lastName,
  });

  // Mettre à jour l'état du formulaire lorsque les données de profil utilisateur changent
  useEffect(() => {
    setFormData({
      newUserName: userName,
      newFirstName: firstName,
      newLastName: lastName,
    });
  }, [userName, firstName, lastName]);
  
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveClick = () => {
    dispatch(updateUserProfile(formData));
    setIsEditing(false);
  };

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
