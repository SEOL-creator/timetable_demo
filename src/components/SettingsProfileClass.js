import SettingBlock from "./SettingBlock";
import styles from "./SettingsProfileClass.module.scss";
import classNames from "classnames/bind";
import Input from "./Input";
import { useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import UserContext from "../contexts/userContext";
const cx = classNames.bind(styles);

export default function SettingsProfileClass() {
    const [classroomList, setClassroomList] = useState([]);
    const [selectedClassroom, setSelectedClassroom] = useState("");
    const [timeClassList, setTimeClassList] = useState({ A: [], B: [], C: [], D: [] });
    const [selectedTimeClasses, setSelectedTimeClasses] = useState({ A: null, B: null, C: null, D: null });
    const { user } = useContext(UserContext);

    useEffect(() => {
        async function fetchClassList() {
            try {
                const response = await axiosInstance.get("/apis/v2/timetable/classroom/");
                setClassroomList(response.data);
                if (user?.classroom?.id) {
                    setSelectedClassroom("");
                } else {
                    setSelectedClassroom("");
                }
            } catch (e) {
                alert(e);
            }
        }
        async function fetchTimeClassList() {
            try {
                const response = await axiosInstance.get("/apis/v2/timetablev2/timeclasses/");
                setTimeClassList(response.data.list);
                setSelectedTimeClasses(response.data.user_selected);
            } catch (e) {
                alert(e);
            }
        }

        fetchClassList();
        fetchTimeClassList();
    }, []);

    useEffect(() => {
        setSelectedClassroom(user?.classroom?.id);
    }, [user, user.classroom, classroomList]);

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
                            setSelectedClassroom(e.target.value);
                            try {
                                const response = await axiosInstance.post("/apis/v2/timetablev2/classroom/", {
                                    classroom_id: e.target.value,
                                });
                                window.location.reload();
                            } catch (e) {
                                console.error(e);
                            }
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
                    <select
                        value={selectedTimeClasses[time]}
                        onChange={(e) => {
                            if (e.target.value === "") return;
                            if (selectedTimeClasses[time] === e.target.value) return;
                            setSelectedTimeClasses({
                                ...selectedTimeClasses,
                                [time]: e.target.value,
                            });
                            try {
                                axiosInstance.post(`/apis/v2/timetablev2/timeclasses/${time}/`, {
                                    class_id: e.target.value,
                                });
                            } catch (e) {
                                console.error(e);
                            }
                        }}
                    >
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
