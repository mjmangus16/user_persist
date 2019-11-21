import jwt_decode from "jwt-decode";
import {
  SIGNUP_LOADING,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  SIGNIN_LOADING,
  SIGNIN_FAILED,
  SET_CURRENT_USER,
  CLEAR_LEAGUES,
  CLEAR_PROFILE,
  CLEAR_LEAGUE_DATA
} from "./types";

import { axiosWithAuth } from "../utils/axiosWithAuth";
import { setAuthToken } from "../utils/decodeToken";

export const signup = (newUser, redirect, addCrumb) => dispatch => {
  dispatch({
    type: SIGNUP_LOADING
  });
  axiosWithAuth()
    .post("/api/users/signup", newUser)
    .then(res => {
      redirect();
      addCrumb();
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data.message
      });
    })
    .catch(err => {
      dispatch({
        type: SIGNUP_FAILED,
        payload: err.response.data
      });
    });
};

export const signin = user => dispatch => {
  axiosWithAuth()
    .post("/api/users/signin", user)
    .then(res => {
      console.log(res.data);

      const { token } = res.data;
      localStorage.setItem("token", token);
      setAuthToken(token);

      const decoded = jwt_decode(token);

      console.log(decoded);

      dispatch(setCurrentUser(decoded));
    })
    .catch(err => console.log(err));
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
