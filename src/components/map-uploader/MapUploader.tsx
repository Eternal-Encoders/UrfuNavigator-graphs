import React, { useContext } from "react";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { DrawContext } from "../../contexts/DrawContext";
import { IMapObject } from "../../utils/Interfaces";

interface MapUploaderProps {
    onUpload: (isUpload: boolean) => void
}

function MapUploader({onUpload}: MapUploaderProps) {
    const {updateAuditorium, updateGraphPoint} = useContext(DrawContext);

    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length === 1) {
            const fileReader = new FileReader();
            fileReader.readAsText(e.target.files[0], "UTF-8");
            fileReader.onload = () => {
                const json: IMapObject = JSON.parse(fileReader.result as string);

                Object.keys(json.audiences).forEach((key) => {
                    const auditorium = json.audiences[key];
                    updateAuditorium(key, auditorium);
                });
                Object.keys(json.graph).forEach((key) => {
                    const graphPoint = json.graph[key];
                    updateGraphPoint(key, graphPoint);
                });
            }
            onUpload(false);
        }
    }

    return (
        <FormGroup>
            <FormLabel>Загрузить json объект этажа</FormLabel>
            <FormControl type="file" onChange={onChangeHandler} />
        </FormGroup>
    );
}

export default MapUploader;

//<Button onClick={setIsUpload}>Загрузить json объект этажа</Button>