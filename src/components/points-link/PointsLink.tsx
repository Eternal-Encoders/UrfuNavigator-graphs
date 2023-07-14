import React from "react";
import Xarrow, { refType } from "react-xarrows";
import "./points-link-style.css";

interface PointsLinkProps {
    start: refType,
    end: refType
}

function PointsLink({start, end}: PointsLinkProps) {
    return (
        <Xarrow start={start} end={end} />
    );
}

export default PointsLink;