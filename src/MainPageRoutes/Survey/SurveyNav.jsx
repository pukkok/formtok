import React, { useState } from "react"
import classNames from "classnames"
import SurveySummary from "./SurveySummary"
import SurveyOption from "./SurveyOption"
import styled from "styled-components"

const SurveyNavWrapper = styled.div`
    position: fixed;
    right: 0;
    top: 0;

    border: solid 1px var(--pk-charcoal);
    background-color: var(--pk-dark);
    height: 80vh;
    width: 400px;
    height: 100vh;

    nav{
        button{
            padding: 10px 16px;
            height: 50px;
            border-bottom: 2px solid transparent;
            font-weight: 800;

            &.active{
                color: var(--pk-point);
                border-bottom: 2px solid var(--pk-point);
            }
        }
    }
` 

function SurveyNav() {
    const [activeBtn, setActiveBtn] = useState(0)
    const btns = ['전체 문항', '설문 설정']

    return (
        <SurveyNavWrapper>
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
            {activeBtn === 1 && <SurveyOption />}
        </SurveyNavWrapper>
    )
}

export default SurveyNav
