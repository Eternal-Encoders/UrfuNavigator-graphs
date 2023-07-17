import React from "react";
import {  } from "react-bootstrap";
import { IGraphPoint } from "../../utils/Interfaces";
import { useTransformContext } from "react-zoom-pan-pinch";
import GraphPoint from "../graph-point/GraphPoint";

import "./graph-style.css";

interface GraphProps {
    points: { [id: string]: IGraphPoint }
}

function Graph({points}: GraphProps) {
    const context = useTransformContext();

    return (
        <div className="graph">
            {Object.keys(points).map((key) => {
                const el = points[key];
                
                return <>
                    <GraphPoint 
                        key={key}
                        id={key}
                        point={el}
                        zoom={context.transformState.scale}
                    />
                </>
            })}
        </div>
    );
}

export default Graph;