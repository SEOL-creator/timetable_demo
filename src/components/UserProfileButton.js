import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "./UserProfileButton.module.scss";
import classNames from "classnames/bind";
import { Skeleton } from "@mui/material";
const cx = classNames.bind(styles);

export default function UserProfileButton({ onClick, nickname, profilePicURL }) {
    return (
        <button onClick={onClick} className={cx("button", "userProfileButton")}>
            <div className={cx("userProfilePic")}>
                {profilePicURL ? <img className={styles.userProfilePicImg} src={profilePicURL} alt="프로필 사진" /> : <FontAwesomeIcon className={styles.userIcon} icon={faUserCircle} />}
            </div>
            <div className={cx("userNickname")}>{nickname ? nickname : <Skeleton animation="wave" width={50} height={24} />}</div>
        </button>
    );
}
