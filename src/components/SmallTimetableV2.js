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
