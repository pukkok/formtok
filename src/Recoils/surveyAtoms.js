import dayjs from "dayjs";
import { atom } from "recoil";

function randomKey(){
    let newKey = ''
    function getRandomNumber () {
        return parseInt(5 + Math.random() * 5)
    }
    const x = 'abcdefghijklmnopqrstuvwxyz'.split('')
    const now = dayjs().format('YYYY-MM-DD')
    let r = getRandomNumber()
    for(let i=0; i<r; i++){
        newKey += x[parseInt(Math.random()*x.length)]
    }
    newKey += now
    return newKey
}

function randomUrl() {
    let newUrl = ''
    const alphabets = 'abcdefghijklmonpqrstuvwxyz'
    const lowerCase = alphabets.split('')
    const upperCase = alphabets.toUpperCase().split('')
    const number = '0123456789'.split('')
    const merge = [...lowerCase, ...upperCase, ...number]
    while(newUrl.length <= 10){
        let rn = parseInt(Math.random() * merge.length)
        newUrl += merge[rn]
    }
    return newUrl
}

const surveyTitleAtom = atom({
    key: 'survey-title',
    default: ''
})

const urlAtom = atom({
    key: 'url',
    default: ''
})

const pagesAtom = atom({ // 설문지 생성할때 초기에 만들기
    key: 'pages',
    default : []
})

const endingMentAtom = atom({
    key: 'endingMent',
    default : {
        title: '',
        description: ''
    }
})

const surveyPeriodAtom = atom({
    key: 'surveyPeriod',
    default : {
        start: null,
        end: null
    }
})

const activeCardAtom = atom({
    key: 'activeCard',
    default : 'P-0'
})

const AnswerBoxAtom = atom({
    key: 'answer-box',
    default : {}
})

export {
    randomKey, randomUrl,
 
    urlAtom, surveyTitleAtom,
    activeCardAtom, 
    pagesAtom, endingMentAtom, surveyPeriodAtom, 
    AnswerBoxAtom,
}