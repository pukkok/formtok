import React, { useState, useRef, useEffect } from "react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { activeCardAtom, pagesAtom, randomKey } from "../../../Recoil/AdminRecoil"
import classNames from "classnames"
import DropArea from "../../../Component/DropArea"

function QuestionTab() {
    const [pages, setPages] = useRecoilState(pagesAtom)
    const [activeCard, setActiveCard] = useRecoilState(activeCardAtom)
    const dragItem = useRef()
    const cloneElement = useRef(null)

    const addQuestion = () => {
        let id = randomKey()
        let pageCnt = activeCard.split('-')[1]
        let length

        setPages(prev => {
            return prev.map((page, idx) => {
                if (+pageCnt === idx) {
                    length = page.questions.length
                    page = {
                        ...page, questions: [...page.questions,
                        { id, type: 'multiple', q: '', d: '', a: [] }
                        ]
                    }
                }
                return page
            })
        })

        setActiveCard(`q-${pageCnt}-${length}`)
    }

    const addPage = () => {
        const id = 'Q' + randomKey()
        setPages([...pages, { id, title: '', description: '', questions: [] }])
        setActiveCard(`h-${pages.length}`)
    }

    const dragStartHandler = (e, idx, idx2) => {
        dragItem.current = { pageIdx: idx, quizIdx: idx2 }

        const style = window.getComputedStyle(e.target)
        
        const dragNode = e.target.cloneNode(true)

        dragNode.className = 'dragging-image q-summary'
        dragNode.style.backgroundColor = '#601dcd'
        dragNode.style.color = style.color
        dragNode.style.width = style.width
        dragNode.style.borderRadius = style.borderRadius
        dragNode.style.position = "fixed"
        dragNode.style.pointerEvents = "none" // 드래그 중에 클릭을 방지
        dragNode.style.transform = 'translate(-30%, -50%)'
        document.body.appendChild(dragNode)

        cloneElement.current = dragNode

        // 고스트 이미지를 숨기기 위해 빈 이미지를 사용
        const img = new Image()
        img.src = ''
        e.dataTransfer.setDragImage(img, 0, 0)
        e.dataTransfer.effectAllowed = "move"
        setTimeout(() => {
            e.target.style.display = "none" // 드래그 시작 시 원래 요소 숨기기
        }, 0)
        updateDragNodePosition(e)
    }

    const dragHandler = (e) => {
        // 드래그 중에 노드 위치 업데이트
        updateDragNodePosition(e)
        setActiveCard('')
    }

    const dragEndHandler = (e, idx, idx2) => {
        // 드래그가 끝나면 생성한 커스텀 이미지 삭제
        if (cloneElement.current) {
            cloneElement.current.remove()
            cloneElement.current = null
        }
        e.target.style.display = "flex"
    }

    const updateDragNodePosition = (e) => {
        if (cloneElement.current) {
            cloneElement.current.style.top = `${e.clientY}px`
            cloneElement.current.style.left = `${e.clientX}px`
        }
    }

    const drop = (pageIdx, questionIdx) => {
        const copyListItems = [...pages]
        const { pageIdx: p1, quizIdx: q1 } = dragItem.current
        const p2 = pageIdx
        const q2 = questionIdx
        const dragItemContent = copyListItems[p1].questions[q1]

        let newPages
        if (p1 !== p2) {
            newPages = copyListItems.map((page, idx) => {
                if (p1 === idx) {
                    const filterQ = page.questions.filter((_, idx2) => q1 !== idx2)
                    return { ...page, questions: filterQ }
                }
                if (p2 === idx) {
                    const updatedQuestions = [...page.questions]
                    updatedQuestions.splice(q2, 0, dragItemContent)
                    return { ...page, questions: updatedQuestions }
                }
                return page
            })
        } else {
            const updatedQuestions = [...copyListItems[p1].questions]
            updatedQuestions.splice(q1, 1)
            updatedQuestions.splice(q2, 0, dragItemContent)

            newPages = copyListItems.map((page, idx) => {
                if (p1 === idx) {
                    return { ...page, questions: updatedQuestions }
                }
                return page
            })
        }
        setActiveCard(`q-${p2}-${q2}`)
        dragItem.current = null
        if (cloneElement.current) {
            cloneElement.current.remove()
            cloneElement.current = null
        }
        setPages(newPages)
    }

    return (
        <div className="q-tab">
            <div className="summary-wrapper">
                {pages.map((page, idx) => {
                    const { id, title, questions } = page
                    return (
                        <div key={id} className="summary-card">
                            <div
                                onClick={() => setActiveCard(`h-${idx}`)}
                                className={classNames('h-summary', { active: `h-${idx}` === activeCard })}
                            >
                                <h4>{idx + 1}/{pages.length} 페이지</h4>
                                {title ? <p>{title}</p> : <p className="placeholder">페이지 제목</p>}
                            </div>
                            <DropArea onDrop={() => drop(idx, 0)} />
                            {questions.map((question, idx2) => {
                                const { id, q } = question
                                return (
                                    <React.Fragment key={id}>
                                        <div
                                            onClick={() => setActiveCard(`q-${idx}-${idx2}`)}
                                            className={classNames('q-summary', { active: `q-${idx}-${idx2}` === activeCard })}
                                            draggable={true}
                                            onDrag={dragHandler}
                                            onDragStart={e => dragStartHandler(e, idx, idx2)}
                                            onDragEnd={e => dragEndHandler(e, idx, idx2)} // 드래그 종료 이벤트 핸들러
                                        >
                                            <p>{q ? q : `${idx2 + 1}번 문항`}</p>
                                            {`q-${idx}-${idx2}` === activeCard &&
                                            <EditQuestion selectQ={{pi: idx, qi: idx2}}/>
                                            }
                                        </div>
                                        <DropArea onDrop={() => drop(idx, idx2 + 1)}/>
                                    </React.Fragment>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
            <div className="q-btns">
                <button onClick={addQuestion}
                disabled={activeCard === ''}
                >문항 추가</button>
                <button onClick={addPage}
                disabled={activeCard === ''}
                >페이지 추가</button>
            </div>
        </div>
    )
}

function EditQuestion ({ selectQ = { pi:0, qi:0 } }) {
    const [isOpenQEdit, setIsOpenEdit] = useState(false)
    const setPages = useSetRecoilState(pagesAtom)

    // 질문 복사하기
    const copyQ = () => {
        const {pi, qi} = selectQ
        const id = randomKey()
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
    const deleteQ = () => {
        const {pi, qi} = selectQ
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

    return <div className="modify-wrapper">
    <span className="material-symbols-outlined"
    onClick={() => setIsOpenEdit(!isOpenQEdit)}
    >more_vert</span>
    <div onClick={() => setIsOpenEdit(false)}
    className={classNames({on: isOpenQEdit}, "modify-option")}
    >
        <button onClick={copyQ}>복사</button>
        <button onClick={deleteQ}>삭제</button>
        <button >닫기</button>
    </div>
    </div>
}

function RemoteControl() {
    const [activeBtn, setActiveBtn] = useState(0)
    const btns = ['전체 문항', '설문 설정']

    return (
        <div className="remote-control">
            <nav>
                {btns.map((btn, idx) => (
                    <button
                        key={btn + idx}
                        className={classNames({ active: activeBtn === idx })}
                        onClick={() => setActiveBtn(idx)}
                    >
                        {btn}
                    </button>
                ))}
            </nav>
            {activeBtn === 0 && <QuestionTab />}
        </div>
    )
}

export default RemoteControl
