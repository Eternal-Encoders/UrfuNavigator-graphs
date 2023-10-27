import { useContext } from "react";
import { 
    Container, 
    Row, 
    Form
} from "react-bootstrap";
import { 
    FormStairId, 
    FormMenu, 
    FormNames, 
    FormPass, 
    FormTime, 
    FormTypes 
} from "../form-components";
import { PointTypes } from "../../utils/Interfaces";
import { getRandomString } from "../../utils/Utils";
import { MapContext } from "../../contexts/MapContext";
import Download from "../download/Download";
import "./menu-style.css";

const dinnings = [
    PointTypes.Cafe, 
    PointTypes.Dinning, 
    PointTypes.Vending
]

interface MenuProps {
    dataId: string | undefined
}

function Menu({dataId}: MenuProps) {
    const {graph, options, updateGraphPoint} = useContext(MapContext);

    function setByKey(key: string, value: unknown) {
        if (dataId) {
            const newData = {...graph[dataId]};

            // @ts-expect-error: There is call by the property name
            newData[key] = value;
            
            if (newData.types.indexOf(PointTypes.Stair) !== -1) {
                newData.stairId = newData.stairId ? newData.stairId: getRandomString(9);
            } else {
                newData.stairId = undefined;
            }

            if (newData.types.indexOf(PointTypes.Exit) !== -1) {
                newData.isPassFree = newData.isPassFree !== undefined ? newData.isPassFree: true;
            } else {
                newData.isPassFree = undefined;
            }

            const dinnings = [
                PointTypes.Cafe, 
                PointTypes.Dinning, 
                PointTypes.Vending
            ];
            if (dinnings.some((e) => newData.types.indexOf(e) !== - 1)) {
                newData.menuId = newData.menuId ? newData.menuId: getRandomString(9);
            } else {
                newData.menuId = undefined;
            }

            updateGraphPoint(dataId, newData);
         }
    }

    function setNames(names: string[]) {
        setByKey("names", names);
    }

    function setType(type: PointTypes[]) {
        setByKey("type", type);
    }

    function setTime(time: [string, string]) {
        setByKey("time", time);
    }

    function setIsPassFree(isPassFree: boolean) {
        setByKey("isPassFree", isPassFree);
    }

    function setStairId(stairId: string) {
        setByKey("stairId", stairId);
    }

    return (
        <Container fluid className="menu">
            <Form className="menu-form bg-light" onClick={(e) => e.stopPropagation()}>
                {dataId &&
                    <>
                            <FormNames names={graph[dataId].names} setNames={setNames} />
                        <Row>
                            <FormTypes types={graph[dataId].types} setTypes={setType} />
                        </Row>
                        <Row>
                            <FormTime time={graph[dataId].time} setTime={setTime} />
                        </Row>
                        

                        {dinnings.some((e) => graph[dataId].types.indexOf(e) !== - 1) &&
                            <Row>
                                <FormMenu menuId={String(graph[dataId].menuId)} />
                            </Row>
                        }

                        {graph[dataId].types.indexOf(PointTypes.Exit) !== -1 &&
                            <Row>
                                <FormPass 
                                    isPassFree={Boolean(graph[dataId].isPassFree)}
                                    setIsPassFree={setIsPassFree}
                                />
                            </Row>
                        }

                        {graph[dataId].types.indexOf(PointTypes.Stair) !== -1 &&
                            <Row>
                                {
                                    <FormStairId stairId={graph[dataId].stairId} setStairId={setStairId} />
                                }
                            </Row>
                        }
                    </>
                }
                <Download 
                    institiute={options.institute}
                    floor={options.floor} 
                />
            </Form>
        </Container>
    );
}

export default Menu;