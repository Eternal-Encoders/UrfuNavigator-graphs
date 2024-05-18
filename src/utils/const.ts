import { IGraphPoint, IOption, ITime, PointTypes } from "./Interfaces";
import { getRandomString } from "./Utils";

export function getDefaultGraphPoint(options: IOption): IGraphPoint {
    return {
        id: getRandomString(10),
        x: 0,
        y: 0,
        links: [],
        types: [PointTypes.Corridor],
        names: [],
        floor: options.floor,
        institute: options.institute,
        time: [],
        description: "",
        info: ""
    }
}

export function getDfaultTime(): ITime {
    return {
        from: "00:00",
        to: "00:00"
    }
}