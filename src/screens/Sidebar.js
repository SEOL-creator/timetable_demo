import styles from "./Sidebar.module.scss";
import SidebarButton from "../components/SidebarButton";
import SidebarCategory from "../components/SidebarCategory";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

export default function Sidebar({ display, mobile, clickAway = () => {} }) {
    return (
        <aside
            className={cx("sidebar", { "sidebar--mobile": mobile, "sidebar--display": display })}
            onClick={(e) => {
                if (e.defaultPrevented) {
                    return;
                }
                clickAway();
            }}
        >
            <div
                onClick={(e) => {
                    e.preventDefault();
                }}
            >
                <SidebarCategory title="">
                    <SidebarButton to="/" onClick={clickAway}>
                        홈
                    </SidebarButton>
                </SidebarCategory>
                <SidebarCategory title="정보">
                    <SidebarButton to="/timetable" onClick={clickAway}>
                        시간표
                    </SidebarButton>
                    <SidebarButton to="/meal" onClick={clickAway}>
                        식단표
                    </SidebarButton>
                    <SidebarButton to="/calendar" onClick={clickAway}>
                        일정표
                    </SidebarButton>
                </SidebarCategory>
                <SidebarCategory title="소통해요">
                    <SidebarButton to="/asked" onClick={clickAway}>
                        Asked.kr
                    </SidebarButton>
                    <SidebarButton to="/todo" onClick={clickAway}>
                        To Do
                    </SidebarButton>
                </SidebarCategory>
                <SidebarCategory title="유용한 것들">
                    <SidebarButton target="_blank" rel="noopener noreferer nofollow" href="https://forms.gle/H6GQ2g5hQXxGUg699">
                        시험기간 급식 번호 기록
                    </SidebarButton>
                </SidebarCategory>
            </div>
        </aside>
    );
}
