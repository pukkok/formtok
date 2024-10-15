import React from "react"
import styled from "styled-components"
import usePageActions from "../../Hooks/usePageActions"
import AddAnswer from '../../Components/AddAnswer'

const StyledMultiple = styled.div`
    .add-btns{
        margin-top: 20px;

        button{
            padding: 5px 10px;
            border-radius: 12px;
            font-weight: 500;

            &.add-answer-btn{
                background-color: var(--pk-point);
                color: var(--pk-light-grey);
                margin-right: 10px;
            }
            &.add-extra-btn{
                background-color: var(--pk-add-extra-btn-bg);
                color: var(--pk-light-grey);
                margin-left: 10px;
            }
        }
    }
`

function Multiple ({style, pages, pi, qi}) {
    
    const { addOption, toggleEXtraOption, changeOption, deleteOption } = usePageActions()

    return (
    <StyledMultiple>
        {pages[pi].questions[qi].options.map((option, idx3) => {
            const {id, answer} = option
            return <AddAnswer key={id} 
            inputChange={(e)=>changeOption(e, pi, qi, idx3)} placeholder={'옵션'+(idx3+1)} value={answer} 
            buttonClick={()=>deleteOption(pi, qi, idx3)}
            isNotUseBtn={pages[pi].questions[qi].options.length===1 && idx3===0}
            />
        })}
        {style !== '드롭다운' ? <>
        {pages[pi].questions[qi].hasExtraOption && 
        <AddAnswer defaultValue={'기타'} disabled={true} buttonClick={()=>toggleEXtraOption(pi, qi, false)}/>}
        <div className="add-btns">
            <button className="add-answer-btn" onClick={()=>addOption(pi, qi)}>항목 추가</button>
            {!pages[pi].questions[qi].hasExtraOption && <>
                또는
            <button className="add-extra-btn"onClick={()=>toggleEXtraOption(pi, qi, true)}>'기타' 추가</button>
            </>}
        </div>
        </> :
        <div className="add-btns">
            <button className="add-answer-btn" onClick={()=>addOption(pi, qi)}>항목 추가</button>
        </div>
        }
    </StyledMultiple>)
}

export default Multiple