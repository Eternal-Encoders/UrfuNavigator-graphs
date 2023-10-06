import { IAuditoriumChild } from "../../utils/Interfaces";
import "./auditorium-text-style.css";

function AuditoriumText({x, y, identifier}: IAuditoriumChild) {
    return (
        <p 
            className="auditorium-text"
            style={{ top: y, left: x }}
        >
            {identifier}
        </p>
    );
}

export default AuditoriumText; 