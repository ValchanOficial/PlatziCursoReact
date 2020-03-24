import React from "react";
import {useMediaQuery} from 'react-responsive';
import {Link} from 'react-router-dom';

import "./style/NavBar.css";

const links = [
    {
        to: '/',
        text: 'Home'
    },
    {
        to: '/brasileirao',
        text: 'Brasileirão 2019'
    },
    {
        to: '/ao-vivo',
        text: 'Espanha X Suíça AO VIVO'
    },
]

const NavBar = () => {
    const isBigEnough = useMediaQuery({query: "(min-width: 575px)"});
    
    const [open, setOpen] = React.useState();

    const appLinks = links.map(link => (
        <Link key={link.to} to={link.to} className="nav-link">
            {link.text}
        </Link>
    ));

    return (
        <nav className="nav-bar">
            {isBigEnough ? (
                <div className="nav-big">
                    {appLinks}
                </div>
            ): (
            <div className="nav-small">
                <button 
                    className="nav-small__button" 
                    onClick={() => setOpen(state => !state)}
                    style={{
                        borderBottom: `1px solid ${open ? "$FFF" : "transparent"}`
                    }}
                >
                MENU   
                </button>
                <div className="nav-small__links" style={{ display: open ? 'block' : 'none' }}>
                    {appLinks}
                </div>
            </div>  
            )}
        </nav>
    );
}

export default NavBar;