import React from "react";

import "./style/HomeContentCard.css";

const HomeContentCard = ({ title, text }) => (
  <div className="home-content-card">
    <h3>{title}</h3>
    <p>{text}</p>
  </div>
);
export default HomeContentCard;