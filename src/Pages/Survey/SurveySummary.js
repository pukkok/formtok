import React, { useRef } from "react"
import { useRecoilState } from "recoil"
import classNames from "classnames"
import { activeCardAtom, pagesAtom } from "../../recoils/surveyAtoms"
import DropArea from "../../components/DropArea"
import usePageActions from "../../hooks/usePageActions"
import QmoreVert from "./QmoreVert"

function SurveySummary() {
    const [pages, setPages] = useRecoilState(pagesAtom)
    const [activeCard, setActiveCard] = useRecoilState(activeCardAtom)
    const dragItem = useRef()
    const cloneElement = useRef(null)

    const {addQuestion, addPage} = usePageActions()

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
        setTimeout(() => {
            e.target.style.display = "flex"
        }, 0)
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
        setActiveCard(`Q-${p2}-${q2}`)
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
                                onClick={() => setActiveCard(`P-${idx}`)}
                                className={classNames('h-summary', { active: `P-${idx}` === activeCard })}
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
                                            onClick={() => setActiveCard(`Q-${idx}-${idx2}`)}
                                            className={classNames('q-summary', { active: `Q-${idx}-${idx2}` === activeCard })}
                                            draggable={true}
                                            onDrag={dragHandler}
                                            onDragStart={e => dragStartHandler(e, idx, idx2)}
                                            onDragEnd={e => dragEndHandler(e, idx, idx2)} // 드래그 종료 이벤트 핸들러
                                        >
                                            <p>{q ? q : `${idx2 + 1}번 문항`}</p>
                                            {`Q-${idx}-${idx2}` === activeCard &&
                                            <QmoreVert pi={idx} qi={idx2}/>
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

export default SurveySummary