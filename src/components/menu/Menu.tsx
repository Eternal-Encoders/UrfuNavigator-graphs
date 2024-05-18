import { useContext } from "react";
import { 
    Container, 
    Row, 
    Form,
    Accordion,
    AccordionItem,
    AccordionHeader
} from "react-bootstrap";
import { 
    FormStairId, 
    FormMenu, 
    FormNames, 
    FormPass, 
    FormTime, 
    FormTypes 
} from "../form-components";
import { IWeek, PointTypes } from "../../utils/Interfaces";
import { getRandomString } from "../../utils/Utils";
import { MapContext } from "../../contexts/MapContext";
import Download from "../download/Download";
import "./menu-style.css";
import FormDescription from "../form-components/form-description/FormDescription";
import FormInfo from "../form-components/form-info/FormInfo";
import AccordionBody from "react-bootstrap/esm/AccordionBody";

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

    function setWeek(time: IWeek) {
        setByKey("time", time);
    }

    function setDescription(description: string) {
        setByKey("description", description);
    }

    function setInfo(info: string) {
        setByKey("info", info);
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
                <Accordion defaultActiveKey="0">
                    <AccordionItem eventKey="0">
                        <AccordionHeader>{dataId ? graph[dataId].names.join(", "): "Menu"}</AccordionHeader>
                        <AccordionBody>
                            {dataId &&
                                <>
                                    <Row>
                                        <FormNames names={graph[dataId].names} setNames={setNames} />
                                    </Row>
                                    <Row>
                                        <FormTypes types={graph[dataId].types} setTypes={setType} />
                                    </Row>
                                    <FormTime week={graph[dataId].time} setWeek={setWeek} />
                                    <Row>
                                        <FormDescription description={graph[dataId].description} setDescription={setDescription} />
                                    </Row>
                                    <Row>
                                        <FormInfo info={graph[dataId].info} setInfo={setInfo}  />
                                    </Row>
                                    

                                    {graph[dataId].menuId &&
                                        <Row>
                                            <FormMenu menuId={String(graph[dataId].menuId)} />
                                        </Row>
                                    }

                                    {graph[dataId].isPassFree &&
                                        <Row>
                                            <FormPass 
                                                isPassFree={Boolean(graph[dataId].isPassFree)}
                                                setIsPassFree={setIsPassFree}
                                            />
                                        </Row>
                                    }

                                    {graph[dataId].stairId &&
                                        <Row>
                                            {
                                                // @ts-expect-error: In this case stairId allowes preserve
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
                        </AccordionBody>
                    </AccordionItem>
                </Accordion>
            </Form>
        </Container>
    );
}

export default Menu;