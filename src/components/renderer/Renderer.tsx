import React, { useContext, useEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { DrawContext } from "../../contexts/DrawContext";
import Menu from "../menu/Menu";
import Map from "../map/Map";
import Graph from "../graph/Graph";
import LinksLayer from "../links-layer/LinksLayer";
import { getRandomString } from "../../utils/Utils";
import { PointTypes } from "../../utils/Constants";

interface RendererProps {
}

function Renderer({}: RendererProps) {
    const {
        isMovingDisable, 
        audiences,
        options,
        graph,
        data,
        curGraphPoint,
        updateGraphPoint,
        updateData,
        deleteGraphPoint,
        deleteData,
        setIsMovingDisable,
        setCurGraphPoint
    } = useContext(DrawContext);

    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        function handelOnClick(e: MouseEvent) {
            const newPointId = getRandomString(9);

            if (curGraphPoint) {
                graph[curGraphPoint].links.push(newPointId);
            }

            updateGraphPoint(newPointId, {
                x: (e.clientX - position.x) / scale,
                y: (e.clientY - position.y) / scale,
                links: curGraphPoint ? [curGraphPoint]: [],
            });
            updateData(newPointId, {
                type: PointTypes.CORRIDOR,
                names: [],
                floor: options.floor,
                institute: options.institute,
                time: ["00:00", "23:59"]
            });
        }

        function handelonContextMenu(e: MouseEvent) {
            e.preventDefault();
        }

        function handelOnKeyup(e: KeyboardEvent) {
            console.log(e.key);
            switch (e.key) {
                case 'Delete':
                    if (curGraphPoint) {
                        deleteGraphPoint(curGraphPoint);
                        deleteData(curGraphPoint);
                        setCurGraphPoint(undefined);
                    }
                    break;
            
                default:
                    break;
            }
        }

        window.addEventListener('click', handelOnClick);
        window.addEventListener('contextmenu', handelonContextMenu);
        window.addEventListener('keyup', handelOnKeyup);
        return () => {
            window.removeEventListener('click', handelOnClick);
            window.removeEventListener('contextmenu', handelonContextMenu);
            window.addEventListener('keyup', handelOnKeyup);
        }
    }, [
        curGraphPoint, 
        data, 
        graph, 
        position, 
        scale,
        options,
        updateData, 
        deleteGraphPoint,
        deleteData,
        updateGraphPoint,
        setCurGraphPoint
    ]);

    return (
        <>
            <LinksLayer points={graph} />
            <Menu
                dataId={curGraphPoint ? curGraphPoint: undefined} 
            />
            <TransformWrapper
                disabled={isMovingDisable}
                initialScale={1}
                minScale={0.25}
                maxScale={5}
                limitToBounds={false}
                onPanningStart={(ref, e) => {
                    if ((e as MouseEvent).button === 0) {
                        setIsMovingDisable(true)
                    }
                }}
                onPanningStop={() => setIsMovingDisable(false)}
                onTransformed={(ref, state) => {
                    setScale(state.scale);
                    setPosition({ x: state.positionX, y: state.positionY });
                }}
            >
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
        </>
    );
}

export default Renderer;