import styles from "./Sidebar.module.scss";
import SidebarButton from "../components/SidebarButton";
import SidebarCategory from "../components/SidebarCategory";
import classNames from "classnames/bind";
import { useContext } from "react";
import UserContext from "../contexts/userContext";
import BoardListContext from "../contexts/boardListContext";
import { ReactComponent as LinkBlack } from "../assets/icons/material/link_black.svg";
import { useLocation } from "react-router-dom";
const cx = classNames.bind(styles);

export default function Sidebar({ display, mobile, clickAway = () => {}, appVersion }) {
    const { isLogin } = useContext(UserContext);

    const location = useLocation();
    const informationState = location.pathname === "/information" ? undefined : { backgroundLocation: location };

    const boardList = useContext(BoardListContext);

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
                    e.stopPropagation();
                }}
            >
                <div>
                    <SidebarButton style={{ marginBottom: "3rem" }} to="/" onClick={clickAway}>
                        홈
                    </SidebarButton>
                    <SidebarCategory title="정보">
                        <SidebarButton to="/timetable" onClick={clickAway}>
                            시간표
                        </SidebarButton>
                        <SidebarButton to="/meal" onClick={clickAway}>
                            식단표
                        </SidebarButton>
                        <SidebarButton to="/schedule" onClick={clickAway}>
                            일정표
                        </SidebarButton>
                    </SidebarCategory>
                    <SidebarCategory title="소통해요">
                        <SidebarButton to="/asked" onClick={clickAway}>
                            Asked.kr
                        </SidebarButton>
                        <BoardListContext.Provider value={boardList}>
                            {isLogin &&
                                boardList.map((board) => {
                                    return (
                                        <SidebarButton key={board.code} to={`/boards/${board.code}`} onClick={clickAway}>
                                            {board.title}
                                        </SidebarButton>
                                    );
                                })}
                        </BoardListContext.Provider>
                    </SidebarCategory>
                    <SidebarCategory title="유용한 것들">
                        {isLogin && (
                            <SidebarButton target="_blank" rel="noopener noreferer nofollow" href="https://forms.gle/H6GQ2g5hQXxGUg699">
                                <LinkBlack color="inherit" style={{ marginRight: "0.2rem" }} />
                                시험기간 급식 번호 기록
                            </SidebarButton>
                        )}
                    </SidebarCategory>
                    <SidebarCategory title="기타">
                        <SidebarButton to="/todo" onClick={clickAway}>
                            제안
                        </SidebarButton>
                        <SidebarButton to="/information" onClick={clickAway} state={informationState}>
                            정보
                        </SidebarButton>
                    </SidebarCategory>
                </div>
                <div style={{ marginTop: "2rem", fontSize: "1.3rem", color: "var(--color-text-secondary)" }}>
                    <div>
                        <span>contact: </span>
                        <a href="mailto:sbseol@icloud.com">sbseol@icloud.com</a>
                    </div>
                </div>
            </div>
        </aside>
    );
}
