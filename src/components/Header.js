import Hamburger from "./Hamburger";
import styles from "./Header.module.css";

export default function Header({ title, subtitle }) {
    return (
        <header className={styles.header}>
            <div className={styles.hamburgerContainer}>
                <Hamburger />
            </div>
            <div className={styles.titleContainer}>
                <span className={styles.title}>{title}</span>
                <span className={styles.subtitle}>{subtitle}</span>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.button}>로그인</button>
            </div>
        </header>
    );
}
