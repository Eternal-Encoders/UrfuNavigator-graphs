import { createContext, useState, useCallback } from "react";
import { IAuditorium, IGraphPoint, IData, IOption } from "../utils/Interfaces";

interface IDrawContext {
    curGraphPoint: string | undefined,
    isMovingDisable: boolean,
    audiences: { [id: string]: IAuditorium },
    graph: { [id: string]: IGraphPoint },
    data: { [dataId: string]: IData },
    options: IOption,
    setCurGraphPoint: (pointId: string | undefined) => void,
    setIsMovingDisable: (isMoving: boolean) => void,
    updateAuditorium: (id: string, value: IAuditorium) => void,
    updateGraphPoint: (id: string, value: IGraphPoint) => void,
    deleteGraphPoint: (id: string) => void,
    updateData: (dataId: string, value: IData) => void,
    deleteData: (dataId: string) => void,
    setOption: (option: IOption) => void
}

export const DrawContext = createContext<IDrawContext>({
    curGraphPoint: undefined,
    isMovingDisable: false,
    audiences: {},
    graph: {},
    data: {},
    options: {floor: 0, institute: "", widht: 0, height: 0},
    setCurGraphPoint: (pointId) => {},
    setIsMovingDisable: (isMoving) => {},
    updateAuditorium: (id, value) => {},
    updateGraphPoint: (id, value) => {},
    deleteGraphPoint: (id) => {},
    updateData: (dataId, value) => {},
    deleteData: (dataId) => {},
    setOption: (option) => {}
});
  
export const DrawState = ({ children }: {children: React.ReactNode}) => {
    const [curGraphPoint, setCurGraphPoint] = useState<string | undefined>(undefined);
    const [isMovingDisable, setIsMovingDisable] = useState(false);
    const [audiences, setAudiences] = useState<{ [id: string]: IAuditorium }>({});
    const [graph, setGraph] = useState<{ [id: string]: IGraphPoint }>({});
    const [data, setData] = useState<{ [dataId: string]: IData }>({});
    const [options, setOption] = useState<IOption>({floor: 0, institute: "", widht: 0, height: 0})

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

    const deleteData = useCallback((dataId: string) => {
        if (data[dataId]) {
            const newData = {...data};
            delete newData[dataId];
            setData(newData);
        }
    }, [data, setData]);

    const deleteGraphPoint = useCallback((id: string) => {
        if (graph[id]) {
            deleteData(id);
            for (const linked of graph[id].links) {
                const linkedEl = {...graph[linked]};
                const index = linkedEl.links.indexOf(id);
                if (index !== -1) {
                    linkedEl.links.splice(index);
                }
                updateGraphPoint(linked, linkedEl);
            }

            const newGraph = {...graph};
            delete newGraph[id];
            setGraph(newGraph);
        }
    }, [graph, setGraph, deleteData, updateGraphPoint]);

    return (
        <DrawContext.Provider value={{ 
            curGraphPoint,
            isMovingDisable,
            audiences,
            graph,
            data,
            options,
            setCurGraphPoint,
            setIsMovingDisable,
            updateAuditorium,
            updateGraphPoint,
            deleteData,
            updateData,
            deleteGraphPoint,
            setOption
        }}>
            {children}
        </DrawContext.Provider>
    );
}