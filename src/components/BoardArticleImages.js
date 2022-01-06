import BoardArticleImage from "./BoardArticleImage";
import styles from "./BoardArticleImages.module.scss";
import classNames from "classnames/bind";
import { ReactComponent as ChevronLeftIcon } from "../assets/icons/material/chevron_left_black.svg";
import { ReactComponent as ChevronRightIcon } from "../assets/icons/material/chevron_right_black.svg";
import SwipeableViews from "react-swipeable-views";
import { useState } from "react";
import { BrowserView, isMobile, MobileView } from "react-device-detect";

const cx = classNames.bind(styles);

export default function BoardArticleImages({ images }) {
    const [imageIndex, setImageIndex] = useState(0);

    return (
        <div className={cx("container")}>
            <BrowserView
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div className={cx("swipeImageContainer")}>
                    <SwipeableViews
                        hysteresis={0.4}
                        index={imageIndex}
                        resistance
                        onChangeIndex={(index) => {
                            setImageIndex(index);
                        }}
                        style={{
                            width: "calc(100% - 1rem)",
                            height: "calc(100% - 1rem)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            boxSizing: "border-box",
                        }}
                    >
                        {images.map((image, index) => {
                            return (
                                <BoardArticleImage
                                    multiple
                                    key={index}
                                    image={image.photo}
                                    imageSquare={image.photo_square}
                                    width={image.width}
                                    height={image.height}
                                    orientation={image.orientation}
                                />
                            );
                        })}
                    </SwipeableViews>
                </div>
                {images.length > 1 && imageIndex > 0 && (
                    <button
                        className={cx("chevron", "chevron--left")}
                        onClick={() => {
                            setImageIndex(imageIndex - 1);
                        }}
                    >
                        <ChevronLeftIcon />
                    </button>
                )}
                {imageIndex < images.length - 1 && (
                    <button
                        className={cx("chevron", "chevron--right")}
                        onClick={() => {
                            setImageIndex(imageIndex + 1);
                        }}
                    >
                        <ChevronRightIcon />
                    </button>
                )}
            </BrowserView>
            <MobileView className={cx("mobileImageContainer")}>
                <div
                    style={{
                        width: "100%",
                        height: images.length > 1 ? "45.2rem" : "100%",
                        boxSizing: "border-box",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        flex: "none",
                    }}
                >
                    {images.map((image, index) => {
                        return (
                            <div className={cx("mobileImageItem")}>
                                <BoardArticleImage
                                    multiple
                                    key={index}
                                    image={image.photo}
                                    imageSquare={image.photo_square}
                                    width={image.width}
                                    height={image.height}
                                    orientation={image.orientation}
                                />
                                <div className={cx("imageIndex")}>{`${index + 1}/${images.length}`}</div>
                            </div>
                        );
                    })}
                </div>
            </MobileView>
        </div>
    );
}
