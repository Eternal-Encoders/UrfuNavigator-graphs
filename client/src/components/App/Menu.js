import React from "react";
import {PointTypes, TypesToColor} from "./Constants";
import "../../css/menu.css";

class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.markers = undefined;
        this.points = props.points;
        this.isRendered = props.isRendered;
        this.state = {
            selectionValue: PointTypes.CORRIDOR,
            nameValue: "",
            floorId: "",
            exitId: ""
        };

        this.afterChangeSelect = this.afterChangeSelect.bind(this);
        this.afterNameChange = this.afterNameChange.bind(this);
        this.afterFloorChange = this.afterFloorChange.bind(this);
        this.afterExitChange = this.afterExitChange.bind(this);
    }

    afterChangeSelect(e) {
        this.setState({ selectionValue: e.target.value });
        this.markers.forEach(element => {
            element.parent.setStroke(TypesToColor[e.target.value]);
            this.__getById(element.id).type = e.target.value;
        });
        this.forceUpdate();
    }

    afterNameChange(e) {
        this.setState({ nameValue: e.target.value });
        this.markers.forEach(element => {
            this.__getById(element.id).name = e.target.value;
        });
    }

    afterFloorChange(e) {
        this.setState({ floorId: e.target.value });
        this.markers.forEach(element => {
            this.__getById(element.id).floorId = e.target.value;
        });
    }

    afterExitChange(e) {
        this.setState({ exitId: e.target.value });
        this.markers.forEach(element => {
            this.__getById(element.id).exitId = e.target.value;
        });
    }

    setMarkers(markers) {
        this.markers = markers;
        const marker = this.__getById(markers[0].id);
        this.setState({ 
            selectionValue: marker.type,
            nameValue: marker.name ? marker.name: "",
            floorId: marker.floorId ? marker.floorId: "",
            exitId: marker.exitId ? marker.exitId: ""
        });
    }

    setIsRendered(bool) {
        this.isRendered = bool;
    }

    __getById(id) {
        return this.points.filter(e => e.id === id)[0];
    }

    render() {
        const selectType = <>
            <label className="form-label" htmlFor="select">Тип точки</label>
            <select
                id="select"
                className="form-input browser-default"
                value={this.state.selectionValue}
                onChange={this.afterChangeSelect}
            >
                <option value={PointTypes.AUDITORIUM}>Аудитория</option>
                <option value={PointTypes.INSTITUTE}>Институт</option>
                <option value={PointTypes.CAFE}>Кафе/столовая</option>
                <option value={PointTypes.OTHER}>Прочие точки</option>
                <option value={PointTypes.CORRIDOR}>Коридор</option>
                <option value={PointTypes.STAIR}>Лестница</option>
                <option value={PointTypes.EXIT}>Выход/Вход</option>
            </select>
        </>;
        const typeName = <>
            <label className="form-label" htmlFor="name">Имя точки</label>
            <input
                id="name"
                className="form-input" 
                type="text"
                placeholder="Введите имя точки"
                value={this.state.nameValue}
                onChange={this.afterNameChange}
            ></input>
        </>;
        const floorId = <>
            <label className="form-label" htmlFor="floor">Название лестницы</label>
            <input
                id="floor"
                className="form-input" 
                type="text"
                placeholder="Введите название лестницы"
                value={this.state.floorId}
                onChange={this.afterFloorChange}
            ></input>
        </>;
        const exitId = <>
            <label className="form-label" htmlFor="exit">Название выхода/входа</label>
            <input
                id="exit"
                className="form-input" 
                type="text"
                placeholder="Введите название входа"
                value={this.state.exitId}
                onChange={this.afterExitChange}
            ></input>
        </>;

        const isName = (this.state.selectionValue === PointTypes.AUDITORIUM) ||
            (this.state.selectionValue === PointTypes.CAFE) ||
            (this.state.selectionValue === PointTypes.INSTITUTE) ||
            (this.state.selectionValue === PointTypes.OTHER);

        return (
            <div className={`menu-form ${this.isRendered ? "": "display-none"} `}>
                {selectType}
                {isName ? typeName : null}
                {this.state.selectionValue === PointTypes.STAIR ? floorId: null}
                {this.state.selectionValue === PointTypes.EXIT ? exitId: null}
            </div>
        );
    }
}

export default Menu;