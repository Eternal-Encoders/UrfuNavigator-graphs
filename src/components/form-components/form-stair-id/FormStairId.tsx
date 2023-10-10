import {
    FormGroup, 
    FormLabel, 
    FormControl 
} from "react-bootstrap";

import "./form-stair-id-style.css";

interface FormStairIdProps {
    stairId: string,
    setStairId: (stairId: string) => void
}

function FormStairId({stairId, setStairId}: FormStairIdProps) {
    return (
        <FormGroup>
            <FormLabel>Id лестницы</FormLabel>
            <FormControl 
                type="text" 
                value={stairId}
                onChange={(e) => setStairId(e.target.value)}
            />
        </FormGroup>
    );
}

export default FormStairId;