import Timetable from "../components/SmallTimetable";

export default function Home() {
    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ width: "43.2rem", marginTop: "2rem", borderRadius: "1.2rem", overflow: "hidden", boxShadow: "0 0 1.4rem 0 rgba(0,0,0,0.1)" }}>
                <Timetable />
            </div>
        </div>
    );
}
