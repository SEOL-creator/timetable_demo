import { useEffect } from "react";
import styles from "./BoardArticleWriteModalVote.module.scss";

export default function BoardArticleWriteModalVote({ vote, setVote }) {
    useEffect(() => {
        if (vote.length === 0) {
            setVote([{ title: "" }]);
        }
    }, [vote, setVote]);

    return (
        <div className={styles.voteContainer}>
            <h1>투표</h1>
            {vote.map((v, index) => {
                return (
                    <input
                        value={v.title}
                        key={index}
                        placeholder="항목 추가"
                        onChange={(e) => {
                            setVote((prev) => {
                                return prev.map((vote, i) => {
                                    if (i === index) {
                                        return { title: e.target.value };
                                    }
                                    return vote;
                                });
                            });
                            if (vote.length - 1 === index) {
                                setVote((prev) => {
                                    return [...prev, { title: "" }];
                                });
                            } else if (e.target.value === "") {
                                setVote((prev) => {
                                    return prev.slice(0, index).concat(prev.slice(index + 1));
                                });
                            }
                        }}
                    />
                );
            })}
        </div>
    );
}
