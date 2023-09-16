import React from "react";
import { Detector } from "react-detect-offline";
import vectorImage from "../../images/No connection-bro.png"
import "./check-connection.css"

const CheckConnection = (props) => {
  return (
    <>
      <Detector
        render={({ online }) => (online ? props.children :
        <div className="no-internet">
            <div>
                <img src={vectorImage} alt="No Internet" />
                <h1>Internet connection failed</h1>
                <h3>No internet connection available. Please check the connection.</h3>
                <button onClick={() => window.location.reload()}>Try again</button>
            </div>
        </div>)}
      />
    </>
  );
};

export default CheckConnection;
