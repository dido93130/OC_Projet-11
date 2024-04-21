import React, { useEffect } from 'react'; // Import de React et du hook useEffect
import { useSelector, useDispatch } from 'react-redux'; // Import des hooks useSelector et useDispatch de Redux
import { Link, useNavigate } from 'react-router-dom'; // Import du composant Link et du hook useNavigate de React Router
import { fetchUserProfile, logout } from '../actions/authActions'; // Import des actions fetchUserProfile et logout depuis les actions authActions
import logo from '../assets/images/argentBankLogo.webp'; // Import de l'image de logo

// Composant Header pour afficher l'en-tête de la page avec le logo et les liens de navigation
const Header = () => {
  const isConnected = useSelector(state => state.user.isConnected); // Sélection de l'état isConnected depuis le store Redux
  const userName = useSelector(state => state.user.userName); // Sélection de l'état userName depuis le store Redux
 
  const dispatch = useDispatch(); // Initialisation du hook useDispatch pour dispatcher des actions Redux
  const navigate = useNavigate(); // Initialisation du hook useNavigate pour la navigation

  useEffect(() => {
    // Effet secondaire pour charger le profil utilisateur lorsque l'utilisateur est connecté
    const token = sessionStorage.getItem('token'); // Récupération du token depuis sessionStorage
    if (isConnected && !userName && token) {
      dispatch(fetchUserProfile()); // Dispatch de l'action fetchUserProfile pour récupérer le profil utilisateur
    }
  }, [isConnected, userName, dispatch]); // Déclenchement de l'effet secondaire lorsque isConnected, userName ou dispatch change
 
  const handleLogout = () => {
    dispatch(logout()); // Dispatch de l'action logout lors du clic sur le bouton de déconnexion    
    navigate('/');    // Redirection vers la page d'accueil après la déconnexion
  };

  const handleUserClick = () => {
    navigate('/user'); // Redirection vers la page du profil utilisateur
  };

  return (
    <nav className="main-nav"> {/* Conteneur de la barre de navigation principale */}
      <Link className="main-nav-logo" to="/"> {/* Logo de l'en-tête avec un lien vers la page d'accueil */}
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="logo Argent Bank"          
        />
        <h1 className="sr-only" aria-label="Argent Bank" >Argent Bank</h1> {/* Texte alternatif pour le logo (accessible uniquement pour les lecteurs d'écran) */}
      </Link>
      <div> {/* Conteneur des éléments de navigation */}
         {/* Condition pour afficher les liens de navigation en fonction de l'état isConnected */}
        {isConnected ? (           
          <>
            <span className="main-nav-item" onClick={handleUserClick} aria-label={`Logged in as ${userName}`}>
              <i className="fa fa-user-circle"></i>
              {userName}
            </span>
            <a className="main-nav-item" onClick={handleLogout} aria-label="Logout"> {/* Bouton de déconnexion */}
             <i className="fa fa-sign-out"></i>
              Sign Out
            </a>
          </>
        ) : (
          <Link className="main-nav-item" to="/sign-in"> {/* Bouton de connexion */}
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header; // Export du composant Header
