import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import * as serviceWorker from "./serviceWorker";
import GoogleOauth from "./util/googleOauth";
GoogleOauth.bindToGlobal();

if (window.location.protocol === 'http:' && window.location.hostname !== "localhost" && !window.location.hostname.match(/192\.168\./)) {
  window.location.href =
    window.location.href.replace(
      'http:', 'https:');
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA 
serviceWorker.register();
