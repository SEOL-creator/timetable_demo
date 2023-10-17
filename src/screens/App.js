import { useCallback, useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import ClassroomContext from "../contexts/classroomContext";
import HighlightedMealContext from "../contexts/highlightedMealContext";
import TodayTimetableContext from "../contexts/todayTimetableContext";
import UserContext from "../contexts/userContext";
import useDateUpdate from "../hooks/useDateUpdate";
import axiosInstance from "../utils/axiosInstance";

import Layout from "./Layout";
import Home from "./Home";
import LoginRegister from "./LoginRegister";
import RegisterComplete from "./RegisterComplete";
import Timetable from "./Timetable";
import Meal from "./Meal";
import Schedule from "./Schedule";
import Asked from "./Asked";
import Todo from "./Todo";
import BoardArticleList from "./BoardArticleList";
import BoardArticleView from "./BoardArticleView";
import Settings from "./Settings";
import Error404 from "./Error404";
import ModalLoginRegister from "./ModalLoginRegister";
import Information from "./Information";
import ReleaseNotes from "./ReleaseNotes";
import BoardListContext from "../contexts/boardListContext";
import Job from "./Job";
import SATCounter from "./SATCounter";

function getLocalStorage(key, defaultValue) {
    if (localStorage.getItem(key)) return JSON.parse(localStorage.getItem(key));
    else localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
}

async function checkVersion() {
    const storageVersion = sessionStorage.getItem("version");
    const currentVersion = process.env.REACT_APP_VERSION;
    try {
        const latestVersion = "1.0.0";
        sessionStorage.setItem("version", currentVersion);
        if (!storageVersion) {
            return { current: currentVersion, latest: latestVersion, isLatest: currentVersion === latestVersion, detail: "firstLaunch" };
        }
        if (storageVersion !== currentVersion) {
            return { current: currentVersion, latest: latestVersion, isLatest: currentVersion === latestVersion, detail: "updated" };
        }
        return { current: currentVersion, latest: latestVersion, isLatest: currentVersion === latestVersion, detail: "normal" };
    } catch (error) {
        console.error(error);
    }
    return { current: "1.0.0", latest: "1.0.0", isLatest: true, detail: "updated" };
}

export default function App() {
    const location = useLocation();
    const state = location.state;
    const navigate = useNavigate();

    const isFirstLaunch = useRef(true);
    const [version, setVersion] = useState({ current: "", latest: "", isLatest: false, detail: "" });

    const [isLogin, setIsLogin] = useState(true);
    const [user, setUser] = useState({
        id: 2,
        nickname: "사용자",
        email: "test@test.com",
        profilepic: { "512px": "", "50px": "", "256px": "" },
        is_staff: false,
        classroom: { id: 1, grade: 3, room: 1 },
    });
    const [token, setToken] = useState("ad58b8807ee96ba04aed9a54e55c9e5337f77fc5");

    const [classroom, setClassroom] = useState({ grade: 3, room: 1 });

    const setClassroomStorage = (classroom) => {
        localStorage.setItem("classroom", JSON.stringify(classroom));
        setClassroom(classroom);
    };

    const { dateUpdate } = useDateUpdate();

    const [todayTimetable, setTodayTimetable] = useState({});

    const [highlightedMeal, setHighlightedMeal] = useState(getLocalStorage("highlightedMeal", {}));

    const [boardList, setBoardList] = useState([{ title: "자유게시판", code: "board", type: "ALL" }]);

    useEffect(() => {
        checkVersion().then((result) => {
            setVersion(result);
            if (result?.detail === "updated") {
                navigate("/releasenotes", { state: { backgroundLocation: location } });
            }
        });
    }, []);

    const validateToken = useCallback(async () => {
        setUser({
            id: 2,
            nickname: "사용자",
            email: "test@test.com",
            profilepic: { "512px": "", "50px": "", "256px": "" },
            is_staff: false,
            classroom: { id: 1, grade: 3, room: 1 },
        });
    }, [token]);
    useEffect(() => {
        if (isFirstLaunch.current) {
            isFirstLaunch.current = false;
            if (isLogin) {
                validateToken();
            }
        }
    }, [isLogin, validateToken]);

    useEffect(() => {
        if (isLogin) {
            async function getTodayTimetable() {
                try {
                    const response = {
                        data: {
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
                        },
                    };
                    let day = new Date().getDay();
                    if (day > 6) day = 0;
                    else day = day - 1;
                    setTodayTimetable(response.data[day]);
                } catch (error) {
                    console.error(error);
                }
            }
            getTodayTimetable();
        }
    }, [dateUpdate, classroom, isLogin]);

    return (
        <UserContext.Provider
            value={{
                isLogin: isLogin,
                user: user,
                token: token,
                setUser: (obj) => {},
                setUserInfo: (obj) => {},
            }}
        >
            <ClassroomContext.Provider value={{ classroom: classroom, setClassroom: setClassroomStorage }}>
                <TodayTimetableContext.Provider value={todayTimetable}>
                    <HighlightedMealContext.Provider
                        value={{
                            highlightedMeal: highlightedMeal,
                            toggleHighlightedMeal: (mealName) => {
                                const newHighlightedMeal = { ...highlightedMeal };
                                newHighlightedMeal[mealName] = !newHighlightedMeal[mealName];
                                setHighlightedMeal(newHighlightedMeal);
                                localStorage.setItem("highlightedMeal", JSON.stringify(newHighlightedMeal));
                            },
                        }}
                    >
                        <BoardListContext.Provider value={boardList}>
                            <Routes location={state?.backgroundLocation || location}>
                                <Route path="/" element={<Layout />}>
                                    <Route index element={<Home />} />
                                    <Route path="/login" element={<LoginRegister defaultTab={0} />} />
                                    <Route path="/register" element={<LoginRegister defaultTab={1} />} />
                                    <Route path="/register/complete" element={<RegisterComplete />} />
                                    <Route path="/timetable" element={<Timetable />} />
                                    <Route path="/meal" element={<Meal />} />
                                    <Route path="/schedule" element={<Schedule />} />
                                    <Route path="/asked" element={<Asked />} />
                                    <Route path="/todo" element={<Todo />} />
                                    <Route path="/settings" element={<Settings />} />
                                    <Route path="/information" element={<Information version={version} />} />
                                    <Route path="/releasenotes" element={<ReleaseNotes />} />
                                    <Route path="/boards/article/:articleId" element={<BoardArticleView />} />
                                    <Route path="/boards/:boardCode" element={<BoardArticleList />} />
                                    <Route path="/job" element={<Job />} />
                                    <Route path="/satcounter" element={<SATCounter />} />
                                    <Route path="*" element={<Error404 />} />
                                </Route>
                            </Routes>
                        </BoardListContext.Provider>
                        {state?.backgroundLocation && (
                            <Routes>
                                <Route path="/login" element={<ModalLoginRegister defaultTab={0} />} />
                                <Route path="/register" element={<ModalLoginRegister defaultTab={1} />} />
                                <Route path="/information" element={<Information version={version} />} />
                                <Route path="/releasenotes" element={<ReleaseNotes />} />
                            </Routes>
                        )}
                    </HighlightedMealContext.Provider>
                </TodayTimetableContext.Provider>
            </ClassroomContext.Provider>
        </UserContext.Provider>
    );
}
