import { type } from "os"
import { PointTypes } from "./Constants"

interface IAuditoriumChild {
    type: "text" | "icon",
    x: number,
    y: number,
    identifier: string
  }
  
interface IAuditorium {
    x: number,
    y: number,
    width: number,
    height: number,
    fill?: string,
    stroke?: string,
    children: IAuditoriumChild[]
}

interface IGraphPoint {
  x: number,
  y: number,
  links: string[]
}

interface IData {
  names: string[],
  type: PointTypes,
  floor: number,
  institute: string,
  time: [string, string],
  menuId?: string,
  isPassFree?: boolean,
  availableFloors?: number[]
}

interface IMapObject {
    audiences: { [id: string]: IAuditorium },
    graph: { [id: string]: IGraphPoint },
    data: { [dataId: string]: IData },
    floor: number,
    institute: string,
    widht: number,
    height: number
}

export type {
    IAuditorium,
    IGraphPoint,
    IAuditoriumChild,
    IData,
    IMapObject
}