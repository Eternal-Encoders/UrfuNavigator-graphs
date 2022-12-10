import React from 'react';
import {PointTypes, TypesToColor} from './Constants.js';
import Menu from './Menu';
import '../css/graphMaker.css';

const Indoor = require('indoorjs')
const Uuidv = require("uuid")

class GraphMaker extends React.Component {
    constructor(props) {
        super(props)
        this.mapImg = props.mapImg;
        this.map = undefined;
        this.activeObject = [];
        this.graphPoints = [];
        this.afterClick = this.afterClick.bind(this);
        this.afterKeyPress = this.afterKeyPress.bind(this);
        this.afterLinkClick = this.afterLinkClick.bind(this);
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
        const xCoord = (e.clientX - 6 + this.map.originX) / this.map.zoom + this.map.center.x;
        const yCoord = (e.clientY - 6 + this.map.originY) / this.map.zoom - this.map.center.y;
        const markers = this.map.getMarkers();
        const activeObject = this.map.canvas.getActiveObjects();

        if (activeObject.length === 0) {
            let id = Uuidv.v4();
            this.graphPoints.push({
                id: id,
                type: PointTypes.CORRIDOR
            });

            const marker = new Indoor.Marker([xCoord, yCoord], {
                size: 6,
                stroke: TypesToColor[PointTypes.CORRIDOR],
                draggable: true,
                zIndex: 100,
                id: id
            });
            marker.addTo(this.map);
            if (this.activeObject.length === 0 && markers.length !== 0) {
                marker.setLinks([markers[markers.length - 1]]);
            }
            else if (this.activeObject.length !== 0) {
                const activeMarkers = this.activeObject.map(obj => {
                    return this.map.getMarkerById(obj.id);
                });
                marker.setLinks(activeMarkers);
            }
        }
        else if (this.activeObject.length !== 0 && e.ctrlKey) {
            if (activeObject[0].parent.connectors.length === 0) {
                activeObject[0].parent.setLinks(this.activeObject.map(obj => { return obj.parent; }));
            }
            else {
                this.activeObject[0].parent.setLinks(activeObject.map(obj => { return obj.parent; }));
            }
        }
        else {
            this._menu.setMarkers(activeObject);
        }

        this.activeObject = activeObject;
    }

    afterKeyPress(e) {
        if (e.keyCode === 46) {
            this.map.canvas.getActiveObjects().forEach(element => {
                element.parent.connectors.forEach(elem => {
                    this.map.canvas.remove(elem.shape);
                });
                this.__getByClass("line").forEach(connector => {
                    if (connector.parent.end.id === element.id || connector.parent.start.id === element.id) {
                        this.map.canvas.remove(connector);
                    }
                })
                this.__getByClass("marker").forEach(marker => {
                    marker.parent.connectors = marker.parent.connectors.filter(con => { 
                        return !(con.end.id === element.id || con.start.id === element.id);
                    });
                    marker.parent.links = marker.parent.links.filter(link => { return link.id !== element.id; });
                })

                this.map.canvas.remove(element);
                this.graphPoints.splice(this.__getGraphPointIndex(element.id), 1);
            });
            this.activeObject = [];
        }
        e.preventDefault();
    }

    afterLinkClick(e) {
        e.preventDefault();
        const link = document.createElement("a");
        const newFile = new Blob([JSON.stringify(this.__getGraphJSON())], {
            type: "application/json"
        });
        link.href = URL.createObjectURL(newFile);
        link.download = `${Uuidv.v4()}.json`;
        link.click();
    }

    __getGraphJSON() {
        return this.graphPoints.map(el => {
            const marker = this.map.getMarkerById(el.id);
            return {
                id: el.id,
                type: el.type,
                name: el.name,
                x: marker.position.x,
                y: marker.position.y,
                link: marker.links.map(link => { return {
                    id: link.id, 
                    length: this.__calcLength(marker.position, link.position)
                }})
            };
        });
    }

    __calcLength(point1, point2) {
        return Math.pow(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2), 0.5);
    }

    __getGraphPointIndex(id) {
        const idIndexes = this.graphPoints.map((el) => {return el.id});
        return idIndexes.indexOf(id);
    }

    __getByClass(nameOfClass) {
        return this.map.canvas._objects.filter(obj => {return obj.class === nameOfClass});
    }

    render() {
        return (
            <>
                <Menu 
                    ref={el => this._menu = el} 
                    points={this.graphPoints}
                />
                <button 
                    className='download'
                    onClick={this.afterLinkClick}
                >
                    Скачать граф
                </button>
                <div 
                    ref={el => this._canv = el}
                    onClick={this.afterClick}
                    onKeyDown={this.afterKeyPress}
                    tabIndex="0"
                    className='app-container'
                >
                </div>
            </>
        );
    }
}

export default GraphMaker