import React from "react"
import TestMap from "./TestMap";

class Test extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            background: "",
            points: []
        }

        this.afterMapChange = this.afterMapChange.bind(this);
        this.afterJsonChange = this.afterJsonChange.bind(this);
    }

    afterMapChange(e) {
        if (e.target.files.length !== 0) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => { this.setState({ background: reader.result }); };
        }
    }

    afterJsonChange(e) {
        if (e.target.files.length !== 0) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => { 
                fetch(reader.result)
                    .then((res) => { return res.json(); })
                    .then((data) => this.setState({points: data}));
            };
        }
    }

    render() {
        return (
            <>
                <label>
                    Карта
                    <input type="file" onChange={this.afterMapChange}></input>
                </label>
                <label>
                    Граф
                    <input type="file" onChange={this.afterJsonChange}></input>
                </label>
                
                {
                    this.state.background !== "" && this.state.points.length !== 0
                    ? <TestMap 
                        mapImg={this.state.background} 
                        points={this.state.points} 
                        />
                    : null
                }
            </>
        );
    }
}

export default Test;