import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginError(false);
    let accessToken = "";
    let clientId = "";

    if (username.trim() !== '' && password.trim() !== '') {
      setLoading(true);
      axios.post(`/api/v1/login`, {
        username,
        password
      })
      .then(response => {
        clientId = response.data.client;
        accessToken = response.data.accessToken;

        axios.post(`/api/v1/wallet/init`, {}, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then(() => {
          setLoading(false);
          onLogin(accessToken, clientId);
        })
        .catch(error => {
          setLoading(false);
          setLoginError(true);
        });
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
    <div className="max-w-4xl mx-auto p-4 h-full flex flex-col justify-center">
      <h1 className="text-2xl font-bold mb-4 text-center">Bitcoin Wallet</h1>
      <h1 className="text-xl font-bold mb-4 text-center">Login</h1>
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
        {loading && (
          <div className="flex items-center justify-center mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )}
      </form>
    </div>
  );
}

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registrationError, setRegistrationError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successfulRegistration, setSuccessfulRegistration] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setRegistrationError(false);
    if (username.trim() !== '' && password.trim() !== '' && password === confirmPassword) {
      setLoading(true);
      const json =
      {
        "username": username,
        "password": password,
        "email": "test@test.com",
        "name": name,
        "lastname": lastname,
        "roles": [
          "ROLE_DEFAULT"
        ]
      }
      axios.post(`/api/v1/register`, json)
      .then(response => {
        setLoading(false);
        setSuccessfulRegistration(true);
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
    <div className="max-w-4xl mx-auto p-4 h-full flex flex-col justify-center">
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
          <label htmlFor="name" className="block text-sm font-semibold mb-2">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full py-2 px-3 rounded border border-gray-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastname" className="block text-sm font-semibold mb-2">Lastname</label>
          <input
            type="text"
            id="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
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
        {successfulRegistration && (
          <div className="bg-green-100 text-green-700 p-2 mb-4 text-center">
            Account registered!
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
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [accessToken, setAccessToken] = useState(sessionStorage.getItem('accessToken'));
  const [successfulTransaction, setSuccessfulTransaction] = useState(false);
  const [clientId, setClientId] = useState("");
  const [walletAddress, setWalletAddress] = useState('');
  const [transactionAmountError, setTransactionAmountError] = useState(false);
  const [users, setUsers] = useState([]);
  const [initFinished, setInitFinished] = useState(false);

  const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

  async function init() {
    await sleep(2000);
    fetchWalletInfo();
    fetchTransactionHistory();
    fetchUsers();
    setInitFinished(true);
  }

  useEffect(() => {
    if (accessToken) {
      init();
    }
  }, [accessToken]);

  const fetchWalletInfo = () => {
    axios.get(`/api/v1/wallet/info`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => {
        setBalance(response.data.bitcoins);
        setWalletAddress(response.data.address);
      })
      .catch(error => {
        console.error('Error fetching wallet info:', error);
      });
  }

  const fetchTransactionHistory = () => {
    axios.get(`/api/v1/wallet/transactions`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => {
        setTransactionHistory(response.data);
      })
      .catch(error => {
        console.error('Error fetching transaction history:', error);
      });
  };

  const fetchUsers = () => {
    axios.get(`/api/v1/users`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }

  const handleLogin = (accessToken, clientId, walletAddress) => {
    setAccessToken(accessToken);
    setClientId(clientId);
    setWalletAddress(walletAddress);
    sessionStorage.setItem('accessToken', accessToken);
  };

  const handleLogout = () => {
    setBalance(0);
    setTransactionHistory([]);
    sessionStorage.setItem('accessToken', "");
    setAccessToken(null);
    setWalletAddress('');
    setRecipientAddress("");
    setTransactionAmount("");
    setTransactionAmountError(false);
    setTransactionError(false);
    setSuccessfulTransaction(false);
    setInitFinished(false);
  };

  const toggleRegisterPage = () => {
    setIsRegisterPage(!isRegisterPage);
  };

  const handleTransaction = () => {
    let bal = parseFloat(balance.replace(" BTC", ""))
    setTransactionAmountError(false);
    setTransactionError(false);

    if (isNaN(parseFloat(transactionAmount)) || parseFloat(transactionAmount) <= 0 || parseFloat(transactionAmount) > bal) {
      setTransactionAmountError(true);
      return;
    }

    setLoading(true);

    const requestBody =
    {
      "to": recipientAddress,
      "value": parseFloat(transactionAmount),
    }

    axios.post(`/api/v1/wallet/send`, requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      }
    ).then(response => {
      setLoading(false);
      setSuccessfulTransaction(true);
      setTransactionAmount("");
      setRecipientAddress("");
      fetchWalletInfo();
      fetchTransactionHistory();
    })
    .catch(error => {
      setLoading(false);
      setTransactionError(true);
    });
  };

  const returnDate = (transactionDate) => {
    let date = new Date(transactionDate);
    let formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return formattedDate;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        {accessToken ? (
          initFinished ? (
            <div className="max-w-4xl mx-auto p-4">
              <h1 className="text-2xl font-bold mb-4 text-center">Bitcoin Wallet</h1>
              <div className="mb-4">
                <p className="mb-2">Balance: {balance}</p>
                <p className="mb-2">Wallet Address: {walletAddress}</p>
                {transactionHistory.length > 0 && (
                  <>
                    <h2 className="text-lg font-semibold mb-2">Transaction History</h2>
                    <div className="overflow-y-auto max-h-80">
                      {transactionHistory.map((transaction, index) => (
                        <div key={index} className="border rounded-md p-4 mb-2">
                          <p className="font-semibold">Transaction ID: {transaction.id}</p>
                          <div className="flex justify-between mt-2">
                            <div className="mr-6">
                              <p className="font-semibold">From:</p>
                              <p>Address: {transaction.from.address}  </p>
                            </div>
                            <div>
                              <p className="font-semibold">To:</p>
                              <p>Address: {transaction.to.address}</p>
                            </div>
                          </div>
                          <p className="mt-2">Fee: {transaction.fee}</p>
                          <p>Amount: {transaction.amount}</p>
                          <p>Date: {returnDate(transaction.date)}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )
                }
              </div>
              <div className="mb-4">
                <label htmlFor="recipientAddress" className="block text-sm font-semibold mb-2">Recipient Address</label>
                <select
                  id="recipientAddress"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  className="w-full py-2 px-3 rounded border border-gray-300"
                >
                  <option value="">Select a user</option>
                  {users.map((user, index) => (
                    <option key={index} value={user.address}>{user.name + " " + user.lastname + `, Wallet address: ${user.address}`}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="transactionAmount" className="block text-sm font-semibold mb-2">Transaction Amount (BTC)</label>
                <input
                  type="number"
                  id="transactionAmount"
                  value={transactionAmount}
                  onChange={(e) => setTransactionAmount(e.target.value)}
                  className="w-full py-2 px-3 rounded border border-gray-300"
                />
              </div>
              {transactionAmountError && (
                <div className="bg-red-100 text-red-700 p-2 mb-4">
                  Please enter a valid amount
                </div>
              )}
              {loading && (
                <div className="flex items-center justify-center mb-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              )}
              {transactionError && (
                <div className="bg-red-100 text-red-700 p-2 mb-4 text-center">
                  Transaction failed.
                </div>
              )}
              {successfulTransaction && (
                <div className="bg-green-100 text-green-700 p-2 mb-4">
                  {"Transaction done!"}
                </div>
              )}
              <div className="mt-4 text-center">
                <button onClick={handleTransaction} className="bg-blue-500 text-white px-4 py-2 rounded">Make Transaction</button>
              </div>
              <div className="mt-4 text-center">
                <button onClick={handleLogout} className="bg-gray-500 text-white px-4 py-2 rounded">Logout</button>
              </div>
            </div>
          )
          :
          (
            <div className="flex items-center justify-center mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          )
        ) : (
          isRegisterPage ? (
            <Register />
          ) : (
            <Login onLogin={handleLogin} />
          )
        )}
        {!accessToken && (
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
