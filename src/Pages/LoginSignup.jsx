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
  
  const { login, signup } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        // Normalize email to lowercase before sending
        await login(email.toLowerCase().trim(), password);
        navigate('/');
      } else {
        if (!name || !email || !password) {
          setError('Please fill in all fields');
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError('Password must be at least 6 characters');
          setLoading(false);
          return;
        }
        await signup(name, email, password);
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
        <form onSubmit={handleSubmit}>
          <div className='loginsignup-fields'>
            {!isLogin && (
              <input 
                type='text' 
                placeholder='Your Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
              />
            )}
            <input 
              type='email' 
              placeholder='Email Address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input 
              type='password' 
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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