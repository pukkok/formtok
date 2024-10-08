import dayjs from "dayjs";
import { atom, selector } from "recoil";

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

const surveyListStyleAtom = atom({
    key: 'survey-list-style',
    default: null
})

const surveyListStyleTextSelector = selector({
    key: 'surveyListStyleTextSelector',
    get: ({ get }) => {
        const style = get(surveyListStyleAtom)
        switch (style) {
            case 'N':
                return '1. 2. 3.'
            case 'Q':
                return 'Q. Q. Q.' 
            case 'QN':
                return 'Q1. Q2. Q3.' 
            case null:
            default:
                return '없음' 
        }
    }
})

const surveyListStyleSelector = selector({
    key: 'surveyListStyleSelector',
    get: ({ get }) => {
      const surveyListStyle = get(surveyListStyleAtom)
      return (qi) => {
        switch (surveyListStyle) {
            case 'N': 
                return (qi + 1) + '.'
            case 'Q': 
                return 'Q.'
            case 'QN': 
                return 'Q' + (qi + 1) + '.'
            case null: 
        default: 
            return ''
        }
      }
    },
})

const surveyOptionsAtom = atom({
    key: 'survey-option',
    default : {
        isUseStartPeriod : false,
        startDate: '',
        isUseEndPeriod : false,
        endDate: '',
        isNeedLogin : false,
        isUseMaximum : false,
        maximumCount : null,
        isAllowConfirmation : false,
        isAllowModify: false,
        isRevealTheResult: false,
    }
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
    surveyListStyleAtom, surveyListStyleTextSelector, surveyListStyleSelector,
    surveyOptionsAtom,
    urlAtom, surveyTitleAtom, 
    activeCardAtom, 
    pagesAtom, endingMentAtom, surveyPeriodAtom, 
    AnswerBoxAtom, 
}