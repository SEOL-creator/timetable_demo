import { createPortal } from "react-dom";
import { ClickAwayListener } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import styles from "./Modal.module.scss";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
const cx = classNames.bind(styles);

export default function Modal({ title, children, type, open, onClose, exitOnEscape = true, submitButtonText = "확인", disableAutoFocus, unstyled, nomargin, className, ...props }) {
    // type = "alert" | "confirm" | "none"

    const firstFocusable = useRef(null);
    const lastFocusable = useRef(null);
    const initialFocus = useRef(null);
    const previousFocus = useRef(null);

    const [unmounted, setUnmounted] = useState(true);

    const root = document.getElementById("modal");

    function handleKeyDown(e) {
        // Close on escape
        if (exitOnEscape && (e.key === "Escape" || e.key === "Esc" || e.keyCode === 27)) {
            onClose(e, "escapeKeyDown");
        }

        // Focus trap
        if (e.key === "Tab" || e.keyCode === 9) {
            if (e.shiftKey) {
                if (e.target === firstFocusable.current) {
                    lastFocusable.current.focus();
                    e.preventDefault();
                }
            } else {
                if (e.target === lastFocusable.current) {
                    firstFocusable.current.focus();
                    e.preventDefault();
                }
            }
        }
    }

    useEffect(() => {
        const app = document.getElementById("root");

        if (!unmounted) {
            previousFocus.current = document.activeElement;
            app.tabIndex = -1;
            app.ariaHidden = true;
            if (!disableAutoFocus) {
                if (initialFocus.current) {
                    initialFocus.current?.focus();
                } else {
                    lastFocusable.current?.focus();
                }
            }
            return () => {
                app.removeAttribute("tabindex");
                app.removeAttribute("aria-hidden");
            };
        }

        if (unmounted && previousFocus.current) {
            previousFocus.current?.focus();
        }
    }, [unmounted, disableAutoFocus]);

    useEffect(() => {
        const ANIMATION_DURATION = 100;
        if (!open) {
            return setTimeout(() => {
                setUnmounted(true);
            }, ANIMATION_DURATION);
        } else {
            setUnmounted(false);
        }
    }, [open]);

    const modal = unmounted ? (
        false
    ) : (
        <div
            className={cx("modalWrap", { "modalWrap--open": open, "modalWrap--closed": !open })}
            onKeyDown={(e) => {
                handleKeyDown(e);
            }}
        >
            <ClickAwayListener
                onClickAway={(e) => {
                    onClose(e, "backdropClick");
                }}
                mouseEvent="onMouseDown"
            >
                <div className={cx("modal", { "modal--open": open, "modal--closed": !open }, { "modal--unstyled": unstyled }, { "modal--nomargin": nomargin }, className)} {...props}>
                    {unstyled ? (
                        children
                    ) : (
                        <>
                            <div>
                                <div></div>
                                <div>{title}</div>
                                <button
                                    className={styles.button}
                                    onClick={(e) => {
                                        onClose(e, "closeButtonClick");
                                    }}
                                    ref={firstFocusable}
                                >
                                    <FontAwesomeIcon icon={faTimes} fixedWidth width="100%" height="100%" color="inherit" />
                                </button>
                            </div>
                            <div>{children}</div>
                            <div>
                                {type === "alert" && (
                                    <Button
                                        className={styles.button}
                                        onClick={(e) => {
                                            onClose(e, "submitButtonClick");
                                        }}
                                        ref={lastFocusable}
                                    >
                                        {submitButtonText}
                                    </Button>
                                )}
                                {type === "confirm" && (
                                    <>
                                        <Button
                                            className={styles.button}
                                            onClick={(e) => {
                                                onClose(e, "cancelButtonClick");
                                            }}
                                            ref={initialFocus}
                                            theme="secondary"
                                        >
                                            취소
                                        </Button>
                                        <Button
                                            className={styles.button}
                                            onClick={(e) => {
                                                onClose(e, "submitButtonClick");
                                            }}
                                            ref={lastFocusable}
                                        >
                                            {submitButtonText}
                                        </Button>
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </ClickAwayListener>
        </div>
    );
    return createPortal(modal, root);
}
