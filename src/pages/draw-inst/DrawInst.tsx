import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Renderer from "../../components/renderer/Renderer";
import MapUploader from "../../components/map-uploader/MapUploader";
import { DrawState } from "../../contexts/DrawContext";
import { MapState } from "../../contexts/MapContext";

interface DrawInstProps {

}

function DrawInst({}: DrawInstProps) {
    const [isUpload, setIsUpload] = useState(true);

    return (
        <DrawState>
            <MapState>
                {isUpload ?
                    <Container fluid style={{height: "100vh"}}>
                        <Row className="h-100 d-flex align-items-center">
                            <Row>
                                <Col />
                                <Col className="d-flex justify-content-center">
                                    <MapUploader onUpload={setIsUpload} />
                                </Col>
                                <Col />
                            </Row>
                        </Row>
                    </Container>
                    :
                    <Renderer /> 
                }
            </MapState>
        </DrawState>
    );
}

export default DrawInst;