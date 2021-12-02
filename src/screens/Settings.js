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
                </TabHeader>
                <TabContent index={0}>
                    <SettingsProfile />
                </TabContent>
                <TabContent index={1}>null2</TabContent>
                <TabContent index={2}>
                    <SettingsNoti />
                </TabContent>
            </Tab>
        </div>
    );
}
