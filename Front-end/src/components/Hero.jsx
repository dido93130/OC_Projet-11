import React from 'react';// Import de la bibliothèque React

const Hero = () => {
  return (
    <div className="hero">
      {/* Conteneur de la section héro */}
      <section className="hero-content">
        {/* Titre de la section (accessible uniquement pour les lecteurs d'écran) */}
        <h2 className="sr-only">Promoted Content</h2>
        {/* Sous-titres de la section promotionnelle */}
        <p className="subtitle">No fees.</p>
        <p className="subtitle">No minimum deposit.</p>
        <p className="subtitle">High interest rates.</p>
        {/* Texte principal de la section promotionnelle */}
        <p className="text">Open a savings account with Argent Bank today!</p>
      </section>
    </div>
  );
};


export default Hero;