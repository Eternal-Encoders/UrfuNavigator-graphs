import "../css/canvas.css"
import React from "react"
import Map from "./BackMap"
import Point from "./GraphPoint"


class Canvas extends React.Component {
    constructor() {
        super();
        this.coords = [];
        this.afterClick = this.afterClick.bind(this);
    }

    render() {
        let childrens = this.coords.map(el => 
            <Point 
                key={el.key} 
                id={el.id}
                x={el.x} 
                y={el.y}
            />
            )

        console.log(childrens)

        return (
            <div 
                className="canvas" 
                onClick={this.afterClick}
            >
                <div>
                    {childrens}
                </div>
                <Map />
            </div>
        )
    }
                
    afterClick(e) {
        if (e.target.className === "graph-point" ) {
            if (e.ctrlKey) {
                this.removePoint(e);
            }
            else {
                console.log(this)
            }
        }
        else {
            let key = e.clientX + e.clientY
            const pointToPush = new Point({
                key:key, 
                id:key, 
                x:e.clientX - 10, 
                y:e.clientY - 10});
            /*const pointToPush = <Point
                key={key}
                id={key}
                x={e.clientX - 10} 
                y={e.clientY - 10}
                pointType={PointTypes.CORRIDOR}
            />*/

            this.coords.push(pointToPush);
            this.forceUpdate();
        }
        console.log(this.coords);
        this.forceUpdate()
    }

    removePoint(point) {
        const index = this._getIndex(point);
        console.log(index);
        this.coords.splice(index, 1);
    }

    _getIndex(point) {
        let temp = [...this.coords].map(el => el.props.id);
        console.log(temp)
        let g = parseInt(point.target.id, 10);
        console.log(g);
        let b = temp.indexOf(g);
        return b;
    }
}

export default Canvas
