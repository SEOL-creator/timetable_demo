import { useContext } from "react";
import { useNavigate } from "react-router";
import { Tab, TabContent, TabHeader, TabHeaderItem } from "../components/Tab";
import UserContext from "../contexts/userContext";
import Login from "./Login";
import Register from "./Register";

export default function LoginRegister({ defaultTab = 0 }) {
    const navigate = useNavigate();
    const userContext = useContext(UserContext);

    if (userContext.isLogin) {
        navigate("/");
    }

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                paddingTop: "6rem",
                boxSizing: "border-box",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
            }}
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
                tab={defaultTab}
            >
                <TabHeader>
                    <TabHeaderItem
                        index={0}
                        onClickOverride={() => {
                            navigate("/login");
                        }}
                    >
                        로그인
                    </TabHeaderItem>
                    <TabHeaderItem
                        index={1}
                        onClickOverride={() => {
                            navigate("/register");
                        }}
                    >
                        회원가입
                    </TabHeaderItem>
                </TabHeader>
                <TabContent index={0}>
                    <Login />
                </TabContent>
                <TabContent index={1}>
                    <Register />
                </TabContent>
            </Tab>
        </div>
    );
}
