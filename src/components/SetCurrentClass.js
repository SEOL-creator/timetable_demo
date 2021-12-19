import { useContext, useEffect, useState } from "react";
import ClassroomContext from "../contexts/classroomContext";
import SidebarButton from "./SidebarButton";
import { Menu, MenuItem } from "@mui/material";
import axiosInstance from "../utils/axiosInstance";
import styles from "./SetCurrentClass.module.css";

export default function SetCurrentClass() {
    const { classroom, setClassroom } = useContext(ClassroomContext);
    const [classroomList, setClassroomList] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event, reason, classroom) => {
        setAnchorEl(null);
        if (classroom) setClassroom(classroom);
    };

    useEffect(() => {
        async function fetchClassroomList() {
            try {
                const response = await axiosInstance.get("apis/v2/timetable/classroom/");
                setClassroomList(response.data);
            } catch (e) {
                console.log(e);
            }
        }

        fetchClassroomList();
    }, []);

    return (
        <div>
            <SidebarButton onClick={handleClick}>
                {classroom.grade}학년 {classroom.room}반
            </SidebarButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                transitionDuration={150}
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                transformOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
                {classroomList.map((classroom, index) => {
                    return (
                        <MenuItem
                            key={index}
                            data-grade={classroom.grade}
                            data-room={classroom.room}
                            onClick={(event, reason) => {
                                handleClose(event, reason, classroom);
                            }}
                            className="menuitem--custom"
                        >
                            <span className={styles.menuItemText}>
                                {classroom.grade}학년 {classroom.room}반
                            </span>
                        </MenuItem>
                    );
                })}
            </Menu>
        </div>
    );
}
