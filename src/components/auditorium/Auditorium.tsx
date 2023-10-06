import { IAuditorium } from "../../utils/Interfaces";
import AuditoriumIcon from "../auditorium-icon/AuditoriumIcon";
import AuditoriumText from "../auditorium-text/AuditoriumText";
import "./auditorium-style.css";


function Auditorium({x, y, width, height, fill, stroke, children}: IAuditorium) {
    const childs = children.map((el, index) => {
        switch (el.type) {
            case "text":
                return <AuditoriumText key={index} x={el.x} y={el.y} type={el.type} identifier={el.identifier} />
            case "icon":
                return <AuditoriumIcon key={index} x={el.x} y={el.y} type={el.type} identifier={el.identifier} />
            default:
                return null;
        }
    });

    return (
        <div
            className="auditorium"
            style={{
                top: `${y}px`,
                left: `${x}px`,
                width: `${width}px`,
                height: `${height}px`,
                backgroundColor: fill ? fill: "transparent",
                outlineColor: stroke ? stroke: "transparent",
            }}
        >
            {childs}
        </div>
    );
}

export default Auditorium;