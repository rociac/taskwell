import React from 'react';
import { Redirect, Route } from 'react-router';

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
}

export default PrivateRoute;