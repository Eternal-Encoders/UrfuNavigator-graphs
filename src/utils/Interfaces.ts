export const enum PointTypes {
  Corridor= "corridor",
  Auditorium = "auditorium",
  Dinning = "dinning",
  Exit = "exit",
  Stair = "stair",
  ToiletM = "toilet-m",
  ToiletW = "toilet-w",
  Cafe = "cafe",
  Vending = "vending",
  Coworking = "coworking",
  Atm = "atm",
  Wardrobe = "wardrobe",
  Print = "print",
  Deanery = "deanery",
  Students = "students",
  Other = "other"
}

export const PointTranslation = {
  [PointTypes.Corridor]: "Коридор",
  [PointTypes.Auditorium]: "Аудитория",
  [PointTypes.Dinning]: "Столовая",
  [PointTypes.Exit]: "Вход/Выход",
  [PointTypes.Stair]: "Лустница",
  [PointTypes.ToiletM]: "Туалет (М)",
  [PointTypes.ToiletW]: "Туалет (Ж)",
  [PointTypes.Cafe]: "Кафе",
  [PointTypes.Vending]: "Вендинг",
  [PointTypes.Coworking]: "Коворкинг",
  [PointTypes.Atm]: "Банкомат",
  [PointTypes.Wardrobe]: "Гардероб",
  [PointTypes.Print]: "Печать",
  [PointTypes.Deanery]: "Деканат",
  [PointTypes.Students]: "Союз Студентов",
  [PointTypes.Other]: "Другое..."
};

export interface IAuditoriumDoors {
  x: number,
  y: number,
  width: number,
  height: number,
  fill: string
}

export interface IAuditoriumChild {
  type: "text" | "icon",
  x: number,
  y: number,
  identifier: string
}

export interface IAuditorium {
  id: string,
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

export interface IGraphPoint {
  id: string
  x: number,
  y: number,
  links: string[],
  types: PointTypes[],
  names: string[],
  floor: number,
  institute: string,
  time: [string, string],
  menuId?: string,
  isPassFree?: boolean,
  stairId?: string
}

export interface IService {
  x: number,
  y: number,
  data: string,
  stroke?: string,
  fiil?: string
}

export interface IMapObject {
  service: IService[],
  audiences: {[id: string]: IAuditorium},
  graph: {[id: string]: IGraphPoint},
  institute: string,
  floor: number,
  width: number,
  height: number
}

export interface IOption {
  floor: number,
  institute: string,
  width: number,
  height: number
}