import {
    FormLabel, 
    FormControl,
    Col,
    FormSelect,
    Row,
    Button,
    FormGroup
} from "react-bootstrap";

import "./form-time-style.css";
import { ITime, IWeek, WeekDay } from "../../../utils/Interfaces";
import { getDfaultTime } from "../../../utils/const";

interface FormTimeProps {
    week: IWeek,
    setWeek: (week: IWeek) => void
}

function FormTime({week, setWeek}: FormTimeProps) {
    console.log(week);
    return (
        <>
            <p>График работы</p>
            {week.map((day, index) => {
                return day && (
                    <Row key={`${index}_Times`}>
                        <Col>
                            <FormLabel>От</FormLabel>
                            <FormControl 
                                type="time"
                                value={day.from}
                                onChange={(e) => {
                                    const curDay = week[index] ? week[index] as ITime: getDfaultTime();
                                    curDay.from = e.target.value;
                                    week[index] = curDay;
                                    setWeek(week);
                                }}
                            />
                        </Col>
                        <Col>
                            <FormLabel>До</FormLabel>
                            <FormControl 
                                type="time" 
                                value={day.to}
                                onChange={(e) => {
                                    const curDay = week[index] ? week[index] as ITime: getDfaultTime();
                                    curDay.to = e.target.value;
                                    week[index] = curDay;
                                    setWeek(week);
                                }}
                            /> 
                        </Col>
                        <Col>
                            <FormLabel>День</FormLabel>
                            <FormSelect
                                //@ts-expect-error Call by Enum like an array
                                value={WeekDay[index]}
                                onChange={(curDay) => {
                                    week.splice(index, 1);
                                    week[Number(curDay.target.value)] = day;
                                    setWeek(week);
                                }}
                            >
                                {//@ts-expect-error Iterate trough enum
                                Object.values(WeekDay).filter<number>((e) => !isNaN(Number(e)) && e >= index).map((e) => {
                                    //@ts-expect-error Call by Enum like an array
                                    const el: WeekDay = WeekDay[e]
                                    return (
                                        <option value={e} key={e}>
                                            {el}
                                        </option>
                                    );
                                })}
                            </FormSelect>
                        </Col>
                    </Row>
                );
            })
            }
            <FormGroup>
                {week.length <= 6 &&
                    <Button 
                        style={{
                            marginRight: "10px"
                        }}
                        onClick={() => {
                            //@ts-expect-error In this scenario week.length is allways < 7
                            week[week.length] = getDfaultTime();
                            setWeek(week);
                        }}
                    >
                        +
                    </Button>
                }
                <Button 
                    className=""
                    onClick={() => {
                        week.pop();
                        for (let i=week.length - 1; i>=0; i--) {
                            const dayWeek = week[i];
                            if (!dayWeek) {
                                week.pop()
                            } else {
                                break;
                            }
                        }
                        setWeek(week);
                    }}
                >
                    -
                </Button>    
            </FormGroup>
        </>
    );
}

export default FormTime;