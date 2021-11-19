import Box from "../components/Box";
import DDay from "../components/DDay";
import Meal from "../components/Meal";
import Timetable from "../components/SmallTimetable";

export default function Home() {
    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "flex-start", flexWrap: "wrap" }}>
            <Timetable />
            <div style={{ width: "46.2rem", display: "flex", justifyContent: "center", alignItems: "flex-start", flexWrap: "wrap" }}>
                <Meal />
                <DDay />
            </div>
        </div>
    );
}
