import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const length = localStorage.length;
    let token = null;
    for(let i = 0; i < length; i++){
      const key = localStorage.key(i);
      try {
        const decryptKey = cryptr.decrypt(key);
        if (decryptKey === "token"){
          token = localStorage.getItem(key);
        }
      }catch{

      }
      
    }

  return (
    <Route
      {...rest}
      render={props => {
        if (token) {
          return <Component {...props} />;
        } else {
          // redirect to login
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default PrivateRoute;
