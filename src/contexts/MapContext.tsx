import { createContext, useState, useCallback } from "react";
import { IAuditorium, IGraphPoint, IOption, IService } from "../utils/Interfaces";

interface IMapContext {
    audiences: { [id: string]: IAuditorium },
    graph: { [id: string]: IGraphPoint },
    options: IOption,
    service: IService[],
    updateAuditorium: (id: string, value: IAuditorium) => void,
    updateGraphPoint: (id: string, value: IGraphPoint) => void,
    deleteGraphPoint: (id: string) => void,
    setOption: (option: IOption) => void,
    setService: (service: IService[]) => void
}

export const MapContext = createContext<IMapContext>({
    audiences: {},
    graph: {},
    options: {floor: 0, institute: "", width: 0, height: 0},
    service: [],
    updateAuditorium: () => {},
    updateGraphPoint: () => {},
    deleteGraphPoint: () => {},
    setOption: () => {},
    setService: () => {}
});
  
export const MapState = ({ children }: {children: React.ReactNode}) => {
    const [audiences, setAudiences] = useState<{ [id: string]: IAuditorium }>({});
    const [graph, setGraph] = useState<{ [id: string]: IGraphPoint }>({});
    const [options, setOption] = useState<IOption>({floor: 0, institute: "", width: 0, height: 0});
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

    const deleteGraphPoint = useCallback((id: string) => {
        if (graph[id]) {
            for (const linked of graph[id].links) {
                const linkedEl = {...graph[linked]};
                const index = linkedEl.links.indexOf(id);
                if (index !== -1) {
                    linkedEl.links.splice(index, 1);
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
            options,
            service,
            updateAuditorium,
            updateGraphPoint,
            deleteGraphPoint,
            setOption,
            setService
        }}>
            {children}
        </MapContext.Provider>
    );
}