import React, { useContext } from "react";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { IMapObject } from "../../utils/Interfaces";
import { MapContext } from "../../contexts/MapContext";
import { getDefaultGraphPoint } from "../../utils/const";

interface MapUploaderProps {
    onUpload: (isUpload: boolean) => void
}

function MapUploader({onUpload}: MapUploaderProps) {
    const {
        updateAuditorium, 
        updateGraphPoint,
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
                    const defPoint = getDefaultGraphPoint({
                        institute: json.institute,
                        floor: json.floor,
                        width: json.width,
                        height: json.height
                    });

                    Object.keys(defPoint).forEach((prop_key) => {
                        //@ts-expect-error Call by property name
                        const prop_val = graphPoint[prop_key];
                        if (!prop_val) {
                            //@ts-expect-error Call by property name
                            graphPoint[prop_key] = defPoint[prop_key]
                        }
                    })
                    updateGraphPoint(key, graphPoint);
                });
                setOption({
                    institute: json.institute,
                    floor: json.floor,
                    width: json.width,
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