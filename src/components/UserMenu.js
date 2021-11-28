import styles from "./UserMenu.module.scss";
import classNames from "classnames/bind";
import { useContext } from "react";
import UserContext from "../contexts/userContext";
import { ClickAwayListener } from "@mui/material";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);

export default function UserMenu({ display, handleClose, ref }) {
    const { setUser } = useContext(UserContext);

    return (
        <div ref={ref} className={cx("menu", { "menu--display": display, "menu--hidden": !display })} onClick={handleClose}>
            <button
                className={cx("menu__item")}
                onClick={() => {
                    setUser({ isLogin: false, user: { email: "", nickname: "" }, token: "" });
                }}
            >
                로그아웃
            </button>
            <Link className={cx("menu__item")} to="/settings">
                설정
            </Link>
        </div>
    );
}
