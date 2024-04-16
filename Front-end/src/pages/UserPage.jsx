import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import UserAccount from '../components/UserAccount';

const UserPage = () => {
  const isConnected = useSelector(state => state.user.isConnected);

  // Vérifie si l'utilisateur est connecté, sinon redirige vers la page de connexion
  if (!isConnected) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <> 
      <main className="main bg-dark">
        <UserAccount />
      </main>      
    </>
  );
};

export default UserPage;