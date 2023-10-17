import SettingBlock from "./SettingBlock";
import styles from "./SettingsProfileClass.module.scss";
import classNames from "classnames/bind";
import Input from "./Input";
import { useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import UserContext from "../contexts/userContext";
const cx = classNames.bind(styles);

export default function SettingsProfileClass() {
    const [classroomList, setClassroomList] = useState([
        {
            id: 1,
            grade: 3,
            room: 1,
        },
        {
            id: 2,
            grade: 3,
            room: 2,
        },
        {
            id: 3,
            grade: 3,
            room: 3,
        },
    ]);
    const [selectedClassroom, setSelectedClassroom] = useState(1);
    const [timeClassList, setTimeClassList] = useState({
        A: [
            {
                id: 1,
                name: "세계사",
                short_name: "세계사",
                teacher: {
                    id: 1,
                    name: "교사명",
                },
                location: "3학년 3반",
                color: "#fcb345",
            },
        ],
        B: [
            {
                id: 2,
                name: "데이터",
                short_name: "데이터",
                teacher: {
                    id: 1,
                    name: "교사명",
                },
                location: "3학년 3반",
                color: "#8dde4f",
            },
        ],
        C: [
            {
                id: 3,
                name: "사회문화탐구",
                short_name: "사문탐",
                teacher: {
                    id: 1,
                    name: "교사명",
                },
                location: "3학년 3반",
                color: "#aa61de",
            },
        ],
        D: [
            {
                id: 4,
                name: "지구과학II",
                short_name: "지구II",
                teacher: {
                    id: 1,
                    name: "교사명",
                },
                location: "3학년 3반",
                color: "#fccb4a",
            },
        ],
    });
    const [selectedTimeClasses, setSelectedTimeClasses] = useState({
        A: 1,
        B: 2,
        C: 3,
        D: 4,
    });
    const { user } = useContext(UserContext);

    return (
        <SettingBlock className={cx("classSetting")}>
            <div className={cx("form")}>
                <span>학급</span>
                <select
                    value={selectedClassroom}
                    onChange={async (e) => {
                        if (e.target.value === selectedClassroom) return;
                        const confirmChange = window.confirm("학급을 변경하면 설정한 이동 수업 반이 초기화됩니다.");
                        if (confirmChange) {
                        } else {
                            return;
                        }
                    }}
                >
                    {classroomList.map((classroom) => (
                        <option value={classroom.id} key={classroom.id}>
                            {`${classroom.grade}학년 ${classroom.room}반`}
                        </option>
                    ))}
                </select>
            </div>
            {["A", "B", "C", "D"].map((time) => (
                <div key={time} className={cx("form")}>
                    <span>{`${time}타임 수업`}</span>
                    <select value={selectedTimeClasses[time]} onChange={(e) => {}}>
                        <option value="">선택하세요...</option>
                        {timeClassList[time].map((timeClass) => (
                            <option key={timeClass.id} value={timeClass.id}>
                                {`${timeClass.location} ${timeClass.name}`}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
        </SettingBlock>
    );
}
