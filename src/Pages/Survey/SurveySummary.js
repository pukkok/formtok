import React from "react"
import { useRecoilState } from "recoil"
import classNames from "classnames"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { activeCardAtom, pagesAtom } from "../../recoils/surveyAtoms"
import QmoreVert from "./QmoreVert"
import usePageActions from "../../hooks/usePageActions"

function SurveySummary() {
    const [pages, setPages] = useRecoilState(pagesAtom)
    const [activeCard, setActiveCard] = useRecoilState(activeCardAtom)
    const { addQuestion, addPage } = usePageActions()

    // 드롭 가능한 영역의 스타일
    const getCardStyle = (isDragging, draggableStyle) => ({
        border: isDragging && '2px solid #7E37ED',
        borderRadius: isDragging && '12px',
        ...draggableStyle
    })
    const getPsummaryStyle = (isDragging) => ({
        border : 'none'
    })

    const onDragStart = (result) => {
        setActiveCard('')
    }

    const onDragEnd = (result) => {
        const { source, destination, type } = result
        if (!destination) return // 바깥 클릭
        let newPages = [...pages]

        if (type === "page") {
            // 페이지 위치 변경
            const [removedPage] = newPages.splice(source.index, 1)
            newPages.splice(destination.index, 0, removedPage)
            setActiveCard(`P-${destination.index}`)
        } else if (type === "question") {
            const p1 = parseInt(source.droppableId)
            const q1 = source.index
            const p2 = parseInt(destination.droppableId)
            const q2 = destination.index
            setActiveCard(`Q-${p2}-${q2}`)
            const sourceQ = newPages[p1].questions[q1]

            if(p1 !== p2){ // 다른페이지로 넘어갈 때
                newPages = newPages.map((page, idx) => {
                    if (p1 === idx) {
                        const filterQ = page.questions.filter((_, idx2) => q1 !== idx2)
                        return { ...page, questions: filterQ }
                    }
                    if (p2 === idx) {
                        const updatedQuestions = [...page.questions]
                        updatedQuestions.splice(q2, 0, sourceQ)
                        return { ...page, questions: updatedQuestions }
                    }
                    return page
                })
            }else{ // 같은 페이지일때
                const updatedQuestions = [...newPages[p1].questions]
                updatedQuestions.splice(q1, 1)
                updatedQuestions.splice(q2, 0, sourceQ)
    
                newPages = newPages.map((page, idx) => {
                    if (p1 === idx) {
                        return { ...page, questions: updatedQuestions }
                    }
                    return page
                })
            }
            
        }

        setPages(newPages)
    }

    return (
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <div className="q-tab">
                <Droppable droppableId="all-pages" type="page">
                    {(provided) => (
                        <div
                            className="summary-wrapper"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {pages.map((page, idx) => (
                                <Draggable key={page.id} draggableId={`page-${page.id}`} index={idx}>
                                    {(provided, snapshot) => (
                                        <div
                                            className="summary-card"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getCardStyle(snapshot.isDragging, provided.draggableProps.style)}
                                        >
                                            <div
                                                onClick={() => setActiveCard(`P-${idx}`)}
                                                className={classNames('p-summary', { active: `P-${idx}` === activeCard, dragging : snapshot.isDragging } )}
                                            >
                                                <h4>{idx + 1}/{pages.length} 페이지</h4>
                                                {page.title ? <p>{page.title}</p> : <p className="placeholder">페이지 제목</p>}
                                            </div>

                                            <Droppable droppableId={`${idx}`} type="question">
                                                {(provided) => (
                                                    <div ref={provided.innerRef} {...provided.droppableProps}>
                                                        {page.questions.length > 0 ? (
                                                            page.questions.map((question, idx2) => (
                                                                <Draggable
                                                                    key={question.id}
                                                                    draggableId={`question-${question.id}`}
                                                                    index={idx2}
                                                                >
                                                                    {(provided) => (
                                                                        <div
                                                                            className={classNames('q-summary', { active: `Q-${idx}-${idx2}` === activeCard })}
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            onClick={() => setActiveCard(`Q-${idx}-${idx2}`)}
                                                                        >
                                                                            <p>{question.q || `${idx2 + 1}번 문항`}</p>
                                                                            {`Q-${idx}-${idx2}` === activeCard && <QmoreVert pi={idx} qi={idx2} />}
                                                                        </div>
                                                                    )}
                                                                </Draggable>
                                                            ))
                                                        ) : (
                                                            // 빈 페이지에서도 드래그 앤 드롭을 가능하게 만듦
                                                            <div className="q-empty"></div>
                                                        )}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>

                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <div className="q-btns">
                    <button onClick={addQuestion} disabled={activeCard === ''}>
                        문항 추가
                    </button>
                    <button onClick={addPage} disabled={activeCard === ''}>
                        페이지 추가
                    </button>
                </div>
            </div>
        </DragDropContext>
    )
}

export default SurveySummary
