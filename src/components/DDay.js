import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import formatDateTime from "../utils/formatDateTime";
import Box from "./Box";
import styles from "./DDay.module.css";
import classNames from "classnames/bind";
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

export default function DDay({ direction = "column" }) {
    const [dDayList, setDDayList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchDDay() {
            try {
                const response = await axiosInstance.get("/apis/dday/");
                setDDayList(response.data);
                setIsLoading(false);
            } catch (e) {
                console.error(e);
            }
        }

        fetchDDay();
    }, []);

    return (
        <Box className={cx("box", { [`box--${direction}`]: true })}>
            <Link to="/calendar">주요 일정</Link>
            <div className={styles.content}>
                {isLoading ? (
                    <>
                        <div className={styles.separator}></div>
                        <div style={{ width: "100%" }}>
                            <Skeleton animation="wave" height="2.1rem" />
                            <Skeleton animation="wave" height="1.7rem" width="90%" />
                            <Skeleton variant="text" animation="wave" height="4.7rem" width="5rem" style={{ margin: "0 auto" }} />
                        </div>
                    </>
                ) : (
                    dDayList?.map((dDay) => {
                        return (
                            <>
                                <div className={styles.separator}></div>
                                <div className={styles.schedule} key={dDay.id}>
                                    <div className={styles.scheduleInfo}>
                                        <span className={styles.scheduleName}>{dDay.name}</span>
                                        <span className={styles.scheduleDate}>{formatDateTime(new Date(dDay.start_date), "YYYY년 MM월 dd일 aaaa")}</span>
                                    </div>
                                    <span className={styles.scheduleRemain}>{calcDDay(dDay.start_date)}</span>
                                </div>
                            </>
                        );
                    })
                )}
            </div>
        </Box>
    );
}
