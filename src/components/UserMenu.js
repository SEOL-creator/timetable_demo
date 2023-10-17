import styles from "./UserMenu.module.scss";
import classNames from "classnames/bind";
import { useContext } from "react";
import UserContext from "../contexts/userContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);

export default function UserMenu({ display, handleClose, ref }) {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <div ref={ref} className={cx("menu", { "menu--display": display, "menu--hidden": !display })} onClick={handleClose}>
            <button
                className={cx("menu__item")}
                onClick={() => {
                    alert("You cannot log out from the demo");
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
