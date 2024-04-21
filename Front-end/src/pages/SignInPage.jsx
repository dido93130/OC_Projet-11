import React from 'react'; // Import de la bibliothèque React
import SignInForm from '../components/SignInForm'; // Import du composant SignInForm

// Composant SignInPage pour la page de connexion
const SignInPage = () => {
  return (
    <> {/* Fragments React pour éviter les éléments inutiles dans le DOM */}
      <main className="main bg-dark"> {/* Section principale de la page avec une classe de fond sombre */}
        <SignInForm /> {/* Composant SignInForm pour le formulaire de connexion */}
      </main>     
    </>
  );
};

export default SignInPage; // Export du composant SignInPage