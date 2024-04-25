import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() !== '' && password.trim() !== '') {
      setLoading(true);
      axios.post(`/login`, {
        username,
        password
      })
      .then(response => {
        setLoading(false);
        const { token } = response.data;
        onLogin(token);
      })
      .catch(error => {
        setLoading(false);
        setLoginError(true);
      });
    } else {
      setLoginError(true);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 h-full flex flex-col justify-center">
      <h1 className="text-2xl font-bold mb-4 text-center">Bitcoin Wallet</h1>
      <h1 className="text-xl font-bold mb-4 text-center">Login</h1>
      {loading && (
        <div className="flex items-center justify-center mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}
      {loginError && (
        <div className="bg-red-100 text-red-700 p-2 mb-4">
          Please enter username and password.
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-semibold mb-2">Username</label>
          <input 
            type="text" 
            id="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className="w-full py-2 px-3 rounded border border-gray-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-semibold mb-2">Password</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full py-2 px-3 rounded border border-gray-300"
          />
        </div>
        <div className="text-center">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
        </div>
      </form>
    </div>
  );
}

function Register({ onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registrationError, setRegistrationError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() !== '' && password.trim() !== '' && password === confirmPassword) {
      setLoading(true);
      axios.post(`/register`, {
        username,
        password
      })
      .then(response => {
        setLoading(false);
        const { token } = response.data;
        onRegister(token);
      })
      .catch(error => {
        setLoading(false);
        setRegistrationError(true);
      });
    } else {
      setRegistrationError(true);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 h-full flex flex-col justify-center">
      <h1 className="text-2xl font-bold mb-4 text-center">Bitcoin Wallet</h1>
      <h1 className="text-xl font-bold mb-4 text-center">Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-semibold mb-2">Username</label>
          <input 
            type="text" 
            id="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className="w-full py-2 px-3 rounded border border-gray-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-semibold mb-2">Password</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full py-2 px-3 rounded border border-gray-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-2">Confirm Password</label>
          <input 
            type="password" 
            id="confirmPassword" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            className="w-full py-2 px-3 rounded border border-gray-300"
          />
        </div>
        {loading && (
        <div className="flex items-center justify-center mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
        )}
        {registrationError && (
          <div className="bg-red-100 text-red-700 p-2 mb-4">
            Registration failed. Please ensure all fields are filled correctly.
          </div>
        )}
        <div className="text-center">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
        </div>
      </form>
    </div>
  );
}

function BitcoinWallet() {
  const [isRegisterPage, setIsRegisterPage] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [transactionError, setTransactionError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [transactionHistory, setTransactionHistory] = useState(["transakcja1", "transakcja2", "transakcja3"]);
  const [token, setToken] = useState(sessionStorage.getItem('token'));


  useEffect(() => {
    if (token) {
      fetchBalance();
      fetchTransactionHistory();
    }
  }, [token]);

  const fetchBalance = () => {
    axios.get(`/balance`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setBalance(response.data.balance);
      })
      .catch(error => {
        console.error('Error fetching balance:', error);
      });
  };

  const fetchTransactionHistory = () => {
    axios.get(`/transaction-history`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setTransactionHistory(response.data.transactions);
      })
      .catch(error => {
        console.error('Error fetching transaction history:', error);
      });
  };

  const handleLoginOrRegister = (token) => {
    setToken(token);
    sessionStorage.setItem('token', token);
  };

  const handleLogout = () => {
    setBalance(0);
    setTransactionHistory([]);
    sessionStorage.setItem('token', "");
    setToken(null);
  };

  const toggleRegisterPage = () => {
    setIsRegisterPage(!isRegisterPage);
  };

  const handleTransaction = () => {
    setLoading(true);
    axios.post(`/transaction`, {
      recipient: recipientAddress,
      Authorization: `Bearer ${token}`
    })
    .then(response => {
      setLoading(false);
      fetchBalance();
      fetchTransactionHistory();
    })
    .catch(error => {
      setLoading(false);
      setTransactionError(true);
    });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        {token ? (
          <div className="max-w-xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Bitcoin Wallet</h1>
            <div className="mb-4">
              <p className="mb-2">Balance: {balance} BTC</p>
              {transactionHistory.length > 0 && (
                <>
                  <h2 className="text-lg font-semibold mb-2">Transaction History</h2>
                  <div>
                    {transactionHistory.map((transaction, index) => (
                      <div key={index}>{transaction}</div>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="recipientAddress" className="block text-sm font-semibold mb-2">Recipient Address</label>
              <input 
                type="text" 
                id="recipientAddress" 
                value={recipientAddress} 
                onChange={(e) => setRecipientAddress(e.target.value)} 
                className="w-full py-2 px-3 rounded border border-gray-300"
              />
            </div>
            {loading && (
              <div className="flex items-center justify-center mb-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            )}
            {transactionError && (
              <div className="bg-red-100 text-red-700 p-2 mb-4">
                Transaction failed. Please try again later.
              </div>
            )}
            <div className="mt-4 text-center">
              <button onClick={handleTransaction} className="bg-blue-500 text-white px-4 py-2 rounded">Make Transaction</button>
            </div>
            <div className="mt-4 text-center">
              <button onClick={handleLogout} className="bg-gray-500 text-white px-4 py-2 rounded">Logout</button>
            </div>
          </div>
        ) : (
          isRegisterPage ? (
            <Register onRegister={handleLoginOrRegister} />
          ) : (
            <Login onLogin={handleLoginOrRegister} />
          )
        )}
        {!token && (
          <div className="text-center mt-4">
            <button onClick={toggleRegisterPage} className="text-blue-500 hover:underline">
              {isRegisterPage ? "Already have an account? Login here." : "Don't have an account? Register here."}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BitcoinWallet;
