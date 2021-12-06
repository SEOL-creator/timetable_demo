import { useContext, useEffect, useState } from "react";
import Box from "../components/Box";
import Input from "../components/Input";
import styles from "./Todo.module.scss";
import axiosInstance from "../utils/axiosInstance";
import UserContext from "../contexts/userContext";
import UserProfilePic from "../components/UserProfilePic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle as circleSolid, faCheck, faEdit } from "@fortawesome/free-solid-svg-icons";
import { faCircle as circleRegular } from "@fortawesome/free-regular-svg-icons";
import classNames from "classnames/bind";
import Modal from "../components/Modal";
const cx = classNames.bind(styles);

export default function Todo() {
    const [todoItems, setTodoItems] = useState([]);
    const [refetchTodoItems, setRefetchTodoItems] = useState(new Date().getTime());
    const { user } = useContext(UserContext);
    const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newToDoTitle, setNewToDoTitle] = useState("");
    const [newToDoDescription, setNewToDoDescription] = useState("");

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteToDoId, setDeleteToDoId] = useState(-1);

    useEffect(() => {
        async function fetchTodoItems() {
            const response = await axiosInstance.get("/apis/todolist/");
            setTodoItems(response.data);
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
                            setIsEditModalOpen(true);
                        }}
                    >
                        <FontAwesomeIcon icon={faEdit} width="100%" height="100%" color="inherit" fixedWidth />
                    </button>
                </div>
                <div className={styles.todoContainer}>
                    {todoItems.map((todo) => {
                        return (
                            <div className={cx("todoItem", { "todoItem--completed": todo.completed })} key={todo.title}>
                                <div className={styles.separator}></div>
                                <div className={styles.todoTitle}>
                                    <button
                                        onClick={() => {
                                            if (todo.author.id === user.id) {
                                                updateTodoItem(todo.id, { completed: !todo.completed });
                                            } else {
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
                                            <button>수정</button>
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
                }}
                type="alert"
                title=""
            >
                작성자만 변경할 수 있습니다.
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
                open={isEditModalOpen}
                onClose={(e, reason) => {
                    if (reason === "submitButtonClick") {
                        axiosInstance
                            .post("/apis/todolist/", { title: newToDoTitle, description: newToDoDescription })
                            .then((response) => {
                                if (response.status === 201) {
                                    setRefetchTodoItems(new Date().getTime());
                                } else {
                                    console.log(response.status);
                                    console.log(response.data);
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    }
                    setIsEditModalOpen(false);
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
                    label="ToDo 제목"
                    labelWidth="24rem"
                    autofocus
                />
                <textarea
                    value={newToDoDescription}
                    onChange={(e) => {
                        setNewToDoDescription(e.target.value);
                    }}
                />
            </Modal>
        </div>
    );
}
