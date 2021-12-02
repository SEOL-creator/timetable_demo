import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import useDateUpdate from "../hooks/useDateUpdate";
import ClassroomContext from "../contexts/classroomContext";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Home from "./Home";
import Asked from "./Asked";
import UserContext from "../contexts/userContext";
import LoginRegister from "./LoginRegister";
import RegisterComplete from "./RegisterComplete";
import Timetable from "./Timetable";
import axiosInstance from "../utils/axiosInstance";
import TodayTimetableContext from "../contexts/todayTimetableContext";
import Settings from "./Settings";

function getLocalStorage(key, defaultValue) {
    if (localStorage.getItem(key)) return JSON.parse(localStorage.getItem(key));
    else localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
}

export default function App() {
    const [isLogin, setIsLogin] = useState(getLocalStorage("isLogin", false));
    const [user, setUser] = useState(getLocalStorage("user", { email: "", nickname: "" }));
    const [token, setToken] = useState(getLocalStorage("token", ""));

    const [classroom, setClassroom] = useState(getLocalStorage("classroom", { grade: 2, room: 1 }));

    const setClassroomStorage = (classroom) => {
        localStorage.setItem("classroom", JSON.stringify(classroom));
        setClassroom(classroom);
    };

    const { dateUpdate } = useDateUpdate();

    const [todayTimetable, setTodayTimetable] = useState({});

    const [isSidebarDisplay, setIsSidebarDisplay] = useState(false);
    const toggleSidebar = () => setIsSidebarDisplay(!isSidebarDisplay);

    //
    useEffect(() => {
        async function validatetoken() {
            try {
                const response = await axiosInstance.post("/apis/validatetoken/", { token: token });
                if (response.data.valid) {
                    setUser(response.data.user);
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                } else {
                    setIsLogin(false);
                    setUser({ email: "", nickname: "" });
                    setToken("");
                    localStorage.setItem("isLogin", JSON.stringify(false));
                    localStorage.setItem("user", JSON.stringify({ email: "", nickname: "" }));
                    localStorage.setItem("token", "");
                }
            } catch (error) {
                console.error(error);
            }
        }

        if (isLogin) {
            validatetoken();
        }
    }, []);

    useEffect(() => {
        if (isLogin) {
            async function getTodayTimetable() {
                try {
                    const response = await axiosInstance.get(`/apis/improvedtimetable/${classroom.grade}/${classroom.room}/today/`);
                    setTodayTimetable(response.data);
                } catch (error) {
                    console.error(error);
                }
            }
            getTodayTimetable();
        }
    }, [dateUpdate, classroom, isLogin]);

    return (
        <>
            <UserContext.Provider
                value={{
                    isLogin: isLogin,
                    user: user,
                    token: token,
                    setUser: (obj) => {
                        setIsLogin(obj.isLogin);
                        setUser(obj.user);
                        setToken(obj.token);
                        localStorage.setItem("isLogin", JSON.stringify(obj.isLogin));
                        localStorage.setItem("user", JSON.stringify(obj.user));
                        localStorage.setItem("token", JSON.stringify(obj.token));
                    },
                    setUserInfo: (obj) => {
                        setUser(obj);
                        localStorage.setItem("user", JSON.stringify(obj));
                    },
                }}
            >
                <ClassroomContext.Provider value={{ classroom: classroom, setClassroom: setClassroomStorage }}>
                    <BrowserRouter>
                        <TodayTimetableContext.Provider value={todayTimetable}>
                            <Header toggleSidebar={toggleSidebar} />
                        </TodayTimetableContext.Provider>
                        <Sidebar display={isSidebarDisplay} />
                        <div style={{ width: "calc(100% - var(--size-sidebar-width))", height: "100%", overflowY: "scroll", overflowX: "hidden", boxSizing: "border-box" }}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<LoginRegister defaultTab={0} />} />
                                <Route path="/register" element={<LoginRegister defaultTab={1} />} />
                                <Route path="/register/complete" element={<RegisterComplete />} />
                                <Route path="/timetable" element={<Timetable />} />
                                <Route path="/asked" element={<Asked />} />
                                <Route path="/settings" element={<Settings />} />
                                <Route path="*" element={<Home />} />
                            </Routes>
                        </div>
                    </BrowserRouter>
                </ClassroomContext.Provider>
            </UserContext.Provider>
        </>
    );
}
