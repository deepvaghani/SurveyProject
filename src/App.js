import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import SurveyCreator from './SurveyCreator';
import HomePage from './HomePage';
import FindSurvey from './FindSurvey';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import SurveyForm from './SurveyForm';
import ErrorPage from './ErrorPage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [requestedPage, setRequestedPage] = useState(null);

  // Function to handle successful login and set the authentication status
  const handleLogin = () => {
    setIsAuthenticated(true);
    // Redirect the user to the requested page
    if (requestedPage) {
      setRequestedPage(null); // Reset requestedPage state
    }
  };

  // Function to handle logout and reset the authentication status
  const handleLogout = () => {
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
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/create">
                    Create Survey
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sampleform">
                    Sample Form
                  </Link>
                </li>
              </ul>
              <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul className='navbar-nav'>
                  {isAuthenticated ? (
                    <li className="nav-item">
                      <Link className="nav-link" to="/login" onClick={handleLogout}>
                        Logout
                      </Link>
                    </li>
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
                isAuthenticated ? <HomePage /> : <Navigate to="/login" replace state={{ from: '/' }} />
              }
            />
            <Route
              path="/FindSurvey/:surveyId"
              element={isAuthenticated ? (
                <FindSurvey />
              ) : (
                <Navigate
                  to="/login"
                  replace
                  state={{ from: `${window.location.pathname}` }}
                />
              )}
            />
            <Route
              path="/create"
              element={isAuthenticated ? (
                <SurveyCreator />
              ) : (
                <Navigate to="/login" replace state={{ from: '/create' }} />
              )}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
