import React, { useState } from "react"
import { useRecoilState } from "recoil"
import { pagesAtom, randomKey } from "../../recoils/surveyAtoms"
import AddAnswer from '../../components/AddAnswer'

function Qform ({pi, qi}){
    const [pages, setPages] = useRecoilState(pagesAtom)
    const style = pages[pi].questions[qi].type || '객관식'
    const [answers, setAnswers] = useState([{id: 'A'+randomKey(), type: 'text'}])
    const [extra, setExtra] = useState(false)
    const addInput = () => {
        const id = 'A'+randomKey()
        setAnswers(prev => [...prev, {id, type: 'text'}])
    }

    return <>
        {style === '객관식' && 
        <div className="multiple">
            {answers.map((answer, idx) => {
                const {id, type} = answer
                return <AddAnswer key={id} type={type} placeholder={'옵션'+(idx+1)}/>
            })}
            {extra && <AddAnswer defaultValue={'기타'} disabled={true} handleClick={()=>setExtra(false)}/>}
            <div className="add-btns">
                <button className="add-answer-btn" onClick={addInput}>항목 추가</button>
                {!extra && <>
                    또는
                    <button className="add-extra-btn"onClick={()=>setExtra(true)}>'기타' 추가</button>
                </>}
            </div>
        </div>
        }
        {style === '서술형' &&
            <p className="long-text">서술형</p>
        }
        {style === '단답형' && 
            <p className="short-text">단답형</p>
        }
        {style === '날짜' &&
            <input type="date"/>
        }
        {style === '시간' &&
            <input type="time"/>
        }
    </>
}

export default Qform