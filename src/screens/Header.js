import { useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import UserContext from "../contexts/userContext";
import Hamburger from "../components/Hamburger";
import styles from "./Header.module.css";
import HeaderTitle from "../components/HeaderTitle";
import UserProfileButton from "../components/UserProfileButton";
import UserMenu from "../components/UserMenu";
import { ClickAwayListener } from "@mui/material";

export default function Header({ toggleSidebar }) {
    const { isLogin, user, setUser } = useContext(UserContext);
    const [displayMenu, setDisplayMenu] = useState(false);

    const isMaxWidth600 = useMediaQuery({ maxWidth: "600px" });

    return (
        <header className={styles.header}>
            <div className={styles.hamburgerContainer} onClick={toggleSidebar}>
                <Hamburger />
            </div>
            <HeaderTitle></HeaderTitle>
            <div className={styles.buttonContainer}>
                {isLogin ? (
                    <ClickAwayListener
                        onClickAway={() => {
                            setDisplayMenu(false);
                        }}
                    >
                        <div>
                            <UserProfileButton
                                nickname={user.nickname}
                                onClick={() => {
                                    setDisplayMenu(!displayMenu);
                                }}
                            />
                            <UserMenu
                                display={displayMenu}
                                onClick={() => {
                                    setDisplayMenu(!displayMenu);
                                }}
                                handleClose={() => {
                                    setDisplayMenu(false);
                                }}
                            />
                        </div>
                    </ClickAwayListener>
                ) : (
                    <>
                        {!isMaxWidth600 && (
                            <Link to="/login" className={styles.button}>
                                로그인
                            </Link>
                        )}
                        <Link to="/register" className={styles.primaryButton}>
                            회원가입
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
}
