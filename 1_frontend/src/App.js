import React from "react";
import logo from "./logo.svg";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./App.css";

import SignIn from "./SignIn.js";
import SignUp from "./SignUp.js";

import { decodeToken } from "./utils/decodeToken";

decodeToken();

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <SignIn />
        {/* <SignUp /> */}
      </Provider>
    </div>
  );
}

export default App;
