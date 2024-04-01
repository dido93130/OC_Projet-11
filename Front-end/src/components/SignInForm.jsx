import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import { loginUser } from '../actions/authActions';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);  

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Utiliser useNavigate pour obtenir la fonction de navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    // Envoi de l'objet contenant email et password à l'action loginUser
     await dispatch(loginUser({ email, password }));
    // Mettre à jour l'état de connexion après une connexion réussie
    navigate('/user');
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
      </form>
    </section>
  );
};

export default SignInForm;
