import { useState, useEffect, useContext } from "react";
import ClassroomContext from "../contexts/classroomContext";
import axiosInstance from "../utils/axiosInstance";
import SmallClass from "./SmallClass";
import styles from "./SmallTimetableV2.module.scss";
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

const classTimeNameRegex = new RegExp("^[0-9]교시$");

function getDefaultDayNum() {
    const day = new Date().getDay() - 1;
    if (day >= 0 && day <= 4) return day;
    return 0;
}

export default function SmallTimetabbleV2() {
    const [timetable, setTimetable] = useState([]);
    const { user } = useContext(UserContext);
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
                const response = await axiosInstance.get("/apis/v2/timetablev2/");
                setTimetable(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        if (!isLogin) return;
        fetchTimetable();
    }, [isLogin]);

    useEffect(() => {
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
        setWeekDays(getWeekDays());
    }, []);

    const toggleWeek = () => {
        if (week === 0) setWeek(1);
        else setWeek(0);
    };

    if (!user?.classroom) return <div>설정에서 학년반을 설정해주세요.</div>;

    return (
        <Box className={styles.timetable}>
            <div className={styles.timetableHeading}>
                <div className={styles.weekDay}>{weekDays[week].start}일</div>
                {/* <div onClick={toggleWeek} className={styles.weekButton}>
                    {weekString[week]}
                    <span className={styles.downArrow}>▼</span>
                </div> */}
                <div className={styles.weekButton}>이번주</div>
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
                        {timetable?.days?.map((classes, dayIndex) => {
                            return (
                                <div key={dayIndex} className={styles.classDay}>
                                    {classes.map((_class, classIndex) => {
                                        if (!classTimeNameRegex.test(_class.name)) return null;
                                        if (!_class.class) return null;
                                        if (_class.class.type !== "static" && _class.class.type !== "flexible" && _class.class.type !== "time" && _class.class.type !== "temp") return null;
                                        return (
                                            <SmallClass key={String(dayIndex) + "_" + _class.name} classObj={_class.class} isRemote={false} startTime={_class.start_time} endTime={_class.end_time} />
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </SwipeableViews>
                </>
            ) : (
                <div className={styles.notLogin}>로그인 후 이용 가능합니다.</div>
            )}
        </Box>
    );
}
