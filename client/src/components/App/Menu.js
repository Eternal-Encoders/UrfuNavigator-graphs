import React from "react";
import {PointTypes, TypesToColor} from "./Constants";
import "../../css/menu.css";

class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.markers = undefined;
        this.points = props.points;
        this.state = {
            selectionValue: PointTypes.CORRIDOR,
            nameValue: ""
        };

        this.afterChangeSelect = this.afterChangeSelect.bind(this);
        this.afterNameChange = this.afterNameChange.bind(this);
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

    setMarkers(markers) {
        this.markers = markers;
        const marker = this.__getById(markers[0].id);
        this.setState({ selectionValue: marker.type });

        this.setState({ nameValue: marker.name ? marker.name: "" });
    }

    __getById(id) {
        return this.points.filter(e => e.id === id)[0];
    }

    render() {
        const selectType = <label className="form-label">
            Тип точки
            <select
                className="form-input"
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
        </label>;
        const typeName = <label className="form-label">
            Имя точки
            <input 
                className="form-input" 
                type="text"
                value={this.state.nameValue}
                onChange={this.afterNameChange}
            ></input>
        </label>;

        const isName = (this.state.selectionValue === PointTypes.AUDITORIUM) ||
            (this.state.selectionValue === PointTypes.CAFE) ||
            (this.state.selectionValue === PointTypes.INSTITUTE) ||
            (this.state.selectionValue === PointTypes.OTHER);

        return (
            <div className="menu-form">
                {selectType}
                {isName ? typeName : null}
            </div>
        );
    }
}

export default Menu;