import UserProfilePic from "./UserProfilePic";
import styles from "./BoardArticleComment.module.scss";
import getDisplayTimePassed from "../utils/getDisplayTimePassed";
import { ReactComponent as ThumbUpIcon } from "../assets/icons/material/thumb_up_alt_black.svg";
import { ReactComponent as ThumbUpOffIcon } from "../assets/icons/material/thumb_up_off_alt_black.svg";
import { ReactComponent as CheckboxIcon } from "../assets/icons/material/check_box_outline_blank_black.svg";
import { ReactComponent as CheckboxIconChecked } from "../assets/icons/material/check_box_black.svg";
import { useContext, useEffect, useRef, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Skeleton } from "@mui/material";
import UserContext from "../contexts/userContext";
import classNames from "classnames/bind";
import Button from "./Button";
import Modal from "./Modal";
const cx = classNames.bind(styles);

export default function BoardArticleComment({ articleId, board }) {
    const { user } = useContext(UserContext);

    const [commentList, setCommentList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [refetch, setRefetch] = useState(new Date().getTime());

    const [isAnonChecked, setIsAnonChecked] = useState(false);
    const [isAnonCheckDisabled, setIsAnonCheckDisabled] = useState(false);
    const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);
    const [commentContent, setCommentContent] = useState("");
    const [commentContentRowCount, setCommentContentRowCount] = useState(1);
    const commentContentRef = useRef(null);

    const [deleteCommentId, setDeleteCommentId] = useState(null);
    const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);

    useEffect(() => {
        async function getComments() {
            const response = axiosInstance.get(`apis/v2/boards/article/${articleId}/comments/`);
            response
                .then((res) => {
                    if (res.status === 200) {
                        setCommentList(res.data);
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
        getComments();
    }, [articleId, refetch]);

    useEffect(() => {
        if (board?.type === "ANON") {
            setIsAnonCheckDisabled(true);
            setIsAnonChecked(true);
        } else if (board?.type === "LOGIN") {
            setIsAnonCheckDisabled(true);
            setIsAnonChecked(false);
        } else {
            setIsAnonCheckDisabled(false);
            setIsAnonChecked(false);
        }
    }, [board]);

    function onNewCommentInputChange(e) {
        setCommentContent(e.target.value);
        const LINEHEIGHT = 20;
        commentContentRef.current.style.height = "2rem";
        const rows = Math.ceil((commentContentRef.current.scrollHeight - 8) / LINEHEIGHT);
        if (rows > 5) {
            setCommentContentRowCount(5);
        } else {
            setCommentContentRowCount(rows);
        }
        commentContentRef.current.style.height = "100%";
    }

    function postComment() {
        if (commentContent.length === 0) return;
        setIsSubmitButtonDisabled(true);
        setCommentContent("");
        const response = axiosInstance.post(`/apis/v2/boards/article/${articleId}/comments/`, {
            content: commentContent,
            is_anonymous: isAnonChecked,
        });
        response
            .then((res) => {
                if (res.status === 201) {
                    setRefetch(new Date().getTime());
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsSubmitButtonDisabled(false);
            });
    }

    return (
        <div className={cx("commentArea")}>
            <div className={cx("newComment")} style={{ height: `${commentContentRowCount * 2 + 1}rem` }}>
                <UserProfilePic profilepicObject={isAnonChecked ? "anonymous" : null} className={cx("newCommentProfilePic")} />
                <div className={cx("newCommentProfile")}>
                    <span className={cx("newCommentProfileNickname")}>{user.nickname}</span>
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
                <textarea ref={commentContentRef} placeholder="댓글을 남겨보세요" value={commentContent} onChange={onNewCommentInputChange}></textarea>
                <Button onClick={postComment} disabled={isSubmitButtonDisabled}>
                    작성
                </Button>
            </div>
            {isLoading ? (
                <div className={cx("comment")}>
                    <div className={cx("line")}></div>
                    <div className={cx("commentInfo")}>
                        <div className={cx("user")}>
                            <div>
                                <Skeleton animation="wave" variant="circular" width={30} height={30} />
                            </div>
                            <div className={cx("user--text")}>
                                <span>
                                    <Skeleton animation="wave" width={60} />
                                </span>
                                <span>
                                    <Skeleton animation="wave" width={100} />
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={cx("commentBody")}>
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                    </div>
                </div>
            ) : (
                <div className={cx("commentContainer")}>
                    {commentList.map((comment, index) => {
                        return (
                            <div className={cx("comment")} key={comment.id}>
                                <div className={cx("line")}></div>
                                <div className={cx("commentInfo")}>
                                    <div className={cx("user")}>
                                        <UserProfilePic profilepicObject={comment.author ? comment.author.profilepic : "anonymous"} />
                                        <div className={cx("user--text")}>
                                            <span>{comment.author ? comment.author.nickname : comment.anonymous_number === 0 ? "익명(작성자)" : `익명${comment.anonymous_number}`}</span>
                                            <span>{getDisplayTimePassed(new Date(comment.created_at))}</span>
                                        </div>
                                    </div>
                                    <div className={cx("commentControl")}>
                                        {comment.am_i_author && (
                                            <button
                                                className={cx("textButon")}
                                                onClick={() => {
                                                    setDeleteCommentId(comment.id);
                                                    setIsDeleteConfirmModalOpen(true);
                                                }}
                                            >
                                                삭제
                                            </button>
                                        )}
                                        <button
                                            className={cx("like_btn")}
                                            onClick={() => {
                                                axiosInstance.post(`/apis/v2/boards/comments/${comment.id}/like/`).then((res) => {
                                                    if (res.status === 200) {
                                                        setCommentList((prev) => {
                                                            const newCommentList = [...prev];
                                                            newCommentList[index].like_count = res.data.like_count;
                                                            newCommentList[index].is_liked = res.data.is_liked;
                                                            return newCommentList;
                                                        });
                                                    }
                                                });
                                            }}
                                        >
                                            {comment.is_liked ? <ThumbUpIcon style={{ color: "var(--color-primary-dark)" }} /> : <ThumbUpOffIcon />}
                                            <span>{comment.like_count}</span>
                                        </button>
                                    </div>
                                </div>
                                <div className={cx("commentBody")}>{comment.content}</div>
                            </div>
                        );
                    })}
                </div>
            )}
            <Modal
                open={isDeleteConfirmModalOpen}
                onClose={(e, reason) => {
                    if (reason === "submitButtonClick") {
                        axiosInstance.delete(`/apis/v2/boards/comments/${deleteCommentId}/`).then((res) => {
                            if (res.status === 204) {
                                setRefetch(new Date().getTime());
                            }
                        });
                    }
                    setIsDeleteConfirmModalOpen(false);
                }}
                type="confirm"
                title=""
            >
                정말 삭제하시겠습니까?
            </Modal>
        </div>
    );
}
