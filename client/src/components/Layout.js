import React from "react";
import { NavLink as Link } from "react-router-dom";

class Home extends React.Component {
    render() {
        return(
            <nav>
                <ul>
                    <li>
                        <Link to="/make-graph">Создать граф</Link>
                    </li>
                    <li>
                        <Link to="/test-graph">Протестировать граф</Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Home;