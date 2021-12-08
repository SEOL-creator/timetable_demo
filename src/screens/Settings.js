import { Tab, TabContent, TabHeader, TabHeaderItem } from "../components/Tab";
import "./Settings_tab.scss";
import styles from "./Settings.module.scss";
import SettingsProfile from "../components/SettingsProfile";
import SettingsNoti from "../components/SettingsNoti";

export default function Settings() {
    return (
        <div className={styles.settings}>
            <h1>설정</h1>
            <Tab>
                <TabHeader className="tabHeader">
                    <TabHeaderItem index={0}>나</TabHeaderItem>
                    <TabHeaderItem index={1}>디스플레이</TabHeaderItem>
                    <TabHeaderItem index={2}>알림</TabHeaderItem>
                    <TabHeaderItem index={3}>기타</TabHeaderItem>
                </TabHeader>
                <TabContent index={0}>
                    <SettingsProfile />
                </TabContent>
                <TabContent index={1}>null</TabContent>
                <TabContent index={2}>
                    <SettingsNoti />
                </TabContent>
                <TabContent index={3}>
                    클래스팅 열기 동작. 앱 대신 웹페이지로 열기. 클래스팅 앱이 설치되어있지 않은 모바일이나 태블릿 기기에서 클래스팅 링크가 작동하지 않을 때 사용합니다. 이 기기에만 적용됩니다.
                </TabContent>
            </Tab>
        </div>
    );
}
