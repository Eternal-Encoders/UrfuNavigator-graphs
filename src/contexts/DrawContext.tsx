import { createContext, useState } from "react";

interface IDrawContext {
    curGraphPoint: string | undefined,
    isMovingDisable: boolean,
    setCurGraphPoint: (pointId: string | undefined) => void,
    setIsMovingDisable: (isMoving: boolean) => void,
}

export const DrawContext = createContext<IDrawContext>({
    curGraphPoint: undefined,
    isMovingDisable: false,
    setCurGraphPoint: (pointId) => {},
    setIsMovingDisable: (isMoving) => {},
});
  
export const DrawState = ({ children }: {children: React.ReactNode}) => {
    const [curGraphPoint, setCurGraphPoint] = useState<string | undefined>(undefined);
    const [isMovingDisable, setIsMovingDisable] = useState(false);

    return (
        <DrawContext.Provider value={{ 
            curGraphPoint,
            isMovingDisable,
            setCurGraphPoint,
            setIsMovingDisable,
        }}>
            {children}
        </DrawContext.Provider>
    );
}