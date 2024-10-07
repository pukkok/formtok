import { useRecoilState } from "recoil"
import { AnswerBoxAtom } from "../Recoils/surveyAtoms"


function useAnswerActions () {
    const [answerBox, setAnswerBox] = useRecoilState(AnswerBoxAtom)

    const answerPick = (pick, pageId, questionId) => {
        setAnswerBox(prevBox => {
            return { ...prevBox,
                [pageId]: {
                    ...prevBox[pageId],
                    [questionId]: answerBox[pageId][questionId] === pick ? 
                    '' : pick // 토글 기능
                }
            }
        })
    }

    const answerPicks = (pick, pageId, questionId) => {
        const picks = answerBox[pageId][questionId]
        setAnswerBox(prevBox => {
            return { ...prevBox,
                [pageId]: {
                    ...prevBox[pageId],
                    [questionId]: picks.includes(pick) ? 
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

    return { answerPick, answerPicks, answerInValue, answerInHTML, answerDateType, answerPeriodValueReset }

}

export default useAnswerActions