import React, { useEffect } from "react"
import { useRecoilValue } from "recoil"
import { pagesAtom } from "../C-Recoils/surveyAtoms"
import usePageActions from "../C-Hooks/usePageActions"
import styled from "styled-components"

import Multiple from "./QuestionForm/Multiple"
import LongText from "./QuestionForm/LongText"
import ShortText from "./QuestionForm/ShortText"
import DateTypeInput from "./QuestionForm/DateTypeInput"
import TableEditor from "./QuestionForm/TalbeEditor"
import SelectScore from "./QuestionForm/SelectScore"

const StyledQuestionForm = styled.div`
    margin-bottom: 20px;
`

function QuestionForm ({pi, qi}){
    const pages = useRecoilValue(pagesAtom)
    const {type: style, setPeriod} = pages[pi].questions[qi]
    const { resetTable } = usePageActions()
    useEffect(() => {
        style !== '표형' && resetTable(pi, qi)
    }, [style])

    return <StyledQuestionForm>
        {style === '서술형' && <LongText />}
        {style === '단답형' && <ShortText />}
        {['객관식', '객관식(복수 선택)', '드롭다운'].includes(style) && <Multiple style={style} pages={pages} pi={pi} qi={qi}/>}
        {['날짜', '시간', '날짜 + 시간'].includes(style) && <DateTypeInput style={style} setPeriod={setPeriod}/>}
        {style === '표형' && <TableEditor pages={pages} pi={pi} qi={qi}/>}
        {style === '점수 선택형' &&<SelectScore pages={pages} pi={pi} qi={qi}/>}
    </StyledQuestionForm>
}

export default QuestionForm
