import styles from "./Button.module.css";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

export default function Button({ children, onClick, className, theme = "primary", disabled = false }) {
    return (
        <button className={cx(styles.button, { [`button-${theme}`]: true }, { "button--disabled": disabled })} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    );
}
