import React from "react";
import {BrowserRouter, Route} from "react-router-dom";

import "./style/App.css";
import NavBar from "./NavBar";
import Home from './Home';
import Brasileirao from './Brasileirao';
import LiveMatch from './LiveMatch';

const App = () => (
    <BrowserRouter>
    <>
        <NavBar/>
        <main>
            <Route exact path="/" component={Home}/>
            <Route path="/brasileirao" component={Brasileirao}/>
            <Route path="/ao-vivo" component={LiveMatch}/>
        </main>
    </>
    </BrowserRouter>
)

export default App;