import styles from "./Calendar.module.scss";
import classNames from "classnames";
import { useState } from "react";
const cx = require("classnames/bind").bind(styles);

function getMonthName(month) {
    const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    if (month > 12 || month <= 0) return "";
    return monthNames[month - 1];
}

const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const scheduleTest = {
    1: {
        color: "공휴일",
        schedule: "크리스마스",
        custom: <div></div>,
    },
};

export default function Calendar({ year, month, schedule, className, ...props }) {
    const [targetDate, setTargetDate] = useState(new Date(`${year}-${month}-01T00:00:00+09:00`));
    const [calendarArray, setCalendarArray] = useState([]);

    useState(() => {
        const calendarArray = [];

        for (let i = 0; i < targetDate.getDay(); i++) {
            calendarArray.push(null);
        }
        for (let i = 1; i <= new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0).getDate(); i++) {
            calendarArray.push(i);
        }
        for (let i = 0; i < 35 - calendarArray.length; i++) {
            calendarArray.push(null);
        }
        setCalendarArray(calendarArray);
    }, [targetDate]);

    return (
        <div className={classNames(styles.calendar, className)}>
            <div className={cx("title")}>
                <span>{month}</span>
                <span>{getMonthName(month)}</span>
            </div>
            <div className={cx("calendarBody")}>
                {dayNames.map((dayName) => {
                    return (
                        <div key={dayName} className={cx("dayName")}>
                            {dayName}
                        </div>
                    );
                })}

                {calendarArray.map((day, index) => {
                    if (day === null) return <div className={cx("day")} key={`emptyDay${index}`}></div>;
                    return (
                        <div key={day} className={cx("day")}>
                            <div className={cx("dayNumber", schedule && { [`dayNumber--${schedule[index]?.color}`]: schedule[index]?.color })}>{day}</div>
                            <div className={cx("daySchedule")}>{schedule && schedule[index]?.custom}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
