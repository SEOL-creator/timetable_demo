import { useState } from "react";
import { useNavigate } from "react-router";
import Input from "../components/Input";
import Button from "../components/Button";
import axiosInstance from "../utils/axiosInstance";

export default function Register() {
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [emailError, setEmailError] = useState("");
    const [nicknameError, setNicknameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const errorMessageI18N = (message) => {
        if (message === "이 필드는 반드시 고유(unique)해야 합니다.") return "이미 사용중인 값입니다.";
        return message;
    };

    const clearErrors = () => {
        setError("");
        setEmailError("");
        setNicknameError("");
        setPasswordError("");
    };

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        clearErrors();

        if (!email || !nickname || !password) {
            setLoading(false);
            setError("모든 필드를 입력해주세요.");
            return;
        }
        if (email.split("@").length !== 2 || email.split("@")[1]?.split(".").length !== 2) {
            setLoading(false);
            setEmailError("올바른 이메일 주소를 입력해주세요");
            return;
        }
        if (nickname.length > 20) {
            setLoading(false);
            setNicknameError("닉네임은 20자 이하여야 합니다.");
            return;
        }

        axiosInstance
            .post("/apis/register/", { email: email, nickname: nickname, password: password, password2: password, code: code })
            .then((response) => {
                const data = response.data;
                navigate("/register/complete", { state: data });
            })
            .catch((error) => {
                setLoading(false);
                console.log(error.response);
                if (error.response.status === 400) {
                    for (const [key, value] of Object.entries(error.response.data)) {
                        const errorMessage = value[0];
                        if (key === "email") setEmailError(errorMessageI18N(errorMessage));
                        if (key === "nickname") setNicknameError(errorMessageI18N(errorMessage));
                        if (key === "password") setPasswordError(errorMessageI18N(errorMessage));
                        if (key === "password2") setPasswordError(errorMessageI18N(errorMessage));
                        if (key === "non_field_errors") setError(errorMessageI18N(errorMessage));
                    }
                } else {
                    console.log(error.response.data);
                    setError("알 수 없는 오류가 발생했습니다.");
                }
            });
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", width: "100%", height: "100%" }}>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
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
                    error={emailError}
                    style={{ margin: "3.6rem 0" }}
                />
                <Input
                    autoComplete="nickname"
                    spellCheck="false"
                    autoCapitalize="none"
                    inputWidth="30rem"
                    label="닉네임"
                    type="text"
                    name="nickname"
                    value={nickname}
                    placeholder="Nickname"
                    onChange={(e) => setNickname(e.target.value)}
                    error={nicknameError}
                    style={{ margin: "3.6rem 0" }}
                />
                <Input
                    autoComplete="new-password"
                    spellCheck="false"
                    autoCapitalize="off"
                    inputWidth="30rem"
                    label="비밀번호"
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    error={passwordError}
                    style={{ margin: "3.6rem 0" }}
                />
                <Input
                    autoComplete="off"
                    spellCheck="false"
                    autoCapitalize="none"
                    inputWidth="30rem"
                    label="학생 인증 코드"
                    type="text"
                    name="code"
                    value={code}
                    placeholder="Code"
                    onChange={(e) => setCode(e.target.value)}
                    style={{ margin: "3.6rem 0" }}
                />
                <Button disabled={loading} onClick={handleSubmit}>
                    회원가입
                </Button>
            </form>
            <div style={{ fontSize: "1.5rem", margin: "2rem 0", color: "rgb(160, 0, 0)", height: "2rem" }}>{error}</div>
        </div>
    );
}
