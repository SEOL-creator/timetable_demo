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
    const [timetable, setTimetable] = useState({
        classroom: "3학년 1반",
        days: [
            [
                {
                    name: "조회",
                    start_time: "08:50:00",
                    end_time: "09:00:00",
                    class: null,
                },
                {
                    name: "1교시",
                    start_time: "09:10:00",
                    end_time: "09:55:00",
                    time: 1,
                    class: {
                        type: "time",
                        name: "세계사",
                        short_name: "세계사",
                        teacher: {
                            id: 1,
                            name: "교사명",
                        },
                        location: "3학년 3반",
                        color: "#fcb345",
                        replaced: false,
                        time: "A",
                    },
                },
                {
                    name: "쉬는시간",
                    start_time: "09:55:00",
                    end_time: "10:05:00",
                    class: null,
                },
                {
                    name: "2교시",
                    start_time: "10:05:00",
                    end_time: "10:50:00",
                    time: 2,
                    class: {
                        type: "time",
                        name: "데이터",
                        short_name: "데이터",
                        teacher: {
                            id: 1,
                            name: "교사명",
                        },
                        location: "3학년 3반",
                        color: "#8dde4f",
                        replaced: false,
                        time: "B",
                    },
                },
                {
                    name: "쉬는시간",
                    start_time: "10:50:00",
                    end_time: "11:00:00",
                    class: null,
                },
                {
                    name: "3교시",
                    start_time: "11:00:00",
                    end_time: "11:45:00",
                    time: 3,
                    class: {
                        type: "static",
                        name: "심화영어I A",
                        short_name: "심영IA",
                        teacher: {
                            id: 1,
                            name: "교사명",
                        },
                        location: "3학년 1반",
                        color: "#c83a3a",
                        replaced: false,
                    },
                },
                {
                    name: "점심",
                    start_time: "11:45:00",
                    end_time: "13:05:00",
                    class: null,
                },
                {
                    name: "4교시",
                    start_time: "13:05:00",
                    end_time: "13:50:00",
                    time: 4,
                    class: {
                        type: "static",
                        name: "화학Ⅱ",
                        short_name: "화Ⅱ",
                        teacher: {
                            id: 1,
                            name: "교사명",
                        },
                        location: "3학년 1반",
                        color: "#d964a4",
                        replaced: false,
                    },
                },
                {
                    name: "쉬는시간",
                    start_time: "13:50:00",
                    end_time: "14:00:00",
                    class: null,
                },
                {
                    name: "5교시",
                    start_time: "14:00:00",
                    end_time: "14:45:00",
                    time: 5,
                    class: {
                        type: "static",
                        name: "심화영어I B",
                        short_name: "심영IB",
                        teacher: {
                            id: 1,
                            name: "교사명",
                        },
                        location: "3학년 1반",
                        color: "#a91a27",
                        replaced: false,
                    },
                },
                {
                    name: "쉬는시간",
                    start_time: "14:45:00",
                    end_time: "14:55:00",
                    class: null,
                },
                {
                    name: "6교시",
                    start_time: "14:55:00",
                    end_time: "15:40:00",
                    time: 6,
                    class: {
                        type: "static",
                        name: "확률과 통계",
                        short_name: "확통",
                        teacher: {
                            id: 1,
                            name: "교사명",
                        },
                        location: "3학년 1반",
                        color: "#e8554f",
                        replaced: false,
                    },
                },
                {
                    name: "쉬는시간",
                    start_time: "15:40:00",
                    end_time: "15:50:00",
                    class: null,
                },
                {
                    name: "7교시",
                    start_time: "15:50:00",
                    end_time: "16:35:00",
                    time: 7,
                    class: {
                        type: "static",
                        name: "자율",
                        short_name: "자율",
                        teacher: {
                            id: 1,
                            name: "교사명",
                        },
                        location: "3학년 1반",
                        color: "#777777",
                        replaced: false,
                    },
                },
                {
                    name: "청소 및 종례",
                    start_time: "16:35:00",
                    end_time: "16:50:00",
                    class: null,
                },
                {
                    name: "석식",
                    start_time: "16:50:00",
                    end_time: "17:50:00",
                    class: null,
                },
                {
                    name: "야자 1교시",
                    start_time: "17:50:00",
                    end_time: "19:50:00",
                    class: null,
                },
                {
                    name: "야자 2교시",
                    start_time: "20:00:00",
                    end_time: "21:30:00",
                    class: null,
                },
            ],
            [
                {
                    name: "조회",
                    start_time: "08:50:00",
                    end_time: "09:00:00",
                    class: null,
                },
                {
                    name: "1교시",
                    start_time: "09:10:00",
                    end_time: "09:55:00",
                    time: 1,
                    class: {
                        type: "static",
                        name: "화학Ⅱ",
                        short_name: "화Ⅱ",
                        teacher: {
                            id: 1,
                            name: "교사명",
                        },
                        location: "3학년 1반",
                        color: "#d964a4",
                        replaced: true,
                    },
                },
                {
                    name: "쉬는시간",
                    start_time: "09:55:00",
                    end_time: "10:05:00",
                    class: null,
                },
                {
                    name: "2교시",
                    start_time: "10:05:00",
                    end_time: "10:50:00",
                    time: 2,
                    class: {
                        type: "flexible",
                        name: "미적분",
                        short_name: "미적",
                        teacher: {
                            id: 1,
                            name: "교사명",
                        },
                        location: "3학년 2반",
                        color: "#e8554f",
                        replaced: true,
                    },
                },
                {
                    name: "쉬는시간",
                    start_time: "10:50:00",
                    end_time: "11:00:00",
                    class: null,
                },
                {
                    name: "3교시",
                    start_time: "11:00:00",
                    end_time: "11:45:00",
                    time: 3,
                    class: {
                        type: "static",
                        name: "심화국어 B",
                        short_name: "심국B",
                        teacher: {
                            id: 1,
                            name: "교사명",
                        },
                        location: "3학년 1반",
                        color: "#db7f28",
                        replaced: true,
                    },
                },
                {
                    name: "점심",
                    start_time: "11:45:00",
                    end_time: "13:05:00",
                    class: null,
                },
                {
                    name: "4교시",
                    start_time: "13:05:00",
                    end_time: "13:50:00",
                    time: 4,
                    class: {
                        type: "time",
                        name: "세계사",
                        short_name: "세계사",
                        teacher: {
                            id: 1,
                            name: "교사명",
                        },
                        location: "3학년 3반",
                        color: "#fcb345",
                        replaced: true,
                        time: "A",
                    },
                },
                {
                    name: "쉬는시간",
                    start_time: "13:50:00",
                    end_time: "14:00:00",
                    class: null,
                },
                {
                    name: "5교시",
                    start_time: "14:00:00",
                    end_time: "14:45:00",
                    time: 5,
                    class: {
                        type: "static",
                        name: "진로",
                        short_name: "진로",
                        teacher: {
                            id: 1,
                            name: "교사명",
                        },
                        location: "3학년 1반",
                        color: "#5f5f5f",
                        replaced: true,
                    },
                },
                {
                    name: "쉬는시간",
                    start_time: "14:45:00",
                    end_time: "14:55:00",
                    class: null,
                },
                {
                    name: "6교시",
                    start_time: "14:55:00",
                    end_time: "15:40:00",
                    time: 6,
                    class: {
                        type: "static",
                        name: "운동과 건강",
                        short_name: "운동",
                        teacher: {
                            id: 1,
                            name: "교사명",
                        },
                        location: "3학년 1반",
                        color: "#4972db",
                        replaced: true,
                    },
                },
                {
                    name: "쉬는시간",
                    start_time: "15:40:00",
                    end_time: "15:50:00",
                    class: null,
                },
                {
                    name: "7교시",
                    start_time: "15:50:00",
                    end_time: "16:35:00",
                    time: 7,
                    class: {
                        type: "static",
                        name: "심화국어 A",
                        short_name: "심국A",
                        teacher: {
                            id: 1,
                            name: "교사명",
                        },
                        location: "3학년 1반",
                        color: "#fcb345",
                        replaced: true,
                    },
                },
                {
                    name: "청소 및 종례",
                    start_time: "16:35:00",
                    end_time: "16:50:00",
                    class: null,
                },
                {
                    name: "석식",
                    start_time: "16:50:00",
                    end_time: "17:50:00",
                    class: null,
                },
                {
                    name: "야자 1교시",
                    start_time: "17:50:00",
                    end_time: "19:50:00",
                    class: null,
                },
                {
                    name: "야자 2교시",
                    start_time: "20:00:00",
                    end_time: "21:30:00",
                    class: null,
                },
            ],
            [
                {
                    name: "조회",
                    start_time: "08:50:00",
                    end_time: "09:00:00",
                    class: null,
                },
                {
                    name: "1교시",
                    start_time: "09:10:00",
                    end_time: "09:55:00",
                    time: 1,
                    class: {
                        type: "time",
                        name: "지구과학II",
                        short_name: "지구II",
                        teacher: {
                            id: 1,
                            name: "교사명",
                        },
                        location: "3학년 3반",
                        color: "#fccb4a",
                        replaced: false,
                        time: "D",
                    },
                },
                {
                    name: "쉬는시간",
                    start_time: "09:55:00",
                    end_time: "10:05:00",
                    class: null,
                },
                {
                    name: "2교시",
                    start_time: "10:05:00",
                    end_time: "10:50:00",
                    time: 2,
                    class: {
                        type: "static",
                        name: "물리학 Ⅱ",
                        short_name: "물II",
                        teacher: {
                            id: 1,
                            name: "교사명",
                        },
                        location: "3학년 1반",
                        color: "#8e49c0",
                        replaced: false,
                    },
                },
                {
                    name: "쉬는시간",
                    start_time: "10:50:00",
                    end_time: "11:00:00",
                    class: null,
                },
                {
                    name: "3교시",
                    start_time: "11:00:00",
                    end_time: "11:45:00",
                    time: 3,
                    class: {
                        type: "time",
                        name: "사회문화탐구",
                        short_name: "사문탐",
                        teacher: {
                            id: 1,
                            name: "교사명",
                        },
                        location: "3학년 3반",
                        color: "#aa61de",
                        replaced: false,
                        time: "C",
                    },
                },
                {
                    name: "점심",
                    start_time: "11:45:00",
                    end_time: "13:05:00",
                    class: null,
                },
                {
                    name: "4교시",
                    start_time: "13:05:00",
                    end_time: "13:50:00",
                    time: 4,
                    class: {
                        type: "static",
                        name: "화학Ⅱ",
                        short_name: "화Ⅱ",
                        teacher: {
                            id: 1,
                            name: "교사명",
                        },
                        location: "3학년 1반",
                        color: "#d964a4",
                        replaced: false,
                    },
                },
                {
                    name: "쉬는시간",
                    start_time: "13:50:00",
                    end_time: "14:00:00",
                    class: null,
                },
                {
                    name: "5교시",
                    start_time: "14:00:00",
                    end_time: "14:45:00",
                    time: 5,
                    class: {
                        type: "static",
                        name: "동아리",
                        short_name: "동아리",
                        teacher: {
                            id: 1,
                            name: "교사명",
                        },
                        location: "3학년 1반",
                        color: "#909090",
                        replaced: false,
                    },
                },
                {
                    name: "쉬는시간",
                    start_time: "14:45:00",
                    end_time: "14:55:00",
                    class: null,
                },
                {
                    name: "6교시",
                    start_time: "14:55:00",
                    end_time: "15:40:00",
                    time: 6,
                    class: {
                        type: "static",
                        name: "동아리",
                        short_name: "동아리",
                        teacher: {
                            id: 1,
                            name: "교사명",
                        },
                        location: "3학년 1반",
                        color: "#909090",
                        replaced: false,
                    },
                },
                {
                    name: "쉬는시간",
                    start_time: "15:40:00",
                    end_time: "15:50:00",
                    class: null,
                },
                {
                    name: "7교시",
                    start_time: "15:50:00",
                    end_time: "16:35:00",
                    time: 7,
                    class: {
                        type: "",
                        name: "",
                        short_name: "",
                        teacher: {
                            id: "",
                            name: "",
                        },
                        location: "",
                        color: "",
                        replaced: false,
                    },
                },
                {
                    name: "청소 및 종례",
                    start_time: "16:35:00",
                    end_time: "16:50:00",
                    class: null,
                },
                {
                    name: "석식",
                    start_time: "16:50:00",
                    end_time: "17:50:00",
                    class: null,
                },
                {
                    name: "야자 1교시",
                    start_time: "17:50:00",
                    end_time: "19:50:00",
                    class: null,
                },
                {
                    name: "야자 2교시",
                    start_time: "20:00:00",
                    end_time: "21:30:00",
                    class: null,
                },
            ],
            [
                {
                    name: "조회",
                    start_time: "08:50:00",
                    end_time: "09:00:00",
                    class: null,
                },
                {
                    name: "1교시",
                    start_time: "09:10:00",
                    end_time: "09:55:00",
                    time: 1,
                    class: {
                        type: "static",
                        name: "화학Ⅱ",
                        short_name: "화Ⅱ",
                        teacher: {
                            id: 1,
                            name: "교사명",
                        },
                        location: "3학년 1반",
                        color: "#d964a4",
                        replaced: false,
                    },
                },
                {
                    name: "쉬는시간",
                    start_time: "09:55:00",
                    end_time: "10:05:00",
                    class: null,
                },
                {
                    name: "2교시",
                    start_time: "10:05:00",
                    end_time: "10:50:00",
                    time: 2,
                    class: {
                        type: "flexible",
                        name: "미적분",
                        short_name: "미적",
                        teacher: {
                            id: 1,
                            name: "교사명",
                        },
                        location: "3학년 2반",
                        color: "#e8554f",
                        replaced: false,
                    },
                },
                {
                    name: "쉬는시간",
                    start_time: "10:50:00",
                    end_time: "11:00:00",
                    class: null,
                },
                {
                    name: "3교시",
                    start_time: "11:00:00",
                    end_time: "11:45:00",
                    time: 3,
                    class: {
                        type: "static",
                        name: "심화국어 B",
                        short_name: "심국B",
                        teacher: {
                            id: 1,
                            name: "교사명",
                        },
                        location: "3학년 1반",
                        color: "#db7f28",
                        replaced: false,
                    },
                },
                {
                    name: "점심",
                    start_time: "11:45:00",
                    end_time: "13:05:00",
                    class: null,
                },
                {
                    name: "4교시",
                    start_time: "13:05:00",
                    end_time: "13:50:00",
                    time: 4,
                    class: {
                        type: "time",
                        name: "세계사",
                        short_name: "세계사",
                        teacher: {
                            id: 1,
                            name: "교사명",
                        },
                        location: "3학년 3반",
                        color: "#fcb345",
                        replaced: false,
                        time: "A",
                    },
                },
                {
                    name: "쉬는시간",
                    start_time: "13:50:00",
                    end_time: "14:00:00",
                    class: null,
                },
                {
                    name: "5교시",
                    start_time: "14:00:00",
                    end_time: "14:45:00",
                    time: 5,
                    class: {
                        type: "static",
                        name: "진로",
                        short_name: "진로",
                        teacher: {
                            id: 1,
                            name: "교사명",
                        },
                        location: "3학년 1반",
                        color: "#5f5f5f",
                        replaced: false,
                    },
                },
                {
                    name: "쉬는시간",
                    start_time: "14:45:00",
                    end_time: "14:55:00",
                    class: null,
                },
                {
                    name: "6교시",
                    start_time: "14:55:00",
                    end_time: "15:40:00",
                    time: 6,
                    class: {
                        type: "static",
                        name: "운동과 건강",
                        short_name: "운동",
                        teacher: {
                            id: 1,
                            name: "교사명",
                        },
                        location: "3학년 1반",
                        color: "#4972db",
                        replaced: false,
                    },
                },
                {
                    name: "쉬는시간",
                    start_time: "15:40:00",
                    end_time: "15:50:00",
                    class: null,
                },
                {
                    name: "7교시",
                    start_time: "15:50:00",
                    end_time: "16:35:00",
                    time: 7,
                    class: {
                        type: "static",
                        name: "심화국어 A",
                        short_name: "심국A",
                        teacher: {
                            id: 1,
                            name: "교사명",
                        },
                        location: "3학년 1반",
                        color: "#fcb345",
                        replaced: false,
                    },
                },
                {
                    name: "청소 및 종례",
                    start_time: "16:35:00",
                    end_time: "16:50:00",
                    class: null,
                },
                {
                    name: "석식",
                    start_time: "16:50:00",
                    end_time: "17:50:00",
                    class: null,
                },
                {
                    name: "야자 1교시",
                    start_time: "17:50:00",
                    end_time: "19:50:00",
                    class: null,
                },
                {
                    name: "야자 2교시",
                    start_time: "20:00:00",
                    end_time: "21:30:00",
                    class: null,
                },
            ],
            [
                {
                    name: "조회",
                    start_time: "08:50:00",
                    end_time: "09:00:00",
                    class: null,
                },
                {
                    name: "1교시",
                    start_time: "09:10:00",
                    end_time: "09:55:00",
                    time: 1,
                    class: {
                        type: "time",
                        name: "지구과학II",
                        short_name: "지구II",
                        teacher: {
                            id: 1,
                            name: "교사명",
                        },
                        location: "3학년 3반",
                        color: "#fccb4a",
                        replaced: false,
                        time: "D",
                    },
                },
                {
                    name: "쉬는시간",
                    start_time: "09:55:00",
                    end_time: "10:05:00",
                    class: null,
                },
                {
                    name: "2교시",
                    start_time: "10:05:00",
                    end_time: "10:50:00",
                    time: 2,
                    class: {
                        type: "static",
                        name: "확률과 통계",
                        short_name: "확통",
                        teacher: {
                            id: 1,
                            name: "교사명",
                        },
                        location: "3학년 1반",
                        color: "#e8554f",
                        replaced: false,
                    },
                },
                {
                    name: "쉬는시간",
                    start_time: "10:50:00",
                    end_time: "11:00:00",
                    class: null,
                },
                {
                    name: "3교시",
                    start_time: "11:00:00",
                    end_time: "11:45:00",
                    time: 3,
                    class: {
                        type: "flexible",
                        name: "미적분",
                        short_name: "미적",
                        teacher: {
                            id: 1,
                            name: "교사명",
                        },
                        location: "3학년 2반",
                        color: "#e8554f",
                        replaced: false,
                    },
                },
                {
                    name: "점심",
                    start_time: "11:45:00",
                    end_time: "13:05:00",
                    class: null,
                },
                {
                    name: "4교시",
                    start_time: "13:05:00",
                    end_time: "13:50:00",
                    time: 4,
                    class: {
                        type: "static",
                        name: "심화영어I A",
                        short_name: "심영IA",
                        teacher: {
                            id: 1,
                            name: "교사명",
                        },
                        location: "3학년 1반",
                        color: "#c83a3a",
                        replaced: false,
                    },
                },
                {
                    name: "쉬는시간",
                    start_time: "13:50:00",
                    end_time: "14:00:00",
                    class: null,
                },
                {
                    name: "5교시",
                    start_time: "14:00:00",
                    end_time: "14:45:00",
                    time: 5,
                    class: {
                        type: "time",
                        name: "데이터",
                        short_name: "데이터",
                        teacher: {
                            id: 1,
                            name: "교사명",
                        },
                        location: "3학년 3반",
                        color: "#8dde4f",
                        replaced: false,
                        time: "B",
                    },
                },
                {
                    name: "쉬는시간",
                    start_time: "14:45:00",
                    end_time: "14:55:00",
                    class: null,
                },
                {
                    name: "6교시",
                    start_time: "14:55:00",
                    end_time: "15:40:00",
                    time: 6,
                    class: {
                        type: "static",
                        name: "물리학 Ⅱ",
                        short_name: "물II",
                        teacher: {
                            id: 1,
                            name: "교사명",
                        },
                        location: "3학년 1반",
                        color: "#8e49c0",
                        replaced: false,
                    },
                },
                {
                    name: "쉬는시간",
                    start_time: "15:40:00",
                    end_time: "15:50:00",
                    class: null,
                },
                {
                    name: "7교시",
                    start_time: "15:50:00",
                    end_time: "16:35:00",
                    time: 7,
                    class: {
                        type: "static",
                        name: "운동과 건강",
                        short_name: "운동",
                        teacher: {
                            id: 1,
                            name: "교사명",
                        },
                        location: "3학년 1반",
                        color: "#4972db",
                        replaced: false,
                    },
                },
                {
                    name: "청소 및 종례",
                    start_time: "16:35:00",
                    end_time: "16:50:00",
                    class: null,
                },
                {
                    name: "석식",
                    start_time: "16:50:00",
                    end_time: "17:50:00",
                    class: null,
                },
                {
                    name: "야자 1교시",
                    start_time: "17:50:00",
                    end_time: "19:50:00",
                    class: null,
                },
                {
                    name: "야자 2교시",
                    start_time: "20:00:00",
                    end_time: "21:30:00",
                    class: null,
                },
            ],
        ],
    });
    const [refetchTimetable, setRefetchTimetable] = useState(Date.now());

    const [selectFlexClassInfo, setSelectFlexClassInfo] = useState({ day: null, time: null });
    const [isSelectFlexClassModalOpen, setIsSelectFlexClassModalOpen] = useState(false);
    const [flexClassList, setFlexClassList] = useState([]);

    const { user } = useContext(UserContext);

    useEffect(() => {
        async function fetchTimetable() {
            try {
                setTimetable({
                    classroom: "3학년 1반",
                    days: [
                        [
                            {
                                name: "조회",
                                start_time: "08:50:00",
                                end_time: "09:00:00",
                                class: null,
                            },
                            {
                                name: "1교시",
                                start_time: "09:10:00",
                                end_time: "09:55:00",
                                time: 1,
                                class: {
                                    type: "time",
                                    name: "세계사",
                                    short_name: "세계사",
                                    teacher: {
                                        id: 1,
                                        name: "교사명",
                                    },
                                    location: "3학년 3반",
                                    color: "#fcb345",
                                    replaced: false,
                                    time: "A",
                                },
                            },
                            {
                                name: "쉬는시간",
                                start_time: "09:55:00",
                                end_time: "10:05:00",
                                class: null,
                            },
                            {
                                name: "2교시",
                                start_time: "10:05:00",
                                end_time: "10:50:00",
                                time: 2,
                                class: {
                                    type: "time",
                                    name: "데이터",
                                    short_name: "데이터",
                                    teacher: {
                                        id: 1,
                                        name: "교사명",
                                    },
                                    location: "3학년 3반",
                                    color: "#8dde4f",
                                    replaced: false,
                                    time: "B",
                                },
                            },
                            {
                                name: "쉬는시간",
                                start_time: "10:50:00",
                                end_time: "11:00:00",
                                class: null,
                            },
                            {
                                name: "3교시",
                                start_time: "11:00:00",
                                end_time: "11:45:00",
                                time: 3,
                                class: {
                                    type: "static",
                                    name: "심화영어I A",
                                    short_name: "심영IA",
                                    teacher: {
                                        id: 1,
                                        name: "교사명",
                                    },
                                    location: "3학년 1반",
                                    color: "#c83a3a",
                                    replaced: false,
                                },
                            },
                            {
                                name: "점심",
                                start_time: "11:45:00",
                                end_time: "13:05:00",
                                class: null,
                            },
                            {
                                name: "4교시",
                                start_time: "13:05:00",
                                end_time: "13:50:00",
                                time: 4,
                                class: {
                                    type: "static",
                                    name: "화학Ⅱ",
                                    short_name: "화Ⅱ",
                                    teacher: {
                                        id: 1,
                                        name: "교사명",
                                    },
                                    location: "3학년 1반",
                                    color: "#d964a4",
                                    replaced: false,
                                },
                            },
                            {
                                name: "쉬는시간",
                                start_time: "13:50:00",
                                end_time: "14:00:00",
                                class: null,
                            },
                            {
                                name: "5교시",
                                start_time: "14:00:00",
                                end_time: "14:45:00",
                                time: 5,
                                class: {
                                    type: "static",
                                    name: "심화영어I B",
                                    short_name: "심영IB",
                                    teacher: {
                                        id: 1,
                                        name: "교사명",
                                    },
                                    location: "3학년 1반",
                                    color: "#a91a27",
                                    replaced: false,
                                },
                            },
                            {
                                name: "쉬는시간",
                                start_time: "14:45:00",
                                end_time: "14:55:00",
                                class: null,
                            },
                            {
                                name: "6교시",
                                start_time: "14:55:00",
                                end_time: "15:40:00",
                                time: 6,
                                class: {
                                    type: "static",
                                    name: "확률과 통계",
                                    short_name: "확통",
                                    teacher: {
                                        id: 1,
                                        name: "교사명",
                                    },
                                    location: "3학년 1반",
                                    color: "#e8554f",
                                    replaced: false,
                                },
                            },
                            {
                                name: "쉬는시간",
                                start_time: "15:40:00",
                                end_time: "15:50:00",
                                class: null,
                            },
                            {
                                name: "7교시",
                                start_time: "15:50:00",
                                end_time: "16:35:00",
                                time: 7,
                                class: {
                                    type: "static",
                                    name: "자율",
                                    short_name: "자율",
                                    teacher: {
                                        id: 1,
                                        name: "교사명",
                                    },
                                    location: "3학년 1반",
                                    color: "#777777",
                                    replaced: false,
                                },
                            },
                            {
                                name: "청소 및 종례",
                                start_time: "16:35:00",
                                end_time: "16:50:00",
                                class: null,
                            },
                            {
                                name: "석식",
                                start_time: "16:50:00",
                                end_time: "17:50:00",
                                class: null,
                            },
                            {
                                name: "야자 1교시",
                                start_time: "17:50:00",
                                end_time: "19:50:00",
                                class: null,
                            },
                            {
                                name: "야자 2교시",
                                start_time: "20:00:00",
                                end_time: "21:30:00",
                                class: null,
                            },
                        ],
                        [
                            {
                                name: "조회",
                                start_time: "08:50:00",
                                end_time: "09:00:00",
                                class: null,
                            },
                            {
                                name: "1교시",
                                start_time: "09:10:00",
                                end_time: "09:55:00",
                                time: 1,
                                class: {
                                    type: "static",
                                    name: "화학Ⅱ",
                                    short_name: "화Ⅱ",
                                    teacher: {
                                        id: 1,
                                        name: "교사명",
                                    },
                                    location: "3학년 1반",
                                    color: "#d964a4",
                                    replaced: true,
                                },
                            },
                            {
                                name: "쉬는시간",
                                start_time: "09:55:00",
                                end_time: "10:05:00",
                                class: null,
                            },
                            {
                                name: "2교시",
                                start_time: "10:05:00",
                                end_time: "10:50:00",
                                time: 2,
                                class: {
                                    type: "flexible",
                                    name: "미적분",
                                    short_name: "미적",
                                    teacher: {
                                        id: 1,
                                        name: "교사명",
                                    },
                                    location: "3학년 2반",
                                    color: "#e8554f",
                                    replaced: true,
                                },
                            },
                            {
                                name: "쉬는시간",
                                start_time: "10:50:00",
                                end_time: "11:00:00",
                                class: null,
                            },
                            {
                                name: "3교시",
                                start_time: "11:00:00",
                                end_time: "11:45:00",
                                time: 3,
                                class: {
                                    type: "static",
                                    name: "심화국어 B",
                                    short_name: "심국B",
                                    teacher: {
                                        id: 1,
                                        name: "교사명",
                                    },
                                    location: "3학년 1반",
                                    color: "#db7f28",
                                    replaced: true,
                                },
                            },
                            {
                                name: "점심",
                                start_time: "11:45:00",
                                end_time: "13:05:00",
                                class: null,
                            },
                            {
                                name: "4교시",
                                start_time: "13:05:00",
                                end_time: "13:50:00",
                                time: 4,
                                class: {
                                    type: "time",
                                    name: "세계사",
                                    short_name: "세계사",
                                    teacher: {
                                        id: 1,
                                        name: "교사명",
                                    },
                                    location: "3학년 3반",
                                    color: "#fcb345",
                                    replaced: true,
                                    time: "A",
                                },
                            },
                            {
                                name: "쉬는시간",
                                start_time: "13:50:00",
                                end_time: "14:00:00",
                                class: null,
                            },
                            {
                                name: "5교시",
                                start_time: "14:00:00",
                                end_time: "14:45:00",
                                time: 5,
                                class: {
                                    type: "static",
                                    name: "진로",
                                    short_name: "진로",
                                    teacher: {
                                        id: 1,
                                        name: "교사명",
                                    },
                                    location: "3학년 1반",
                                    color: "#5f5f5f",
                                    replaced: true,
                                },
                            },
                            {
                                name: "쉬는시간",
                                start_time: "14:45:00",
                                end_time: "14:55:00",
                                class: null,
                            },
                            {
                                name: "6교시",
                                start_time: "14:55:00",
                                end_time: "15:40:00",
                                time: 6,
                                class: {
                                    type: "static",
                                    name: "운동과 건강",
                                    short_name: "운동",
                                    teacher: {
                                        id: 1,
                                        name: "교사명",
                                    },
                                    location: "3학년 1반",
                                    color: "#4972db",
                                    replaced: true,
                                },
                            },
                            {
                                name: "쉬는시간",
                                start_time: "15:40:00",
                                end_time: "15:50:00",
                                class: null,
                            },
                            {
                                name: "7교시",
                                start_time: "15:50:00",
                                end_time: "16:35:00",
                                time: 7,
                                class: {
                                    type: "static",
                                    name: "심화국어 A",
                                    short_name: "심국A",
                                    teacher: {
                                        id: 1,
                                        name: "교사명",
                                    },
                                    location: "3학년 1반",
                                    color: "#fcb345",
                                    replaced: true,
                                },
                            },
                            {
                                name: "청소 및 종례",
                                start_time: "16:35:00",
                                end_time: "16:50:00",
                                class: null,
                            },
                            {
                                name: "석식",
                                start_time: "16:50:00",
                                end_time: "17:50:00",
                                class: null,
                            },
                            {
                                name: "야자 1교시",
                                start_time: "17:50:00",
                                end_time: "19:50:00",
                                class: null,
                            },
                            {
                                name: "야자 2교시",
                                start_time: "20:00:00",
                                end_time: "21:30:00",
                                class: null,
                            },
                        ],
                        [
                            {
                                name: "조회",
                                start_time: "08:50:00",
                                end_time: "09:00:00",
                                class: null,
                            },
                            {
                                name: "1교시",
                                start_time: "09:10:00",
                                end_time: "09:55:00",
                                time: 1,
                                class: {
                                    type: "time",
                                    name: "지구과학II",
                                    short_name: "지구II",
                                    teacher: {
                                        id: 1,
                                        name: "교사명",
                                    },
                                    location: "3학년 3반",
                                    color: "#fccb4a",
                                    replaced: false,
                                    time: "D",
                                },
                            },
                            {
                                name: "쉬는시간",
                                start_time: "09:55:00",
                                end_time: "10:05:00",
                                class: null,
                            },
                            {
                                name: "2교시",
                                start_time: "10:05:00",
                                end_time: "10:50:00",
                                time: 2,
                                class: {
                                    type: "static",
                                    name: "물리학 Ⅱ",
                                    short_name: "물II",
                                    teacher: {
                                        id: 1,
                                        name: "교사명",
                                    },
                                    location: "3학년 1반",
                                    color: "#8e49c0",
                                    replaced: false,
                                },
                            },
                            {
                                name: "쉬는시간",
                                start_time: "10:50:00",
                                end_time: "11:00:00",
                                class: null,
                            },
                            {
                                name: "3교시",
                                start_time: "11:00:00",
                                end_time: "11:45:00",
                                time: 3,
                                class: {
                                    type: "time",
                                    name: "사회문화탐구",
                                    short_name: "사문탐",
                                    teacher: {
                                        id: 1,
                                        name: "교사명",
                                    },
                                    location: "3학년 3반",
                                    color: "#aa61de",
                                    replaced: false,
                                    time: "C",
                                },
                            },
                            {
                                name: "점심",
                                start_time: "11:45:00",
                                end_time: "13:05:00",
                                class: null,
                            },
                            {
                                name: "4교시",
                                start_time: "13:05:00",
                                end_time: "13:50:00",
                                time: 4,
                                class: {
                                    type: "static",
                                    name: "화학Ⅱ",
                                    short_name: "화Ⅱ",
                                    teacher: {
                                        id: 1,
                                        name: "교사명",
                                    },
                                    location: "3학년 1반",
                                    color: "#d964a4",
                                    replaced: false,
                                },
                            },
                            {
                                name: "쉬는시간",
                                start_time: "13:50:00",
                                end_time: "14:00:00",
                                class: null,
                            },
                            {
                                name: "5교시",
                                start_time: "14:00:00",
                                end_time: "14:45:00",
                                time: 5,
                                class: {
                                    type: "static",
                                    name: "동아리",
                                    short_name: "동아리",
                                    teacher: {
                                        id: 1,
                                        name: "교사명",
                                    },
                                    location: "3학년 1반",
                                    color: "#909090",
                                    replaced: false,
                                },
                            },
                            {
                                name: "쉬는시간",
                                start_time: "14:45:00",
                                end_time: "14:55:00",
                                class: null,
                            },
                            {
                                name: "6교시",
                                start_time: "14:55:00",
                                end_time: "15:40:00",
                                time: 6,
                                class: {
                                    type: "static",
                                    name: "동아리",
                                    short_name: "동아리",
                                    teacher: {
                                        id: 1,
                                        name: "교사명",
                                    },
                                    location: "3학년 1반",
                                    color: "#909090",
                                    replaced: false,
                                },
                            },
                            {
                                name: "쉬는시간",
                                start_time: "15:40:00",
                                end_time: "15:50:00",
                                class: null,
                            },
                            {
                                name: "7교시",
                                start_time: "15:50:00",
                                end_time: "16:35:00",
                                time: 7,
                                class: {
                                    type: "",
                                    name: "",
                                    short_name: "",
                                    teacher: {
                                        id: "",
                                        name: "",
                                    },
                                    location: "",
                                    color: "",
                                    replaced: false,
                                },
                            },
                            {
                                name: "청소 및 종례",
                                start_time: "16:35:00",
                                end_time: "16:50:00",
                                class: null,
                            },
                            {
                                name: "석식",
                                start_time: "16:50:00",
                                end_time: "17:50:00",
                                class: null,
                            },
                            {
                                name: "야자 1교시",
                                start_time: "17:50:00",
                                end_time: "19:50:00",
                                class: null,
                            },
                            {
                                name: "야자 2교시",
                                start_time: "20:00:00",
                                end_time: "21:30:00",
                                class: null,
                            },
                        ],
                        [
                            {
                                name: "조회",
                                start_time: "08:50:00",
                                end_time: "09:00:00",
                                class: null,
                            },
                            {
                                name: "1교시",
                                start_time: "09:10:00",
                                end_time: "09:55:00",
                                time: 1,
                                class: {
                                    type: "static",
                                    name: "화학Ⅱ",
                                    short_name: "화Ⅱ",
                                    teacher: {
                                        id: 1,
                                        name: "교사명",
                                    },
                                    location: "3학년 1반",
                                    color: "#d964a4",
                                    replaced: false,
                                },
                            },
                            {
                                name: "쉬는시간",
                                start_time: "09:55:00",
                                end_time: "10:05:00",
                                class: null,
                            },
                            {
                                name: "2교시",
                                start_time: "10:05:00",
                                end_time: "10:50:00",
                                time: 2,
                                class: {
                                    type: "flexible",
                                    name: "미적분",
                                    short_name: "미적",
                                    teacher: {
                                        id: 1,
                                        name: "교사명",
                                    },
                                    location: "3학년 2반",
                                    color: "#e8554f",
                                    replaced: false,
                                },
                            },
                            {
                                name: "쉬는시간",
                                start_time: "10:50:00",
                                end_time: "11:00:00",
                                class: null,
                            },
                            {
                                name: "3교시",
                                start_time: "11:00:00",
                                end_time: "11:45:00",
                                time: 3,
                                class: {
                                    type: "static",
                                    name: "심화국어 B",
                                    short_name: "심국B",
                                    teacher: {
                                        id: 1,
                                        name: "교사명",
                                    },
                                    location: "3학년 1반",
                                    color: "#db7f28",
                                    replaced: false,
                                },
                            },
                            {
                                name: "점심",
                                start_time: "11:45:00",
                                end_time: "13:05:00",
                                class: null,
                            },
                            {
                                name: "4교시",
                                start_time: "13:05:00",
                                end_time: "13:50:00",
                                time: 4,
                                class: {
                                    type: "time",
                                    name: "세계사",
                                    short_name: "세계사",
                                    teacher: {
                                        id: 1,
                                        name: "교사명",
                                    },
                                    location: "3학년 3반",
                                    color: "#fcb345",
                                    replaced: false,
                                    time: "A",
                                },
                            },
                            {
                                name: "쉬는시간",
                                start_time: "13:50:00",
                                end_time: "14:00:00",
                                class: null,
                            },
                            {
                                name: "5교시",
                                start_time: "14:00:00",
                                end_time: "14:45:00",
                                time: 5,
                                class: {
                                    type: "static",
                                    name: "진로",
                                    short_name: "진로",
                                    teacher: {
                                        id: 1,
                                        name: "교사명",
                                    },
                                    location: "3학년 1반",
                                    color: "#5f5f5f",
                                    replaced: false,
                                },
                            },
                            {
                                name: "쉬는시간",
                                start_time: "14:45:00",
                                end_time: "14:55:00",
                                class: null,
                            },
                            {
                                name: "6교시",
                                start_time: "14:55:00",
                                end_time: "15:40:00",
                                time: 6,
                                class: {
                                    type: "static",
                                    name: "운동과 건강",
                                    short_name: "운동",
                                    teacher: {
                                        id: 1,
                                        name: "교사명",
                                    },
                                    location: "3학년 1반",
                                    color: "#4972db",
                                    replaced: false,
                                },
                            },
                            {
                                name: "쉬는시간",
                                start_time: "15:40:00",
                                end_time: "15:50:00",
                                class: null,
                            },
                            {
                                name: "7교시",
                                start_time: "15:50:00",
                                end_time: "16:35:00",
                                time: 7,
                                class: {
                                    type: "static",
                                    name: "심화국어 A",
                                    short_name: "심국A",
                                    teacher: {
                                        id: 1,
                                        name: "교사명",
                                    },
                                    location: "3학년 1반",
                                    color: "#fcb345",
                                    replaced: false,
                                },
                            },
                            {
                                name: "청소 및 종례",
                                start_time: "16:35:00",
                                end_time: "16:50:00",
                                class: null,
                            },
                            {
                                name: "석식",
                                start_time: "16:50:00",
                                end_time: "17:50:00",
                                class: null,
                            },
                            {
                                name: "야자 1교시",
                                start_time: "17:50:00",
                                end_time: "19:50:00",
                                class: null,
                            },
                            {
                                name: "야자 2교시",
                                start_time: "20:00:00",
                                end_time: "21:30:00",
                                class: null,
                            },
                        ],
                        [
                            {
                                name: "조회",
                                start_time: "08:50:00",
                                end_time: "09:00:00",
                                class: null,
                            },
                            {
                                name: "1교시",
                                start_time: "09:10:00",
                                end_time: "09:55:00",
                                time: 1,
                                class: {
                                    type: "time",
                                    name: "지구과학II",
                                    short_name: "지구II",
                                    teacher: {
                                        id: 1,
                                        name: "교사명",
                                    },
                                    location: "3학년 3반",
                                    color: "#fccb4a",
                                    replaced: false,
                                    time: "D",
                                },
                            },
                            {
                                name: "쉬는시간",
                                start_time: "09:55:00",
                                end_time: "10:05:00",
                                class: null,
                            },
                            {
                                name: "2교시",
                                start_time: "10:05:00",
                                end_time: "10:50:00",
                                time: 2,
                                class: {
                                    type: "static",
                                    name: "확률과 통계",
                                    short_name: "확통",
                                    teacher: {
                                        id: 1,
                                        name: "교사명",
                                    },
                                    location: "3학년 1반",
                                    color: "#e8554f",
                                    replaced: false,
                                },
                            },
                            {
                                name: "쉬는시간",
                                start_time: "10:50:00",
                                end_time: "11:00:00",
                                class: null,
                            },
                            {
                                name: "3교시",
                                start_time: "11:00:00",
                                end_time: "11:45:00",
                                time: 3,
                                class: {
                                    type: "flexible",
                                    name: "미적분",
                                    short_name: "미적",
                                    teacher: {
                                        id: 1,
                                        name: "교사명",
                                    },
                                    location: "3학년 2반",
                                    color: "#e8554f",
                                    replaced: false,
                                },
                            },
                            {
                                name: "점심",
                                start_time: "11:45:00",
                                end_time: "13:05:00",
                                class: null,
                            },
                            {
                                name: "4교시",
                                start_time: "13:05:00",
                                end_time: "13:50:00",
                                time: 4,
                                class: {
                                    type: "static",
                                    name: "심화영어I A",
                                    short_name: "심영IA",
                                    teacher: {
                                        id: 1,
                                        name: "교사명",
                                    },
                                    location: "3학년 1반",
                                    color: "#c83a3a",
                                    replaced: false,
                                },
                            },
                            {
                                name: "쉬는시간",
                                start_time: "13:50:00",
                                end_time: "14:00:00",
                                class: null,
                            },
                            {
                                name: "5교시",
                                start_time: "14:00:00",
                                end_time: "14:45:00",
                                time: 5,
                                class: {
                                    type: "time",
                                    name: "데이터",
                                    short_name: "데이터",
                                    teacher: {
                                        id: 1,
                                        name: "교사명",
                                    },
                                    location: "3학년 3반",
                                    color: "#8dde4f",
                                    replaced: false,
                                    time: "B",
                                },
                            },
                            {
                                name: "쉬는시간",
                                start_time: "14:45:00",
                                end_time: "14:55:00",
                                class: null,
                            },
                            {
                                name: "6교시",
                                start_time: "14:55:00",
                                end_time: "15:40:00",
                                time: 6,
                                class: {
                                    type: "static",
                                    name: "물리학 Ⅱ",
                                    short_name: "물II",
                                    teacher: {
                                        id: 1,
                                        name: "교사명",
                                    },
                                    location: "3학년 1반",
                                    color: "#8e49c0",
                                    replaced: false,
                                },
                            },
                            {
                                name: "쉬는시간",
                                start_time: "15:40:00",
                                end_time: "15:50:00",
                                class: null,
                            },
                            {
                                name: "7교시",
                                start_time: "15:50:00",
                                end_time: "16:35:00",
                                time: 7,
                                class: {
                                    type: "static",
                                    name: "운동과 건강",
                                    short_name: "운동",
                                    teacher: {
                                        id: 1,
                                        name: "교사명",
                                    },
                                    location: "3학년 1반",
                                    color: "#4972db",
                                    replaced: false,
                                },
                            },
                            {
                                name: "청소 및 종례",
                                start_time: "16:35:00",
                                end_time: "16:50:00",
                                class: null,
                            },
                            {
                                name: "석식",
                                start_time: "16:50:00",
                                end_time: "17:50:00",
                                class: null,
                            },
                            {
                                name: "야자 1교시",
                                start_time: "17:50:00",
                                end_time: "19:50:00",
                                class: null,
                            },
                            {
                                name: "야자 2교시",
                                start_time: "20:00:00",
                                end_time: "21:30:00",
                                class: null,
                            },
                        ],
                    ],
                });
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
