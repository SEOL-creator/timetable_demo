import { NavLink } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./SidebarButton.module.css";
const cx = classNames.bind(styles);

export default function SidebarButton({ children, onClick, to }) {
    if (to) {
        return (
            <NavLink
                className={(state) => {
                    return cx("button", { active: state.isActive });
                }}
                to={to}
            >
                {children}
            </NavLink>
        );
    } else {
        return (
            <button className={styles.button} onClick={onClick}>
                {children}
            </button>
        );
    }
}
