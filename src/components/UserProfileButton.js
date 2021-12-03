import styles from "./UserProfileButton.module.scss";
import classNames from "classnames/bind";
import { Skeleton } from "@mui/material";
import UserProfilePic from "./UserProfilePic";
import { useMediaQuery } from "react-responsive";
const cx = classNames.bind(styles);

export default function UserProfileButton({ onClick, nickname }) {
    const isMaxWidth400 = useMediaQuery({ query: "(max-width: 400px)" });

    return (
        <button onClick={onClick} className={cx("button", "userProfileButton", { ["profilePicOnly"]: isMaxWidth400 })}>
            <UserProfilePic className={cx("userProfilePic")} />
            {isMaxWidth400 ? null : <div className={cx("userNickname")}>{nickname ? nickname : <Skeleton animation="wave" width={50} height={24} />}</div>}
        </button>
    );
}
