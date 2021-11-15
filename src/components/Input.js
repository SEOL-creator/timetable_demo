import styles from "./Input.module.css";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

export default function Input({
    name,
    value,
    onChange,
    type = "text",
    label,
    autofocus = false,
    placeholder,
    stack = null,
    hideLabel = false,
    labelWidth = "auto",
    inputWidth = "16rem",
    autoComplete,
    spellCheck,
    autoCapitalize,
    error,
}) {
    return (
        <label className={cx("label", { "stack-stack": stack }, { [`stack-${stack}`]: stack })}>
            {!hideLabel && (
                <>
                    <span className={styles.span} style={{ width: labelWidth }}>
                        {label}
                        <span style={{ fontSize: "1.3rem", marginLeft: "1rem", color: "rgb(240, 100, 100)" }}>{error}</span>
                    </span>
                </>
            )}
            <input
                autoComplete={autoComplete}
                spellCheck={spellCheck}
                autoCapitalize={autoCapitalize}
                className={cx("input", { "input--error": error })}
                name={name}
                type={type}
                placeholder={placeholder}
                autoFocus={autofocus}
                style={{ width: inputWidth }}
                value={value}
                onChange={onChange}
            />
        </label>
    );
}
