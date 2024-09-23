import React, { useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { endingMentAtom, pagesAtom } from "../../Recoils/surveyAtoms";
import RadioButton from "../../Components/RadioButton";
import {FormCardWrapper} from "../FormEditor/_StyledFormCard"
import DescriptionEditor from '../../Components/DescriptionEditor'
import {SurveyFormWrapper} from './_StyledSurveyForm'

function SurveyForm() {
    const pages = useRecoilValue(pagesAtom)
    const endingMent = useRecoilValue(endingMentAtom)

    const [select, setSelect] = useState(null)
    const [currentIdx, setCurrentIdx] = useState(0)

    return <SurveyFormWrapper>
        {pages[currentIdx] && <>
        <FormCardWrapper className="card active form-card">
            <h4 className="pd">{`${(currentIdx+1)}/${pages.length} 페이지`}</h4>
            <div className="pd">
                <p className="title-A">{pages[currentIdx].title || '제목 없는 페이지'}</p>
            </div>
        </FormCardWrapper>

        {pages[currentIdx].questions.map(question => {
            const {id, q, d, options, type} = question
            return <FormCardWrapper className="card active form-card" key={id}>
                <div className="pd">
                    <p className="title-B">{q || '제목 없는 질문'}</p>
                    <p>{d}</p>
                
                {(options.length>0 && type === '객관식') &&
                options.map((option, idx3) => {    
                    return (<div className="multiple" key={option.id} onClick={()=>setSelect(idx3)}>
                        {option.answer && <>
                        <RadioButton isSelect={idx3 === select}/> 
                        <p>{option.answer}</p>
                        </>}
                    </div>)
                })}

                {type === '단답형' &&
                <input placeholder="답변 입력"/>
                }
                </div>
            </FormCardWrapper>
        })}

        {currentIdx !== pages.length - 1 ?
            pages[currentIdx].next ? 
            <button onClick={()=>setCurrentIdx(pages[currentIdx].next)}>이동할페이지</button> : 
            <button onClick={()=>setCurrentIdx(prev=> prev+=1)}>다음페이지</button>
            : <button onClick={()=>setCurrentIdx(prev=> prev+=1)}>설문지 제출</button>
        }

        </>}
        {currentIdx === pages.length && 
        <FormCardWrapper className="card active">
            <h4>설문 종료</h4>
                {endingMent.title || '설문 종료'}
            <DescriptionEditor value={endingMent.description} isReadOnly={true}></DescriptionEditor>
        </FormCardWrapper>}
    </SurveyFormWrapper>
}

export default SurveyForm