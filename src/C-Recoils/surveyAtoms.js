import { atom, selector } from "recoil"

const AnswerBoxAtom = atom({
    key: 'answer-box',
    default : {}
})

export {
    AnswerBoxAtom, 
}