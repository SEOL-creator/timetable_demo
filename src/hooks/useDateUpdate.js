import { useEffect, useState } from "react";

export default function useDateUpdate() {
    const [dateUpdate, setDate] = useState(new Date());

    useEffect(() => {
        const msToNextDay = (24 * 60 * 60 - dateUpdate.getHours() * 60 * 60 - dateUpdate.getMinutes() * 60 - dateUpdate.getSeconds() + 1) * 1000;

        const timeout = setTimeout(() => {
            setDate(new Date());
        }, msToNextDay);

        return () => {
            clearTimeout(timeout);
        };
    }, [dateUpdate]);

    return { dateUpdate };
}
