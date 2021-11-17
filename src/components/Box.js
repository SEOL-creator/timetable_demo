import styles from "./Box.module.css";
import classNames from "classnames";

export default function Box({ children, className }) {
    return <div className={classNames(className, styles.box)}>{children}</div>;
}
