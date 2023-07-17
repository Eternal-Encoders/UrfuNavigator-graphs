import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { DrawContext } from "../../contexts/DrawContext";

import "./download-style.css";

interface DownloadProps {
    institiute: string,
    floor: number
}

function Download({institiute, floor}: DownloadProps) {
    const {data, graph, audiences, options} = useContext(DrawContext);

    function handelOnClick() {
        const link = document.createElement("a");
        const newFile = new Blob([JSON.stringify({
            audiences,
            graph,
            data,
            options
        })], { type: "application/json" });
        link.href = URL.createObjectURL(newFile);
        link.download = `${institiute}_${floor}.json`;
        link.click();
    }

    return (
        <>
            <Button onClick={handelOnClick}>
                Скачать граф
            </Button>
        </>
    );
}

export default Download;
