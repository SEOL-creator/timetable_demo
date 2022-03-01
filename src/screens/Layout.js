import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import ImportantAlert from "./ImportantAlert";
import Sidebar from "./Sidebar";

export default function Layout() {
    const [isSidebarDisplay, setIsSidebarDisplay] = useState(false);
    const toggleSidebar = () => {
        if (isMaxWidth675) setIsSidebarDisplay(!isSidebarDisplay);
    };

    const isMaxWidth675 = useMediaQuery({ query: "(max-width: 675px)" });

    useEffect(() => {
        setIsSidebarDisplay(false);
    }, [isMaxWidth675]);

    return (
        <>
            <ImportantAlert />
            <Header toggleSidebar={toggleSidebar} />
            <Sidebar display={isSidebarDisplay} mobile={isMaxWidth675} clickAway={toggleSidebar} />
            <div
                style={{
                    width: "calc(100% - var(--size-sidebar-width))",
                    height: "100%",
                    overflowY: "auto",
                    overflowX: "hidden",
                    boxSizing: "border-box",
                    paddingBottom: "env(safe-area-inset-bottom, 2rem)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                }}
            >
                <Outlet />
            </div>
        </>
    );
}
