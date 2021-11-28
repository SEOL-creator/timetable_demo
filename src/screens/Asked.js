import { Tab, TabContent, TabHeader, TabHeaderItem } from "../components/Tab";
import styles from "./Asked.module.scss";
import classNames from "classnames/bind";
import userImage from "../assets/images/asked/userImage.png";
const cx = classNames.bind(styles);

export default function Asked() {
    return (
        <div className={cx("asked")}>
            <div className={cx("header")}>gimpogo201</div>
            <div className={cx("thickbar")}></div>
            <div className={cx("infocontainer")}>
                <div className={cx("info")}>
                    <div className={cx("user_info")}>
                        <img src={userImage} />
                        <div className={cx("user_text")}>
                            <span>201</span>
                            <span>익명질문을 남겨주세요.</span>
                        </div>
                    </div>
                    <div>
                        <div></div>
                        <div>
                            <span></span>
                            <button></button>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <textarea className={cx("textarea")} maxlength="500" placeholder="질문을 입력해주세요."></textarea>{" "}
                    </div>
                    <div>
                        <button>익명</button>
                        <button>질문하기</button>
                    </div>
                </div>
            </div>
            <div className={styles.content}>
                <Tab style={{ "--color-primary": "var(--theme)" }}>
                    <TabHeader>
                        <TabHeaderItem index={0}>
                            <div className={styles.headerTitle}>
                                <span>9</span>
                                <span>답변완료</span>
                            </div>
                        </TabHeaderItem>
                        <TabHeaderItem index={1}>
                            <div className={styles.headerTitle}>
                                <span>4</span>
                                <span>새질문</span>
                            </div>
                        </TabHeaderItem>
                        <TabHeaderItem index={2}>
                            <div className={styles.headerTitle}>
                                <span>0</span>
                                <span>거절질문</span>
                            </div>
                        </TabHeaderItem>
                    </TabHeader>
                    <TabContent index={0}>
                        <div>
                            <div>
                                <div>
                                    <div>
                                        <span>익명</span>
                                        <span>파파라치때문에 힘들어요</span>
                                    </div>
                                    <div>:</div>
                                </div>
                                <div>
                                    <div>
                                        <img />
                                    </div>
                                    <div>
                                        <span>201</span>
                                        <span>12일 전</span>
                                    </div>
                                </div>
                                <div>원만한 합의 기원합니다</div>
                                <div>0</div>
                            </div>
                        </div>
                    </TabContent>
                    <TabContent index={1}>{null}</TabContent>
                    <TabContent index={2}>{null}</TabContent>
                </Tab>
            </div>
        </div>
    );
}
