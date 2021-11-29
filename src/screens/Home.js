import { useMediaQuery } from "react-responsive";

import DDay from "../components/DDay";
import Meal from "../components/Meal";
import Timetable from "../components/SmallTimetable";

export default function Home() {
    const isMaxWidth390 = useMediaQuery({ maxWidth: 390 });

    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "flex-start", flexWrap: "wrap", padding: "0 1.5rem", boxSizing: "border-box" }}>
            <Timetable />
            <div style={{ width: "46.2rem", display: "flex", justifyContent: "center", alignItems: "flex-start", flexWrap: "wrap" }}>
                <Meal />
                <DDay direction={isMaxWidth390 ? "row" : "column"} />
            </div>
        </div>
    );
}
