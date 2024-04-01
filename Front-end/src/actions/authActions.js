 // actions/authActions.js
  import { createAsyncThunk } from '@reduxjs/toolkit';
  import { loginSuccess} from '../reducers/userReducer'

  export const loginUser = createAsyncThunk(
    'user/login',
    async ({ email, password }, { dispatch, rejectWithValue }) => {
      try {
        const response = await fetch('http://localhost:3001/api/v1/user/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),      
        });
        if (!response.ok) throw new Error('Login failed');
        const data = await response.json();        
        const token = data.body.token;
        console.log('Token reçu :', token);

        // Stocker le token dans sessionStorage pour une meilleure sécurité et mettre à jour l'état avec loginSuccess
        sessionStorage.setItem('token', token); // Sécuriser le token dans la session
        dispatch(loginSuccess({ token })); // stocker le token dans Redux
      
      return token; // retourne le token en cas de succès
      } catch (error) {
        return rejectWithValue(error);
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
        console.error("Fetch user profile error:", error);
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
        console.error('Update user profile error:', error);
        return rejectWithValue(error.toString());
      }
    }
  );
