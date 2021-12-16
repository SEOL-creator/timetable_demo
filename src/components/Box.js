import styles from "./Box.module.css";
import classNames from "classnames";

export default function Box({ children, className, style, half, ...props }) {
    return (
        <div style={style} className={classNames(className, styles.box, { [styles["box--half"]]: half })}>
            {children}
        </div>
    );
}
