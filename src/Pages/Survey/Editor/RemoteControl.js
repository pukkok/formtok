import React, { useEffect, useRef, useState } from "react"
import { useRecoilState } from "recoil"
import { activeCardAtom, pagesAtom, randomKey } from "../../../Recoil/AdminRecoil"
import classNames from "classnames"

function QuestionTab() {
    const [pages, setPages] = useRecoilState(pagesAtom)
    const [activeCard, setActiveCard] = useRecoilState(activeCardAtom)
    const cardBoxRef = useRef(null)

    useEffect(() => {
        cardBoxRef.current.addEventListener('click', (e) => { })
        cardBoxRef.current.addEventListener('contextmenu', e => {
            e.preventDefault()
            console.log(e.target)
            console.log(e.offsetX, e.offsetY)
        })
    }, [])

    const addQuestion = () => {
        let id = randomKey() // 고유한 ID 생성
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
        const id = 'Q'+randomKey() // 페이지용 고유 ID 생성
        setPages([...pages, { header: {id, title: '', description: '' }, questions: [] }])
        setActiveCard(`h-${pages.length}`)
    }

    const dragItem = useRef()
    const dragOverItem = useRef()
    const [itemA, setItemA] = useState(null)
    const [itemB, setItemB] = useState(null)

    const dragStartHandler = (e, idx, idx2) => {
        // const img = new Image()
        // img.src = ''
        // e.dataTransfer.setDragImage(img, 0, 0)

        dragItem.current = { pageIdx: idx, quizIdx: idx2 }
        setItemA({ pageIdx: idx, quizIdx: idx2 })
    }

    const dragEnterHandler = (idx, idx2) => {
        dragOverItem.current = { pageIdx: idx, quizIdx: idx2 }
        if (itemA) setItemB({ ...dragOverItem.current })
    }

    const drop = () => {
        const copyListItems = [...pages]
        const { pageIdx: p1, quizIdx: q1 } = dragItem.current
        const { pageIdx: p2, quizIdx: q2 } = dragOverItem.current
        const dragItemContent = copyListItems[p1].questions[q1]

        let newPages
        if (p1 !== p2) {
            // 다른 페이지로 드래그 앤 드롭
            newPages = copyListItems.map((page, idx) => {
                if (p1 === idx) {
                    // p1 페이지에서 질문 제거
                    const filterQ = page.questions.filter((_, idx2) => q1 !== idx2)
                    return { ...page, questions: filterQ }
                }
                if (p2 === idx) {
                    // p2 페이지에 질문 추가
                    const updatedQuestions = [...page.questions] // questions 배열을 복사
                    updatedQuestions.splice(q2, 0, dragItemContent)
                    return { ...page, questions: updatedQuestions }
                }
                return page
            })
        } else {
            // 같은 페이지 내에서 드래그 앤 드롭
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
        dragOverItem.current = null
        setPages(newPages)
    }

    return (
        <div className="q-tab">
            <div className="summary-wrapper" ref={cardBoxRef}>
                {pages.map((page, idx) => {
                    const { header: { id, title }, questions } = page
                    return (
                        <div key={id} className="summary-card">
                            <div
                                onClick={() => setActiveCard(`h-${idx}`)}
                                className={classNames('h-summary', { active: `h-${idx}` === activeCard })}
                            >
                                <h4>{idx + 1}/{pages.length} 페이지</h4>
                                {title ? <p>{title}</p> : <p className="placeholder">페이지 제목</p>}
                            </div>
                            {questions.map((question, idx2) => {
                                const { id, q } = question
                                return (
                                    <div
                                        onClick={() => setActiveCard(`q-${idx}-${idx2}`)}
                                        className={classNames('q-summary', { active: `q-${idx}-${idx2}` === activeCard })}
                                        key={id}
                                        draggable={true}
                                        onDragStart={e => dragStartHandler(e, idx, idx2)}
                                        onDragEnter={() => dragEnterHandler(idx, idx2)}
                                        onDragOver={e => e.preventDefault()}
                                        onDragEnd={drop}
                                    >
                                        {q ? q : `${idx2 + 1}번 문항`}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
            <div className="q-btns">
                <button onClick={addQuestion}>문항 추가</button>
                <button onClick={addPage}>페이지 추가</button>
            </div>
        </div>
    )
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
