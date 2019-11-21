import axios from "axios";
import jwt_decode from "jwt-decode";
import { setCurrentUser } from "../redux/actions";

import store from "../redux/store";

export const decodeToken = () => {
  // Check for token
  if (localStorage.token) {
    // Set auth token header auth
    setAuthToken(localStorage.token);

    // Decode token and get user info and expiration
    const decoded = jwt_decode(localStorage.token);

    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      localStorage.removeItem("token");

      // Remove auth header for future requests
      setAuthToken(false);

      // Set current user to {} which will set isAuthenticated to false
      store.dispatch(setCurrentUser({}));
      return false;
    } else {
      return true;
    }
  }
};

export const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};
