import { useState, useEffect, useContext } from "react";
import axiosInstance from "../utils/axiosInstance";
import styles from "./TimetableV2.module.scss";
import classNames from "classnames/bind";
import TimetableV2Item from "./TimetableV2Item";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import UserContext from "../contexts/userContext";
const cx = classNames.bind(styles);

const dayOfWeekShort = ["월", "화", "수", "목", "금"];
const dayOfWeek = ["월요일", "화요일", "수요일", "목요일", "금요일"];

const timeRegex = new RegExp("^[0-9]교시$");

const defaultLessonColor = "#ccc";

function RenderTimetableItems({ timetable, onSetFlexClassClick }) {
    if (!Array.isArray(timetable.days)) return;
    const maxRepeat = timetable.days.reduce((acc, cur) => acc + cur.length, 0);
    const renderArray = [];

    for (let row = 0; row * 5 < maxRepeat; row++) {
        const render = [];
        for (let i = 0; i < 5; i++) {
            const lesson = timetable.days[i][row];
            if (row >= timetable.days[i].length) continue;
            if (!timeRegex.test(lesson.name)) continue;
            if (lesson.class) {
                switch (lesson.class.type) {
                    case "static": {
                        render.push(
                            <div
                                key={String(i + 1) + "_" + String(row + 1)}
                                className={cx("timetable__item", "timetable__item--static")}
                                style={{ backgroundColor: lesson.class.color ?? defaultLessonColor }}
                            >
                                <div className={cx("item__name")}>{lesson.class.name}</div>
                                <div className={cx("item__description")}>{lesson.class.location}</div>
                            </div>
                        );
                        break;
                    }
                    case "flexible_not_chosen": {
                        render.push(
                            <>
                                <button
                                    key={String(i + 1) + "_" + String(lesson.time)}
                                    onClick={() => {
                                        onSetFlexClassClick(i, lesson.time);
                                    }}
                                    className={cx("timetable__item", "timetable__item--flexible-not-chosen")}
                                    style={{ backgroundColor: defaultLessonColor }}
                                >
                                    <div>이동수업을 선택하세요.</div>
                                </button>
                            </>
                        );
                        break;
                    }
                    case "flexible": {
                        render.push(
                            <div
                                key={String(i + 1) + "_" + String(row + 1)}
                                className={cx("timetable__item", "timetable__item--static")}
                                style={{ backgroundColor: lesson.class.color ?? defaultLessonColor }}
                            >
                                <div className={cx("item__name")}>{lesson.class.name}</div>
                                <div className={cx("item__description")}>{lesson.class.location}</div>
                            </div>
                        );
                        break;
                    }
                    case "time_not_chosen": {
                        render.push(
                            <Link
                                key={String(i + 1) + "_" + String(row + 1)}
                                to="/settings"
                                className={cx("timetable__item", "timetable__item--time-not-chosen")}
                                style={{ backgroundColor: defaultLessonColor }}
                            >
                                <div>설정 페이지에서 타임형 수업을 선택하세요.</div>
                            </Link>
                        );
                        break;
                    }
                    case "time": {
                        render.push(
                            <div
                                key={String(i + 1) + "_" + String(row + 1)}
                                className={cx("timetable__item", "timetable__item--static")}
                                style={{ backgroundColor: lesson.class.color ?? defaultLessonColor }}
                            >
                                <div className={cx("item__name")}>{lesson.class.name}</div>
                                <div className={cx("item__description")}>
                                    <span className={cx("time")}>{lesson.class.time}타임, </span>
                                    <span>{lesson.class.location}</span>
                                </div>
                            </div>
                        );
                    }
                }
            } else {
                render.push(
                    <div key={String(i + 1) + "_" + String(row + 1)} className={cx("timetable__item", "timetable__item--empty")} style={{ backgroundColor: defaultLessonColor }}>
                        <div>수업이 없습니다.</div>
                    </div>
                );
            }
        }
        if (render.length > 0) {
            renderArray.push(render);
        }
    }

    return renderArray.map((row, rowIndex) => (
        <div key={rowIndex} className={cx("timetable__row")}>
            {row}
        </div>
    ));
}

export default function Timetable() {
    const [timetable, setTimetable] = useState(null);
    const [refetchTimetable, setRefetchTimetable] = useState(Date.now());

    const [selectFlexClassInfo, setSelectFlexClassInfo] = useState({ day: null, time: null });
    const [isSelectFlexClassModalOpen, setIsSelectFlexClassModalOpen] = useState(false);
    const [flexClassList, setFlexClassList] = useState([]);

    const { user } = useContext(UserContext);

    useEffect(() => {
        async function fetchTimetable() {
            try {
                const response = await axiosInstance.get("/apis/v2/timetablev2/");
                setTimetable(response.data);
            } catch (e) {
                console.error(e);
            }
        }
        fetchTimetable();
    }, [refetchTimetable]);

    useEffect(() => {
        const fetchPossibleFlexClassList = async () => {
            try {
                const response = await axiosInstance.get(`/apis/v2/timetablev2/flexclasses/?day=${selectFlexClassInfo.day}&time=${selectFlexClassInfo.time}`);
                setFlexClassList(response.data);
            } catch (e) {
                console.log(e);
            }
        };

        if (selectFlexClassInfo.day === null || selectFlexClassInfo.time === null) return;

        setFlexClassList([]);
        fetchPossibleFlexClassList();
    }, [selectFlexClassInfo]);

    if (!user.classroom) return <div>설정에서 학년반을 설정해주세요.</div>;

    if (timetable) {
        return (
            <>
                <div className={cx("timetable")}>
                    <div className={cx("timetable__dayName")}>
                        {dayOfWeek.map((day, index) => (
                            <div className={cx("dayName")} key={index}>
                                {day}
                            </div>
                        ))}
                    </div>
                    <div className={cx("timetable__contents")}>
                        {/* {timetable.days.map((timesOfDay, day) => {
                        return (
                            <div key={day} className={cx("timetable__column")}>
                                {timesOfDay.map((lesson, index) => {
                                    if (timeRegex.test(lesson.name)) {
                                        return (
                                            <div key={index} className={cx("timetable__item")} style={{ backgroundColor: lesson?.class?.color }}>
                                                {lesson?.class?.name}
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        );
                    })} */}
                        <RenderTimetableItems
                            timetable={timetable}
                            onSetFlexClassClick={(day, time) => {
                                setSelectFlexClassInfo({ day, time });
                                setIsSelectFlexClassModalOpen(true);
                            }}
                        />
                    </div>
                </div>
                <Modal
                    open={isSelectFlexClassModalOpen}
                    onClose={(e, reason) => {
                        setIsSelectFlexClassModalOpen(false);
                    }}
                >
                    <div className={cx("flexClassSetModal")}>
                        {flexClassList.map((_class, idx) => (
                            <button
                                key={_class.timetableitem_id}
                                onClick={async () => {
                                    setIsSelectFlexClassModalOpen(false);
                                    try {
                                        await axiosInstance.post(`/apis/v2/timetablev2/flexclasses/`, {
                                            timetable_id: _class.timetableitem_id,
                                        });
                                        setRefetchTimetable(Date.now());
                                    } catch (e) {
                                        console.error(e);
                                    }
                                }}
                            >{`${_class.location} ${_class.name}`}</button>
                        ))}
                    </div>
                </Modal>
            </>
        );
    } else {
        return <div></div>;
    }
}
