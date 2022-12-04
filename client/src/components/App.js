import React from 'react'

const Indoor = require('indoorjs')

class App extends React.Component {
    constructor(props) {
        super(props)
        this.mapImg = props.mapImg
        this.map = undefined;
        this.graphPoints = [];
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
        });
    }

    afterClick(e) {
        const xCoord = (e.clientX - 10 + this.map.originX) / this.map.zoom + this.map.center.x;
        const yCoord = (e.clientY - 10 + this.map.originY) / this.map.zoom - this.map.center.y;

        if (!(this.map.getMarkers().some((element) => {
            return Math.abs(element.position.x * this.map.zoom - xCoord * this.map.zoom) <= 21 && 
                Math.abs(element.position.y * this.map.zoom - yCoord * this.map.zoom) <= 21;
        }))) {
            let id = Math.floor(Math.random() * 100)
            this.graphPoints.push({
                id: id
            });

            const marker = new Indoor.Marker([xCoord, yCoord], {
                text: `${id}`,
                draggable: true,
                zIndex: 100,
                id: id
            });
            marker.addTo(this.map);
        }
        else if (e.ctrlKey) {
            this.map.canvas.getActiveObjects().forEach(element => {
                this.map.canvas.remove(element);
                this.graphPoints.splice(this.__getGraphPointIndex(element.id), 1);
            });
        }
    }

    __getGraphPointIndex(id) {
        const idIndexes = this.graphPoints.map((el) => {return el.id});
        return idIndexes.indexOf(id);
    }

    render() {
        return (
            <div 
                ref={(el) => this._canv = el}
                onClick={this.afterClick}
            >
            </div>
        );
    }
}

export default App