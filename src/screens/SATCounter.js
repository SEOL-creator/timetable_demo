import { useMediaQuery } from "react-responsive";
import styles from "./SATCounter.module.scss";
import classNames from "classnames/bind";
import axiosInstance from "../utils/axiosInstance";
import { useEffect, useState } from "react";
import formatDateTime from "../utils/formatDateTime";
const cx = classNames.bind(styles);

function calcDDay(date) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9);
    const dDay = new Date(date);
    const diff = dDay.getTime() - today.getTime();
    if (diff === 0) {
        return "D-Day";
    }
    if (diff < 0) {
        return "D+" + Math.floor(diff / (1000 * 60 * 60 * 24)) * -1;
    }
    return "D-" + Math.ceil(diff / 1000 / 60 / 60 / 24);
}

export default function SATCounter() {
    const isLandscape = useMediaQuery({ query: "(orientation: landscape)" });
    const [SAT, setSAT] = useState([]);
    const [datetime, setDatetime] = useState(new Date());

    useEffect(() => {
        async function fetchDDay() {
            try {
                const response = await axiosInstance.get("/apis/v2/calendar/dday/");
                setSAT(response.data.find((dDay) => dDay.id === 1));
            } catch (e) {
                console.error(e);
            }
        }

        fetchDDay();
    }, []);

    const updateDate = () => {
        setDatetime(new Date());
        const timeDifftoNextSecond = 1000 - new Date().getMilliseconds();
        setTimeout(updateDate, timeDifftoNextSecond);
    };

    useEffect(() => {
        updateDate();
    }, []);

    if (!isLandscape) {
        return (
            <div className={cx("landscapeWarning")}>
                화면을 가로로 돌려주세요. <br />
                태블릿 사용을 권장합니다.
            </div>
        );
    }

    return (
        <div className={cx("satcounter")}>
            <div>
                <div>{formatDateTime(datetime, "YYYY년 MM월 DD일 aaaa")}</div>
                <div></div>
            </div>
            <div>
                <div className={cx("dDayName")}>{SAT.name}</div>
                <div className={cx("untilSAT")}>{calcDDay(SAT.start_date)}</div>
            </div>
            <div>
                <div>{formatDateTime(datetime, "HH시 mm분 ss초")}</div>
                <div></div>
            </div>
        </div>
    );
}
