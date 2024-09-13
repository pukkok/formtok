import React, { useState } from "react"
import classNames from "classnames"
import SurveySummary from "./SurveySummary"
import SurveyOption from "./SurveyOption"
import styled from "styled-components"

const StyledSurveyNavWrapper = styled.div`
    padding: 15px 0;
    position: sticky;
    top: 20px;
    border: solid 1px #d7d7d7;
    background-color: #fff;
    border-radius: 12px;
    height: 80vh;
    width: 400px;

    nav{
        padding: 0 20px;
        height: 30px;
        display: flex;
        gap: 10px;
        margin-bottom: 10px;

        button{
            padding-bottom: 5px;
            border-bottom: 2px solid transparent;
            font-weight: bold;

            &.active{
                color: var(--purple);
                border-bottom: 2px solid var(--purple);
            }
        }
    }
` 

function SurveyNav() {
    const [activeBtn, setActiveBtn] = useState(0)
    const btns = ['전체 문항', '설문 설정']

    return (
        <StyledSurveyNavWrapper>
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
        </StyledSurveyNavWrapper>
    )
}

export default SurveyNav
