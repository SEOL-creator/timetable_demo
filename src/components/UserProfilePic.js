import { useContext } from "react";
import UserContext from "../contexts/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import styles from "./UserProfilePic.module.scss";

export default function UserProfilePic({ profilepicObject = null, className, size, ...props }) {
    const user = useContext(UserContext);

    const profilepic = profilepicObject ? (profilepicObject === "anonymous" ? null : profilepicObject) : user.user.profilepic;

    return (
        <div className={classNames(styles.profilepicContainer, className)} {...props}>
            {profilepic && profilepic["512px"] ? (
                <div className={styles.imageContainer}>{size ? <img alt="프로필 사진" src={profilepic[size]} /> : <img alt="프로필 사진" src={profilepic["50px"]} />}</div>
            ) : (
                <FontAwesomeIcon className={styles.faIcon} icon={faUserCircle} width="100%" height="100%" fixedWidth />
            )}
        </div>
    );
}
