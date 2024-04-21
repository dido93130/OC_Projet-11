// Import de React et d'autres hooks et fonctions nécessaires depuis React
import React, { useState, useEffect } from 'react';
// Import de hooks et fonctions spécifiques à Redux pour la gestion de l'état global
import { useDispatch, useSelector } from 'react-redux';
// Import de useNavigate pour la navigation programmatique dans React Router
import { useNavigate } from 'react-router-dom';
// Import des actions nécessaires pour la connexion utilisateur et la réinitialisation des erreurs
import { loginUser, resetError } from '../actions/authActions'; // Importer resetError depuis vos actions

const SignInForm = () => {
  // États locaux pour stocker les valeurs du formulaire et le statut de la case à cocher "Remember Me"
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); 

  // Dispatcher Redux et navigateur pour la redirection après la connexion
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Accéder à l'état d'erreur depuis le store Redux
  const errorMessage = useSelector(state => state.user.error);

  // Effacer les champs de nom d'utilisateur et de mot de passe lorsque le message d'erreur est affiché
  useEffect(() => {
    if (errorMessage) {
      setEmail('');
      setPassword('');
    }
  }, [errorMessage]); // Le useEffect s'exécute à chaque changement de errorMessage

  // Effacer le message d'erreur lorsqu'un utilisateur clique sur le champ de nom d'utilisateur
  const handleUsernameClick = () => {
    dispatch(resetError());
  };

  // Effacer le message d'erreur lorsqu'un utilisateur clique sur le champ de mot de passe
  const handlePasswordClick = () => {
    dispatch(resetError());
  };

  // Soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(resetError()); // Réinitialiser l'erreur avant de tenter la connexion
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => navigate('/user')) // Rediriger vers la page utilisateur après une connexion réussie
      .catch((error) => {       
        // Le message d'erreur est déjà géré par votre reducer et accessible via `useSelector`
      });
  };

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>      
      <form onSubmit={handleSubmit} aria-label="Sign In Form">
        {/* Champ de nom d'utilisateur */}
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input 
            type="text"
            id="username"
            name="email"
            value={email}  
            onChange={(e) => setEmail(e.target.value)} 
            onClick={handleUsernameClick} // Effacer le message d'erreur lorsqu'un utilisateur clique sur le champ de nom d'utilisateur
            aria-label="Username"
          />
        </div>
        {/* Champ de mot de passe */}
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            onClick={handlePasswordClick} // Effacer le message d'erreur lorsqu'un utilisateur clique sur le champ de mot de passe
            aria-label="Password"
          />
        </div>
        {/* Case à cocher "Remember Me" */}
        <div className="input-remember">
          <input 
            type="checkbox" 
            id="remember-me"
            name="remember-me" 
            checked={rememberMe} 
            onChange={(e) => setRememberMe(e.target.checked)} 
            aria-label="Remember Me"
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        {/* Bouton de soumission du formulaire */}
        <button type="submit" className="sign-in-button" aria-label="Submit Sign In">Sign In</button>
        {/* Afficher le message d'erreur s'il y en a un */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </section>
  );
};

export default SignInForm;
