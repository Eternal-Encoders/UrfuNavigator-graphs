import { createContext, useState, useCallback } from "react";
import { IAuditorium, IGraphPoint, IData, IOption, IService } from "../utils/Interfaces";

interface IMapContext {
    audiences: { [id: string]: IAuditorium },
    graph: { [id: string]: IGraphPoint },
    data: { [dataId: string]: IData },
    options: IOption,
    service: IService[],
    updateAuditorium: (id: string, value: IAuditorium) => void,
    updateGraphPoint: (id: string, value: IGraphPoint) => void,
    deleteGraphPoint: (id: string) => void,
    updateData: (dataId: string, value: IData) => void,
    deleteData: (dataId: string) => void,
    setOption: (option: IOption) => void,
    setService: (service: IService[]) => void
}

export const MapContext = createContext<IMapContext>({
    audiences: {},
    graph: {},
    data: {},
    options: {floor: 0, institute: "", widht: 0, height: 0},
    service: [],
    updateAuditorium: (id, value) => {},
    updateGraphPoint: (id, value) => {},
    deleteGraphPoint: (id) => {},
    updateData: (dataId, value) => {},
    deleteData: (dataId) => {},
    setOption: (option) => {},
    setService: (service) => {}
});
  
export const MapState = ({ children }: {children: React.ReactNode}) => {
    const [audiences, setAudiences] = useState<{ [id: string]: IAuditorium }>({});
    const [graph, setGraph] = useState<{ [id: string]: IGraphPoint }>({});
    const [data, setData] = useState<{ [dataId: string]: IData }>({});
    const [options, setOption] = useState<IOption>({floor: 0, institute: "", widht: 0, height: 0});
    const [service, setService] = useState<IService[]>([]);

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
    }, [graph, setGraph, updateGraphPoint]);

    return (
        <MapContext.Provider value={{ 
            audiences,
            graph,
            data,
            options,
            service,
            updateAuditorium,
            updateGraphPoint,
            deleteData,
            updateData,
            deleteGraphPoint,
            setOption,
            setService
        }}>
            {children}
        </MapContext.Provider>
    );
}