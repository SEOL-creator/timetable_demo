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
    const [articleList, setArticleList] = useState([]);

    const [isNewArticleModalOpen, setIsNewArticleModalOpen] = useState(false);

    const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
    const [deleteArticleId, setDeleteArticleId] = useState(null);

    useEffect(() => {
        if (!isLogin) {
            navigate("/login");
        }
    }, [isLogin]);

    useEffect(() => {
        async function getArticleList() {
            try {
                const response = await axiosInstance.get(`/apis/v2/boards/${boardCode}/`);
                setArticleList(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        if (isLogin) {
            setArticleList([]);
            getArticleList();
        }
    }, [isLogin, boardCode, refetchArticle]);

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
                        return (
                            <BoardArticle
                                article={article}
                                key={article.id}
                                onDeleteClick={() => {
                                    setDeleteArticleId(article.id);
                                    setIsDeleteConfirmModalOpen(true);
                                }}
                                onLikeClick={() => {
                                    axiosInstance.post(`/apis/v2/boards/article/${article.id}/like/`).then((res) => {
                                        if (res.status === 200) {
                                            setArticleList((prev) => {
                                                const newArticleList = [...prev];
                                                newArticleList[index].like_count = res.data.like_count;
                                                newArticleList[index].is_liked = res.data.is_liked;
                                                return newArticleList;
                                            });
                                        }
                                    });
                                }}
                            />
                        );
                    })}
                </div>
            </div>
            <BoardArticleWriteModal
                open={isNewArticleModalOpen}
                onClose={(e, reason, title, content, isAnonChecked) => {
                    if (reason === "submitButtonClick") {
                        const response = axiosInstance.post(`/apis/v2/boards/${boardCode}/`, {
                            title,
                            content,
                            is_anonymous: isAnonChecked,
                        });
                        response.then((res) => {
                            if (res.status === 201) {
                                setRefetchArticle(new Date());
                            }
                        });
                    }
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
