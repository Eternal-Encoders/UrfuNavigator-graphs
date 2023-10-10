import { useState, useEffect } from "react";
import { IAuditoriumChild } from "../../utils/Interfaces";
import nullSvg from "./img/null.svg";
import "./auditorium-icon-style.css"

function AuditoriumIcon({x, y, identifier}: IAuditoriumChild) {
    const [icon, setIcon] = useState(nullSvg);
    
    useEffect(() => {
        async function getIcon() {
            const responce = await import(`./img/${identifier}.svg`);
            setIcon(responce.default);
        }

        getIcon();
    }, [identifier, icon]);

    return (
        <img 
            src={icon} 
            alt="icon" 
            className="auditorium-icon"
            style={{ top: y, left: x }}
        />
    );
}

export default AuditoriumIcon; 