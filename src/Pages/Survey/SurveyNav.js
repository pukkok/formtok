import React, { useState } from "react"
import classNames from "classnames"
import SurveySummary from "./SurveySummary"

function SurveyNav() {
    const [activeBtn, setActiveBtn] = useState(0)
    const btns = ['전체 문항', '설문 설정']

    return (
        <div className="survey-nav">
            <nav>
                {btns.map((btn, idx) => (
                    <button
                        key={btn + idx}
                        className={classNames({ active: activeBtn === idx })}
                        onClick={() => setActiveBtn(idx)}
                    >
                        {btn}
                    </button>
                ))}
            </nav>
            {activeBtn === 0 && <SurveySummary />}
        </div>
    )
}

export default SurveyNav
