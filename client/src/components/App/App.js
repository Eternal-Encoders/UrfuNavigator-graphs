import React from "react"
import { NavLink as Link } from "react-router-dom";
import GraphMaker from "./GraphMaker"
import "../../css/app.css"

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            background: "",
            points: []
        }

        this.afterFileChange = this.afterFileChange.bind(this);
        this.afterPointsChange = this.afterPointsChange.bind(this);
    }

    afterFileChange(e) {
        if (e.target.files.length !== 0) {
            this.setState({ background: "" });
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => { this.setState({ background: reader.result }); };
        }
    }

    afterPointsChange(e) {
        if (e.target.files.length !== 0) {
            const reader = new FileReader();
            reader.readAsText(e.target.files[0]);
            reader.onload = () => { this.setState({points: JSON.parse(reader.result)}); };
        }
    }

    render() {
        const graphMaker = <GraphMaker 
            ref={el => this.maker = el} 
            mapImg={this.state.background} 
        />;
        const imgInput = <input type="file" onChange={this.afterFileChange} className="file-change"></input>;
        const pointsInput = <input type="file" onChange={this.afterPointsChange} className="file-change"></input>
        if (this.maker) this.maker.addNewPoints(this.state.points);

        return (
            <>
                <div className="file-change__container">
                    {imgInput}
                    {this.state.background !== "" ? pointsInput: null}
                </div>
                <Link to="/" className="to-home hoverable">В начало</Link>
                {this.state.background !== "" ? graphMaker: null}
            </>
        );
    }
}

export default App;