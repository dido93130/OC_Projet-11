import { updateUserProfile, fetchUserProfile, loginUser, logout } from '../actions/authActions';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'VOID', // État initial de la connexion
  isConnected: false, // L'utilisateur est-il connecté ?
  token: localStorage.getItem('token') || null, // Token d'authentification stocké dans localStorage ou null
  userName: null, // Nom d'utilisateur
  error: null, // Message d'erreur
};

// Création d'une tranche (slice) d'état pour gérer l'authentification de l'utilisateur
const userSlice = createSlice({
  name: 'user', // Nom de la tranche
  initialState, // État initial
  reducers: {
    // Reducers pour gérer les différents états de connexion et de mise à jour du profil utilisateur
    loginSuccess(state, action) {
      // Reducer appelé en cas de connexion réussie
      state.status = 'LOGIN_SUCCESS'; // Mise à jour du statut de connexion
      state.isConnected = true; // L'utilisateur est connecté
      state.token = action.payload.token; // Mise à jour du token d'authentification
      state.error = null; // Réinitialisation du message d'erreur
    },
    loginFail(state) {
      // Reducer appelé en cas d'échec de connexion
      state.status = 'LOGIN_FAIL'; // Mise à jour du statut de connexion
      state.isConnected = false; // L'utilisateur n'est pas connecté
    },
    updateUserProfileSuccess(state, action) {
      // Reducer appelé en cas de mise à jour réussie du profil utilisateur
      state.status = 'PROFILE_UPDATE_SUCCESS'; // Mise à jour du statut
      state.userName = action.payload.username; // Mise à jour du nom d'utilisateur
      state.error = null; // Réinitialisation du message d'erreur
    },
    updateUserProfileFail(state, action) {
      // Reducer appelé en cas d'échec de mise à jour du profil utilisateur
      state.status = 'PROFILE_UPDATE_FAIL'; // Mise à jour du statut
      state.error = action.payload; // Mise à jour du message d'erreur
    },
    resetError(state) {
      // Reducer appelé pour réinitialiser le message d'erreur
      state.error = null; // Réinitialisation du message d'erreur
    },
  },
  extraReducers: (builder) => {
    // Gestion des actions asynchrones provenant de Redux Toolkit
    builder
      .addCase(updateUserProfile.pending, (state) => {
        // Reducer appelé lorsqu'une requête de mise à jour du profil est en cours
        state.status = 'LOADING'; // Mise à jour du statut
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        // Reducer appelé lorsque la mise à jour du profil est réussie
        state.status = 'SUCCEEDED'; // Mise à jour du statut
        state.userName = action.payload.username; // Mise à jour du nom d'utilisateur
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        // Reducer appelé en cas d'échec de mise à jour du profil
        state.status = 'FAILED'; // Mise à jour du statut
        state.error = action.payload; // Mise à jour du message d'erreur
      })
      .addCase(fetchUserProfile.pending, (state) => {
        // Reducer appelé lorsqu'une requête de récupération du profil est en cours
        state.status = 'LOADING'; // Mise à jour du statut
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        // Reducer appelé lorsque la récupération du profil est réussie
        state.status = 'SUCCEEDED'; // Mise à jour du statut
        state.userName = action.payload.username; // Mise à jour du nom d'utilisateur
        state.firstName = action.payload.firstname; // Mise à jour du prénom
        state.lastName = action.payload.lastname; // Mise à jour du nom de famille
        state.userProfile = action.payload; // Mise à jour du profil utilisateur complet
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        // Reducer appelé en cas d'échec de récupération du profil
        state.status = 'FAILED'; // Mise à jour du statut
        state.error = action.error.message; // Mise à jour du message d'erreur
      })
      .addCase(loginUser.pending, (state) => {
        // Reducer appelé lorsqu'une requête de connexion est en cours
        state.status = 'LOADING'; // Mise à jour du statut
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // Reducer appelé lorsque la connexion est réussie
        state.status = 'SUCCEEDED'; // Mise à jour du statut
        state.isConnected = true; // Mise à jour de l'état de connexion
        state.token = action.payload; // Mise à jour du token d'authentification
        localStorage.setItem('token', action.payload); // Stockage du token dans localStorage
      })
      .addCase(loginUser.rejected, (state, action) => {
        // Reducer appelé en cas d'échec de connexion
        state.status = 'FAILED'; // Mise à jour du statut
        state.error = action.payload; // Mise à jour du message d'erreur
      })
      .addCase(logout.fulfilled, (state) => {
        // Reducer appelé lors de la déconnexion
        return initialState; // Réinitialisation de l'état
      });
  },
});

// Export des actions de la tranche d'état utilisateur
export const { loginSuccess, loginFail, updateUserProfileSuccess, updateUserProfileFail } = userSlice.actions;

// Export du réducteur de la tranche d'état utilisateur
export default userSlice.reducer;
