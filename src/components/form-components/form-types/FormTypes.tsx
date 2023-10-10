import {
    Button,
    FormGroup, 
    FormLabel, 
    FormSelect 
} from "react-bootstrap";
import { PointTypes, PointTranslation } from "../../../utils/Interfaces";

import "./form-types-style.css";

interface FormTypesProps {
    types: PointTypes[],
    setTypes: (types: PointTypes[]) => void
}

function FormTypes({types, setTypes}: FormTypesProps) {
    return (
        <FormGroup>
            <FormLabel>Тип точки</FormLabel>
            {types.map((el, index) => {
                    return <>
                         <FormSelect
                            key={index}
                            value={el} 
                            onChange={(e) => {
                                types[index] = e.target.value as PointTypes;
                                setTypes(types);
                            }}
                        >
                            {Object.keys(PointTranslation).map((key) => {
                                // @ts-expect-error: Call by string property name
                                const el = PointTranslation[key];

                                return <>
                                    <option value={key}>
                                        {el}
                                    </option>
                                </>
                            })}
                        </FormSelect>
                    </>
                })}
            <Button 
                style={{
                    marginRight: "10px"
                }}
                onClick={() => {
                    types.push(PointTypes.Auditorium);
                    setTypes(types);
                }}
            >
                +
            </Button>
            <Button 
                className=""
                onClick={() => {
                    types.pop();
                    setTypes(types);
                }}
            >
                -
            </Button>
        </FormGroup>
    );
}

export default FormTypes;