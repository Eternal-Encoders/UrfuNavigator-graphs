import Xarrow, { refType } from "react-xarrows";
import "./points-link-style.css";

interface PointsLinkProps {
    start: refType,
    end: refType
}

function PointsLink({start, end}: PointsLinkProps) {
    return (
        <Xarrow 
            start={start} 
            end={end} 
            color="#808080"
            showHead={false}
            strokeWidth={3}
            path="straight"
            zIndex={2} 
        />
    );
}

export default PointsLink;