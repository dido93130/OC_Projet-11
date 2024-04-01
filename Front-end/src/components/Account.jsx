import React from 'react';

const Account = ({ id, type, number, balance, description }) => {
  return (
    <section key={id} className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">Argent Bank {type} ({number})</h3>
        <p className="account-amount">{balance}</p>
        <p className="account-amount-description">{description}</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button" aria-label="View transactions" >View transactions</button>
      </div>
    </section>
  );
};

export default Account;