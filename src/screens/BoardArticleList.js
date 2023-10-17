import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import UserContext from "../contexts/userContext";
import axiosInstance from "../utils/axiosInstance";

import UserProfilePic from "../components/UserProfilePic";

import styles from "./BoardArticleList.module.scss";
import BoardListContext from "../contexts/boardListContext";
import Modal from "../components/Modal";
import BoardArticleWriteModal from "../components/BoardArticleWriteModal";
import BoardArticle from "../components/BoardArticle";

export default function BoardArticleList() {
    const { isLogin, user } = useContext(UserContext);
    const { boardCode } = useParams();
    const navigate = useNavigate();

    const boardList = useContext(BoardListContext);

    const [refetchArticle, setRefetchArticle] = useState(new Date());

    const [currentBoard, setCurrentBoard] = useState({});
    const [articleList, setArticleList] = useState([
        {
            id: 3,
            board: {
                title: "자유게시판",
                code: "board",
                type: "ALL",
            },
            title: "Asdf",
            content: "Ghjkl",
            author: {
                id: 1,
                email: "sbseol@icloud.com",
                nickname: "sb",
                profilepic: {
                    "512px": "",
                    "50px": "",
                    "256px": "",
                },
                classroom: {
                    id: 1,
                    grade: 3,
                    room: 1,
                },
            },
            created_at: "2023-10-16T18:51:05.617985+09:00",
            is_updated: false,
            is_liked: false,
            like_count: 0,
            comment_count: 1,
            is_anonymous: false,
            am_i_author: false,
            vote: {
                vote_count: 2,
                votes: [
                    {
                        title: "A",
                        count: 1,
                        voted: true,
                    },
                    {
                        title: "B",
                        count: 0,
                        voted: false,
                    },
                    {
                        title: "C",
                        count: 1,
                        voted: false,
                    },
                ],
            },
            photos: [],
        },
        {
            id: 2,
            board: {
                title: "자유게시판",
                code: "board",
                type: "ALL",
            },
            title: "게시글 제목",
            content: "게시글 내용",
            author: {
                id: 1,
                email: "sbseol@icloud.com",
                nickname: "sb",
                profilepic: {
                    "512px": "",
                    "50px": "",
                    "256px": "",
                },
                classroom: {
                    id: 1,
                    grade: 3,
                    room: 1,
                },
            },
            created_at: "2023-10-14T17:20:19.925791+09:00",
            is_updated: false,
            is_liked: false,
            like_count: 0,
            comment_count: 0,
            is_anonymous: false,
            am_i_author: false,
            vote: null,
            photos: [
                {
                    photo: "http://localhost:8000/media/article_photos/2/fb8cb7a7-2a8e-4a71-9c84-a4e8594e2808.jpg",
                    photo_square: "http://localhost:8000/media/article_photos/2/fb8cb7a7-2a8e-4a71-9c84-a4e8594e2808_square.jpg",
                    width: 336,
                    height: 237,
                    orientation: "HORIZONTAL",
                },
            ],
        },
        {
            id: 1,
            board: {
                title: "자유게시판",
                code: "board",
                type: "ALL",
            },
            title: "게시글 제목",
            content: "게시글 내용",
            author: {
                id: 1,
                email: "sbseol@icloud.com",
                nickname: "sb",
                profilepic: {
                    "512px": "",
                    "50px": "",
                    "256px": "",
                },
                classroom: {
                    id: 1,
                    grade: 3,
                    room: 1,
                },
            },
            created_at: "2023-10-14T17:20:03.168940+09:00",
            is_updated: false,
            is_liked: false,
            like_count: 0,
            comment_count: 0,
            is_anonymous: false,
            am_i_author: false,
            vote: {
                vote_count: 2,
                votes: [
                    {
                        title: "투표 1",
                        count: 2,
                        voted: true,
                    },
                    {
                        title: "투표 2",
                        count: 0,
                        voted: false,
                    },
                    {
                        title: "투표 3",
                        count: 0,
                        voted: false,
                    },
                ],
            },
            photos: [],
        },
    ]);

    const [isNewArticleModalOpen, setIsNewArticleModalOpen] = useState(false);

    const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
    const [deleteArticleId, setDeleteArticleId] = useState(null);

    useEffect(() => {
        if (!isLogin) {
            navigate("/login");
        }
    }, [isLogin]);

    useEffect(() => {
        const board = boardList.find((board) => board.code === boardCode);
        setCurrentBoard(board);
    }, [isLogin, boardList, boardCode]);

    const deleteArticle = (articleId) => {
        const response = axiosInstance.delete(`/apis/v2/boards/article/${articleId}/`);
        response
            .then((res) => {
                if (res.status === 204) {
                    setArticleList((prevArticleList) => prevArticleList.filter((article) => article.id !== articleId));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.list}>
                    <div className={styles.header}>
                        <div className={styles.headerTitle}>
                            <span>{currentBoard?.title}</span>
                        </div>
                        <div className={styles.writeArea}>
                            <UserProfilePic />
                            <button
                                onClick={() => {
                                    setIsNewArticleModalOpen(true);
                                }}
                            >
                                {user.nickname}님, 무슨 생각을 하고 계신가요?
                            </button>
                        </div>
                    </div>
                    {articleList.map((article, index) => {
                        return <BoardArticle article={article} key={article.id} onDeleteClick={() => {}} onLikeClick={() => {}} />;
                    })}
                </div>
            </div>
            <BoardArticleWriteModal
                open={isNewArticleModalOpen}
                handleClose={(e, reason, data) => {
                    setIsNewArticleModalOpen(false);
                }}
                board={currentBoard}
            />
            <Modal
                open={isDeleteConfirmModalOpen}
                onClose={(e, reason) => {
                    if (reason === "submitButtonClick") {
                        deleteArticle(deleteArticleId);
                    }
                    setIsDeleteConfirmModalOpen(false);
                }}
                type="confirm"
                title=""
            >
                정말 삭제하시겠습니까?
            </Modal>
        </>
    );
}
