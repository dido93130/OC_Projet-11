import React from 'react'; // Import de la bibliothèque React

// Composant Footer pour afficher le pied de page avec le texte de copyright
const Footer = () => {
  return (
    <footer className="footer"> {/* Conteneur du pied de page */}
      <p className="footer-text">Copyright 2020 Argent Bank</p> {/* Texte de copyright */}
    </footer>
  );
};

export default Footer; // Export du composant Footer