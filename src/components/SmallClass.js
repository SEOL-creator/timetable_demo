import styles from "./SmallClass.module.css";
import classNames from "classnames/bind";
import { useState } from "react";
import formatTime from "../utils/formatTime";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);

export default function SmallClass({ classObj, isRemote, remoteURL, startTime, endTime }) {
    const [open, setOpen] = useState(false);
    const [blockClosed, setBlockClosed] = useState(false);

    function toggleOpen(e) {
        if ((e.target.tagName === "DIV") | (e.target.tagName === "SPAN")) {
            setOpen((open) => {
                setBlockClosed(open);
                return !open;
            });
        }
    }

    return (
        <div style={{ backgroundColor: classObj.color }} className={cx(styles.class, { "class--open": open, "class--closed": blockClosed })} onClick={toggleOpen}>
            <div className={styles.head}>
                <div className={styles.startTime}>
                    <div>{formatTime(startTime, "hh mm")}</div>
                </div>
                <div className={styles.title}>
                    <span>{classObj.name}</span>
                    {isRemote && remoteURL && (
                        <a className={styles.attendRemote} href={remoteURL}>
                            원격수업 참가
                        </a>
                    )}
                </div>
            </div>
            <div className={styles.information}>
                <div className={styles.duration}>
                    <span>
                        {formatTime(startTime, "a/p hh:mm")} ~ {formatTime(endTime, "a/p hh:mm")}
                    </span>
                    <Link to={`/teacher/${classObj.teacher.id}`}>{classObj.teacher.name}</Link>
                </div>
                <div className={styles.memoContainer}>
                    <button className={styles.memoButton}>메모 추가</button>
                </div>
            </div>
        </div>
    );
}
