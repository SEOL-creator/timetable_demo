import { useState, useEffect, useContext } from "react";
import ClassroomContext from "../contexts/classroomContext";
import axiosInstance from "../utils/axiosInstance";
import SmallClass from "./SmallClass";
import styles from "./SmallTimetable.module.css";

const weekString = { 1: "이번주", 2: "다음주" };
const CLASSTIMESTRING = { 1: "first", 2: "second", 3: "third", 4: "fourth", 5: "fifth", 6: "sixth", 7: "seventh" };

function getClassTime(timeTable, classTimeNum) {
    return { start: timeTable[CLASSTIMESTRING[classTimeNum] + "_start"], end: timeTable[CLASSTIMESTRING[classTimeNum] + "_end"] };
}

function drawClasstimesOfDay(classTimeTable, day, isRemote, currentTimeTable) {
    return classTimeTable.map((classTime) => {
        if (classTime.dayOfWeek !== day) return;
        return (
            <SmallClass
                key={String(classTime.dayOfWeek) + String(classTime.time)}
                classObj={classTime._class}
                isRemote={isRemote}
                remoteURL={classTime._class.remoteURL}
                startTime={getClassTime(currentTimeTable, classTime.time).start}
                endTime={getClassTime(currentTimeTable, classTime.time).end}
            />
        );
    });
}

export default function Timetable() {
    const [isLoading, setIsLoading] = useState(true);
    const [timeTableList, setTimeTableList] = useState([]);
    const [classTimetable, setclassTimetable] = useState([]);
    const { classroom } = useContext(ClassroomContext);
    const [week, setWeek] = useState(1);
    const [currentTimeTable, setCurrentTimeTable] = useState({});

    useEffect(() => {
        async function fetchTimetable() {
            try {
                const response = await axiosInstance.get("/apis/timetable/");
                setTimeTableList(response.data);
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
        fetchClassTimetable(classroom);
    }, [classroom]);

    useEffect(() => {
        setCurrentTimeTable(timeTableList[0]);
    }, [timeTableList]);

    if (isLoading) return <div>Loading...</div>;

    console.log(currentTimeTable);

    return (
        <div className={styles.timetable}>
            <div className={styles.timetableHeading}>
                <div>
                    {weekString[week]}
                    <span className={styles.downArrow}>▼</span>
                </div>
            </div>
            <div>월요일 화요일 수요일 ...</div>
            <div>
                <div>{drawClasstimesOfDay(classTimetable, 1, false, currentTimeTable.timetable)}</div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}
