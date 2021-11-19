import styles from "./Box.module.css";
import classNames from "classnames";

export default function Box({ children, className, style }) {
    return (
        <div style={style} className={classNames(className, styles.box)}>
            {children}
        </div>
    );
}
