import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import Calendar from "../components/Calendar";

export default function Meal() {
    const [targetDay, setTargetDay] = useState(new Date());
    const [meal, setMeal] = useState([]);

    useEffect(() => {
        async function fetchMeal() {
            if (!targetDay) return;
            try {
                const response = await axiosInstance.get(`/apis/v2/meal/${targetDay.getFullYear()}/${targetDay.getMonth() + 1}/`);
                response.data?.forEach((meal) => {
                    if (meal.type === 2) {
                        // lunch
                    } else {
                        // dinner
                    }
                });
            } catch (e) {
                console.error(e);
            }
        }
    }, [targetDay]);

    return <Calendar year={targetDay.getFullYear()} month={targetDay.getMonth() + 1} />;
}
