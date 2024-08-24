import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeTabAtom, tabsAtom } from "../../Recoil/AdminRecoil";
import classNames from "classnames";

function Header () {

    const tabs = useRecoilValue(tabsAtom)
    const [activeTab, setActiveTab] = useRecoilState(activeTabAtom)
    
    return <div className="header">
        {tabs.length > 0 && 
        tabs.map(tab => {
            return <div 
            key={tab}
            onClick={()=> setActiveTab(tab)}
            className={classNames({active : activeTab === tab})}
            >{tab}</div>
        })}
    </div>
}

export default Header