import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink, Navigate } from 'react-router-dom';
import SurveyCreator from './SurveyCreator';
import HomePage from './HomePage';
import FindSurvey from './FindSurvey';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import SurveyForm from './SurveyForm';
import ErrorPage from './ErrorPage';
import SurveyStatistics from './SurveyStatistics';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [requestedPage, setRequestedPage] = useState(null);
  const userEmail = Cookies.get('email');

  useEffect(() => {
    // Check for authentication status in browser cookies on component mount
    const storedAuthStatus = document.cookie.includes('isAuthenticated=true');
    if (storedAuthStatus) {
      setIsAuthenticated(true);
    }
  }, []);

  // Function to handle successful login and set the authentication status
  const handleLogin = () => {
    setIsAuthenticated(true);
    // Store the authentication status in browser cookies
    document.cookie = 'isAuthenticated=true; path=/';
    // Redirect the user to the requested page
    if (requestedPage) {
      setRequestedPage(null); // Reset requestedPage state
    }
  };

  // Function to handle logout and reset the authentication status
  const handleLogout = () => {
    Cookies.remove('email');
    localStorage.removeItem('isLoggedIn');
    setIsAuthenticated(false);
  };


  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Tech Insights
            </Link>
            <div className="collapse navbar-collapse justify-content-start" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className="nav-link" exact to="/" activeClassName="active">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/create" activeClassName="active">
                    Create Survey
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/sampleform" activeClassName="active">
                    Sample Form
                  </NavLink>
                </li>
              </ul>
              <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul className="navbar-nav">
                  {isAuthenticated ? (
                    <>
                      <li className="nav-item">
                        <span className="nav-link" style={{ color: "black" }}>{"Welcome, " + userEmail}</span>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/login" onClick={handleLogout}>
                          <FontAwesomeIcon icon={faSignOutAlt} />
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="nav-item">
                        <Link className="nav-link" to="/login">
                          Login
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/register">
                          Register
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </nav>

        <div className="container mt-4">
          <Routes>
            <Route
              path="/login"
              element={<LoginForm handleLogin={handleLogin} setRequestedPage={setRequestedPage} />}
            />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/sampleform" element={<SurveyForm />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <HomePage />
                ) : (
                  <Navigate to="/login" replace state={{ from: '/' }} />
                )
              }
            />
            <Route
              path="/FindSurvey/:surveyId"
              element={
                isAuthenticated ? (
                  <FindSurvey />
                ) : (
                  <Navigate
                    to="/login"
                    replace
                    state={{ from: `${window.location.pathname}` }}
                  />
                )
              }
            />
            <Route
              path="/SurveyReport/:surveyId"
              element={
                isAuthenticated ? (
                  <SurveyStatistics />
                ) : (
                  <Navigate
                    to="/login"
                    replace
                    state={{ from: `${window.location.pathname}` }}
                  />
                )
              }
            />
            <Route
              path="/create"
              element={
                isAuthenticated ? (
                  <SurveyCreator />
                ) : (
                  <Navigate to="/login" replace state={{ from: '/create' }} />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
