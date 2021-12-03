import { useContext } from "react";
import UserContext from "../contexts/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import styles from "./UserProfilePic.module.scss";

export default function UserProfilePic({ profilepicObject = null, className, ...props }) {
    const user = useContext(UserContext);

    const profilepic = profilepicObject ? profilepicObject : user.user.profilepic;

    return (
        <div className={classNames(styles.profilepicContainer, className)} {...props}>
            {profilepic && profilepic["512px"] ? (
                <div className={styles.imageContainer}>
                    <img srcSet={`${profilepic["50px"]} 50w, ${profilepic["256px"]} 256w, ${profilepic["512px"]} 512w,`} src={profilepic["512px"]} />
                </div>
            ) : (
                <FontAwesomeIcon className={styles.faIcon} icon={faUserCircle} width="100%" height="100%" fixedWidth />
            )}
        </div>
    );
}
