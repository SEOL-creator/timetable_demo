import { NavLink } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./SidebarButton.module.css";
const cx = classNames.bind(styles);

export default function SidebarButton({ children, onClick, to, href, ...props }) {
    if (to) {
        return (
            <NavLink
                className={(state) => {
                    return cx("button", { active: state.isActive });
                }}
                to={to}
                onClick={onClick}
            >
                {children}
            </NavLink>
        );
    } else if (href) {
        return (
            <a {...props} className={styles.button} href={href}>
                {children}
            </a>
        );
    } else {
        return (
            <button className={styles.button} onClick={onClick}>
                {children}
            </button>
        );
    }
}
