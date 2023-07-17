import React, {  } from "react";
import {
    FormGroup, 
    FormLabel, 
    FormControl,
    Button
} from "react-bootstrap";

import "./form-floors-style.css";

interface FormFloorsProps {
    floors: number[]
    setFloors: (floors: number[]) => void
}

function FormFloors({floors, setFloors}: FormFloorsProps) {
    return (
        <FormGroup>
            <FormLabel>Доступные этажи</FormLabel>
                {floors.map((el, index) => {
                    return <>
                        <FormControl 
                            type="number" 
                            placeholder="Название"
                            value={el}
                            onChange={(e) => {
                                floors[index] = Number(e.target.value);
                                setFloors(floors);
                            }}
                        />
                    </>
                })}
                    <Button
                        style={{
                            marginRight: "10px"
                        }}
                        onClick={() => {
                            floors.push(1);
                            setFloors(floors);
                        }}
                    >
                        +
                    </Button>
                    <Button 
                        onClick={() => {
                            floors.pop();
                            setFloors(floors);
                        }}
                    >
                        -
                    </Button>
        </FormGroup>
    );
}

export default FormFloors;