import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; 
import { PersistGate } from 'redux-persist/integration/react'; // Import du PersistGate
import { store, persistor } from './store/store'; // Import du store et du persistor
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import UserPage from './pages/UserPage';
import ErrorPage from './pages/ErrorPage';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> {/* Utilisation de PersistGate */}
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;