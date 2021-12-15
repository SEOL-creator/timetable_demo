import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import Modal from "../components/Modal";
import { Tab, TabContent, TabHeader, TabHeaderItem } from "../components/Tab";
import UserContext from "../contexts/userContext";
import Login from "../components/Login";
import Register from "../components/Register";

export default function ModalLoginRegister({ defaultTab = 0 }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { isLogin } = useContext(UserContext);

    useEffect(() => {
        isLogin && navigate(location.state.backgroundLocation.pathname, { replace: true });
    });

    return (
        <Modal
            title="로그인 / 회원가입"
            open={true}
            onClose={() => {
                navigate(location.state.backgroundLocation.pathname, { replace: true });
            }}
            unstyled
        >
            <Tab
                style={{
                    width: "30rem",
                    height: "max-content",
                    backgroundColor: "white",
                    padding: "1rem 2rem 0 2rem ",
                    borderRadius: "var(--border-radius-extra-extra-large)",
                    boxShadow: "var(--box-shadow-widget)",
                }}
                defaultTab={defaultTab}
            >
                <TabHeader style={{ width: "100%", height: "max-content" }}>
                    <TabHeaderItem index={0}>로그인</TabHeaderItem>
                    <TabHeaderItem index={1}>회원가입</TabHeaderItem>
                </TabHeader>
                <TabContent index={0}>
                    <Login />
                </TabContent>
                <TabContent index={1}>
                    <Register />
                </TabContent>
            </Tab>
        </Modal>
    );
}
