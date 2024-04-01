import React from 'react';

const EditUserInfoForm = ({ formData, handleInputChange, handleSaveClick, handleCancelClick }) => {
  return (
    <form>
      <div className="edit-wrapper">  
      <label htmlFor="newUserName">User name:  </label>
      <input
        type="text"
        id="newUserName"
        name="newUserName"
        value={formData?.newUserName || ''}
        onChange={handleInputChange}
        placeholder={formData?.userName}
      />
      </div >
      <br/>
      <div className="edit-wrapper">
      <label htmlFor="newFirstName">First name:  </label>
      <input 
        type="text"
        id="newFirstName"
        name="newFirstName"
        value={formData?.newFirstName || ''}
        placeholder={formData.firstname }
        disabled // Les champs first name et last name sont désactivés et non modifiables
      />
      </div>
      <br/>
      <div className="edit-wrapper">
      <label htmlFor="newLastName">Last name:  </label>
      <input
        type="text"
        id="newLastName"
        name="newLastName"
        value={formData?.newLastName || ''}
        placeholder={formData.lastName}
        disabled // Les champs first name et last name sont désactivés et non modifiables
      />
      </div>
      <br/>
      <div>
        <button className="edit-button" type="button" onClick={handleSaveClick}>Save</button>      
        <button className="edit-button" type="button" onClick={handleCancelClick}>Cancel</button>
      </div>
    </form>
  );
};

export default EditUserInfoForm;