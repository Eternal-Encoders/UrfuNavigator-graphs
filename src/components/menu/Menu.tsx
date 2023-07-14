import React, { useContext, useState } from "react";
import { 
    Container, 
    Row, 
    Col, 
    Form,
    FormGroup, 
    FormLabel, 
    FormControl 
} from "react-bootstrap";
import { DrawContext } from "../../contexts/DrawContext";

import "./menu-style.css";

interface MenuProps {

}

function Menu({}: MenuProps) {
    const {curGraphPoint, graph, data, updateData} = useContext(DrawContext);

    return (
        <Container fluid={true} className="menu">
            {curGraphPoint &&
                <Form as={Col}>
                    <FormGroup>
                        <FormLabel>Название</FormLabel>
                        <FormControl 
                            type="text" 
                            placeholder="Название, через заяпятую"
                            value={data[graph[curGraphPoint].dataId].names.join(', ')}
                            onChange={(e) => {
                                const newData = {...data[graph[curGraphPoint].dataId]};
                                newData.names = e.target.value.split(',');
                                updateData(curGraphPoint, newData);
                            }}
                        />
                    </FormGroup>
                </Form>
            }
        </Container>
    );
}

export default Menu;