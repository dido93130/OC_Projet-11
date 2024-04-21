import React from 'react'; // Import de la bibliothèque React

// Composant Account pour afficher les détails d'un compte
const Account = ({ id, type, number, balance, description }) => {
  return (
    <section key={id} className="account"> {/* Section représentant un compte */}
      <div className="account-content-wrapper"> {/* Wrapper pour le contenu du compte */}
        <h3 className="account-title">Argent Bank {type} ({number})</h3> {/* Titre du compte avec le type et le numéro */}
        <p className="account-amount">{balance}</p> {/* Montant du solde du compte */}
        <p className="account-amount-description">{description}</p> {/* Description du solde du compte */}
      </div>
      <div className="account-content-wrapper cta"> {/* Wrapper pour les appels à l'action du compte */}
        <button className="transaction-button" aria-label="View transactions">View transactions</button> {/* Bouton pour afficher les transactions du compte */}
      </div>
    </section>
  );
};

export default Account; // Export du composant Account
