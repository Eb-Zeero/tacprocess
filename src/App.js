import React from 'react';
import PropTypes from "prop-types";
import { Route }  from "react-router-dom";
import { connect } from "react-redux";

import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import StatisticsPage from "./components/pages/StatisticsPage";
import TacReviewPage from "./components/pages/TacReviewPage";
import DocumentationPage from "./components/pages/DocumentationPage";
import AdminPage from "./components/pages/AdminPage";
import UserRoute from "./components/routes/UserRoute";
import GuestRoute from "./components/routes/GuestRoute";
import Navigation from "./components/Navigation";

const App = ({ location, isAuthenticated }) => (
    <div className="ui container">
       {isAuthenticated ? (
        <div>
          <Navigation />
        </div>

      ) : (
        <div>
          <h1 className="login-txt">Please Login</h1>
        </div>

      )}
      <Route location={location} path="/" exact component={HomePage} />
      <GuestRoute location={location} path="/login" exact component={LoginPage} />
      <UserRoute location={location} path="/statistics" exact component={StatisticsPage} />
      <UserRoute location={location} path="/tacreview" exact component={TacReviewPage} />
      <UserRoute location={location} path="/documentation" exact component={DocumentationPage} />
      <UserRoute location={location} path="/admin" exact component={AdminPage} />
    </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

function mapStateToProps() { /* state in params */
  return{
    isAuthenticated: !!localStorage.tacPageJWT
  };
}

export default connect(mapStateToProps,null)(App);
