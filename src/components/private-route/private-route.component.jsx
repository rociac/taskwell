import React from 'react';
import { Redirect, Route } from 'react-router';
import PropTypes from 'prop-types';

const PrivateRoute = ({component: Component, isLoggedIn, ...rest}) => {
  if (isLoggedIn) {
    return (
      <Route 
        {...rest} 
        render={(props) => (
          <Component {...props} />
        )}
      />
    )
  }

  return (
    <Route 
      {...rest}
      render={(props) => (
        <Redirect to="/signin" />
      )}
    />
  )
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

export default PrivateRoute;