import React from 'react';
import ReactDOM from 'react-dom/client';
import "react-toastify/dist/ReactToastify.css";
import App from './App';
import store from './redux/store';
import { Provider } from "react-redux"
import { ToastContainer } from 'react-toastify';
import "./sweetalert-dark.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    <ToastContainer theme="dark" style={{ textTransform: "capitalize" }} />
  </React.StrictMode>
);
