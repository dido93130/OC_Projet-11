// actions/authActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginSuccess, loginFail } from '../reducers/userReducer'; // Importez les actions loginSuccess et loginFail

// Définir l'action resetError
export const resetError = () => ({ type: 'user/resetError' }); // Action pour réinitialiser l'erreur

// Créer une action asynchrone pour la connexion de l'utilisateur
export const loginUser = createAsyncThunk(
  'user/login', // Nom de l'action
  async ({ email, password }, { dispatch, rejectWithValue }) => { // Fonction asynchrone qui reçoit les informations de connexion et un objet contenant des utilitaires Redux Toolkit
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', { // Effectuer une requête POST pour la connexion de l'utilisateur
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }), // Données de connexion au format JSON
      });

      if (!response.ok) {
        // Si la réponse est une erreur 400, retournez un rejet avec un message d'erreur approprié
        if (response.status === 400) {
          console.clear(); // Effacer la console en cas d'erreur de connexion
          return rejectWithValue('Invalid username or password'); // Rejeter avec un message d'erreur
        }
        // Sinon, lancez une erreur avec le statut de la réponse
        throw new Error(`Login failed with status: ${response.status}`);
      }

      const data = await response.json(); // Analyser la réponse JSON
      const token = data.body.token; // Extraire le token de la réponse

      localStorage.setItem('token', token); // Stocker le token dans localStorage
      dispatch(loginSuccess({ token })); // Dispatch de l'action loginSuccess avec le token

      return token; // Retourner le token en cas de succès
    } catch (error) {
      dispatch(loginFail(error.message)); // Dispatch loginFail en cas d'échec de connexion avec le message d'erreur
      return rejectWithValue('Login failed'); // Rejeter avec un message d'erreur
    }
  }
);

// Ajustez une action logout pour qu'elle soit cohérente avec Redux Toolkit
export const logout = createAsyncThunk('user/logout', async () => { // Créer une action asynchrone pour la déconnexion de l'utilisateur
  localStorage.removeItem('token'); // Supprimer le token stocké dans localStorage
});

// Créer une action asynchrone pour récupérer le profil de l'utilisateur
export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile', // Nom de l'action
  async (_, { rejectWithValue }) => { // Fonction asynchrone qui ne prend aucun argument et un objet contenant des utilitaires Redux Toolkit
    try {
      const token = localStorage.getItem('token'); // Récupérer le token depuis localStorage
      if (!token) {
        throw new Error('No token found'); // Gérer le cas où aucun token n'est trouvé
      }

      const response = await fetch('http://localhost:3001/api/v1/user/profile', { // Effectuer une requête POST pour récupérer le profil de l'utilisateur
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Ajouter le token dans l'en-tête Authorization
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user profile'); // Gérer le cas où la requête échoue
      }

      const data = await response.json(); // Analyser la réponse JSON
      const userData = {
        createdAt: data.body.createdAt,
        updatedAt: data.body.updatedAt,
        id: data.body.id,
        email: data.body.email,
        firstname: data.body.firstName,
        lastname: data.body.lastName,
        username: data.body.userName,
      };
      return userData; // Retourner les données utilisateur récupérées avec succès
    } catch (error) {
      return rejectWithValue(error.toString()); // Rejeter avec un message d'erreur
    }
  }
);

// Créer une action asynchrone pour mettre à jour le profil de l'utilisateur
export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile', // Nom de l'action
  async (formData, { rejectWithValue }) => { // Fonction asynchrone qui reçoit les données de formulaire et un objet contenant des utilitaires Redux Toolkit
    try {
      const token = localStorage.getItem('token'); // Récupérer le token depuis localStorage
      if (!token) {
        throw new Error('No token found'); // Gérer le cas où aucun token n'est trouvé
      }

      const response = await fetch('http://localhost:3001/api/v1/user/profile', { // Effectuer une requête PUT pour mettre à jour le profil de l'utilisateur
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Ajouter le token dans l'en-tête Authorization
        },
        body: JSON.stringify({
          userName: formData.newUserName, // Utiliser userName au lieu de newUserName
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user profile'); // Gérer le cas où la requête échoue
      }

      const data = await response.json(); // Analyser la réponse JSON
      const updatedUserData = {
        createdAt: data.body.createdAt,
        updatedAt: data.body.updatedAt,
        id: data.body.id,
        email: data.body.email,
        firstname: data.body.firstName,
        lastname: data.body.lastName,
        username: data.body.userName,
      };
      return updatedUserData; // Retourner les données utilisateur mises à jour avec succès
    } catch (error) {
      return rejectWithValue(error.toString()); // Rejeter avec un message d'erreur
    }
  }
);
