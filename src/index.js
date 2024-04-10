import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import phoneFrame from "./images/phoneFrame/phone-frame11.png";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <div className='phoneFrame'>
      <img src={phoneFrame} alt='phoneFrame' />
      <div className='appContent'>
        <App />
      </div>
    </div>
  </BrowserRouter>
);

serviceWorker.unregister();
