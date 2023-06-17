import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoginForm = ({ handleLogin }) => {
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is already authenticated
        if (localStorage.getItem('isLoggedIn') === 'true') {
            handleLogin();
            handleRedirect();
        }
    }, [handleLogin]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await axios.post('/api/login', { email, password });
            // Store email ID in a cookie
            // Cookies.set('email', email);
            localStorage.setItem('email', email);
            // Store authentication status in local storage
            localStorage.setItem('isLoggedIn', 'true');
            handleLogin();
            handleRedirect();
            window.email = email;
            console.log(window.email);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRedirect = () => {
        var page = (location.state && location.state.from) || '/';
        navigate(page);
    };

    const handleRedirectToRegister = () => {
        navigate('/register');
    };

    return (
        <div className="login-container" style={{ margin: '20px', marginTop: '80px' }}>
            <h2 className="login-heading">Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group" style={{ margin: '20px' }}>
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group" style={{ margin: '20px' }}>
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary btn-md btn-block"
                    style={{ margin: '20px', marginTop: '2px' }}
                    disabled={isLoading} // Disable the button while loading
                >
                    {isLoading ? <CircularProgress size={20} color="inherit" style={{ marginTop: '6px' }} /> : 'Login'}
                </button>
            </form>
            <p className="register-text" style={{ margin: '20px', marginTop: '2px' }}>
                Don't have an account? <button className="btn btn-link" onClick={handleRedirectToRegister} style={{ marginTop: '-5px' }}>Register</button>
            </p>
        </div>
    );
};

export default LoginForm;
