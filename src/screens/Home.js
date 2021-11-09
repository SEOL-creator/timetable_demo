import Timetable from "../components/SmallTimetable";

export default function Home() {
    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ width: "43.2rem" }}>
                <Timetable />
            </div>
        </div>
    );
}
