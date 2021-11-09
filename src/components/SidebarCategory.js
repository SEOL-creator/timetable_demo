import styles from "./SidebarCategory.module.css";

export default function SidebarCategory({ title, children }) {
    return (
        <div className={styles.wrap}>
            <span className={styles.title}>{title}</span>
            <div className={styles.seperator}></div>
            <div className={styles.buttonWrap}>{children}</div>
        </div>
    );
}
