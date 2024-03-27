import {
    FormGroup, 
    FormLabel, 
    FormControl, 
} from "react-bootstrap";

import "./form-description-style.css";

interface FormNamesProps {
    description: string,
    setDescription: (description: string) => void
}

function FormDescription({description, setDescription}: FormNamesProps) {
    return (
        <FormGroup>
            <FormLabel>Описание</FormLabel>
                <FormControl 
                    as="textarea" 
                    rows={3}
                    key="descControl"
                    type="text" 
                    placeholder="Описание"
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                />
        </FormGroup>
    );
}

export default FormDescription;