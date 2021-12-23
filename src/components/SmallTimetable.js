import { useState, useEffect, useContext } from "react";
import ClassroomContext from "../contexts/classroomContext";
import axiosInstance from "../utils/axiosInstance";
import SmallClass from "./SmallClass";
import styles from "./SmallTimetable.module.css";
import SwipeableViews from "react-swipeable-views";
import classNames from "classnames/bind";
import isSameWeek from "../utils/isSameWeek";
import UserContext from "../contexts/userContext";
import Box from "./Box";
import { useMediaQuery } from "react-responsive";
const cx = classNames.bind(styles);

const weekString = { 0: "이번주", 1: "다음주" };
const CLASSTIMESTRING = { 1: "first", 2: "second", 3: "third", 4: "fourth", 5: "fifth", 6: "sixth", 7: "seventh" };
const dayNameString = ["월요일", "화요일", "수요일", "목요일", "금요일"];
const dayNameStringShort = ["월", "화", "수", "목", "금"];

function getClassTime(timeTable, classTimeNum) {
    if (!timeTable) return { start: "", end: "" };
    return { start: timeTable[CLASSTIMESTRING[classTimeNum] + "_start"], end: timeTable[CLASSTIMESTRING[classTimeNum] + "_end"] };
}

function drawClasstimesOfDay(classTimeTable, day, isRemote, currentTimeTable, tempClassTime, isThisWeek) {
    return classTimeTable.map((classTime) => {
        if (classTime.dayOfWeek !== day) return null;
        const TODAY = new Date();
        const tempClass = tempClassTime.filter((time) => {
            if (isSameWeek(time.date, TODAY) === isThisWeek && new Date(time.date).getDay() === day) {
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
                    classtingURL={classTime.classtingURL}
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
                        classtingURL={classTime.classtingURL}
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
    for (let i = 0, day = MONDAY; i < 5; i++) {
        const possibleTable = timeTable.filter((table) => new Date(table.startdate + "T00:00:00+09:00").getTime() <= day.getTime());
        firstWeekTimeTable.push(possibleTable.slice(-1)[0]);
        day = new Date(day.getTime() + 24 * 60 * 60 * 1000);
    }
    for (let i = 0, day = NEXTMONDAY; i < 5; i++) {
        const possibleTable = timeTable.filter((table) => new Date(table.startdate + "T00:00:00+09:00").getTime() <= day.getTime());
        secondWeekTimeTable.push(possibleTable.slice(-1)[0]);
        day = new Date(day.getTime() + 24 * 60 * 60 * 1000);
    }
    return [firstWeekTimeTable, secondWeekTimeTable];
}

function getDefaultDayNum() {
    const day = new Date().getDay() - 1;
    if (day >= 0 && day <= 4) return day;
    return 0;
}

export default function Timetable() {
    const [timeTableList, setTimeTableList] = useState([]);
    const [classTimetable, setclassTimetable] = useState([]);
    const [tempClassTime, setTempClassTime] = useState([]);
    const { classroom } = useContext(ClassroomContext);
    const { isLogin } = useContext(UserContext);
    const [week, setWeek] = useState(0);
    const [weekDays, setWeekDays] = useState([
        { start: "0", end: "0" },
        { start: "0", end: "0" },
    ]);

    const [day, setDay] = useState(getDefaultDayNum());

    const isSmallScreen = useMediaQuery({ query: "(max-width: 320px)" });

    useEffect(() => {
        async function fetchTimetable() {
            try {
                const response = await axiosInstance.get("/apis/v2/timetable/");
                setTimeTableList(makeWeekTimeTable(response.data));
            } catch (e) {
                console.error(e);
            }
        }
        function getWeekDays() {
            const TODAY = new Date();
            const MONDAY = new Date(TODAY.getTime() - (TODAY.getDay() - 1) * 24 * 60 * 60 * 1000);
            const FRIDAY = new Date(MONDAY.getTime() + 4 * 24 * 60 * 60 * 1000);
            const NEXTMONDAY = new Date(MONDAY.getTime() + 7 * 24 * 60 * 60 * 1000);
            const NEXTFRIDAY = new Date(FRIDAY.getTime() + 7 * 24 * 60 * 60 * 1000);

            return [
                { start: MONDAY.getDate(), end: FRIDAY.getDate() },
                { start: NEXTMONDAY.getDate(), end: NEXTFRIDAY.getDate() },
            ];
        }
        fetchTimetable();
        setWeekDays(getWeekDays());
    }, []);

    useEffect(() => {
        async function fetchClassTimetable(classroom) {
            try {
                const response = await axiosInstance.get(`/apis/v2/timetable/classtime/${classroom.grade}/${classroom.room}/`);
                setclassTimetable(response.data);
            } catch (e) {
                console.error(e);
            }
        }
        async function fetchTempClassTime(classroom) {
            try {
                const response = await axiosInstance.get(`/apis/v2/timetable/tempclasstime/${classroom.grade}/${classroom.room}/`);
                setTempClassTime(response.data);
            } catch (e) {
                console.error(e);
            }
        }
        if (isLogin) {
            fetchClassTimetable(classroom);
            fetchTempClassTime(classroom);
        }
    }, [classroom, isLogin]);

    const toggleWeek = () => {
        if (week === 0) setWeek(1);
        else setWeek(0);
    };

    return (
        <Box className={styles.timetable}>
            <div className={styles.timetableHeading}>
                <div className={styles.weekDay}>{weekDays[week].start}일</div>
                <div onClick={toggleWeek} className={styles.weekButton}>
                    {weekString[week]}
                    <span className={styles.downArrow}>▼</span>
                </div>
                <div className={styles.weekDay}>{weekDays[week].end}일</div>
            </div>
            <div className={styles.dayContainer}>
                {isSmallScreen
                    ? dayNameStringShort.map((dayName, index) => {
                          return (
                              <button
                                  key={index}
                                  onClick={() => {
                                      setDay(index);
                                  }}
                                  className={cx(styles.day, day === index && styles.selectedDay)}
                              >
                                  {dayName}
                              </button>
                          );
                      })
                    : dayNameString.map((dayName, index) => {
                          return (
                              <button
                                  key={index}
                                  onClick={() => {
                                      setDay(index);
                                  }}
                                  className={cx(styles.day, day === index && styles.selectedDay)}
                              >
                                  {dayName}
                              </button>
                          );
                      })}
            </div>
            {isLogin ? (
                <>
                    <SwipeableViews
                        enableMouseEvents
                        hysteresis={0.4}
                        index={day}
                        resistance
                        onChangeIndex={(index) => {
                            setDay(index);
                        }}
                    >
                        {timeTableList[week]?.map((timeTable, idx) => {
                            return (
                                <div key={idx} className={styles.classDay}>
                                    {drawClasstimesOfDay(classTimetable, idx + 1, timeTable["is_remote"], timeTable.timetable, tempClassTime, !week)}
                                </div>
                            );
                        })}
                    </SwipeableViews>
                </>
            ) : (
                <div className={styles.notLogin}>재학생 로그인 후 이용 가능합니다.</div>
            )}
        </Box>
    );
}
