import { type } from "os"
import { PointTypes } from "./Constants"

interface IAuditoriumDoors {
  x: number,
  y: number,
  width: number,
  height: number,
  fill: string
}

interface IAuditoriumChild {
  type: "text" | "icon",
  x: number,
  y: number,
  identifier: string
}
  
interface IAuditorium {
  _id: string
  x: number,
  y: number,
  width: number,
  height: number,
  fill?: string,
  stroke?: string,
  pointId: string,
  children: IAuditoriumChild[],
  doors: IAuditoriumDoors[]
}

interface IGraphPoint {
  x: number,
  y: number,
  links: string[],
  _id: string
}

interface IData {
  _id: string,
  names: string[],
  types: PointTypes[],
  floor: number,
  institute: string,
  time: [string, string],
  menuId?: string,
  isPassFree?: boolean,
  stairId?: string
}

interface IService {
  x: number,
  y: number,
  data: string,
  stroke?: string,
  fiil?: string
}

interface IMapObject {
  service: IService[],
  audiences: { [id: string]: IAuditorium },
  graph: { [id: string]: IGraphPoint },
  data: { [dataId: string]: IData },
  floor: number,
  institute: string,
  widht: number,
  height: number
}

interface IOption {
  floor: number,
  institute: string,
  widht: number,
  height: number
}

export type {
  IService,
  IAuditoriumDoors,
  IAuditorium,
  IGraphPoint,
  IAuditoriumChild,
  IData,
  IMapObject,
  IOption
}