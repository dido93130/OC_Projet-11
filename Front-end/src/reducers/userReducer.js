import { updateUserProfile, fetchUserProfile, loginUser, logout } from '../actions/authActions';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'VOID',
  isConnected: false,
  token: sessionStorage.getItem('token') || null, 
  userName: null, 
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {    
    loginSuccess(state, action) {
      state.status = 'LOGIN_SUCCESS';
      state.isConnected = true;
      state.token = action.payload.token;      
      state.error = null;
    },
    loginFail(state, action) {
      state.status = 'LOGIN_FAIL';
      state.isConnected = false;      
    },
    updateUserProfileSuccess(state, action) {
      state.status = 'PROFILE_UPDATE_SUCCESS';
      state.userName = action.payload.username; // Mettre à jour le nom d'utilisateur dans l'état
      state.error = null;
    },
    updateUserProfileFail(state, action) {
      state.status = 'PROFILE_UPDATE_FAIL';
      state.error = action.payload;
    },
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(updateUserProfile.pending, (state) => {
      state.status = 'LOADING';
    })
    .addCase(updateUserProfile.fulfilled, (state, action) => {
      state.status = 'SUCCEEDED';
      state.userName = action.payload.username;     
    })
    .addCase(updateUserProfile.rejected, (state, action) => {
      state.status = 'FAILED';
      state.error = action.payload;
    })
      .addCase(fetchUserProfile.pending, (state) => {        
        state.status = 'LOADING';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {        
        state.status = 'SUCCEEDED';
        state.userName = action.payload.username;
        state.firstName = action.payload.firstname;
        state.lastName = action.payload.lastname; 
        state.userProfile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {        
        state.status = 'FAILED';
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {        
        state.status = 'LOADING';        
      })
      .addCase(loginUser.fulfilled, (state, action) => {        
        state.status = 'SUCCEEDED';
        state.isConnected = true;
        state.token = action.payload;
        sessionStorage.setItem('token', action.payload); // Stockez le token dans sessionStorage
      })
      .addCase(loginUser.rejected, (state, action) => {        
        state.status = 'FAILED';
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        return initialState; // Cela réinitialise l'état lors de la déconnexion
      });   
  },
});

export const { loginSuccess, loginFail, updateUserProfileSuccess, updateUserProfileFail } = userSlice.actions;

export default userSlice.reducer;