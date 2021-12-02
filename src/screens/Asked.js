import { Tab, TabContent, TabHeader, TabHeaderItem } from "../components/Tab";
import axiosInstance from "../utils/axiosInstance";
import styles from "./Asked.module.scss";
import classNames from "classnames/bind";
import userImage from "../assets/images/asked/userImage.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
const cx = classNames.bind(styles);

export default function Asked() {
    const [userId, setUserId] = useState("gimpogo201");
    const [userName, setUserName] = useState("201");
    const user_image = userImage;

    const [pageIndex, setPageIndex] = useState(0);
    const [userInformation, setUserInformation] = useState(["", "", "", 1]);
    const [posts, setPosts] = useState([]);
    const [refetch, setRefetch] = useState(new Date().getTime());

    const textareaRef = useRef(null);

    useEffect(() => {
        async function getUserInformation() {
            try {
                const response = await axiosInstance.get(`apis/asked/userinfo/${userId}/`);
                setUserInformation(JSON.parse(response.data));
            } catch (e) {
                console.error(e);
            }
        }

        getUserInformation();
    }, [refetch]);

    useEffect(() => {
        async function getPosts() {
            try {
                const response = await axiosInstance.get(`apis/asked/posts/${userId}/${pageIndex}/`);
                const parser = new DOMParser();
                const doc = parser.parseFromString(response.data, "text/html");
                doc.querySelectorAll(".com_card > center").forEach((e) => {
                    e.parentElement.remove();
                });
                const elements = doc.querySelectorAll("body > *");
                let parsedPosts = [];
                for (let i = 0; i < elements.length; i += 2) {
                    parsedPosts.push({
                        askName: elements[i].querySelector("span.ask_name").innerText,
                        ask: elements[i].querySelector("div.card_ask").innerText,
                        time: elements[i].querySelector("div.card_time").innerText,
                        answer: elements[i].querySelector("div.card_answer").innerText,
                        hearts: elements[i + 1].querySelector("span.rating_cnt").innerText,
                    });
                }
                setPosts((post) => {
                    return [...post, ...parsedPosts];
                });
            } catch (e) {
                console.error(e);
            }
        }

        getPosts();
    }, [pageIndex]);

    function postAsk(id, ref) {
        axiosInstance
            .post(`apis/asked/ask/`, `id=${id}&content=${ref.current.value}&makarong_bat=-1&show_user=0`, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencode; charset=UTF-8",
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    setRefetch(new Date().getTime());
                    ref.current.value = "";
                } else {
                    console.log(response);
                }
            })
            .catch((e) => {
                console.error(e);
            });
    }

    return (
        <div className={cx("asked")}>
            <div className={cx("header")}>{userId}</div>
            <div className={cx("thickbar")}></div>
            <div className={cx("infocontainer")}>
                <div className={cx("info")}>
                    <div className={cx("user_info")}>
                        <img src={user_image} />
                        <div className={cx("user_text")}>
                            <span>{userName}</span>
                            <span>익명질문을 남겨주세요.</span>
                        </div>
                    </div>
                </div>
                <div className={styles.form}>
                    <div>
                        <textarea ref={textareaRef} className={cx("textarea")} maxLength="500" placeholder="질문을 입력해주세요."></textarea>{" "}
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                postAsk(userId, textareaRef);
                            }}
                        >
                            질문하기
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.content}>
                <Tab style={{ "--color-primary": "var(--theme)" }}>
                    <TabHeader>
                        <TabHeaderItem index={0}>
                            <div className={styles.headerTitle}>
                                <span>{userInformation[0]}</span>
                                <span>답변완료</span>
                            </div>
                        </TabHeaderItem>
                        <TabHeaderItem index={0}>
                            <div className={styles.headerTitle}>
                                <span>{userInformation[1]}</span>
                                <span>새질문</span>
                            </div>
                        </TabHeaderItem>
                        <TabHeaderItem index={0}>
                            <div className={styles.headerTitle}>
                                <span>{userInformation[2]}</span>
                                <span>거절질문</span>
                            </div>
                        </TabHeaderItem>
                    </TabHeader>
                    <TabContent index={0}>
                        <div>
                            {posts.map((post) => {
                                return (
                                    <div key={`${post.time}${post.ask}`} className={styles.askInstence}>
                                        <div className={styles["ask--title"]}>
                                            <div>
                                                <span>{post.askName}</span>
                                                <span>{post.ask}</span>
                                            </div>
                                            <div>
                                                <FontAwesomeIcon icon={faEllipsisH} />
                                            </div>
                                        </div>
                                        <div className={styles["ask--user"]}>
                                            <div>
                                                <img src={user_image} alt="프로필 사진" />
                                            </div>
                                            <div>
                                                <span>{userName}</span>
                                                <span>{post.time}</span>
                                            </div>
                                        </div>
                                        <div className={styles["ask--response"]}>{post.answer}</div>
                                        <div className={styles["ask--like"]}>
                                            <FontAwesomeIcon icon={faHeart} />
                                            <span>{post.hearts}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </TabContent>
                    <TabContent index={1}>{null}</TabContent>
                    <TabContent index={2}>{null}</TabContent>
                </Tab>
            </div>
        </div>
    );
}
