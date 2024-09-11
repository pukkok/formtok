import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { pagesAtom } from "../../recoils/surveyAtoms";
import RadioButton from "../../components/RadioButton";

function SurveyForm() {
    const pages = useRecoilValue(pagesAtom)

    const [select, setSelect] = useState(null)
    const [currentIdx, setCurrentIdx] = useState(0)

    return <section className="survey-form">
        <div className="card active">
            <h4 className="pd">{`${(currentIdx+1)}/${pages.length} 페이지`}</h4>
            <div className="pd">
                <p className="title-A">{pages[currentIdx].title || '제목 없는 페이지'}</p>
                <p>{pages[currentIdx].description || ''}</p>
            </div>
        </div>

        {pages[currentIdx].questions.map(question => {
            const {id, q, d, options, type} = question
            return <div className="card active form-card" key={id}>
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
                </div>
            </div>
        })}
        
    </section>
}

export default SurveyForm