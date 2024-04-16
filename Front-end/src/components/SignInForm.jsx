import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, resetError } from '../actions/authActions'; // Importer resetError depuis vos actions

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); 

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(resetError()); // Réinitialiser l'erreur avant de tenter la connexion
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => navigate('/user'))
      .catch((error) => {       
        // Vous n'avez pas besoin de définir manuellement le message d'erreur ici
        // car il est déjà géré par votre reducer et accessible via `useSelector`
      });
  };

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>      
      <form onSubmit={handleSubmit} aria-label="Sign In Form">
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
        <button type="submit" className="sign-in-button" aria-label="Submit Sign In">Sign In</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Afficher le message d'erreur s'il y en a un */}
      </form>
    </section>
  );
};

export default SignInForm;
