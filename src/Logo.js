import React from "react";

import urlDaBola from "./static/bola.png";
import './style/Logo.css';

const height = "2em";

const Logo = () => (
  <div className="logo">
    <img src={urlDaBola} alt="logo" style={{ height }} />
    <h3 style={{ lineHeight: height, fontSize: height }}>
      <strong>Platzi</strong>Soccer
    </h3>
  </div>
);

export default Logo;