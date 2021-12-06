import styles from "./Button.module.css";
import classNames from "classnames/bind";
import { forwardRef } from "react";
const cx = classNames.bind(styles);

function Button({ children, onClick, className, theme = "primary", disabled = false, ...props }, ref) {
    return (
        <button className={cx(styles.button, { [`button-${theme}`]: true }, { "button--disabled": disabled }, className)} disabled={disabled} onClick={onClick} ref={ref} {...props}>
            {children}
        </button>
    );
}
export default forwardRef(Button);
