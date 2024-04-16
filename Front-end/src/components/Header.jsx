import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUserProfile, logout } from '../actions/authActions'; // Importez la fonction logout depuis vos actions authActions
import logo from '../assets/images/argentBankLogo.webp'

const Header = () => {
  const isConnected = useSelector(state => state.user.isConnected);
  const userName = useSelector(state => state.user.userName);
 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (isConnected && !userName && token) {
      dispatch(fetchUserProfile());
    }
  }, [isConnected, userName, dispatch]);
 
  const handleLogout = () => {
    dispatch(logout()); // Dispatch l'action logout lors du clic sur le bouton de déconnexion    
    navigate('/');    // Rediriger vers la page d'accueil
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="logo Argent Bank"          
        />
        <h1 className="sr-only" aria-label="Argent Bank" >Argent Bank</h1>
      </Link>
      <div>
        {isConnected ? (
          <>
             <span className="main-nav-item" aria-label={`Logged in as ${userName}`}>
              <i className="fa fa-user-circle"></i>
              {userName}
            </span>
            <a className="main-nav-item" onClick={handleLogout} aria-label="Logout">
             <i className="fa fa-sign-out"></i>
              Sign Out
            </a>
          </>
        ) : (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
