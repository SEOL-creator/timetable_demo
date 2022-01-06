import { useEffect, useState } from "react";
import styles from "./BoardArticleVote.module.scss";
import classNames from "classnames/bind";
import axiosInstance from "../utils/axiosInstance";

const cx = classNames.bind(styles);

export default function BoardArticleVote({ poll, articleId }) {
    const [vote, setVote] = useState(poll);
    const [selectedVote, setSelectedVote] = useState(null);

    useEffect(() => {
        setVote(vote);
    }, [poll]);

    useEffect(() => {
        if (vote) {
            setSelectedVote(null);
            vote.votes.forEach((vote, index) => {
                if (vote.voted) {
                    setSelectedVote(index);
                }
            });
        }
    }, [vote]);

    function handleVoteClick(index) {
        if (selectedVote === index) {
            setSelectedVote(null);
        } else {
            setSelectedVote(index);
        }
        const response = axiosInstance.post(`/apis/v2/boards/article/${articleId}/vote/`, { vote_index: index });
        response.then((res) => {
            setVote(res.data);
        });
    }

    return (
        <div className={cx("voteContainer", { "voteContainer--voted": selectedVote !== null })}>
            {vote.votes.map((voteItem, index) => {
                return (
                    <div
                        key={index}
                        className={cx("voteItem", { "voteItem--selected": selectedVote === index })}
                        onClick={() => {
                            handleVoteClick(index);
                        }}
                    >
                        <div className={cx("vote--title")}>{voteItem.title}</div>
                        <div className={cx("vote--percentage")}>{voteItem.count === 0 ? 0 : Math.round((voteItem.count / vote.vote_count) * 100)}%</div>
                        <div className={cx("vote--barContainer")}>
                            <div style={{ width: `${voteItem.count === 0 ? 0 : Math.round((voteItem.count / vote.vote_count) * 100)}%` }} className={cx("vote--bar")}></div>
                        </div>
                    </div>
                );
            })}
            <h2>{vote.vote_count}명 투표</h2>
        </div>
    );
}
