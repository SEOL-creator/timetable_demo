import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import Input from "../components/Input";
import Button from "../components/Button";
import UserContext from "../contexts/userContext";
import axiosInstance from "../utils/axiosInstance";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { setUser } = useContext(UserContext);

    const navigate = useNavigate();

    function handleSubmit(e) {
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

        axiosInstance
            .post("/apis/token/", { email: email, password: password })
            .then((response) => {
                if (response.status === 200) {
                    const data = response.data;
                    setUser({ isLogin: true, user: { email: data.email, nickname: data.nickname }, token: data.token });
                    navigate("/");
                }
            })
            .catch((error) => {
                setLoading(false);
                console.log(error.response);
                if (error.response?.status === 400) {
                    if (error.response.data.non_field_errors) {
                        setError("로그인할 수 없습니다. 이메일 혹은 비밀번호가 잘못되었을 수 있습니다.");
                    }
                } else if (error.response.data.detail) {
                    setError(error.response.data.detail);
                } else {
                    setError("알 수 없는 오류가 발생했습니다.");
                    console.log(error.response.data);
                }
            });
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", width: "100%", height: "max-content" }}>
            <form onSubmit={handleSubmit} autoComplete="on">
                <Input
                    autoComplete="username"
                    spellCheck="false"
                    autoCapitalize="none"
                    inputWidth="30rem"
                    label="이메일"
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    autofocus={true}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    autoComplete="current-password"
                    spellCheck="false"
                    autoCapitalize="off"
                    inputWidth="30rem"
                    label="비밀번호"
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                {/* <input className={cx("button", "button-primary", { "button--disabled": loading })} type="submit" value="로그인" disabled={loading} style={{ border: "none" }} /> */}
                <Button disabled={loading} onClick={handleSubmit}>
                    로그인
                </Button>
            </form>
            <div style={{ fontSize: "1.5rem", margin: "2rem 0", color: "rgb(160, 0, 0)", height: "2rem" }}>{error}</div>
        </div>
    );
}
