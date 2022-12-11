import React from "react";
import { TypesToColor} from "../App/Constants";

const Indoor = require('indoorjs')

class TestMap extends React.Component {
    constructor(props) {
        super(props);

        this.mapImg = props.mapImg;
        this.points = props.points;
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

        this.points.forEach(point => {
            const marker = new Indoor.Marker([point.x, point.y], {
                size: 10,
                text: point.name ? point.name: "",
                stroke: TypesToColor[point.type],
                draggable: false,
                zIndex: 100,
                id: point.id
            });
            marker.addTo(this.map);
        });

        this.points.forEach(point => {
            const marker = this.map.getMarkerById(point.id);
            marker.setLinks(point.link.map(el => { return this.map.getMarkerById(el.id); }));
        })
    }

    render() {
        return (
            <>
                <div 
                    ref={el => this._canv = el}
                    className='app-container'
                >
                </div>
            </>
        );
    }
}

export default TestMap;