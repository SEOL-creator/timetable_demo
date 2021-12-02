import { isIOS } from "react-device-detect";
import styles from "./SettingsNoti.module.scss";

export default function SettingsNoti() {
    return <div className={styles.setting}>{isIOS && <div className={styles.alert}>iOS, iPadOS 장치에서는 알림을 받을 수 없습니다.</div>}</div>;
}
