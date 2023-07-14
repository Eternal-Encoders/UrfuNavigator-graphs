import React, { useCallback, useContext, useState } from "react";
import { IGraphPoint } from "../../utils/Interfaces";
import "./graph-point-style.css";
import { DrawContext } from "../../contexts/DrawContext";

interface GraphPointProps {
    id: string
    point: IGraphPoint,
    zoom: number
}

function GraphPoint({id, point, zoom}: GraphPointProps) {
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const {isMovingDisable, setIsMovingDisable, updateGraphPoint, setCurGraphPoint} = useContext(DrawContext);
    
    const handelMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (isMovingDisable) {
            const curOffset = {
                x: (e.clientX - mousePos.x) / zoom,
                y: (e.clientY - mousePos.y) / zoom
            };
            setOffset(curOffset);
        }
    }, [isMovingDisable, mousePos, zoom]);

    const handelMouseUp = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        updateGraphPoint(
            id,
            {
                x: point.x + offset.x,
                y: point.y + offset.y,
                links: point.links,
                dataId: point.dataId
            }
        );
        setIsMovingDisable(false);
        setMousePos({ x: 0, y: 0 });
        setOffset({ x: 0, y: 0 });
    }, [id, offset, point, setIsMovingDisable, updateGraphPoint]);

    const handelMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        setCurGraphPoint(id);
        setIsMovingDisable(true);
        setMousePos({ x: e.clientX , y: e.clientY });
    }, [id, setMousePos, setIsMovingDisable, setCurGraphPoint]);

    return (
        <div
            className="graph-point"
            style={{
                top: point.y,
                left: point.x,
                transform: `translate(${offset.x}px, ${offset.y}px)`
            }}
            onMouseDown={handelMouseDown}
            onMouseMove={handelMouseMove}
            onMouseUp={handelMouseUp}
        />
    );
}

export default GraphPoint