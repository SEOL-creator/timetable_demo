import { useMediaQuery } from "react-responsive";
import styles from "./Home.module.css";

import DDay from "../components/DDay";
import SmallMeal from "../components/SmallMeal";
import Timetable from "../components/SmallTimetable";

export default function Home() {
    const isMaxWidth320 = useMediaQuery({ maxWidth: 320 });

    return (
        <div className={styles.main}>
            <Timetable />
            <div className={styles.container}>
                <SmallMeal />
                <DDay direction={isMaxWidth320 ? "row" : "column"} />
            </div>
        </div>
    );
}
