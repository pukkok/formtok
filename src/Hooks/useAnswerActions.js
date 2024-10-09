import { useRecoilState } from "recoil"
import { AnswerBoxAtom } from "../Recoils/surveyAtoms"


function useAnswerActions () {
    const [answerBox, setAnswerBox] = useRecoilState(AnswerBoxAtom)

    const answerPick = (pick, pageId, questionId) => {
        setAnswerBox({...answerBox, 
            [pageId] : {
                ...answerBox[pageId],
                [questionId]: {
                    ...answerBox[pageId][questionId],
                    answer: answerBox[pageId][questionId].answer === pick ?
                    '' : pick,
                    useExtra: false,
                    extra : '' // extra 초기화
                }
            }
        })
    }

    const extraPick = (pageId, questionId, isMultiple=false) => {
        setAnswerBox({...answerBox, 
            [pageId] : {
                ...answerBox[pageId],
                [questionId]: {
                    ...answerBox[pageId][questionId],
                    answer: isMultiple ? answerBox[pageId][questionId].answer : '',
                    useExtra: !answerBox[pageId][questionId].useExtra,
                }
            }
        })
    }

    const extraInValue = (e, pageId, questionId) => {
        setAnswerBox({...answerBox,
            [pageId] : {
                ...answerBox[pageId],
                [questionId] : {
                    ...answerBox[pageId][questionId],
                    extra : e.target.value
                }
            }
        })
    }

    const answerPicks = (pick, pageId, questionId) => {
        const picks = answerBox[pageId][questionId].answer
        setAnswerBox({...answerBox,
            [pageId] : {
                ...answerBox[pageId],
                [questionId] : {
                    ...answerBox[pageId][questionId],
                    answer : picks.includes(pick) ?
                    picks.filter(p => p !== pick) :[...picks, pick]
                }
            }
        })
    }

    const answerInValue = (e, pageId, questionId) => {
        setAnswerBox(prevBox => {
            return { ...prevBox,
                [pageId]: {
                    ...prevBox[pageId],
                    [questionId]: e.target.value
                }
            }
        })
    }

    const answerInHTML = (e, pageId, questionId) => {
        setAnswerBox(prevBox => {
            return { ...prevBox,
                [pageId]: {
                    ...prevBox[pageId],
                    [questionId]: e.target.innerHTML
                }
            }
        })
    }

    const answerDateType = (e, pageId, questionId, ForB) => {
        setAnswerBox(prevBox => {
            return { ...prevBox,
                [pageId]: {
                    ...prevBox[pageId],
                    [questionId]: {
                        ...prevBox[pageId][questionId], 
                        [ForB] : e.target.value
                    }
                }
            }
        })
    }

    const answerPeriodValueReset = (value, pageId, questionId, ForB) => {
        setAnswerBox(prevBox => {
            return { ...prevBox,
                [pageId]: {
                    ...prevBox[pageId],
                    [questionId]: {
                        ...prevBox[pageId][questionId], 
                        [ForB] : value
                    }
                }
            }
        })
    }

    return { 
        answerPick, extraPick, extraInValue, 
        answerPicks, answerInValue, answerInHTML, answerDateType, answerPeriodValueReset }

}

export default useAnswerActions