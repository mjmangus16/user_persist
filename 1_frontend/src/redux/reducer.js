import {
  SIGNUP_LOADING,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  SIGNIN_LOADING,
  SIGNIN_FAILED,
  SET_CURRENT_USER
} from "./types";

import isEmpty from "../utils/isEmpty";

const initialState = {
  isAuthenticated: false,
  name: "",
  id: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        name: action.payload.name,
        id: action.payload.id
      };
    default:
      return state;
  }
};
