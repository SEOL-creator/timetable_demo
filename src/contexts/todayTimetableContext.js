import { createContext } from "react";

const TodayTimetableContext = createContext({
    date: "",
    is_remote: false,
    classroom: {
        grade: 2,
        room: 1,
    },
    timetable: [],
});

export default TodayTimetableContext;
