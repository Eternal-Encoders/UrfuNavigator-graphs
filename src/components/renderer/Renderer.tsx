import React, { useContext } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { DrawContext } from "../../contexts/DrawContext";
import Menu from "../menu/Menu";
import Map from "../map/Map";
import Graph from "../graph/Graph";

interface RendererProps {
}

function Renderer({}: RendererProps) {
    const {isMovingDisable, audiences, graph} = useContext(DrawContext);

    return (
        <TransformWrapper
            disabled={isMovingDisable}
            initialScale={1}
            minScale={0.25}
            maxScale={5}
            limitToBounds={false}
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