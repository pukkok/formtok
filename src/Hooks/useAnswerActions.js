import { useRecoilState } from "recoil"
import { AnswerBoxAtom } from "../Recoils/surveyAtoms"


function useAnswerActions () {
    const [answerBox, setAnswerBox] = useRecoilState(AnswerBoxAtom)

    const eTargetAnswer = (e, pageId, questionId) => {
        setAnswerBox(prevBox => {
            return { ...prevBox,
                [pageId]: {
                    ...prevBox[pageId],
                    [questionId]: e.target.value
                }
            }
        })
    }

    return { eTargetAnswer }

}

export default useAnswerActions