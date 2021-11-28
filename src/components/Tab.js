import { useState, createContext, useContext } from "react";
import classNames from "classnames";
import "./Tab.css";

const TabContext = createContext();
const useTabContext = () => useContext(TabContext);

export function Tab({ className, style, children, defaultTab = 0, tab }) {
    const [tabIndex, setTabIndex] = useState(defaultTab);

    let context = {};

    if (tab) {
        context = {
            tabIndex: tab,
            setTabIndex,
        };
    } else {
        context = {
            tabIndex,
            setTabIndex,
        };
    }

    return (
        <TabContext.Provider value={context}>
            <div className={classNames("tab", className)} style={style}>
                {children}
            </div>
        </TabContext.Provider>
    );
}

export const TabHeader = (props) => {
    const { tabIndex } = useTabContext();
    const tabBarWidth = Math.round(10000 / props.children.length) / 100;
    return (
        <>
            <div className="tab__header" style={props.style}>
                {props.children}
            </div>
            <div className="tab__bar">
                <div style={{ width: tabBarWidth + "%", marginLeft: tabIndex * tabBarWidth + "%" }}></div>
            </div>
        </>
    );
};

export const TabHeaderItem = (props) => {
    const { tabIndex, setTabIndex } = useTabContext();

    let onClickHandler = () => setTabIndex(props.index);
    if (props.onClickOverride) {
        onClickHandler = () => {
            props.onClickOverride();
            setTabIndex(props.index);
        };
    }

    return (
        <div className={classNames("header__item", props.className, { ["header--disabled"]: tabIndex !== props.index })} onClick={onClickHandler}>
            {props.children}
        </div>
    );
};

export function TabContent(props) {
    const { tabIndex } = useTabContext();
    if (props.index === tabIndex || (Array.isArray(props.index) && props.index.includes(tabIndex))) {
        return props.children;
    } else {
        return null;
    }
}
