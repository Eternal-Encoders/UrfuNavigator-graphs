const enum PointTypes {
    CORRIDOR = "corridor",
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
};

const PointTranslation = {
    [PointTypes.CORRIDOR]: "Коридор",
    [PointTypes.Auditorium]: "Аудитория",
    [PointTypes.Dinning]: "Столовая",
    [PointTypes.Exit]: "Вход/Выход",
    [PointTypes.Stair]: "Лестница",
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
}

export {
    PointTypes,
    PointTranslation
} 