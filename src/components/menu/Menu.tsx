import React, { useContext } from "react";
import { 
    Container, 
    Row, 
    Form
} from "react-bootstrap";
import { FormFloors, FormMenu, FormNames, FormPass, FormTime, FormTypes } from "../form-components";
import { PointTypes } from "../../utils/Constants";
import { getRandomString } from "../../utils/Utils";
import { MapContext } from "../../contexts/MapContext";
import Download from "../download/Download";
import "./menu-style.css";


interface MenuProps {
    dataId: string | undefined
}

function Menu({dataId}: MenuProps) {
    const {data, options, updateData} = useContext(MapContext);

    function setByKey(key: string, value: any) {
        if (dataId) {
            const newData = {...data[dataId]};

            // @ts-ignore
            newData[key] = value;
            
            if (newData.types.indexOf(PointTypes.Stair) !== -1) {
                newData.availableFloors = newData.availableFloors ? newData.availableFloors: [newData.floor]
            } else {
                newData.availableFloors = undefined;
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

            updateData(dataId, newData);
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

    function setFloors(floors: number[]) {
        setByKey("availableFloors", floors);
    }

    return (
        <Container fluid className="menu">
            <Form className="menu-form bg-light" onClick={(e) => e.stopPropagation()}>
                {dataId &&
                    <>
                            <FormNames names={data[dataId].names} setNames={setNames} />
                        <Row>
                            <FormTypes types={data[dataId].types} setTypes={setType} />
                        </Row>
                        <Row>
                            <FormTime time={data[dataId].time} setTime={setTime} />
                        </Row>
                        

                        {data[dataId].menuId &&
                            <Row>
                                <FormMenu menuId={String(data[dataId].menuId)} />
                            </Row>
                        }

                        {data[dataId].isPassFree &&
                            <Row>
                                <FormPass 
                                    isPassFree={Boolean(data[dataId].isPassFree)}
                                    setIsPassFree={setIsPassFree}
                                />
                            </Row>
                        }

                        {data[dataId].availableFloors &&
                            <Row>
                                {
                                // @ts-ignore
                                <FormFloors floors={data[dataId].availableFloors} setFloors={setFloors} />
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