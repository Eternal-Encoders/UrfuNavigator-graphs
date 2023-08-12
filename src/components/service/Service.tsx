import React, { } from "react";
import { IService } from "../../utils/Interfaces";
import "./service-style.css";

interface ServiceProps extends IService {
    width: number,
    height: number
}

function Service({x, y, data, stroke, fiil, width, height}: ServiceProps) {
    return (
        <svg 
            version="1.2" 
            className="service"
            baseProfile={"large"}
            style={{ top: y, left: x }}
            width={width}
            height={height}
        >
            <path 
                d={data} 
                strokeWidth={5} 
                stroke={stroke ? stroke: "transparent"} 
                fill={fiil ? fiil: "transparent"} 
            />
        </svg>
    );
}

export default Service;