import React from 'react'

const Indoor = require('indoorjs')

class App extends React.Component {
    constructor(props) {
        super(props)
        this.mapImg = props.mapImg
        this.map = undefined;
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
              y: 0,
              zoom: 10
            }
        })
    }

    render() {
        return (
            <div ref={(el) => this._canv = el}>
            </div>
        )
    }
}

export default App