import React, {  } from "react";
import {
    FormGroup, 
    FormLabel, 
    FormControl, 
    Button
} from "react-bootstrap";

import "./form-names-style.css";

interface FormNamesProps {
    names: string[],
    setNames: (names: string[]) => void
}

function FormNames({names, setNames}: FormNamesProps) {
    return (
        <FormGroup>
            <FormLabel>Названия</FormLabel>
                {names.map((el, index) => {
                    return <>
                        <FormControl 
                            key={index}
                            type="text" 
                            placeholder="Название"
                            value={el}
                            onChange={(e) => {
                                names[index] = e.target.value;
                                setNames(names);
                            }}
                        />
                    </>
                })}
                    <Button 
                        style={{
                            marginRight: "10px"
                        }}
                        onClick={() => {
                            names.push("");
                            setNames(names);
                        }}
                    >
                        +
                    </Button>
                    <Button 
                        className=""
                        onClick={() => {
                            names.pop();
                            setNames(names);
                        }}
                    >
                        -
                    </Button>
        </FormGroup>
    );
}

export default FormNames;