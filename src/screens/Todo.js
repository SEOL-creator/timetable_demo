import { useContext, useEffect, useState } from "react";
import Box from "../components/Box";
import Input from "../components/Input";
import styles from "./Todo.module.scss";
import axiosInstance from "../utils/axiosInstance";
import UserContext from "../contexts/userContext";
import UserProfilePic from "../components/UserProfilePic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEdit } from "@fortawesome/free-solid-svg-icons";
import { faCircle as circleRegular } from "@fortawesome/free-regular-svg-icons";
import classNames from "classnames/bind";
import Modal from "../components/Modal";
import { useLocation, useNavigate } from "react-router";
const cx = classNames.bind(styles);

export default function Todo() {
    const [todoItems, setTodoItems] = useState([]);
    const [refetchTodoItems, setRefetchTodoItems] = useState(new Date().getTime());
    const { user, isLogin } = useContext(UserContext);

    const location = useLocation();
    const navigate = useNavigate();

    const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
    const [alertText, setAlertText] = useState("");

    const [isNewTodoModalOpen, setIsNewTodoModalOpen] = useState(false);
    const [newToDoTitle, setNewToDoTitle] = useState("");
    const [newToDoDescription, setNewToDoDescription] = useState("");

    const [isEditTodoModalOpen, setIsEditTodoModalOpen] = useState(false);
    const [editToDoId, setEditToDoId] = useState(-1);
    const [editToDoTitle, setEditToDoTitle] = useState("");
    const [editToDoDescription, setEditToDoDescription] = useState("");

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteToDoId, setDeleteToDoId] = useState(-1);

    useEffect(() => {
        async function fetchTodoItems() {
            setTodoItems([
                {
                    id: 2,
                    title: "제목",
                    description: "내용..",
                    created_at: "2023-10-15T21:24:35.057109+09:00",
                    completed: false,
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
                },
                {
                    id: 1,
                    title: "제안사항 제목",
                    description: "내용\n...",
                    created_at: "2023-10-15T21:24:22.101974+09:00",
                    completed: false,
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
                },
            ]);
        }

        fetchTodoItems();
    }, [refetchTodoItems]);

    function updateTodoItem(id, todoItem) {
        async function update() {
            const response = await axiosInstance.patch(`/apis/todolist/${id}/`, todoItem);
            const newItem = response.data;
            for (let i = 0; i < todoItems.length; i++) {
                if (todoItems[i].id === id) {
                    setTodoItems([...todoItems.slice(0, i), newItem, ...todoItems.slice(i + 1)]);
                }
            }
        }

        update();
    }
    function deleteTodoItem(id) {
        async function delItem() {
            const response = await axiosInstance.delete(`/apis/todolist/${id}/`);
            if (response.status === 204) {
                setRefetchTodoItems(new Date().getTime());
            } else {
                console.log(response.status);
                console.log(response.data);
            }
        }

        delItem();
    }

    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "flex-start", flexWrap: "wrap", padding: "0 1rem", paddingBottom: "4rem", boxSizing: "border-box" }}>
            <Box className={styles.todo}>
                <div className={styles.heading}>
                    <h1>To Do</h1>
                    <button
                        className={styles.button}
                        onClick={() => {
                            if (!isLogin) {
                                navigate("/login", { state: { backgroundLocation: location } });
                            } else {
                                setIsNewTodoModalOpen(true);
                            }
                        }}
                    >
                        <FontAwesomeIcon icon={faEdit} width="100%" height="100%" color="inherit" fixedWidth />
                    </button>
                </div>
                <div className={styles.separator}></div>
                <div
                    style={{
                        fontSize: "1.4rem",
                        color: "var(--color-text-secondary)",
                    }}
                >
                    버그, 아이디어 제안, 개선사항 등을 남겨주세요.
                </div>
                <div className={styles.todoContainer}>
                    {todoItems.map((todo) => {
                        return (
                            <div className={cx("todoItem", { "todoItem--completed": todo.completed })} key={todo.title}>
                                <div className={styles.separator}></div>
                                <div className={styles.todoTitle}>
                                    <button
                                        onClick={() => {
                                            if (todo.author.id === user.id || user.is_staff) {
                                                updateTodoItem(todo.id, { completed: !todo.completed });
                                            } else {
                                                setAlertText("작성자만 변경할 수 있습니다.");
                                                setIsAlertModalOpen(true);
                                            }
                                        }}
                                    >
                                        <FontAwesomeIcon icon={todo.completed ? faCheck : circleRegular} width="100%" height="100%" fixedWidth color="inherit" />
                                    </button>
                                    <h1>{todo.title}</h1>
                                </div>
                                <div className={styles.todoContent}>
                                    <div>{todo.description}</div>
                                </div>
                                <div className={styles.todoControl}>
                                    <div>
                                        <UserProfilePic profilepicObject={todo.author.profilepic} />
                                        <span>{todo.author.nickname}</span>
                                    </div>
                                    {todo.author.id === user.id && (
                                        <div className={styles.todoControlAdmin}>
                                            <button
                                                style={{ cursor: "pointer" }}
                                                onClick={() => {
                                                    setEditToDoId(todo.id);
                                                    setEditToDoTitle(todo.title);
                                                    setEditToDoDescription(todo.description);
                                                    setIsEditTodoModalOpen(true);
                                                }}
                                            >
                                                수정
                                            </button>
                                            <button
                                                style={{ cursor: "pointer" }}
                                                onClick={() => {
                                                    setDeleteToDoId(todo.id);
                                                    setIsDeleteModalOpen(true);
                                                }}
                                            >
                                                삭제
                                            </button>
                                        </div>
                                    )}
                                    {todo.author.id !== user.id && user.is_staff && (
                                        <div className={styles.todoControlAdmin}>
                                            <button
                                                style={{ cursor: "pointer" }}
                                                onClick={() => {
                                                    setDeleteToDoId(todo.id);
                                                    setIsDeleteModalOpen(true);
                                                }}
                                            >
                                                삭제
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Box>
            <Modal
                open={isAlertModalOpen}
                onClose={(e, reason) => {
                    setIsAlertModalOpen(false);
                    setAlertText("");
                }}
                type="alert"
                title=""
            >
                {alertText}
            </Modal>
            <Modal
                open={isDeleteModalOpen}
                onClose={(e, reason) => {
                    if (reason === "submitButtonClick") {
                        deleteTodoItem(deleteToDoId);
                    }
                    setIsDeleteModalOpen(false);
                }}
                type="confirm"
                title=""
            >
                정말 삭제하시겠습니까?
            </Modal>
            <Modal
                open={isEditTodoModalOpen}
                onClose={(e, reason) => {
                    setIsEditTodoModalOpen(false);
                }}
                type="confirm"
                title="ToDo 수정"
                disableAutoFocus
            >
                <Input
                    value={editToDoTitle}
                    onChange={(e) => {
                        setEditToDoTitle(e.target.value);
                    }}
                    label="ToDo 제목"
                    autofocus
                    style={{ width: "24rem" }}
                />
                <textarea
                    value={editToDoDescription}
                    onChange={(e) => {
                        setEditToDoDescription(e.target.value);
                    }}
                />
            </Modal>
            <Modal
                open={isNewTodoModalOpen}
                onClose={(e, reason) => {
                    if (reason === "submitButtonClick") {
                        setNewToDoTitle("");
                        setNewToDoDescription("");
                    }
                    setIsNewTodoModalOpen(false);
                }}
                type="confirm"
                title="새 ToDo"
                disableAutoFocus
            >
                <Input
                    value={newToDoTitle}
                    onChange={(e) => {
                        setNewToDoTitle(e.target.value);
                    }}
                    hideLabel={true}
                    label="ToDo 제목"
                    placeholder="제목을 입력하세요"
                    autofocus
                    style={{ width: "24rem" }}
                />
                <textarea
                    className={styles.newTodoTextarea}
                    value={newToDoDescription}
                    rows="4"
                    onChange={(e) => {
                        setNewToDoDescription(e.target.value);
                    }}
                />
            </Modal>
        </div>
    );
}
