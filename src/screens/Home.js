import Meal from "../components/Meal";
import Timetable from "../components/SmallTimetable";

export default function Home() {
    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "flex-start", flexWrap: "wrap" }}>
            <Timetable />
            <Meal />
        </div>
    );
}
