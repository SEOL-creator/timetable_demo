export default function Job() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
            }}
        >
            <h1
                style={{
                    fontSize: "2.4rem",
                    fontWeight: "bold",
                    margin: "4rem 0 2rem",
                }}
            >
                사람을 찾습니다
            </h1>
            <ul style={{ marginBottom: "1rem" }}>
                <li>• 디자이너</li>
                <li>• 프론트엔드 개발자</li>
            </ul>
            <div>
                <p>모집합니다</p>
                <p>연락주세요. </p>
            </div>
        </div>
    );
}
