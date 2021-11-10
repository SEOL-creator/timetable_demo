import { useState, useEffect, useContext } from "react";
import ClassroomContext from "../contexts/classroomContext";
import axiosInstance from "../utils/axiosInstance";
import SmallClass from "./SmallClass";
import styles from "./SmallTimetable.module.css";
import SwipeableViews from "react-swipeable-views";
import classNames from "classnames/bind";
import isSameWeek from "../utils/isSameWeek";
const cx = classNames.bind(styles);

const weekString = { 0: "이번주", 1: "다음주" };
const CLASSTIMESTRING = { 1: "first", 2: "second", 3: "third", 4: "fourth", 5: "fifth", 6: "sixth", 7: "seventh" };
const dayNameString = { 0: "월요일", 1: "화요일", 2: "수요일", 3: "목요일", 4: "금요일" };

function getClassTime(timeTable, classTimeNum) {
    if (!timeTable) return { start: "", end: "" };
    return { start: timeTable[CLASSTIMESTRING[classTimeNum] + "_start"], end: timeTable[CLASSTIMESTRING[classTimeNum] + "_end"] };
}

function drawClasstimesOfDay(classTimeTable, day, isRemote, currentTimeTable, tempClassTime, isThisWeek) {
    return classTimeTable.map((classTime) => {
        if (classTime.dayOfWeek !== day) return;
        const TODAY = new Date();
        const tempClass = tempClassTime.filter((time) => {
            if (isSameWeek(time.date, TODAY) == isThisWeek && new Date(time.date).getDay() === day) {
                if (time.time === classTime.time) return true;
            }
            return false;
        });
        if (tempClass.length === 0) {
            return (
                <SmallClass
                    key={String(classTime.dayOfWeek) + "_" + String(classTime.time)}
                    classObj={classTime._class}
                    isRemote={isRemote}
                    remoteURL={classTime.remoteURL}
                    startTime={getClassTime(currentTimeTable, classTime.time).start}
                    endTime={getClassTime(currentTimeTable, classTime.time).end}
                />
            );
        } else {
            const classTime = tempClass[0];
            if (classTime._class) {
                return (
                    <SmallClass
                        key={String(classTime.dayOfWeek) + "_" + String(classTime.time)}
                        classObj={classTime._class}
                        isRemote={isRemote}
                        remoteURL={classTime.remoteURL}
                        startTime={getClassTime(currentTimeTable, classTime.time).start}
                        endTime={getClassTime(currentTimeTable, classTime.time).end}
                        replaced={true}
                    />
                );
            } else {
                return null;
            }
        }
    });
}

function makeWeekTimeTable(timeTable) {
    const firstWeekTimeTable = [];
    const secondWeekTimeTable = [];
    const TODAY = new Date();
    const MONDAY = new Date(TODAY.getTime() - (TODAY.getDay() - 1) * 24 * 60 * 60 * 1000);
    const NEXTMONDAY = new Date(MONDAY.getTime() + 7 * 24 * 60 * 60 * 1000);
    let day = MONDAY;
    for (let i = 0; i < 5; i++) {
        const possibleTable = timeTable.filter((table) => new Date(table.startdate).getTime() <= day.getTime());
        firstWeekTimeTable.push(possibleTable.slice(-1)[0]);
        day = new Date(day.getTime() + 24 * 60 * 60 * 1000);
    }
    day = NEXTMONDAY;
    for (let i = 0; i < 5; i++) {
        const possibleTable = timeTable.filter((table) => new Date(table.startdate).getTime() <= day.getTime());
        secondWeekTimeTable.push(possibleTable.slice(-1)[0]);
        day = new Date(day.getTime() + 24 * 60 * 60 * 1000);
    }
    return [firstWeekTimeTable, secondWeekTimeTable];
}

export default function Timetable() {
    const [isLoading, setIsLoading] = useState(true);
    const [timeTableList, setTimeTableList] = useState([]);
    const [classTimetable, setclassTimetable] = useState([]);
    const [tempClassTime, setTempClassTime] = useState([]);
    const { classroom } = useContext(ClassroomContext);
    const [week, setWeek] = useState(0);

    const [day, setDay] = useState(new Date().getDay() - 1);

    useEffect(() => {
        async function fetchTimetable() {
            try {
                const response = await axiosInstance.get("/apis/timetable/");
                setTimeTableList(makeWeekTimeTable(response.data));
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        }
        fetchTimetable();
    }, []);

    useEffect(() => {
        async function fetchClassTimetable(classroom) {
            try {
                const response = await axiosInstance.get(`/apis/classtime/${classroom.grade}/${classroom.room}/`);
                setclassTimetable(response.data);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        }
        async function fetchTempClassTime(classroom) {
            try {
                const response = await axiosInstance.get(`/apis/tempclasstime/${classroom.grade}/${classroom.room}/`);
                setTempClassTime(response.data);
            } catch (e) {
                console.error(e);
            }
        }
        fetchClassTimetable(classroom);
        fetchTempClassTime(classroom);
    }, [classroom]);

    const toggleWeek = () => {
        if (week === 0) setWeek(1);
        else setWeek(0);
    };

    if (isLoading) return <div>Loading...</div>;

    console.log(timeTableList);

    return (
        <div className={styles.timetable}>
            <div className={styles.timetableHeading}>
                <div onClick={toggleWeek}>
                    {weekString[week]}
                    <span className={styles.downArrow}>▼</span>
                </div>
            </div>
            <div className={styles.dayContainer}>
                <button
                    onClick={() => {
                        setDay(0);
                    }}
                    className={cx(styles.day, day === 0 && styles.selectedDay)}
                >
                    월요일
                </button>
                <button
                    onClick={() => {
                        setDay(1);
                    }}
                    className={cx(styles.day, day === 1 && styles.selectedDay)}
                >
                    화요일
                </button>
                <button
                    onClick={() => {
                        setDay(2);
                    }}
                    className={cx(styles.day, day === 2 && styles.selectedDay)}
                >
                    수요일
                </button>
                <button
                    onClick={() => {
                        setDay(3);
                    }}
                    className={cx(styles.day, day === 3 && styles.selectedDay)}
                >
                    목요일
                </button>
                <button
                    onClick={() => {
                        setDay(4);
                    }}
                    className={cx(styles.day, day === 4 && styles.selectedDay)}
                >
                    금요일
                </button>
            </div>
            <SwipeableViews
                enableMouseEvents
                hysteresis={0.4}
                index={day}
                resistance
                onChangeIndex={(index) => {
                    setDay(index);
                }}
            >
                {timeTableList[week].map((timeTable, idx) => {
                    return <div key={idx}>{drawClasstimesOfDay(classTimetable, idx + 1, timeTable["is_remote"], timeTable.timetable, tempClassTime, !week)}</div>;
                })}
            </SwipeableViews>
        </div>
    );
}
