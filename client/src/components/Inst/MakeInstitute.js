import React from "react";
import { NavLink as Link } from "react-router-dom";
import { PointTypes } from "../App/Constants.js";
import "../../css/make_institute.css";

class MakeInstitute extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            florsCount: 4,
            name: ""
        }

        this.flors = [];
        this.stairs = [];

        this.afterFloorChange = this.afterFloorChange.bind(this);
        this.afterChange = this.afterChange.bind(this);
        this.afterLinkClick = this.afterLinkClick.bind(this);
        this.afterNameChange = this.afterNameChange.bind(this);
    }

    afterFloorChange(e) {
        this.setState({ florsCount: Number(e.target.value) });
    }

    afterChange(e) {
        if (e.target.files.length !== 0) {
            const reader = new FileReader();
            reader.readAsText(e.target.files[0]);
            reader.onload = () => {
                const points = JSON.parse(reader.result);
                const id = Number(e.target.dataset.id);
                const index = this.flors.map(el => el.id).indexOf(id);
                if (index !== -1) {
                    this.flors[index].points = points;
                }
                else {
                    this.flors.push({
                        id: id,
                        points: points
                    })
                }
                this.stairs = this.__getAllStairs();
            };
        }
    }

    afterLinkClick(e) {
        e.preventDefault();
        const link = document.createElement("a");
        const newFile = new Blob([JSON.stringify(this.__getJSON())], {
            type: "application/json"
        });
        link.href = URL.createObjectURL(newFile);
        link.download = `${this.state.name}.json`;
        link.click();
    }

    afterNameChange(e) {
        this.setState({ name: e.target.value });
    }

    __getAllStairs() {
        const allStairs = this.flors.map(el => {
            return {
                id: el.id,
                points: el.points.filter(el => el.type === PointTypes.STAIR)
            };
        });
        console.log(allStairs);
        const result = [];
        for (let floorStairs of allStairs) {
            const floor = floorStairs.id;
            for (let stair of floorStairs.points) {
               const index = result.map(el => el.id).indexOf(stair.floorId);
               if (index !== -1) {
                    result[index].stairPoints.push({
                        id: floor,
                        point: stair.id
                    });
               }
               else {
                result.push({
                    id: stair.floorId,
                    stairPoints: [{ 
                        id: floor, 
                        point: stair.id
                    }]
                });
               }
            }
        }
        return result;
    }

    __getFileInputs() {
        const result = []
        for(let i = 0; i < this.state.florsCount; i++) {
            result.push(<>
                <div className="s-1 file-field input-field">
                    <div className="btn">
                        <span>{i}</span>
                        <input type="file" onChange={this.afterChange} data-id={i} accept="application/JSON"/>
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text"/>
                    </div>
                </div>
            </>);
        }
        return result;
    }

    __getJSON() {
        return {
            id: this.state.name,
            flors: this.flors,
            stairs: this.stairs
        }
    }

    render() {
        console.log(this.flors);
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="input-field col offset-s3 s1">
                            <input placeholder="Институт" type="text" value={this.state.name} class="validate" onChange={this.afterNameChange}/>
                            <label for="first_name" className="active">Название</label>
                        </div>
                        <div className="input-field col s1">
                            <input type="number" value={this.state.florsCount} onChange={this.afterFloorChange} min="1" max="15"/>
                            <label htmlFor="first_name" className="active">Количество этажей</label>
                        </div>
                        <div className="col">
                            {this.__getFileInputs()}
                        </div>
                    </div>
                    <button 
                        className='download btn'
                        onClick={this.afterLinkClick}
                    >
                        Скачать граф
                    </button>
                </div>
                <Link to="/" className="to-home hoverable">В начало</Link>
            </>
        );
    }
}

export default MakeInstitute;