import {
    FormGroup, 
    FormLabel, 
    FormControl,
} from "react-bootstrap";

import "./form-time-style.css";

interface FormTimeProps {
    time: [string, string],
    setTime: (time: [string, string]) => void
}

function FormTime({time, setTime}: FormTimeProps) {
    return (
        <>
            <FormGroup>
                <FormLabel>От</FormLabel>
                <FormControl 
                    type="time"
                    value={time[0]}
                    onChange={(e) => {
                        time[0] = e.target.value;
                        setTime(time);
                    }}
                />
            </FormGroup>
            <FormGroup>
                    <FormLabel>До</FormLabel>
                    <FormControl 
                        type="time" 
                        value={time[1]}
                        onChange={(e) => {
                            time[1] = e.target.value;
                            setTime(time);
                        }}
                    />
            </FormGroup>
        </>
    );
}

export default FormTime;