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
    autoComplete,
    spellCheck,
    autoCapitalize,
    error,
    className,
    disabled = false,
    ...props
}) {
    return (
        <label className={cx(className, "label", { "stack-stack": stack }, { [`stack-${stack}`]: stack })} {...props}>
            {!hideLabel && (
                <>
                    <span className={styles.span}>
                        {label}
                        <span style={{ fontSize: "1.3rem", marginLeft: "1rem", color: "rgb(240, 100, 100)" }}>{error}</span>
                    </span>
                </>
            )}
            <input
                autoComplete={autoComplete}
                spellCheck={spellCheck}
                autoCapitalize={autoCapitalize}
                className={cx("input", { "input--error": error, "input--disabled": disabled })}
                name={name}
                type={type}
                placeholder={placeholder}
                autoFocus={autofocus}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
        </label>
    );
}
