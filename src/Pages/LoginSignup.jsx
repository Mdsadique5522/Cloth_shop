import React, { useState, useContext } from 'react'
import "../CSS/LoginSignup.css"
import { ShopContext } from '../Context/ShopContext'
import { useNavigate } from 'react-router-dom'

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, signup } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Trim whitespace from inputs
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedName = name.trim();

    try {
      if (isLogin) {
        // Validate login fields
        if (!trimmedEmail || !trimmedPassword) {
          setError('Please fill in all fields');
          setLoading(false);
          return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
          setError('Please enter a valid email address');
          setLoading(false);
          return;
        }

        // Normalize email to lowercase before sending
        await login(trimmedEmail.toLowerCase(), trimmedPassword);
        navigate('/');
      } else {
        // Validate signup fields
        if (!trimmedName || !trimmedEmail || !trimmedPassword) {
          setError('Please fill in all fields');
          setLoading(false);
          return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
          setError('Please enter a valid email address');
          setLoading(false);
          return;
        }

        // Validate password length
        if (trimmedPassword.length < 6) {
          setError('Password must be at least 6 characters');
          setLoading(false);
          return;
        }

        await signup(trimmedName, trimmedEmail.toLowerCase(), trimmedPassword);
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        {error && <div style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
        <form onSubmit={handleSubmit} noValidate>
          <div className='loginsignup-fields'>
            {!isLogin && (
              <input 
                type='text' 
                placeholder='Your Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <input 
              type='email' 
              placeholder='Email Address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="password-input-wrapper">
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button"
                className="password-toggle-btn"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowPassword(!showPassword);
                }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Processing...' : 'Continue'}
            </button>
          </div>
        </form>
        
        <p className="loginsignup-login">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span 
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setName('');
              setEmail('');
              setPassword('');
              setShowPassword(false);
            }}
            style={{cursor: 'pointer', color: '#ff4141', fontWeight: '600'}}
          >
            {isLogin ? 'Sign up here' : 'Login here'}
          </span>
        </p>
        {!isLogin && (
          <div className='loginsignup-agree'>
            <input type='checkbox' name='' id='' required/>
            <p>By continuing, i agree to the terms of use & privacy policy.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default LoginSignup