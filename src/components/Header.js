import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/userContext";
import Hamburger from "./Hamburger";
import styles from "./Header.module.css";

export default function Header({ title, subtitle, toggleSidebar }) {
    const { isLogin, user, setUser } = useContext(UserContext);
    const [displayMenu, setDisplayMenu] = useState(false);

    return (
        <header className={styles.header}>
            <div className={styles.hamburgerContainer} onClick={toggleSidebar}>
                <Hamburger />
            </div>
            <div className={styles.titleContainer}>
                <span className={styles.title}>{title}</span>
                <span className={styles.subtitle}>{subtitle}</span>
            </div>
            <div className={styles.buttonContainer}>
                {isLogin ? (
                    <button
                        onClick={() => {
                            setDisplayMenu(!displayMenu);
                        }}
                        className={styles.button}
                    >
                        {user.nickname}
                    </button>
                ) : (
                    <Link to="/login" className={styles.button}>
                        로그인
                    </Link>
                )}
                <div style={displayMenu ? { display: "block" } : {}} className={styles.menu}>
                    <button
                        onClick={() => {
                            setUser({ isLogin: false, user: { email: "", nickname: "" }, token: "" });
                            setDisplayMenu(false);
                        }}
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </header>
    );
}
