import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../contexts/userContext";
import axiosInstance from "../utils/axiosInstance";
import Input from "./Input";
import Modal from "./Modal";
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
    const profilePicInputRef = useRef(null);
    const [profilePic, setProfilePic] = useState(null);
    const [profilePicPreview, setProfilePicPreview] = useState(null);

    useEffect(() => {
        if (profilePic) {
            const url = URL.createObjectURL(profilePic);
            setProfilePicPreview(url);

            return () => {
                URL.revokeObjectURL(url);
            };
        }
    }, [profilePic]);

    const onProfilePicInputChange = (e) => {
        if (profilePicInputRef.current?.files[0]) {
            setProfilePic(profilePicInputRef.current.files[0]);
            setDisplayProfileUploadModal(true);
        }
    };

    const handleUpload = (e, reason) => {
        if (reason === "submitButtonClick") {
            if (!profilePicInputRef.current.files[0]) return;
            const formData = new FormData();
            formData.append("image", profilePicInputRef.current.files[0]);
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
                })
                .finally(() => {
                    setDisplayProfileUploadModal(false);
                });
        } else {
            profilePicInputRef.current.files = null;
            setDisplayProfileUploadModal(false);
        }
    };

    return (
        <div className={cx("settings")}>
            <SettingBlock className={cx("userInfo")}>
                <div className={cx("profileArea")}>
                    <UserProfilePic className={styles.userProfilepic} />
                    <label className={styles.addProfilePicLabel}>
                        {user.profilepic ? "프로필 사진 변경" : "프로필 사진 추가"}
                        <input onChange={onProfilePicInputChange} ref={profilePicInputRef} type="file" accept="image/*" className={styles.profilePicInput} />
                    </label>
                    <Modal type="confirm" open={displayProfileUploadModal} onClose={handleUpload} title="확인">
                        <div className={styles.profilePicConfirm}>
                            {/* <img src={profilePicPreview} alt="" /> */}
                            <div>
                                <img src={profilePicPreview} alt="새 프로필 사진" />
                            </div>
                        </div>
                    </Modal>
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
