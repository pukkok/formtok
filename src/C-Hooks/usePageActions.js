import { useRecoilState, useSetRecoilState } from "recoil"
import { activeCardAtom, endingMentAtom, pagesAtom, randomKey } from "../C-Recoils/surveyAtoms"

function usePageActions () {
    const [pages, setPages] = useRecoilState(pagesAtom)
    const [activeCard, setActiveCard] = useRecoilState(activeCardAtom)
    const setEndingMent = useSetRecoilState(endingMentAtom)

    const createPage = () => {
        const newPages = [ // 초기 모델링
            {
            id: 'P'+randomKey(), 
            title: '', 
            description : '',
            questions: [
                {id: 'Q'+randomKey(), 
                    type: '객관식', q: '', d: '', 
                    options: [{id : 'O'+randomKey(), answer: ''}],
                    hasExtraOption: false,
                    scoreRanges : {min:1, max:5, minText: '', maxText: ''},
                    tableRows: [],
                    tableCols: [],
                    hasDescription : false,
                    period: {start: '', end: null},
                    setPeriod : false, // 날짜 타입일때 사용
                    essentail : false, // 필수 질문
                    setNextToPage : false, // 답변별 페이지 이동
                    next : null // 다음 페이지 설정
                }
            ],
            next : null
            }
        ]
        return newPages
    }

    const createQuestion = () => {
        const newQuestion = { 
            id : 'Q'+randomKey(), type: '객관식', q: '', d: '', 
            options: [{id:'O' + randomKey(), answer:''}], 
            hasExtraOption: false,
            scoreRanges : {min:1, max:5, minText: '', maxText: ''},
            tableRows: [],
            tableCols: [],
            hasDescription : false,
            period: {start: '', end: null},
            setPeriod : false, // 날짜 타입일때 사용
            essentail : false, // 필수 질문
            setNextToPage : false, // 답변별 페이지 이동
            next : null // 다음 페이지 설정
        }
        return newQuestion
    }
    

    const loadPages = (pages) => {
        setPages(pages)
    }
    
    // 페이지 위치변경
    const changePLocation = (dragPi, dropPi) => {
        let newPages = [...pages]
        const [removedPage] = newPages.splice(dragPi, 1)
        newPages.splice(dropPi, 0, removedPage)
        setActiveCard(`P-${dropPi}`)
        setPages(newPages)
    }
    // 질문 위치 변경
    const changeQLocation = (p1, q1, p2, q2) => {
        let newPages = [...pages]
        const dragQ = newPages[p1].questions[q1]

        if(p1 !== p2){ // 다른페이지로 넘어갈 때
            newPages = newPages.map((page, idx) => {
                if (p1 === idx) {
                    const filterQ = page.questions.filter((_, idx2) => q1 !== idx2)
                    return { ...page, questions: filterQ }
                }
                if (p2 === idx) {
                    const updatedQuestions = [...page.questions]
                    updatedQuestions.splice(q2, 0, dragQ)
                    return { ...page, questions: updatedQuestions }
                }
                return page
            })
        }else{ // 같은 페이지일때
            const updatedQuestions = [...newPages[p1].questions]
            updatedQuestions.splice(q1, 1)
            updatedQuestions.splice(q2, 0, dragQ)

            newPages = newPages.map((page, idx) => {
                if (p1 === idx) {
                    return { ...page, questions: updatedQuestions }
                }
                return page
            })
        }
        setActiveCard(`Q-${p2}-${q2}`)   
        setPages(newPages)
    }

    // 페이지 타이틀 변경하기
    const changePTitle = (e, pi) => { 
        setPages(pages => {
            return pages.map((page, idx) => {
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
    const changePDescription = (html, pi) => {
        setPages(pages => {
            return pages.map((page, idx) => {
                if(idx === pi){
                    page = {...page,
                        description : html
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
    // 페이지 복사
    const copyP = (pi) => {
        const id = 'P' + randomKey()
        let copyPages = [...pages]
        let copyPage = {...copyPages[pi], id, 
            title: copyPages[pi].title ? copyPages[pi].title+'(사본)' : ''}
        copyPage = {...copyPage, 
            questions: copyPage.questions.map((question, idx) => {
            const id = 'Q' + randomKey() + idx
            return question = {...question, id}
        })}
        copyPages.splice(pi+1, 0, copyPage)
        setPages(copyPages)
    }
    // 페이지 삭제
    const deleteP = (pi) => {
        setPages(pages=> {
            return pages.filter((_, idx) => {
                return idx !== pi
            })
        })
    }

    // 질문 추가하기
    const addQuestion = () => {
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
                            createQuestion()
                        ]
                    }
                }
                return page
            })
        })

        setActiveCard(`Q-${pageCnt}-${length}`)
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
                    const updateQuestions = [...page.questions]
                    updateQuestions.splice(qi+1, 0, addQuestions)
                    return page = {...page, questions : updateQuestions}
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
                    const updateQuestions = page.questions.filter((_, idx) => qi !== idx)
                    return page = {...page, questions : updateQuestions}
                }
                return page
            })
        })
    }

    // 질문 제목 바꾸기
    const changeQTitle = (e, pi, qi) => {
        setPages(pages => {
            return pages.map((page, idx) => {
                if (idx === pi) {
                    const updateQuestions = page.questions.map((question, idx2) => {
                        if (idx2 === qi) question = { ...question, q: e.target.value }
                        return question
                    })
                    page = { ...page, questions: updateQuestions }
                }
                return page
            })
        })
    }

    // 질문 설명 바꾸기
    const changeQDescription = (html, pi, qi) => {
        setPages(pages => {
            return pages.map((page, idx) => {
                if (idx === pi) {
                    const updateQuestions = page.questions.map((question, idx2) => {
                        if (idx2 === qi) question = { ...question, d: html }
                        return question
                    })
                    page = { ...page, questions: updateQuestions }
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
    
    // 옵션 추가하기(객관식, 복수선택, 드롭다운일때)
    const addOption = (pi, qi) => {
        const id = 'O' + randomKey()
        setPages(pages => {
            return pages.map((page, idx) => {
                if (idx === pi) {
                    const updateQuestions = page.questions.map((question, idx2) => {
                        if (idx2 === qi) {
                            const updateOptions = [
                                ...question.options,
                                { id, answer: '' } // 문항 옵션 추가
                            ]
                            return { ...question, options: updateOptions }
                        }
                        return question
                    })
                    return { ...page, questions: updateQuestions }
                }
                return page
            })
        })
    }
    /** 옵션 설정하기 */
    const changeOption = (e, pi, qi, oi) => {
        setPages(pages => {
            return pages.map((page, idx) => {
                if (idx === pi) {
                    const updateQuestions = page.questions.map((question, idx2) => {
                        if (idx2 === qi) {
                            const updateOptions = question.options.map((option, idx3) => {
                                if(idx3 === oi){
                                    return option = {...option, answer : e.target.value }
                                }
                                return option
                            })
                            return { ...question, options: updateOptions }
                        }
                        return question
                    })
                    return { ...page, questions: updateQuestions }
                }
                return page
            })
        })
    }
    /** 옵션삭제 page, question, option 인덱스 */
    const deleteOption = (pi, qi, oi) => {
        setPages(pages => {
            return pages.map((page, idx) => {
                if(idx === pi){
                    const updateQuestions = page.questions.map((question, idx2) => {
                        if(idx2 === qi){
                            const updateOptions = question.options.filter((_, idx3) => {
                                return idx3 !== oi
                            })
                            return question = {...question, options : updateOptions}
                        }
                        return question
                    })
                    return page = {...page, questions : updateQuestions}
                }
                return page
            })
        })
    }
    /** '기타' 항목 추가/제거 */ 
    const toggleEXtraOption = (pi, qi, has) => {
        setPages(pages => {
            return pages.map((page, idx) => {
                if (idx === pi) {
                    const updateQuestions = page.questions.map((question, idx2) => {
                        if (idx2 === qi) {
                            return { ...question, hasExtraOption : has }
                        }
                        return question
                    })
                    return { ...page, questions: updateQuestions }
                }
                return page
            })
        })
    }

    // 테이블타입으로 진입시 생성
    const initialTable = (pi, qi) => {
        setPages(pages => {
            return pages.map((page, idx) => {
                if(idx === pi) {
                    const updateTable = page.questions.map((question, idx2) => {
                        if(idx2 === qi) {
                            return {...question, 
                                tableRows : [
                                    {id: 'R'+randomKey(), value: ''},
                                    {id: 'R'+randomKey(), value: ''}
                                ],
                                tableCols : [
                                    {id: 'C'+randomKey(), value: ''},
                                    {id: 'C'+randomKey(), value: ''}
                                ],
                            }
                        }
                        return question
                    })
                    return { ...page, questions: updateTable }
                }
                return page
            })
        })
    }
    // 테이블 초기화
    const resetTable = (pi, qi) => {
        setPages(pages => {
            return pages.map((page, idx) => {
                if(idx === pi) {
                    const resetTable = page.questions.map((question, idx2) => {
                        if(idx2 === qi) {
                            return {...question, tableCols : [], tableRows : []}
                        }
                        return question
                    })
                    return { ...page, questions: resetTable }
                }
                return page
            })
        })
    }

    // 행과 열 추가
    const addTableRowOrCol = (pi, qi, rowOrCol) => {
        setPages(pages => {
            return pages.map((page, idx) => {
                if (idx === pi) {
                    const updatedQuestions = page.questions.map((question, idx2) => {
                        if (idx2 === qi) {
                            if (rowOrCol === 'row') {
                                // 행 추가
                                return {
                                    ...question,
                                    tableRows: [
                                        ...question.tableRows,
                                        { id: 'R' + randomKey(), value: '' }
                                    ]
                                }
                            } else if (rowOrCol === 'col') {
                                // 열 추가
                                return {
                                    ...question,
                                    tableCols: [
                                        ...question.tableCols,
                                        { id: 'C' + randomKey(), value: '' }
                                    ]
                                }
                            }
                        }
                        return question
                    })
                    return { ...page, questions: updatedQuestions }
                }
                return page
            })
        })
    }

    // 행과 열을 삭제하는 함수
    const deleteTableRowOrCol = (pi, qi, id, rowOrCol) => {
        setPages(pages => {
            return pages.map((page, idx) => {
                if (idx === pi) {
                    const updatedQuestions = page.questions.map((question, idx2) => {
                        if (idx2 === qi) {
                            if (rowOrCol === 'row' && question.tableRows.length > 2) {
                                // 행 삭제
                                return {
                                    ...question,
                                    tableRows: question.tableRows.filter(row => row.id !== id)
                                }
                            } else if (rowOrCol === 'col' && question.tableCols.length > 2) {
                                // 열 삭제
                                return {
                                    ...question,
                                    tableCols: question.tableCols.filter(col => col.id !== id)
                                }
                            }
                        }
                        return question
                    })
                    return { ...page, questions: updatedQuestions }
                }
                return page
            })
        })
    }

    // 행 또는 열의 값을 업데이트하는 함수
    const updateTableValue = (pi, qi, id, value, rowOrCol) => {
        setPages(pages => {
            return pages.map((page, idx) => {
                if (idx === pi) {
                    const updatedQuestions = page.questions.map((question, idx2) => {
                        if (idx2 === qi) {
                            if (rowOrCol === 'row') {
                                // 행 값 업데이트
                                return {
                                    ...question,
                                    tableRows: question.tableRows.map(row => 
                                        row.id === id ? { ...row, value: value } : row
                                    )
                                }
                            } else if (rowOrCol === 'col') {
                                // 열 값 업데이트
                                return {
                                    ...question,
                                    tableCols: question.tableCols.map(col => 
                                        col.id === id ? { ...col, value: value } : col
                                    )
                                }
                            }
                        }
                        return question
                    })
                    return { ...page, questions: updatedQuestions }
                }
                return page
            })
        })
    }

    /** 부가 옵션 설정 */
    const usedOptionCheck = (pi, qi, toggle) => {
        setPages(pages=> {
            return pages.map((page, idx) => {
                if(idx === pi) {
                    const updateQuestions = page.questions.map((question, idx2) => {
                        if(idx2 === qi) {
                            return { ...question, [toggle] : !question[toggle]}
                        }
                        return question
                    })
                    return {...page, questions : updateQuestions}
                }
                return page
            })
        })
    }
    /** 기간설정 pi, qi, key: value */
    const periodSetting = (pi, qi , key, value) => {
        setPages(pages=> {
            return pages.map((page, idx) => {
                if(idx === pi) {
                    const updateQuestions = page.questions.map((question, idx2) => {
                        if(idx2 === qi) {
                            return { ...question, scoreRanges : {...question.scoreRanges, [key] : value}}
                        }
                        return question
                    })
                    return {...page, questions : updateQuestions}
                }
                return page
            })
        })
    }


    /** 현재페이지가 끝나면 어디로 갈껀가요? */
    const whereIsNextPage = (pi, nextPageIdx) => {
        setPages(pages=> {
            return pages.map((page, idx)=>{
                if(idx === pi){
                    return {...page, next: nextPageIdx}
                }
                return page
            })
        })
    }

    // 엔딩 부분
    const changeEndingTitle = (e) => {
        setEndingMent(ment => ment = {...ment, title : e.target.value})
    }

    const changeEndingDescription = (html) => {
        setEndingMent(ment => ment = {...ment, description : html})
    }

    return { 
        createPage,
        loadPages, // 설문지 불러오기
        changePLocation, changeQLocation, // 위치변경 드래그앤드롭
        changePTitle, changePDescription, // 페이지 내용변경
        addQuestion, addPage, addOption, toggleEXtraOption,
        changeQTitle, changeQDescription, changeQType, changeOption,
        copyP, deleteP, copyQ, deleteQ, deleteOption,
        usedOptionCheck, // 부가옵션 설정
        periodSetting, // 날짜 타입 기간으로 설정할 경우
        whereIsNextPage,
        initialTable, resetTable, addTableRowOrCol, deleteTableRowOrCol, updateTableValue,
        changeEndingTitle, changeEndingDescription
    }
}

export default usePageActions