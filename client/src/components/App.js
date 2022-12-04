import React from 'react'
import {PointTypes} from './Constants.js'

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
        const markers = this.map.getMarkers();
        const activeObject = this.map.canvas.getActiveObjects();

        if (activeObject.length === 0) {
            let id = Math.floor(Math.random() * 100)
            this.graphPoints.push({
                id: id,
                type: PointTypes.CORRIDOR
            });

            const marker = new Indoor.Marker([xCoord, yCoord], {
                text: `${id}`,
                draggable: true,
                zIndex: 100,
                id: id
            });
            marker.addTo(this.map);
            if (markers.length !== 0) {
                marker.setLinks([markers[markers.length - 1]]);
            }
        }
        else if (e.ctrlKey) {
            activeObject.forEach(element => {
                this.map.canvas.remove(element);

                element.parent.connectors.forEach(elem => {
                    console.log(elem)
                    this.map.canvas.remove(elem.shape);
                });
                this.__getConnectors().forEach(connector => {
                    if (connector.parent.end.id === element.id) {
                        this.map.canvas.remove(connector);
                    }
                })

                this.graphPoints.splice(this.__getGraphPointIndex(element.id), 1);
            });
        }
    }

    __getGraphPointIndex(id) {
        const idIndexes = this.graphPoints.map((el) => {return el.id});
        return idIndexes.indexOf(id);
    }

    __getConnectors() {
        return this.map.canvas._objects.filter(obj => {return obj.class === "line"});
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