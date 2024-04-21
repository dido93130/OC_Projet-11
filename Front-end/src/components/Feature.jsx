import React from 'react'; // Import de la bibliothèque React

// Composant Feature pour afficher une fonctionnalité avec une icône, un titre et une description
const Feature = ({ image, descriptionImage, title, description }) => {
  return (
    <div className="feature-item"> {/* Conteneur pour chaque fonctionnalité */}
      <img src={image} alt={descriptionImage} className="feature-icon" aria-hidden="true"/> {/* Icône de la fonctionnalité */}
      <h2 className="feature-item-title">{title}</h2> {/* Titre de la fonctionnalité */}
      <p>{description}</p> {/* Description de la fonctionnalité */}
    </div>
  );
};

export default Feature; // Export du composant Feature
