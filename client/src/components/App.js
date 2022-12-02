import React from 'react'
import Point from "./GraphPoint"

const Indoor = require('indoorjs')

class App extends React.Component {
    constructor(props) {
        super(props)
        this.mapImg = props.mapImg
        this.map = undefined;
        this.coords = [];
        this.afterClick = this.afterClick.bind(this);
    }

    componentDidMount() {
        this.map = new Indoor.Map(this._canv, {
            floorplan: new Indoor.Floor({
              url: this.mapImg,
              width: this.mapImg.width,
              height: this.mapImg.height * 2,
              opacity: 0.8,
              zIndex: 1
            }),
            height: window.innerHeight,
            minZoom: 0.1,
            maxZoom: 100,
            center: {
              x: 0,
              y: 0
            }
        })
    }

    afterClick(e) {
        const xCoord = (e.clientX - 10 + this.map.originX) / this.map.zoom + this.map.center.x
        const yCoord = (e.clientY - 10 + this.map.originY) / this.map.zoom - this.map.center.y
        let key = e.clientX + e.clientY
        const pointToPush = new Point({
            key: key, 
            id: key, 
            x: xCoord, 
            y: yCoord
        });
        this.coords.push(pointToPush);

        const marker = new Indoor.Marker([xCoord, yCoord], {
            text: `${this.coords.length}`,
            draggable: true,
            zIndex: 100,
            id: pointToPush.id
        });
        marker.addTo(this.map)
        console.log(this.map)
    }

    render() {
        return (
            <div 
                ref={(el) => this._canv = el}
                onClick={this.afterClick}
            >
            </div>
        )
    }
}

export default App