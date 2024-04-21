import React from 'react'; // Import de la bibliothèque React
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import des composants de routage de React Router
import { Provider } from 'react-redux'; // Import du Provider de React Redux pour fournir le store aux composants
import { PersistGate } from 'redux-persist/integration/react'; // Import du PersistGate pour la persistance des données
import { store, persistor } from './store/store'; // Import du store et du persistor depuis le fichier de configuration
import Header from './components/Header'; // Import du composant Header
import Footer from './components/Footer'; // Import du composant Footer
import HomePage from './pages/HomePage'; // Import de la page d'accueil
import SignInPage from './pages/SignInPage'; // Import de la page de connexion
import UserPage from './pages/UserPage'; // Import de la page utilisateur
import ErrorPage from './pages/ErrorPage'; // Import de la page d'erreur

const App = () => {
  return (
    <Provider store={store}> {/* Fournir le store Redux à l'application */}
      <PersistGate loading={null} persistor={persistor}> {/* Utiliser le PersistGate pour la persistance des données */}
        <Router> {/* Utiliser le composant Router pour gérer les routes */}
          <Header /> {/* Afficher le composant Header */}
          <Routes> {/* Utiliser le composant Routes pour définir les routes */}
            <Route path="/" element={<HomePage />} /> {/* Définir la route pour la page d'accueil */}
            <Route path="/sign-in" element={<SignInPage />} /> {/* Définir la route pour la page de connexion */}
            <Route path="/user" element={<UserPage />} /> {/* Définir la route pour la page utilisateur */}
            <Route path="*" element={<ErrorPage />} /> {/* Définir la route pour les autres cas (erreur 404) */}
          </Routes>
          <Footer /> {/* Afficher le composant Footer */}
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App; // Exporter le composant App
