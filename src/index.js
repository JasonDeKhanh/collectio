import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import App from "./App";

import { firebase } from "@firebase/app";
import { config } from "./config/firebase";

import { BrowserRouter } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";

import { FirebaseAuthProvider } from "@react-firebase/auth";

import "@firebase/auth";
import "@firebase/firestore";

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FirebaseAuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
