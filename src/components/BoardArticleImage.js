import { useState } from "react";
import { ReactComponent as CollectionsIcon } from "../assets/icons/material/collections_black.svg";
import styles from "./BoardArticleImage.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

export default function BoardArticleImage({ image, imageSquare, multiple, width, height, orientation }) {
    const [isFullImage, setIsFullImage] = useState(false);

    return (
        <div
            onClick={() => {
                setIsFullImage(!isFullImage);
            }}
            className={cx("imageContainer")}
        >
            {isFullImage ? (
                <img src={image} className={cx({ "img--vertical": orientation === "VERTICAL", "img--horizontal": orientation === "HORIZONTAL", "img--square": orientation === "SQUARE" })} />
            ) : (
                <img src={imageSquare} className={cx("img--square")} />
            )}
            {multiple && (
                <div className={cx("imageIcon")}>
                    <CollectionsIcon />
                </div>
            )}
        </div>
    );
}
