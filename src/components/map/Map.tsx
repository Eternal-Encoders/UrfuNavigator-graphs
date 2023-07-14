import React from "react";
import {  } from "react-bootstrap";
import { IAuditorium } from "../../utils/Interfaces";
import Auditorium from "../auditorium/Auditorium";

import "./map-style.css"

interface MapProps {
    audiences: { [id: string]: IAuditorium }
}

function Map({audiences}: MapProps) {
    return (
        <div className="map">
            {Object.keys(audiences).map((key) => {
                const el = audiences[key];
                return <Auditorium
                    key={key}
                    x={el.x}
                    y={el.y}
                    width={el.width}
                    height={el.height}
                    fill={el.fill}
                    stroke={el.stroke}
                    children={el.children}
                />
            })}
        </div>
    );
}

export default Map;