import { useContext, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import UserContext from "../contexts/userContext";
import axiosInstance from "../utils/axiosInstance";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { setUser } = useContext(UserContext);

    function handleSubmit(e) {
        async function login() {
            const response = await axiosInstance.post("/apis/token/", { email: email, password: password });
            if (response.status === 200) {
                const data = response.data;
                setUser({ isLogin: true, user: data.user, token: data.token });
            } else {
                setLoading(false);
                console.log(response);
                if (response?.status === 400) {
                    if (response.data.non_field_errors) {
                        setError("로그인할 수 없습니다. 이메일 혹은 비밀번호가 잘못되었을 수 있습니다.");
                    }
                } else if (response.data.detail) {
                    setError(response.data.detail);
                } else {
                    setError("알 수 없는 오류가 발생했습니다.");
                    console.log(response.data);
                }
            }
        }

        e.preventDefault();
        setLoading(true);
        setError("");

        if (!email && !password) {
            setLoading(false);
            setError("이메일과 암호를 입력해주세요.");
            return;
        }
        if (!email) {
            setLoading(false);
            setError("이메일을 입력해주세요.");
            return;
        }
        if (!password) {
            setLoading(false);
            setError("암호를 입력해주세요.");
            return;
        }
        if (email.split("@").length !== 2 || email.split("@")[1]?.split(".").length !== 2) {
            setLoading(false);
            setError("올바른 이메일 주소를 입력해주세요");
            return;
        }

        login();
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", width: "100%", height: "max-content" }}>
            <form onSubmit={handleSubmit} autoComplete="on" style={{ width: "100%" }}>
                <Input
                    autoComplete="username"
                    spellCheck="false"
                    autoCapitalize="none"
                    label="이메일"
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    autofocus={true}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ margin: "3.6rem 0" }}
                />
                <Input
                    autoComplete="current-password"
                    spellCheck="false"
                    autoCapitalize="off"
                    label="비밀번호"
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ margin: "3.6rem 0" }}
                />
                <Button disabled={loading} onClick={handleSubmit}>
                    로그인
                </Button>
            </form>
            <div style={{ fontSize: "1.5rem", margin: "2rem 0", color: "rgb(160, 0, 0)", height: "2rem" }}>{error}</div>
        </div>
    );
}
