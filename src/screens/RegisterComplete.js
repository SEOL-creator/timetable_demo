import { useLocation, useNavigate } from "react-router";

export default function RegisterComplete() {
    const { state } = useLocation();
    const navigate = useNavigate();
    if (!state?.email) {
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
            <div
                style={{
                    width: "30rem",
                    height: "max-content",
                    backgroundColor: "white",
                    padding: "1rem 2rem 0 2rem ",
                    borderRadius: "var(--border-radius-extra-extra-large)",
                    boxShadow: "var(--box-shadow-widget)",
                }}
            >
                <h1>계정 생성에 성공했습니다!</h1>
                <span>{state?.email}</span>
                <span>하지만 재학생 인증이 완료된 이후에 로그인이 가능합니다.</span>
            </div>
        </div>
    );
}
