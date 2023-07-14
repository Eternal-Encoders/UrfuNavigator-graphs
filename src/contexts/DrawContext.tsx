import { createContext, useState, useCallback } from "react";
import { IAuditorium, IGraphPoint, IData } from "../utils/Interfaces";

interface IDrawContext {
    curGraphPoint: string | undefined,
    isMovingDisable: boolean,
    audiences: { [id: string]: IAuditorium },
    graph: { [id: string]: IGraphPoint },
    data: { [dataId: string]: IData },
    setCurGraphPoint: (pointId: string | undefined) => void,
    setIsMovingDisable: (isMoving: boolean) => void,
    updateAuditorium: (id: string, value: IAuditorium) => void,
    updateGraphPoint: (id: string, value: IGraphPoint) => void,
    updateData: (dataId: string, value: IData) => void
}

export const DrawContext = createContext<IDrawContext>({
    curGraphPoint: undefined,
    isMovingDisable: false,
    audiences: {},
    graph: {},
    data: {},
    setCurGraphPoint: (pointId) => {},
    setIsMovingDisable: (isMoving) => {},
    updateAuditorium: (id, value) => {},
    updateGraphPoint: (id, value) => {},
    updateData: (dataId, value) => {}
});
  
export const DrawState = ({ children }: {children: React.ReactNode}) => {
    const [curGraphPoint, setCurGraphPoint] = useState<string | undefined>(undefined);
    const [isMovingDisable, setIsMovingDisable] = useState(false);
    const [audiences, setAudiences] = useState<{ [id: string]: IAuditorium }>({});
    const [graph, setGraph] = useState<{ [id: string]: IGraphPoint }>({});
    const [data, setData] = useState<{ [dataId: string]: IData }>({});

    const updateAuditorium = useCallback((id: string, value: IAuditorium) => {
        setAudiences((prevAudiences) => ({
            ...prevAudiences,
            [id]: value
        }));
    }, [setAudiences]);
    const updateGraphPoint = useCallback((id: string, value: IGraphPoint) => {
        setGraph((prevGraphPoint) => ({
            ...prevGraphPoint,
            [id]: value
        }));
    }, [setGraph]);
    const updateData = useCallback((dataid: string, value: IData) => {
        setData((prevData) => ({
            ...prevData,
            [dataid]: value
        }));
    }, [setData]);

    return (
        <DrawContext.Provider value={{ 
            curGraphPoint,
            isMovingDisable,
            audiences,
            graph,
            data,
            setCurGraphPoint,
            setIsMovingDisable,
            updateAuditorium,
            updateGraphPoint,
            updateData
        }}>
            {children}
        </DrawContext.Provider>
    );
}