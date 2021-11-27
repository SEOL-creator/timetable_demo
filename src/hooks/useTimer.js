import { useEffect, useState } from "react";
import useInterval from "./useInterval";

export default function useTimer(startDate, targetDate) {
    const [diff, setDiff] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [delay, setDelay] = useState(null);

    const [text, setText] = useState("0초");

    useEffect(() => {
        const diff = targetDate.getTime() - startDate.getTime();
        if (diff < 0) {
            setDiff(0);
            setDelay(null);
        } else {
            setDiff(diff);
            setDelay(1000);
        }
    }, [startDate, targetDate]);

    useEffect(() => {
        setMinute(parseInt(diff / 1000 / 60));
        setSecond(parseInt((diff / 1000) % 60));
    }, [diff]);

    useInterval(() => {
        setSecond((second) => {
            if (second <= 0) {
                if (minute <= 0) {
                    setDelay(null);
                    return 0;
                }

                setMinute((minute) => {
                    return minute - 1;
                });
            }
            return second - 1;
        });
    }, delay);

    useEffect(() => {
        if ((minute <= 0 && second <= 0) || second < 0) {
            setText(`0초`);
        }
        if (minute > 0) {
            setText(`${minute}분 ${second}초`);
        } else {
            setText(`${second}초`);
        }
    }, [minute, second]);

    return text;
}
