import { Skeleton } from "@mui/material";
import { useContext, useState } from "react";
import TodayTimetableContext from "../contexts/todayTimetableContext";
import useInterval from "../hooks/useInterval";
import useTimer from "../hooks/useTimer";
import styles from "./HeaderTitle.module.css";

const strings = {
    saturday: ["즐거운 토요일"],
    sunday: ["내일은 월요일 :)"],
    morning: ["자가진단"],
    beforeGoingToSchool: ["지각하지 않기!"],
    beforeLaunch: ["오늘의 점심은?"],
    duringLaunch: ["오늘의 점심은?"],
    duringBreak: ["쉬는시간"],
    afterSchool: ["학교 끝!"],
    afternoon: [],
};

const getRandomInt = (num) => {
    return Math.floor(Math.random() * num);
};

const getRandomString = (key) => {
    if (!strings[key] || strings[key].length < 1) {
        return "";
    }
    return strings[key][getRandomInt(strings[key].length)];
};

function diffTimeString(a, b) {
    if (a.split(":")[0] - b.split(":")[0] > 0) return -1;
    else if (a.split(":")[0] - b.split(":")[0] < 0) return 1;
    else {
        if (a.split(":")[1] - b.split(":")[1] > 0) return -1;
        else if (a.split(":")[1] - b.split(":")[1] < 0) return 1;
        else return 0;
    }
}

function getCurrentState(timetable, today) {
    const currentTimeString = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    if (diffTimeString(currentTimeString, timetable[0].start) > 0) {
        const prev = null;
        const current = null;
        const next = timetable[0];
        return { prev, current, next };
    }
    for (let i = 0; i < timetable.length; i++) {
        const startString = timetable[i].start;
        const endString = timetable[i].end;
        if (diffTimeString(startString, currentTimeString) >= 1 && diffTimeString(currentTimeString, endString) >= 1) {
            const prev = i > 0 ? timetable[i - 1] : null;
            const current = timetable[i];
            const next = i < timetable.length - 1 ? timetable[i + 1] : null;
            return { prev, current, next };
        } else if (i < timetable.length - 1 && diffTimeString(endString, currentTimeString) >= 1 && diffTimeString(currentTimeString, timetable[i + 1].start) > 0) {
            const prev = i > 0 ? timetable[i - 1] : null;
            const current = null;
            const next = timetable[i + 1];
            return { prev, current, next };
        }
    }
    return null;
}

export default function HeaderTitle() {
    const [isLoading, setIsLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [timerTargetDate, setTimerTargetDate] = useState(new Date());

    const todayTimetable = useContext(TodayTimetableContext);

    const classTimer = useTimer(new Date(), timerTargetDate);

    useInterval(() => {
        const today = new Date();
        if (today.getDay() === 0) {
            setTitle(getRandomString("sunday"));
            setSubtitle(null);
            setIsLoading(false);
            return;
        } else if (today.getDay() === 6) {
            setTitle(getRandomString("saturday"));
            setSubtitle(null);
            setIsLoading(false);
            return;
        }
        const state = getCurrentState(todayTimetable.timetable, today);
        if (!state) {
            setIsLoading(true);
            return;
        }
        if (state.prev === null && state.current === null && state.next) {
            if (parseInt(state.next.start.split(":")[0]) * 60 + parseInt(state.next.start.split(":")[1]) - (today.getHours() * 60 + today.getMinutes()) <= 10) {
                setTitle(getRandomString("beforeGoingToSchool"));
                setTimerTargetDate(new Date(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${state.next.start}`));
                setSubtitle(classTimer);
            } else {
                setTitle(getRandomString("morning"));
                setSubtitle(null);
            }
        }
        if (state.current) {
            if (state.current.type === "class") {
                if (
                    state.next &&
                    state.next.type === "lunch" &&
                    parseInt(state.next.start.split(":")[0]) * 60 + parseInt(state.next.start.split(":")[0]) - (today.getHours() * 60 + today.getMinutes()) <= 30 * 60
                ) {
                    setTitle(`${state.current.class.name} 수업중`);
                    setTimerTargetDate(new Date(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${state.current.end}`));
                    setSubtitle(`점심시간까지 ${classTimer}!`);
                } else {
                    setTitle(`${state.current.class.name} 수업중`);
                    setTimerTargetDate(new Date(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${state.current.end}`));
                    setSubtitle(`${classTimer} 후 쉬는시간`);
                }
            }
            if (state.current.type === "lunch") {
                setTitle(getRandomString("duringLaunch"));
                setTimerTargetDate(new Date(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${state.current.end}`));
                setSubtitle(`${classTimer} 남음`);
            }
            if (state.current.type === "morning_meeting") {
                setTitle("아침조회");
                setSubtitle(null);
            }
            if (state.current.type === "prepare") {
                setTitle("수업 시작까지");
                setTimerTargetDate(new Date(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${state.next.start}`));
                setSubtitle(classTimer);
            }
            if (state.current.type === "dinner") {
                setTitle("석식");
                setSubtitle(null);
            }
        } else if (!state.current) {
            if (state.next.type === "class") {
                setTitle(`${state.next.class.name} 시작까지`);
                setTimerTargetDate(new Date(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${state.next.start}`));
                setSubtitle(classTimer);
            }
        }
        setIsLoading(false);
    }, 1000);

    return (
        <div className={styles.titleContainer}>
            {isLoading ? (
                <>
                    <span className={styles.title}>
                        <Skeleton animation="wave" width={100} />
                    </span>
                    <span className={styles.subtitle}>
                        <Skeleton animation="wave" width={60} />
                    </span>
                </>
            ) : (
                <>
                    <span className={styles.title}>{title}</span>
                    <span className={styles.subtitle}>{subtitle}</span>
                </>
            )}
        </div>
    );
}
