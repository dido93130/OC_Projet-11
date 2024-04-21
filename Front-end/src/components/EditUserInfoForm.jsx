import React from 'react'; // Import de la bibliothèque React

// Composant EditUserInfoForm pour permettre à l'utilisateur de modifier ses informations
const EditUserInfoForm = ({ formData, handleInputChange, handleSaveClick, handleCancelClick }) => {
  return (
    <form> {/* Formulaire pour éditer les informations de l'utilisateur */}
      <div className="edit-wrapper"> {/* Wrapper pour chaque champ d'édition */}
        <label htmlFor="newUserName">User name:  </label> {/* Libellé du champ de nom d'utilisateur */}
        <input
          type="text"
          id="newUserName"
          name="newUserName"
          value={formData?.newUserName || ''}
          onChange={handleInputChange} // Fonction de gestion du changement de valeur du champ
          placeholder={formData?.userName} // Placeholder avec le nom d'utilisateur actuel
          aria-label="User name" // Accessibilité : libellé du champ pour les lecteurs d'écran
          aria-required="true" // Accessibilité : indique que le champ est requis
        />
      </div >
      <br/>
      <div className="edit-wrapper"> {/* Wrapper pour chaque champ d'édition */}
        <label htmlFor="newFirstName">First name:  </label> {/* Libellé du champ de prénom */}
        <input 
          type="text"
          id="newFirstName"
          name="newFirstName"
          value={formData?.newFirstName || ''}
          placeholder={formData.firstname } // Placeholder avec le prénom actuel
          disabled // Les champs de prénom et de nom de famille sont désactivés et non modifiables
          aria-label="First name" // Accessibilité : libellé du champ pour les lecteurs d'écran
        />
      </div>
      <br/>
      <div className="edit-wrapper"> {/* Wrapper pour chaque champ d'édition */}
        <label htmlFor="newLastName">Last name:  </label> {/* Libellé du champ de nom de famille */}
        <input
          type="text"
          id="newLastName"
          name="newLastName"
          value={formData?.newLastName || ''}
          placeholder={formData.lastName} // Placeholder avec le nom de famille actuel
          disabled // Les champs de prénom et de nom de famille sont désactivés et non modifiables
          aria-label="Last name" // Accessibilité : libellé du champ pour les lecteurs d'écran
        />
      </div>
      <br/>
      <div>
        <button className="edit-button" type="button" onClick={handleSaveClick}>Save</button> {/* Bouton pour sauvegarder les modifications */}
        <button className="edit-button" type="button" onClick={handleCancelClick}>Cancel</button> {/* Bouton pour annuler les modifications */}
      </div>
    </form>
  );
};

export default EditUserInfoForm; // Export du composant EditUserInfoForm
