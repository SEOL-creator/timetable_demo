import Modal from "./Modal";
import UserProfilePic from "./UserProfilePic";
import Input from "./Input";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/userContext";
import classNames from "classnames/bind";
import styles from "./BoardArticleWriteModal.module.scss";

import { ReactComponent as CheckboxIcon } from "../assets/icons/material/check_box_outline_blank_black.svg";
import { ReactComponent as CheckboxIconChecked } from "../assets/icons/material/check_box_black.svg";
import { ReactComponent as ImageIcon } from "../assets/icons/material/image_black.svg";
import { ReactComponent as PollIcon } from "../assets/icons/material/poll_black.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import BoardArticleWriteModalImage from "./BoardArticleWriteModalImage";
import BoardArticleWriteModalVote from "./BoardArticleWriteModalVote";

const cx = classNames.bind(styles);

export default function BoardArticleWriteModal({ open, handleClose, board }) {
    const { user } = useContext(UserContext);

    const [isAnonChecked, setIsAnonChecked] = useState(false);
    const [isAnonCheckDisabled, setIsAnonCheckDisabled] = useState(false);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState([]);
    const [hasVote, setHasVote] = useState(false);
    const [vote, setVote] = useState([]);

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
        setImage([]);
        setVote([]);
        setHasVote(false);
    }, [board]);

    const onClose = (e, reason) => {
        if (reason === "submitButtonClick") {
            setTitle("");
            setContent("");
            setImage([]);
            setVote([]);
            setHasVote(false);
        }
        handleClose(e, reason, { title, content, isAnonChecked, image, vote: hasVote ? vote : null });
    };

    return (
        <Modal open={open} type="confirm" title="새 게시글" className={cx("modal")} onClose={onClose} unstyled disableAutoFocus>
            <div>
                <div></div>
                <div>새 게시글</div>
                <button
                    className={styles.button}
                    onClick={(e) => {
                        onClose(e, "closeButtonClick");
                    }}
                >
                    <FontAwesomeIcon icon={faTimes} fixedWidth width="100%" height="100%" color="inherit" />
                </button>
            </div>
            <div>
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
                            rows="5"
                            placeholder={`${user.nickname}님, 무슨 생각을 하고 계신가요?`}
                        ></textarea>
                        {image.length > 0 && (
                            <div className={cx("imageList")}>
                                {image.map((image, index) => {
                                    return (
                                        <div key={index} className={cx("image")}>
                                            <BoardArticleWriteModalImage
                                                image={image}
                                                onDelete={() => {
                                                    setImage((prev) => {
                                                        return prev.slice(0, index).concat(prev.slice(index + 1));
                                                    });
                                                }}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                        {hasVote > 0 && <BoardArticleWriteModalVote vote={vote} setVote={setVote} />}
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <label className={styles.button}>
                        <ImageIcon />
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            style={{ display: "none" }}
                            onChange={(e) => {
                                setImage((prev) => {
                                    return [...prev, ...e.target.files];
                                });
                                e.target.files = null;
                            }}
                        />
                    </label>
                    <button
                        className={styles.button}
                        onClick={() => {
                            setHasVote(!hasVote);
                        }}
                    >
                        <PollIcon />
                    </button>
                </div>
                <div>
                    <Button
                        className={styles.button}
                        onClick={(e) => {
                            onClose(e, "cancelButtonClick");
                        }}
                        theme="secondary"
                    >
                        취소
                    </Button>
                    <Button
                        className={styles.button}
                        onClick={(e) => {
                            onClose(e, "submitButtonClick");
                        }}
                    >
                        작성
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
