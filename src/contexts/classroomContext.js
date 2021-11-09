import { createContext } from "react";

const ClassroomContext = createContext({ classroom: { grade: 2, room: 1 }, setClassroom: () => {} });

export default ClassroomContext;
