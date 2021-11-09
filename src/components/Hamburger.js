import styles from "./Hamburger.module.css";

export default function Hamburger({ onClick }) {
    return (
        <button className={styles.hamburger} onClick={onClick}>
            <div className={styles["hamburger__line"]}></div>
            <div className={styles["hamburger__line"]}></div>
            <div className={styles["hamburger__line"]}></div>
        </button>
    );
}
