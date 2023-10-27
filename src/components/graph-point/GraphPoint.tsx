import React, { useCallback, useContext, useState } from "react";
import { IGraphPoint, PointTypes } from "../../utils/Interfaces";
import { DrawContext } from "../../contexts/DrawContext";
import { MapContext } from "../../contexts/MapContext";
import { getShortestPath } from "../../utils/Utils";
import "./graph-point-style.css";

interface GraphPointProps {
    id: string
    point: IGraphPoint,
    zoom: number
}

function GraphPoint({id, point, zoom}: GraphPointProps) {
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const {isMovingDisable, curGraphPoint, setIsMovingDisable, setCurGraphPoint} = useContext(DrawContext);
    const {graph, updateGraphPoint} = useContext(MapContext);
    
    const handelClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    }, []);

    const handelMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (isMovingDisable) {
            const curOffset = {
                x: (e.clientX - mousePos.x) / zoom,
                y: (e.clientY - mousePos.y) / zoom
            };
            setOffset(curOffset);
        }
    }, [isMovingDisable, mousePos, zoom]);

    const handelMouseUp = useCallback(() => {
        updateGraphPoint(
            id,
            {
                id: id,
                x: point.x + offset.x,
                y: point.y + offset.y,
                links: point.links,
                names: point.names,
                types: point.types,
                floor: point.floor,
                institute: point.institute,
                time: point.time
            }
        );
        setIsMovingDisable(false);
        setMousePos({ x: 0, y: 0 });
        setOffset({ x: 0, y: 0 });
    }, [
        id, 
        offset, 
        point, 
        setIsMovingDisable, 
        updateGraphPoint
    ]);

    const handelMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (curGraphPoint && e.ctrlKey) {
            const newCurrPoint = {...graph[curGraphPoint]};
            const newThisPoint = {...graph[id]};

            newCurrPoint.links.push(id);
            newThisPoint.links.push(curGraphPoint);

            updateGraphPoint(curGraphPoint, newCurrPoint);
            updateGraphPoint(id, newThisPoint);
        } else if (curGraphPoint && e.shiftKey) {
            const path = getShortestPath(graph, curGraphPoint, [id]);
            let deltaX = 0;
            let deltaY = 0;

            for (let i=1; i < path.length; i++) {
                deltaX += Math.abs(path[i].x - path[i - 1].x);
                deltaY += Math.abs(path[i].y - path[i - 1].y);
            }
            deltaX /= path.length;
            deltaY /= path.length;

            if (deltaX <= deltaY) {
                path.forEach((e) => {
                    e.x = graph[id].x;
                    updateGraphPoint(e.id, e);
                });
            } else {
                path.forEach((e) => {
                    e.y = graph[id].y;
                    updateGraphPoint(e.id, e);
                });
            }
        }

        setCurGraphPoint(id);
        setIsMovingDisable(true);
        setMousePos({ x: e.clientX , y: e.clientY });
    }, [
        id, 
        curGraphPoint, 
        graph, 
        updateGraphPoint, 
        setMousePos, 
        setIsMovingDisable, 
        setCurGraphPoint
    ]);

    return (
        <div
            id={id}
            className="graph-point"
            style={{
                top: point.y,
                left: point.x,
                transform: `translate(${offset.x}px, ${offset.y}px)`
            }}
            onClick={handelClick}
            onMouseDown={handelMouseDown}
            onMouseMove={handelMouseMove}
            onMouseUp={handelMouseUp}
        />
    );
}

export default GraphPoint