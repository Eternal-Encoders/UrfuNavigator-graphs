import React from "react"
import { NavLink as Link } from "react-router-dom";
import GraphMaker from "./GraphMaker"
import "../../css/app.css"

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            background: ""
        }

        this.afterFileChange = this.afterFileChange.bind(this);
    }

    afterFileChange(e) {
        if (e.target.files.length !== 0) {
            this.setState({ background: "" });
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => { this.setState({ background: reader.result }); };
        }
    }

    render() {
        const graphMaker = this.state.background !== "" 
            ? <GraphMaker 
                ref={el => this.maker = el} 
                mapImg={this.state.background}
            /> 
            : null

        return (
            <>
                <input type="file" onChange={this.afterFileChange} className="file-change"></input>
                <Link to="/" className="to-home hoverable">В начало</Link>
                {graphMaker}
            </>
        );
    }
}

export default App;