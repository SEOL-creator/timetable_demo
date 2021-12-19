import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../contexts/userContext";
import axiosInstance from "../utils/axiosInstance";
import Input from "./Input";
import Modal from "./Modal";
import Button from "./Button";
import styles from "./SettingsProfile.module.scss";
import UserProfilePic from "./UserProfilePic";
import classNames from "classnames/bind";
import SettingBlock from "./SettingBlock";
const cx = classNames.bind(styles);

export default function SettingsProfile() {
    const { user, setUserInfo } = useContext(UserContext);
    const [displayProfileUploadModal, setDisplayProfileUploadModal] = useState(false);
    const profilePicInputRef = useRef(null);
    const [profilePic, setProfilePic] = useState(null);
    const [profilePicPreview, setProfilePicPreview] = useState(null);
    const [nickname, setNickname] = useState(user.nickname);

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
                .post("/apis/v2/accounts/users/uploadprofilepic/", formData, {
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
                            <div>
                                <img src={profilePicPreview} alt="새 프로필 사진" />
                            </div>
                        </div>
                    </Modal>
                </div>
                <div className={styles.userInfoTexts}>
                    <div>
                        <span>이메일</span>
                        <Input hideLabel className={styles.input} disabled value={user.email} />
                    </div>
                    <div>
                        <span>닉네임</span>
                        <Input
                            hideLabel
                            className={styles.input}
                            value={nickname}
                            onChange={(e) => {
                                setNickname(e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <Button
                            disabled={nickname === user.nickname}
                            className={cx({ "nicknameButton--disabled": nickname === user.nickname })}
                            onClick={() => {
                                axiosInstance
                                    .patch(`/apis/v2/accounts/users/${user.id}/`, { nickname })
                                    .then((response) => {
                                        if (response.status === 200) {
                                            setUserInfo(response.data);
                                        } else {
                                            console.log(response);
                                        }
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    });
                            }}
                        >
                            적용
                        </Button>
                    </div>
                </div>
            </SettingBlock>
        </div>
    );
}
