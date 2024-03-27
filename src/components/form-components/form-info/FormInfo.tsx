import {
    FormGroup, 
    FormLabel, 
    FormControl
} from "react-bootstrap";

import "./form-info-style.css";

interface FormInfoProps {
    info: string,
    setInfo: (names: string) => void
}

function FormInfo({info, setInfo}: FormInfoProps) {
    return (
        <FormGroup>
            <FormLabel>Информация</FormLabel>
                <FormControl 
                    as="textarea" 
                    rows={3}
                    key="infoControl"
                    type="text" 
                    placeholder="Информация"
                    value={info}
                    onChange={(e) => {
                        setInfo(e.target.value);
                    }}
                />
        </FormGroup>
    );
}

export default FormInfo;