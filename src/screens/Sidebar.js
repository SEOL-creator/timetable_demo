import styles from "./Sidebar.module.css";
import SidebarButton from "../components/SidebarButton";
import SidebarCategory from "../components/SidebarCategory";

export default function Sidebar({ display }) {
    return (
        <aside className={styles.sidebar} style={display ? { display: "flex" } : {}}>
            <div>
                <SidebarCategory title="">
                    <SidebarButton to="/">홈</SidebarButton>
                </SidebarCategory>
                <SidebarCategory title="정보">
                    <SidebarButton to="/timetable">시간표</SidebarButton>
                    <SidebarButton to="/meal">식단표</SidebarButton>
                    <SidebarButton to="/calendar">일정표</SidebarButton>
                </SidebarCategory>
                <SidebarCategory title="소통해요">
                    <SidebarButton to="/asked">Asked.kr</SidebarButton>
                    <SidebarButton to="/todo">To Do</SidebarButton>
                </SidebarCategory>
            </div>
        </aside>
    );
}
