import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ClassroomContext from "../contexts/classroomContext";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Home from "./Home";

export default function App() {
    const [classroom, setClassroom] = useState({ grade: 2, room: 1 });

    return (
        <>
            <ClassroomContext.Provider value={{ classroom: classroom, setClassroom: setClassroom }}>
                <Header title={<span>OO수업 진행중!</span>} subtitle="23:30 남음" />
                <BrowserRouter>
                    <Sidebar />
                    <div style={{ width: "calc(100% - var(--size-sidebar-width))", height: "100%", marginLeft: "var(--size-sidebar-width)", overflowY: "auto", overflowX: "hidden" }}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                        </Routes>
                    </div>
                </BrowserRouter>
            </ClassroomContext.Provider>
        </>
    );
}
