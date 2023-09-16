import React from "react";
import "./not-found.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  const historyBack = () => {
    window.history.back();
  };
  return (
    <div className="container">
      <h1>:{"("}</h1>
      <br />
      <h2>
        A <span>404</span> error occured, Page not found, check the URL and try
        again.
      </h2>
      <br />
      <br />
      <h3>
        <Link to="/">Return to home</Link>&nbsp;|&nbsp;
        <span onClick={historyBack}>Go Back</span>
      </h3>
    </div>
  );
};

export default NotFound;
