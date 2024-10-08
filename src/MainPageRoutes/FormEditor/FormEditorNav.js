import React, { useState } from "react"
import classNames from "classnames"
import FormSummary from "./FormNavSummary"
import SurveyOption from "./FormNavOption"
import styled from "styled-components"

const FormEditorNavWrapper = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    border-left: solid 1px var(--pk-form-editor-nav-border);
    background-color: var(--pk-form-editor-nav);
    width: 400px;
    height: 100vh;

    nav{
        button{
            padding: 10px 16px 5px;
            height: 58px;
            border-bottom: 2px solid transparent;
            font-weight: 800;

            &.active{
                color: var(--pk-point);
                border-bottom: 2px solid var(--pk-point);
            }
        }
        border-bottom: 1px solid var(--pk-form-editor-nav-border);
    }
` 

/** 오른쪽 사이드바 설문지 네비게이션 */
function FormNav({token}) {
    const [activeBtn, setActiveBtn] = useState(0)
    const btns = ['전체 문항', '설문 설정']

    return (
        <FormEditorNavWrapper>
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
            {activeBtn === 0 && <FormSummary token={token}/>}
            {activeBtn === 1 && <SurveyOption />}
        </FormEditorNavWrapper>
    )
}

export default FormNav
