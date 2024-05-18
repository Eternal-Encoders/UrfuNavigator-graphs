import { useContext, useEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { DrawContext } from "../../contexts/DrawContext";
import Menu from "../menu/Menu";
import Map from "../map/Map";
import Graph from "../graph/Graph";
import LinksLayer from "../links-layer/LinksLayer";
import { getRandomString } from "../../utils/Utils";
import { PointTypes } from "../../utils/Interfaces";
import { MapContext } from "../../contexts/MapContext";
import ServiceContainer from "../service-container/ServiceContainer";

function Renderer() {
    const {
        isMovingDisable, 
        curGraphPoint,
        setIsMovingDisable,
        setCurGraphPoint
    } = useContext(DrawContext);
    const {
        audiences,
        service,
        options,
        graph,
        updateGraphPoint,
        deleteGraphPoint,
    } = useContext(MapContext);

    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        function handelOnClick(e: MouseEvent) {
            const newPointId = getRandomString(9);

            if (curGraphPoint) {
                graph[curGraphPoint].links.push(newPointId);
            }

            setCurGraphPoint(newPointId);
            updateGraphPoint(newPointId, {
                id: newPointId,
                x: (e.clientX - position.x) / scale,
                y: (e.clientY - position.y) / scale,
                links: curGraphPoint ? [curGraphPoint]: [],
                types: [PointTypes.Corridor],
                names: [],
                floor: options.floor,
                institute: options.institute,
                time: [],
                description: "",
                info: ""
            });
        }

        function handelonContextMenu(e: MouseEvent) {
            e.preventDefault();
        }

        function handelOnKeyup(e: KeyboardEvent) {
            switch (e.key) {
                case 'Delete':
                    if (curGraphPoint) {
                        deleteGraphPoint(curGraphPoint);
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
            window.removeEventListener('keyup', handelOnKeyup);
        }
    }, [
        curGraphPoint, 
        graph, 
        position, 
        scale,
        options,
        deleteGraphPoint,
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
                    ref
                }}
                onPanningStop={() => setIsMovingDisable(false)}
                onTransformed={(ref, state) => {
                    setScale(state.scale);
                    setPosition({ x: state.positionX, y: state.positionY });
                    ref
                }}
            >
                <TransformComponent
                    wrapperStyle={{
                        position: 'absolute',
                        height: '100vh', 
                        width: '100vw' 
                    }}
                >
                    <ServiceContainer services={service} width={options.width} height={options.height} />
                    <Graph points={graph} />
                    <Map audiences={audiences} />
                </TransformComponent>
            </TransformWrapper>
        </>
    );
}

export default Renderer;