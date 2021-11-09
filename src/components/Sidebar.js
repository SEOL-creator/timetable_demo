import { useContext } from "react";
import ClassroomContext from "../contexts/classroomContext";
import styles from "./Sidebar.module.css";
import SidebarButton from "./SidebarButton";
import SidebarCategory from "./SidebarCategory";

export default function Sidebar() {
    const { classroom, setClassroom } = useContext(ClassroomContext);

    return (
        <aside className={styles.sidebar}>
            <div>
                <SidebarCategory title=".">
                    <SidebarButton to="/">홈</SidebarButton>
                </SidebarCategory>
                <SidebarCategory title=".">
                    <SidebarButton to="/timetable">시간표</SidebarButton>
                    <SidebarButton to="/food">식단표</SidebarButton>
                </SidebarCategory>
            </div>
            <div>
                <SidebarButton>
                    {classroom.grade}학년 {classroom.room}반
                </SidebarButton>
            </div>
        </aside>
    );
}
