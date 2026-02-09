import React, { useState } from 'react';

export default function AuthApp() {
  const [isLogin, setIsLogin] = useState(true);
  const [users, setUsers] = useState([
    { email: 'admin@example.com', password: 'admin123', name: 'Admin User' },
    { email: 'john@example.com', password: 'john123', name: 'John Doe' },
    { email: 'jane@example.com', password: 'jane123', name: 'Jane Smith' }
  ]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(
      u => u.email === formData.email && u.password === formData.password
    );

    if (user) {
      setLoggedInUser(user);
      setMessage({ text: `Welcome back, ${user.name}!`, type: 'success' });
      setFormData({ name: '', email: '', password: '' });
    } else {
      setMessage({ text: 'Invalid email or password', type: 'error' });
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      setMessage({ text: 'Please fill in all fields', type: 'error' });
      return;
    }

    const existingUser = users.find(u => u.email === formData.email);
    
    if (existingUser) {
      setMessage({ text: 'Email already registered', type: 'error' });
      return;
    }

    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password
    };

    setUsers([...users, newUser]);
    setMessage({ text: 'Account created successfully! You can now login.', type: 'success' });
    setFormData({ name: '', email: '', password: '' });
    setIsLogin(true);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setMessage({ text: 'Logged out successfully', type: 'success' });
  };

  if (loggedInUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Dashboard</h2>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800 font-semibold">Welcome, {loggedInUser.name}!</p>
            <p className="text-green-700 text-sm mt-1">{loggedInUser.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        {message.text && (
          <div className={`mb-4 p-3 rounded-lg ${
            message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={isLogin ? handleLogin : handleSignup}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-200 mb-4"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage({ text: '', type: '' });
              setFormData({ name: '', email: '', password: '' });
            }}
            className="text-blue-500 hover:text-blue-600 font-semibold"
          >
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
          </button>
        </div>

        {isLogin && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 font-semibold mb-2">Test Credentials:</p>
            <p className="text-xs text-gray-500">admin@example.com / admin123</p>
            <p className="text-xs text-gray-500">john@example.com / john123</p>
            <p className="text-xs text-gray-500">jane@example.com / jane123</p>
          </div>
        )}
      </div>
    </div>
  );
}