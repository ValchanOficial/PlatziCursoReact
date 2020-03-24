import React from "react";
import "./style/Home.css";

import Logo from "./Logo";
import HomeContentCard from "./HomeContentCard";

const Home = () => (
    <div className="home">
        <div className="home-image">
            <div className="home-logo">
                <Logo/>
            </div>
        </div>
        <div className="home-content-grid">
            <HomeContentCard
                title="Torça pelo seu time"
                text="Veja os resultados do seu time favorito"
            />
            <HomeContentCard
                title="Torça pelo seu time"
                text="Veja os resultados do seu time favorito"
            />
            <HomeContentCard
                title="Torça pelo seu time"
                text="Veja os resultados do seu time favorito"
            />
        </div>
    </div>
);

export default Home;