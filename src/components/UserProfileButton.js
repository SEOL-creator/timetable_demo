import styles from "./UserProfileButton.module.scss";
import classNames from "classnames/bind";
import { Skeleton } from "@mui/material";
import UserProfilePic from "./UserProfilePic";
const cx = classNames.bind(styles);

export default function UserProfileButton({ onClick, nickname }) {
    return (
        <button onClick={onClick} className={cx("button", "userProfileButton")}>
            <UserProfilePic className={cx("userProfilePic")} />
            <div className={cx("userNickname")}>{nickname ? nickname : <Skeleton animation="wave" width={50} height={24} />}</div>
        </button>
    );
}
