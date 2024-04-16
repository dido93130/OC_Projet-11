 // actions/authActions.js
  import { createAsyncThunk } from '@reduxjs/toolkit';
  import { loginSuccess,loginFail } from '../reducers/userReducer'

  // Définir l'action resetError
   export const resetError = () => ({ type: 'user/resetError' });


   export const loginUser = createAsyncThunk(
    'user/login',
    async ({ email, password }, { dispatch, rejectWithValue }) => {
      try {
        const response = await fetch('http://localhost:3001/api/v1/user/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),      
        });
  
        if (!response.ok) {
          // Si la réponse est une erreur 400, retournez un rejet avec un message d'erreur approprié
          if (response.status === 400) {
            console.clear();
            return rejectWithValue('Invalid username or password');
          }
          // Sinon, lancez une erreur avec le statut de la réponse
          throw new Error(`Login failed with status: ${response.status}`);
        }
  
        const data = await response.json();        
        const token = data.body.token;
  
        sessionStorage.setItem('token', token);
        dispatch(loginSuccess({ token }));
        
        return token;
      } catch (error) {
        // Gérez les autres erreurs ici, si nécessaire
        return rejectWithValue('Login failed');
      }
    }
  );

  // Ajustez une action logout pour qu'elle soit cohérente avec Redux Toolkit
  export const logout = createAsyncThunk('user/logout', async () => {
    sessionStorage.removeItem('token'); // Nettoyer le token stocké dans sessionStorage    
  });
 
  export const fetchUserProfile = createAsyncThunk(
    'user/fetchUserProfile',
    async (_, { rejectWithValue }) => {
      try {
        const token = sessionStorage.getItem('token'); // Utiliser le token depuis sessionStorage
        if (!token) {
          throw new Error('No token found');
        }
  
        const response = await fetch('http://localhost:3001/api/v1/user/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
  
        const data = await response.json();
        const userData = {
          createdAt: data.body.createdAt,
          updatedAt: data.body.updatedAt,
          id: data.body.id,
          email: data.body.email,
          firstname: data.body.firstName,
          lastname: data.body.lastName,
          username: data.body.userName
      };        
        return userData;
      } catch (error) {        
        return rejectWithValue(error.toString());
      }
    }
  );

  // Action asynchrone pour mettre à jour le profil de l'utilisateur
  export const updateUserProfile = createAsyncThunk(
    'user/updateUserProfile',
    async (formData, { rejectWithValue }) => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
  
        const response = await fetch('http://localhost:3001/api/v1/user/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            userName: formData.newUserName, // Utiliser userName au lieu de newUserName            
          }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to update user profile');
        }
  
        const data = await response.json();
        // Vous pouvez retourner les nouvelles données du profil utilisateur si nécessaire
        const updatedUserData = {
          createdAt: data.body.createdAt,
          updatedAt: data.body.updatedAt,
          id: data.body.id,
          email: data.body.email,
          firstname: data.body.firstName,
          lastname: data.body.lastName,
          username: data.body.userName
        };        
        return updatedUserData;
      } catch (error) {        
        return rejectWithValue(error.toString());
      }
    }
  );
