import { useState } from "react";
import { useEffect } from "react";

import { ReactComponent as CancelIcon } from "../assets/icons/material/cancel_black.svg";

export default function BoardArticleWriteModalImage({ image, onDelete, ...props }) {
    const [imageURL, setImageURL] = useState(null);

    useEffect(() => {
        const url = URL.createObjectURL(image);
        setImageURL(url);

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [image]);

    return (
        <div style={{ width: "20rem", height: "20rem", backgroundColor: "#eee", marginRight: "2rem", position: "relative" }}>
            <div style={{ width: "20rem", height: "20rem", backgroundImage: `url(${imageURL})`, backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundSize: "contain" }}></div>
            <button
                style={{ position: "absolute", right: "1rem", top: "1rem", display: "flex", justifyContent: "center", alignItems: "center", background: "none", cursor: "pointer" }}
                onClick={onDelete}
            >
                <CancelIcon width="2.4rem" height="2.4rem" />
            </button>
        </div>
    );
}
