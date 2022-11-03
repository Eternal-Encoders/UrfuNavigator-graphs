import React from "react";
import "../css/graphPoint.css"

export default class Point extends React.Component {
    constructor(props) {
        super(props)
        this.id = props.id;
        this.x = props.x;
        this.y = props.y;
        this.pointType = props.pointType; 
    };

    render() {
        let left = this.x + "px";
        let top = this.y + "px";
        return (
            <div
                id={this.id}
                className="graph-point" 
                key={this.key} 
                style={{left: left, top: top}}>
            </div>
        )
    }

    setType() { 
        return "1";
    }
}