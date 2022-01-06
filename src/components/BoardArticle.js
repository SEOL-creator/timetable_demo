import styles from "./BoardArticle.module.scss";

import UserProfilePic from "./UserProfilePic";
import Button from "./Button";

import { ReactComponent as ThumbUpIcon } from "../assets/icons/material/thumb_up_alt_black.svg";
import { ReactComponent as ThumbUpOffIcon } from "../assets/icons/material/thumb_up_off_alt_black.svg";
import { ReactComponent as CommentIcon } from "../assets/icons/material/comment_black.svg";
import getDisplayTimePassed from "../utils/getDisplayTimePassed";
import formatDateTime from "../utils/formatDateTime";
import BoardArticleComment from "./BoardArticleComment";
import { useState } from "react";
import BoardArticleVote from "./BoardArticleVote";
import BoardArticleImages from "./BoardArticleImages";

export default function BoardArticle({ article, onDeleteClick, onLikeClick }) {
    const [isCommentOpen, setIsCommentOpen] = useState(false);

    return (
        <div className={styles.article}>
            <div className={styles.articleInfo}>
                <div className={styles.articleInfoLeft}>
                    <div>
                        <UserProfilePic profilepicObject={article.author ? article.author.profilepic : "anonymous"} />
                    </div>
                    <div>
                        <div>{article.author ? article.author.nickname : "익명"}</div>
                        <div title={formatDateTime(new Date(article.created_at), "YYYY년 MM월 DD일 HH시 mm분 ss초")}>{getDisplayTimePassed(new Date(article.created_at))}</div>
                    </div>
                </div>
                {article.am_i_author && (
                    <div className={styles.articleInfoRight}>
                        <button className={styles.textButon} onClick={onDeleteClick}>
                            삭제
                        </button>
                    </div>
                )}
            </div>
            <div className={styles.articleTitle}>{article.title}</div>
            <div className={styles.articleBody}>{article.content}</div>
            {article.photos?.length > 0 && <BoardArticleImages images={article.photos} />}
            {article.vote && <BoardArticleVote poll={article.vote} articleId={article.id} />}
            <div className={styles.articleFooter}>
                <Button onClick={onLikeClick}>
                    {article.is_liked ? <ThumbUpIcon style={{ color: "var(--color-primary-dark)" }} /> : <ThumbUpOffIcon />}
                    <span>{article.like_count}</span>
                </Button>
                <Button
                    onClick={() => {
                        setIsCommentOpen(!isCommentOpen);
                    }}
                    theme="secondary"
                >
                    <CommentIcon />
                    <span>{article.comment_count}</span>
                </Button>
            </div>
            {isCommentOpen && <BoardArticleComment articleId={article.id} board={article.board} />}
        </div>
    );
}
