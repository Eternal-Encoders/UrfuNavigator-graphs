import React from "react";
import { NavLink as Link } from "react-router-dom";
import "../css/layout.css";

class Home extends React.Component {
    render() {
        return(
            <ul className="home-links col offset-s5">
                <li>
                    <Link to="/make-graph" className="home-links-item hoverable btn">Создать граф</Link>
                </li>
                <li>
                    <Link to="/make-inst" className="home-links-item hoverable btn">Создать объект института</Link>
                </li>
            </ul>
        );
    }
}

export default Home;