import { useRecoilState } from "recoil"
import { activeCardAtom, pagesAtom, randomKey } from "../recoils/surveyAtoms"

function usePageActions () {
    const [pages, setPages] = useRecoilState(pagesAtom)
    const [activeCard, setActiveCard] = useRecoilState(activeCardAtom)

    // 페이지 타이틀 변경하기
    const changePTitle = (e, pi) => { 
        setPages(prevPages => {
            return prevPages.map((page, idx) => {
                if(idx === pi){
                    page = {...page,
                        title: e.target.value,
                    }
                }
                return page
            })
        })
    }

    // 페이지 디스크립션 변경하기
    const changePDescription = (e, pi) => {
        setPages(prevPages => {
            return prevPages.map((page, idx) => {
                if(idx === pi){
                    page = {...page,
                        description : e.target.value
                    }
                }
                return page
            })
        })
    }

    // 페이지 추가하기
    const addPage = () => {
        const id = 'P' + randomKey()
        setPages([...pages, { id, title: '', description: '', questions: [] }])
        setActiveCard(`P-${pages.length}`)
    }

    // 질문 추가하기
    const addQuestion = () => {
        let id = 'Q' + randomKey()
        let pageCnt = activeCard.split('-')[1]
        let length

        setPages(prev => {
            return prev.map((page, idx) => {
                if (+pageCnt === idx) {
                    length = page.questions.length
                    page = {
                        ...page,
                        questions: [
                            ...page.questions,
                            { 
                                id, type: '객관식', q: '', d: '', 
                                options: [], hasExtraOption:false, required: false, next: null 
                            }
                        ]
                    }
                }
                return page
            })
        })

        setActiveCard(`Q-${pageCnt}-${length}`)
    }

    // 질문 제목 바꾸기
    const changeQTitle = (e, pi, qi) => {
        setPages(pages => {
            return pages.map((page, idx) => {
                if (idx === pi) {
                    const updatedQuestions = page.questions.map((question, idx2) => {
                        if (idx2 === qi) question = { ...question, q: e.target.value }
                        return question
                    })
                    page = { ...page, questions: updatedQuestions }
                }
                return page
            })
        })
    }
    // 질문 설명 바꾸기
    const changeQDescription = (e, pi, qi) => {
        setPages(pages => {
            return pages.map((page, idx) => {
                if (idx === pi) {
                    const updatedQuestions = page.questions.map((question, idx2) => {
                        if (idx2 === qi) question = { ...question, d: e.target.value }
                        return question
                    })
                    page = { ...page, questions: updatedQuestions }
                }
                return page
            })
        })
    }
    // 질문 타입 바꾸기
    const changeQType = (pi, qi, style) => {
        setPages(pages => {
            return pages.map((page, idx) => {
                if(idx === pi){
                    const updateQuestions = page.questions.map((question, idx2) => {
                        if(idx2 === qi){
                            question = {...question, type: style}
                        }
                        return question
                    })
                    return page = {...page, questions : updateQuestions}
                }
                return page
            })
        })
    }
    // 질문 복사하기
    const copyQ = (pi, qi) => {
        const id = 'Q' + randomKey()
        setPages(pages => {
            return pages.map((page, idx) => {
                if(idx === pi){
                    let [addQuestions] = page.questions.filter((_, idx) => qi === idx)
                    addQuestions = {...addQuestions, 
                        id, 
                        q: addQuestions.q ? addQuestions.q+'(사본)' : addQuestions.q,
                        d: addQuestions.d
                    }
                    const updatedQuestions = [...page.questions]
                    updatedQuestions.splice(qi+1, 0, addQuestions)
                    return page = {...page, questions : updatedQuestions}
                }
                return page
            })
        })
    }
    // 질문 삭제하기
    const deleteQ = (pi, qi) => {
        setPages(pages => {
            return pages.map((page, idx) => {
                if(idx === pi){
                    const updatedQuestions = page.questions.filter((_, idx) => qi !== idx)
                    return page = {...page, questions : updatedQuestions}
                }
                return page
            })
        })
    }
    // 옵션 추가하기
    const addOption = (pi, qi) => {
        const id = 'O' + randomKey()
        setPages(prevPages => {
            return prevPages.map((page, idx) => {
                if (idx === pi) {
                    const updatedQuestions = page.questions.map((question, idx2) => {
                        if (idx2 === qi) {
                            const updatedOptions = [
                                ...question.options,
                                { id, query: '' } // 문항 옵션 추가
                            ]
                            return { ...question, options: updatedOptions }
                        }
                        return question
                    })
                    return { ...page, questions: updatedQuestions }
                }
                return page
            })
        })
    }
    // 옵션 설정하기
    const chnageOption = (e, pi, qi, oi) => {
        setPages(prevPages => {
            return prevPages.map((page, idx) => {
                if (idx === pi) {
                    const updatedQuestions = page.questions.map((question, idx2) => {
                        if (idx2 === qi) {
                            const updatedOptions = question.options.map((option, idx3) => {
                                if(idx3 === oi){
                                    return option = {...option, query : e.target.value }
                                }
                                return option
                            })
                            return { ...question, options: updatedOptions }
                        }
                        return question
                    })
                    return { ...page, questions: updatedQuestions }
                }
                return page
            })
        })
    }

    const deleteOption = () => {

    }

    /** '기타' 항목 추가/제거 */ 
    const toggleEXtraOption = (pi, qi, has) => {
        setPages(prevPages => {
            return prevPages.map((page, idx) => {
                if (idx === pi) {
                    const updatedQuestions = page.questions.map((question, idx2) => {
                        if (idx2 === qi) {
                            return { ...question, hasExtraOption : has }
                        }
                        return question
                    })
                    return { ...page, questions: updatedQuestions }
                }
                return page
            })
        })
    }

    return { 
        changePTitle, changePDescription,
        addQuestion, addPage, addOption, toggleEXtraOption,
        changeQTitle, changeQDescription, changeQType, chnageOption,
        copyQ, deleteQ
    }
}

export default usePageActions