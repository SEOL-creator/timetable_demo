import Modal from "./Modal";
import UserProfilePic from "./UserProfilePic";
import Input from "./Input";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/userContext";
import classNames from "classnames/bind";
import styles from "./BoardArticleWriteModal.module.scss";

import { ReactComponent as CheckboxIcon } from "../assets/icons/material/check_box_outline_blank_black.svg";
import { ReactComponent as CheckboxIconChecked } from "../assets/icons/material/check_box_black.svg";

const cx = classNames.bind(styles);

export default function BoardArticleWriteModal({ open, onClose, board }) {
    const { user } = useContext(UserContext);

    const [isAnonChecked, setIsAnonChecked] = useState(false);
    const [isAnonCheckDisabled, setIsAnonCheckDisabled] = useState(false);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        if (board?.type === "ANON") {
            setIsAnonCheckDisabled(true);
            setIsAnonChecked(true);
        } else if (board?.type === "REAL") {
            setIsAnonCheckDisabled(true);
            setIsAnonChecked(false);
        } else {
            setIsAnonCheckDisabled(false);
            setIsAnonChecked(false);
        }

        setTitle("");
        setContent("");
    }, [board]);

    return (
        <Modal
            open={open}
            onClose={(e, reason) => {
                onClose(e, reason, title, content, isAnonChecked);
            }}
            type="confirm"
            title="새 게시글"
            className={cx("modal")}
            disableAutoFocus
        >
            <div className={cx("newArticleModalBody")}>
                <div className={cx("heading")}>
                    <UserProfilePic profilepicObject={isAnonChecked ? "anonymous" : null} className={cx("heading__profilepic")} />
                    <div className={cx("heading__user")}>
                        <span>{user.nickname}</span>
                        {board?.type === "REAL" ? null : (
                            <label className={cx("anonCheckbox", { "anonCheckbox--checked": isAnonChecked })}>
                                익명
                                {isAnonChecked ? <CheckboxIconChecked /> : <CheckboxIcon />}
                                <input
                                    type="checkbox"
                                    onChange={(e) => {
                                        setIsAnonChecked(e.target.checked);
                                    }}
                                    checked={isAnonChecked}
                                    disabled={isAnonCheckDisabled}
                                />
                            </label>
                        )}
                    </div>
                    <div className={cx("heading__title")}>
                        <Input
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                            name="title"
                            hideLabel
                            placeholder="제목"
                        />
                    </div>
                </div>
                <div className={cx("body")}>
                    <textarea
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
                        rows="6"
                        placeholder={`${user.nickname}님, 무슨 생각을 하고 계신가요?`}
                    ></textarea>
                </div>
            </div>
        </Modal>
    );
}
