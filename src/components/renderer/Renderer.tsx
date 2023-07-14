import React, { useContext, useEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { DrawContext } from "../../contexts/DrawContext";
import Menu from "../menu/Menu";
import Map from "../map/Map";
import Graph from "../graph/Graph";
import { getRandomString } from "../../utils/Utils";
import { PointTypes } from "../../utils/Constants";

interface RendererProps {
}

function Renderer({}: RendererProps) {
    const {
        isMovingDisable, 
        audiences, 
        graph,
        data,
        curGraphPoint,
        updateGraphPoint,
        updateData
    } = useContext(DrawContext);

    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        function handelOnClick(e: MouseEvent) {
            console.log(2);
            const newPointId = getRandomString(5);
            const newDataId = getRandomString(7);

            if (curGraphPoint) {
                graph[curGraphPoint].links.push(newPointId);
            }

            updateGraphPoint(newPointId, {
                x: (e.clientX - position.x) / scale,
                y: (e.clientY - position.y) / scale,
                links: curGraphPoint ? [curGraphPoint]: [],
                dataId: newDataId
            });
            updateData(newDataId, {
                type: PointTypes.CORRIDOR,
                names: [],
                floor: data[graph[Object.keys(graph)[0]].dataId].floor,
                institute: data[graph[Object.keys(graph)[0]].dataId].institute,
                time: ["00:00", "23:59"]
            });
        }

        window.addEventListener('click', handelOnClick);
        return () => {
            window.removeEventListener('click', handelOnClick);
        }
    }, [
        curGraphPoint, 
        data, 
        graph, 
        position, 
        scale, 
        updateData, 
        updateGraphPoint
    ]);

    return (
        <TransformWrapper
            disabled={isMovingDisable}
            initialScale={1}
            minScale={0.25}
            maxScale={5}
            limitToBounds={false}
            onTransformed={(ref, state) => {
                setScale(state.scale);
                setPosition({ x: state.positionX, y: state.positionY });
            }}
        >
            <Menu />
            <TransformComponent
                wrapperStyle={{
                    position: 'absolute',
                    height: '100vh', 
                    width: '100vw' 
                }}
            >
                <Graph points={graph} />
                <Map audiences={audiences} />
            </TransformComponent>
        </TransformWrapper>
    );
}

export default Renderer;