import { useContext, useRef, useState } from "react";
import UserContext from "../contexts/userContext";
import axiosInstance from "../utils/axiosInstance";
import Input from "./Input";
import styles from "./SettingsProfile.module.scss";
import UserProfilePic from "./UserProfilePic";
import classNames from "classnames/bind";
import SettingBlock from "./SettingBlock";
const cx = classNames.bind(styles);

function uploadProfilePic(image) {
    return (
        <div>
            <img src={image} alt="profile" />
        </div>
    );
}

export default function SettingsProfile() {
    const { user, setUserInfo } = useContext(UserContext);
    const [displayProfileUploadModal, setDisplayProfileUploadModal] = useState(false);

    const onProfilePicInputChange = (e) => {
        if (!e.target.files[0]) return;
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        axiosInstance
            .post("/apis/users/uploadprofilepic/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                setUserInfo(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className={cx("settings")}>
            <SettingBlock className={cx("userInfo")}>
                <div className={cx("profileArea")}>
                    <UserProfilePic className={styles.userProfilepic} />
                    <label className={styles.addProfilePicLabel}>
                        {user.profilepic ? "프로필 사진 변경" : "프로필 사진 추가"}
                        <input onChange={onProfilePicInputChange} type="file" accept="image/*" className={styles.profilePicInput} />
                    </label>
                </div>
                <div className={styles.userInfoTexts}>
                    <div>
                        <span>이메일</span>
                        <Input hideLabel className={styles.input} inputWidth="100%" disabled value={user.email} />
                    </div>
                    <div>
                        <span>닉네임</span>
                        <Input hideLabel className={styles.input} inputWidth="100%" value={user.nickname} />
                    </div>
                </div>
            </SettingBlock>
        </div>
    );
}
