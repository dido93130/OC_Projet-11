// store.js
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Import du stockage local

import userReducer from '../reducers/userReducer';

// Configuration de Redux Persist
const persistConfig = {
  key: 'root', // La clé de stockage racine
  version: 1,
  storage, // Le moteur de stockage à utiliser (dans ce cas, le stockage local)
  whitelist: ['user'], // Les reducers à persister (dans ce cas, uniquement 'user')
  // blacklist: ['someReducer'], // Les reducers à exclure de la persistance (si nécessaire)
};

// Combinaison de tous les reducers
const rootReducer = combineReducers({
  user: userReducer,
  // Ajoutez d'autres reducers si nécessaire
});

// Création d'un reducer persistant
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Création du store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignorer ces actions pour les vérifications de sérialisation
      },
    }),
});

// Création du persistor pour Redux Persist
const persistor = persistStore(store);

export { store, persistor };