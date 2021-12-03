import { Link } from "react-router-dom";
import styles from "./Error404.module.scss";

export default function Error404() {
    return (
        <div className={styles.error}>
            <h1>404</h1>
            <h2>이런! 찾을 수 없어요.</h2>
            <h3>지금 찾고 있는 페이지는 삭제되었거나, 이름이 바뀌었거나, 일시적으로 접근이 불가능한 것 같아요.</h3>
            <Link to="/">홈으로 돌아가기</Link>
        </div>
    );
}
