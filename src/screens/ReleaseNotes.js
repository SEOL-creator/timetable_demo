import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import styles from "./ReleaseNotes.module.scss";
import Modal from "../components/Modal";
import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import Separator from "../components/Separator";

export default function ReleaseNotes() {
    const navigate = useNavigate();
    const location = useLocation();
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        async function getNotes() {
            try {
                const response = await axiosInstance.get(`/apis/v2/version/releases/`);
                setNotes(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        getNotes();
    }, []);

    return (
        <Modal
            title="릴리즈 노트"
            open={true}
            onClose={() => {
                location.state?.backgroundLocation?.pathname ? navigate(location.state.backgroundLocation.pathname) : navigate("/");
            }}
            style={{
                width: "44rem",
                margin: "0 1rem",
            }}
            nomargin
        >
            <div className={styles.releaseNotes}>
                {notes.map((note, index) => {
                    return (
                        <div key={note.version} className={styles.note}>
                            <Separator />
                            <div className={styles.noteVersion}>v{note.version}</div>
                            <div className={styles.noteBody}>{note.note}</div>
                        </div>
                    );
                })}
            </div>
        </Modal>
    );
}
