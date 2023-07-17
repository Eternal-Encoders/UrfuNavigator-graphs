import React, {  } from "react";
import {
    FormGroup, 
    FormLabel, 
    FormControl 
} from "react-bootstrap";

import "./form-menu-style.css";

interface FormMenuProps {
    menuId: string
}

function FormMenu({menuId}: FormMenuProps) {
    return (
        <FormGroup>
            <FormLabel>Название</FormLabel>
            <FormControl 
                disabled
                type="text" 
                value={menuId}
            />
        </FormGroup>
    );
}

export default FormMenu;