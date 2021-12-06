import { useEffect, useState } from "react";
import { Routes, Route, useLocation, Outlet } from "react-router-dom";

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
import HighlightedMealContext from "../contexts/highlightedMealContext";
import Error404 from "./Error404";
import Todo from "./Todo";
import ModalLoginRegister from "./ModalLoginRegister";

export default function Layout() {
    const [isSidebarDisplay, setIsSidebarDisplay] = useState(false);
    const toggleSidebar = () => setIsSidebarDisplay(!isSidebarDisplay);

    return (
        <>
            <Header toggleSidebar={toggleSidebar} />

            <Sidebar display={isSidebarDisplay} />

            <div style={{ width: "calc(100% - var(--size-sidebar-width))", minHeight: "100%", height: "100%", overflowY: "scroll", overflowX: "hidden", boxSizing: "border-box" }}>
                <Outlet />
            </div>
        </>
    );
}
