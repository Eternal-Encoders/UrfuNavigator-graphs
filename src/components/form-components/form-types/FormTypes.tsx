import React, {  } from "react";
import {
    Col,
    FormGroup, 
    FormLabel, 
    FormSelect 
} from "react-bootstrap";
import { PointTypes, PointTranslation } from "../../../utils/Constants";

import "./form-types-style.css";

interface FormTypesProps {
    type: PointTypes,
    setType: (type: PointTypes) => void
}

function FormTypes({type, setType}: FormTypesProps) {
    return (
        <FormGroup>
            <FormLabel>Тип точки</FormLabel>
            <FormSelect
                value={type} 
                onChange={(e) => setType(e.target.value as PointTypes)}
            >
                {Object.keys(PointTranslation).map((key) => {
                    // @ts-ignore
                    const el = PointTranslation[key];

                    return <>
                        <option value={key}>
                            {el}
                        </option>
                    </>
                })}
            </FormSelect>
        </FormGroup>
    );
}

export default FormTypes;