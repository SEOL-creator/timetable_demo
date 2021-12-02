import styles from "./SettingBlock.module.css";
import classNames from "classnames";

export default function SettingBlock({ children, className, ...props }) {
    return (
        <div className={classNames(styles.block, className)} {...props}>
            {children}
        </div>
    );
}
