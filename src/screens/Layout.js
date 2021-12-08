import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout() {
    const [isSidebarDisplay, setIsSidebarDisplay] = useState(false);
    const toggleSidebar = () => setIsSidebarDisplay(!isSidebarDisplay);

    const isMaxWidth675 = useMediaQuery({ query: "(max-width: 675px)" });

    return (
        <>
            <Header toggleSidebar={toggleSidebar} />
            <Sidebar display={isSidebarDisplay} mobile={isMaxWidth675} clickAway={toggleSidebar} />
            <div
                style={{
                    width: "calc(100% - var(--size-sidebar-width))",
                    height: "100%",
                    overflowY: "scroll",
                    overflowX: "hidden",
                    boxSizing: "border-box",
                    paddingBottom: "env(safe-area-inset-bottom, 2rem)",
                }}
            >
                <Outlet />
            </div>
        </>
    );
}
