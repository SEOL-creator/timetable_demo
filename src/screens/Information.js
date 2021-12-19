import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Information.module.scss";
import Modal from "../components/Modal";
import { ReactComponent as IconMail } from "../assets/icons/material/email_black.svg";
import githubMark from "../assets/icons/github/GitHub-Mark-32px.png";
import logo from "../assets/images/logo/icon-192.png";
import { Skeleton } from "@mui/material";

export default function Information({ version }) {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Modal
            title="정보"
            open={true}
            onClose={() => {
                location.state?.backgroundLocation?.pathname ? navigate(location.state.backgroundLocation.pathname) : navigate("/");
            }}
            style={{
                margin: "0 1rem",
            }}
        >
            <div className={styles.information}>
                <div className={styles.left}>
                    <img src={logo} alt="사이트 로고 이미지" />
                </div>
                <div className={styles.right}>
                    <div>
                        <h1>에브리김포</h1>
                        <h3>김포고 생활을 더 편하고 즐겁게</h3>
                        <div className={styles.version}>
                            <span>{version?.current ? "v" + version?.current : <Skeleton animation="wave" width={40} height={20} />}</span>
                            <div className={styles.versionStatus}>{version?.isLatest ? "최신 버전입니다" : `버전 ${version?.latest}이 사용 가능합니다!`}</div>
                        </div>
                        <div style={{ margin: "1.6rem 0" }}>
                            <Link style={{ fontSize: "1.4rem", color: "var(--color-link)" }} to="/releasenotes" state={location.state}>
                                패치노트 확인하기
                            </Link>
                        </div>
                    </div>
                    <div>
                        <div className={styles.author}>
                            <span>제작: 설승빈</span>
                            <span className={styles.separater}> | </span>
                            <a href="mailto:sbseol@icloud.com">
                                <IconMail />
                            </a>
                            <a href="https://github.com/SEOL-creator" target="_blank" rel="noopener">
                                <img src={githubMark} alt="github logo" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
