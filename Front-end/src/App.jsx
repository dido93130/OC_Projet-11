import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; 
import store from './store/store'; 
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import UserPage from './pages/UserPage';
import ErrorPage from './pages/ErrorPage'; // Import de la page d'erreur

const App = () => {
  return (
    <Provider store={store}> 
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="*" element={<ErrorPage />} /> // Route pour la page d'erreur
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;