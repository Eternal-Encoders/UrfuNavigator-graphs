import React from "react";
import {PointTypes} from "./Constants";
import "../css/menu.css";

class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.afterSubmit = this.afterSubmit.bind(this);
    }

    afterSubmit(e) {
        console.log(e)
    }

    render() {
        return (
            <form onSubmit={this.afterSubmit} className="menu-form">
                <label>
                    Тип точки
                    <select id="type" defaultValue={PointTypes.CORRIDOR}>
                        <option value={PointTypes.CABINET}>Кабинет</option>
                        <option value={PointTypes.CORRIDOR}>Коридор</option>
                        <option value={PointTypes.STAIR}>Лестница</option>
                        <option value={PointTypes.EXIT}>Выход/Вход</option>
                    </select>
                </label>
            </form>
        );
    }
}

export default Menu;