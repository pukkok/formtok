import React from "react"
import { useRecoilValue } from "recoil"
import { pagesAtom } from "../../recoils/surveyAtoms"
import AddAnswer from '../../components/AddAnswer'
import usePageActions from "../../hooks/usePageActions"

function Qform ({pi, qi}){
    const pages = useRecoilValue(pagesAtom)
    const style = pages[pi].questions[qi].type || '객관식'
    
    const { addOption, toggleEXtraOption, changeOption, deleteOption } = usePageActions()

    return <div className="qform">
        {style === '객관식' &&
        <div className="multiple">
            {pages[pi].questions[qi].options.map((answer, idx3) => {
                const {id, query} = answer
                return <AddAnswer key={id} 
                inputChange={(e)=>changeOption(e, pi, qi, idx3)} placeholder={'옵션'+(idx3+1)} value={query} 
                buttonClick={()=>deleteOption(pi, qi, idx3)}
                isNotUseBtn={pages[pi].questions[qi].options.length===1 && idx3===0}
                />
            })}
            {pages[pi].questions[qi].hasExtraOption && 
            <AddAnswer defaultValue={'기타'} disabled={true} buttonClick={()=>toggleEXtraOption(pi, qi, false)}/>}
            <div className="add-btns">
                <button className="add-answer-btn" onClick={()=>addOption(pi, qi)}>항목 추가</button>
                {!pages[pi].questions[qi].hasExtraOption && <>
                    또는
                    <button className="add-extra-btn"onClick={()=>toggleEXtraOption(pi, qi, true)}>'기타' 추가</button>
                </>}
            </div>
        </div>
        }
        {style === '서술형' &&
            <p className="long-text">서술형</p>
        }
        {style === '단답형' && 
            <input className="short-text" placeholder="단답형" disabled={true}/>
        }
        {style === '날짜' &&
            <input className="short-text" type="date" disabled={true}/>
        }
        {style === '시간' &&
            <input className="short-text" type="time" disabled={true}/>
        }
    </div>
}

export default Qform