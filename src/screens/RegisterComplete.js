import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";

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
                    maxWidth: "40rem",
                    minWidth: "20rem",
                    height: "max-content",
                    backgroundColor: "white",
                    padding: "1rem 2rem 2rem 2rem ",
                    borderRadius: "var(--border-radius-extra-extra-large)",
                    boxShadow: "var(--box-shadow-widget)",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <h1 style={{ fontSize: "2.4rem", fontWeight: "700", margin: "2rem 0" }}>{state?.nickname}님, 반갑습니다!</h1>
                <h1 style={{ fontSize: "1.6rem", fontWeight: "700", margin: "0.8rem 0" }}>계정 생성에 성공했습니다!</h1>
                {state?.is_active === true ? (
                    <Link to="/login" style={{ color: "var(--color-primary-dark)", fontWeight: "700" }}>
                        로그인하기
                    </Link>
                ) : (
                    <>
                        <span>
                            하지만 코드를 입력하지 않았거나, 잘못된 코드를 입력하여 <strong style={{ color: "rgb(230,100,100)" }}>재학생 인증이 완료된 이후에 로그인이 가능합니다.</strong>
                        </span>
                        <span style={{ margin: "0.4rem 0" }}>이메일({state?.email})을 알려주시면 빠르게 처리하겠습니다.</span>
                    </>
                )}
            </div>
        </div>
    );
}
