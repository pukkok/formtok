import { useRecoilState, useSetRecoilState } from "recoil"
import { activeCardAtom, endingMentAtom, pagesAtom, randomKey } from "../C-Recoils/surveyAtoms"
import { useCallback } from "react"

function usePageActions () {
    const [pages, setPages] = useRecoilState(pagesAtom)
    const [activeCard, setActiveCard] = useRecoilState(activeCardAtom)
    const setEndingMent = useSetRecoilState(endingMentAtom)    
    
    
    

    // 테이블타입으로 진입시 생성
    const initialTable = useCallback((pi, qi) => {
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
    }, [setPages])

    // 테이블 초기화
    const resetTable = useCallback((pi, qi) => {
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
    }, [setPages])

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
        usedOptionCheck, // 부가옵션 설정
        periodSetting, // 날짜 타입 기간으로 설정할 경우
        whereIsNextPage,
        initialTable, resetTable, addTableRowOrCol, deleteTableRowOrCol, updateTableValue,
        changeEndingTitle, changeEndingDescription
    }
}

export default usePageActions