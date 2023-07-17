import React, {  } from "react";
import {
    FormGroup, 
    FormLabel, 
    FormSelect
} from "react-bootstrap";

import "./form-pass-style.css";

interface FormPassProps {
    isPassFree: boolean,
    setIsPassFree: (isPassFree: boolean) => void
}

function FormPass({isPassFree, setIsPassFree}: FormPassProps) {
    return (
        <FormGroup>
            <FormLabel>Нужен ли пропуск?</FormLabel>
            <FormSelect 
                value={String(!isPassFree)} 
                onChange={(e) => setIsPassFree(e.target.value === "true" ? false: true)}
            >
                <option value={"true"}>Да</option>
                <option value={"false"}>Нет</option>
            </FormSelect>
        </FormGroup>
    );
}

export default FormPass;