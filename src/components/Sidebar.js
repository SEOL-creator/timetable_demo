import styles from "./Sidebar.module.css";
import SidebarButton from "./SidebarButton";
import SidebarCategory from "./SidebarCategory";
import SetCurrentClass from "./SetCurrentClass";

export default function Sidebar({ display }) {
    return (
        <aside className={styles.sidebar} style={display ? { display: "flex" } : {}}>
            <div>
                <SidebarCategory title=".">
                    <SidebarButton to="/">홈</SidebarButton>
                </SidebarCategory>
                <SidebarCategory title=".">
                    <SidebarButton to="/timetable">시간표</SidebarButton>
                    <SidebarButton to="/meal">식단표</SidebarButton>
                    <SidebarButton to="/calendar">일정표</SidebarButton>
                </SidebarCategory>
            </div>
            <SetCurrentClass />
        </aside>
    );
}
