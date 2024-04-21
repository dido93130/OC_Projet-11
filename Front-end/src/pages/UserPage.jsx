import React from 'react'; // Import de la bibliothèque React
import { useSelector } from 'react-redux'; // Import du hook useSelector pour accéder à l'état Redux
import { Navigate } from 'react-router-dom'; // Import du composant Navigate pour la navigation
import UserAccount from '../components/UserAccount'; // Import du composant UserAccount

// Composant UserPage pour la page utilisateur
const UserPage = () => {
  const isConnected = useSelector(state => state.user.isConnected); // Récupération de l'état de connexion de l'utilisateur depuis Redux

  // Vérifie si l'utilisateur est connecté, sinon redirige vers la page de connexion
  if (!isConnected) {
    return <Navigate to="/sign-in" replace />; // Redirection vers la page de connexion
  }

  return (
    <> {/* Fragments React pour éviter les éléments inutiles dans le DOM */}
      <main className="main bg-dark"> {/* Section principale de la page avec une classe de fond sombre */}
        <UserAccount /> {/* Composant UserAccount pour le compte utilisateur */}
      </main>      
    </>
  );
};

export default UserPage; // Export du composant UserPage
