import React, { useContext } from "react";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { IMapObject } from "../../utils/Interfaces";
import { MapContext } from "../../contexts/MapContext";

interface MapUploaderProps {
    onUpload: (isUpload: boolean) => void
}

function MapUploader({onUpload}: MapUploaderProps) {
    const {
        updateAuditorium, 
        updateGraphPoint, 
        updateData, 
        setOption, 
        setService
    } = useContext(MapContext);

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
                Object.keys(json.data).forEach((key) => {
                    const dataObj = json.data[key];
                    updateData(key, dataObj);
                });
                setOption({
                    institute: json.institute,
                    floor: json.floor,
                    widht: json.widht,
                    height: json.height
                });
                setService(json.service);
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