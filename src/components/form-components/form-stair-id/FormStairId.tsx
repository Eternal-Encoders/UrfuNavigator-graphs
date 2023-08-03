import React, {  } from "react";
import {
    FormGroup, 
    FormLabel, 
    FormControl 
} from "react-bootstrap";

import "./form-stair-id-style.css";

interface FormStairIdProps {
    stairId: string
}

function FormStairId({stairId}: FormStairIdProps) {
    return (
        <FormGroup>
            <FormLabel>Id лестницы</FormLabel>
            <FormControl 
                type="text" 
                value={stairId}
            />
        </FormGroup>
    );
}

export default FormStairId;