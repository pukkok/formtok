import React, { useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import classNames from "classnames"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { activeCardAtom, endingMentAtom, pagesAtom } from "../../recoils/surveyAtoms"
import MoreVert from "../../components/MoreVert"
import usePageActions from "../../hooks/usePageActions"

function SurveySummary() {
    const pages = useRecoilValue(pagesAtom)
    const [activeCard, setActiveCard] = useRecoilState(activeCardAtom)
    const endingMent = useRecoilValue(endingMentAtom)
    // const { copyQ, deleteQ } = usePageActions()
    const { addQuestion, addPage, changePLocation, changeQLocation, 
        copyP, copyQ, deleteP, deleteQ } = usePageActions()
    const [foldQuestions, setFoldQuestions] = useState([])
    const toggleFoldQ = (id) => {
        foldQuestions.includes(id) ?
        setFoldQuestions(prev=> prev.filter(q => q !== id)) :
        setFoldQuestions([...foldQuestions, id])
    }


    // 드롭 가능한 영역의 스타일
    const getCardStyle = (isDragging, draggableStyle) => ({
        border: isDragging && '2px solid #7E37ED',
        borderRadius: isDragging && '12px',
        ...draggableStyle
    })

    const onDragStart = (result) => {
        setActiveCard('')
    }

    const onDragEnd = (result) => {
        const { source, destination, type } = result
        if (!destination){ // 바깥 드랍
            if(type === "page"){
                setActiveCard(`P-${source.index}`)
            }else{
                setActiveCard(`Q-${source.droppableId}-${source.index}`)
            }
            return 
        } 

        if (type === "page") {
            // 페이지 위치 변경
            changePLocation(source.index, destination.index)
        } else if (type === "question") {
            const p1 = parseInt(source.droppableId)
            const q1 = source.index
            const p2 = parseInt(destination.droppableId)
            const q2 = destination.index
            changeQLocation(p1, q1, p2, q2)   
        }
    }

    return (
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <div className="q-tab">
                <Droppable droppableId="all-pages" type="page">
                {(provided) => (
                <div className="summary-scroll">
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
                            className={classNames('p-summary', { 
                                active: `P-${idx}` === activeCard, 
                                dragging : snapshot.isDragging,
                                fold : foldQuestions.includes(page.id)
                            })}
                            >
                                <h4>{idx + 1}/{pages.length} 페이지</h4>
                                <div className="title-box">
                                {page.title ? <p>{page.title}</p> : <p className="placeholder">페이지 제목</p>}
                                    {`P-${idx}` === activeCard &&
                                    <MoreVert>
                                        <button onClick={() => toggleFoldQ(page.id)} 
                                        disabled={page.questions.length === 0}>{foldQuestions.includes(page.id) ? '펼치기' : '접기'}</button>
                                        <button onClick={() => copyP(idx)}>복사</button>
                                        <button className="remove" 
                                        disabled={pages.length<=1}
                                        onClick={() => deleteP(idx)}>삭제</button>
                                    </MoreVert>}
                                </div>
                            </div>

                            <Droppable droppableId={`${idx}`} type="question">
                            {(provided) => (
                                <div className={classNames("question-box", {fold : foldQuestions.includes(page.id)})} 
                                ref={provided.innerRef} 
                                {...provided.droppableProps}
                                >
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
                                                {`Q-${idx}-${idx2}` === activeCard && 
                                                <MoreVert >
                                                    <button onClick={() => copyQ(idx, idx2)}>복사</button>
                                                    <button className="remove" onClick={() => deleteQ(idx, idx2)}>삭제</button>
                                                </MoreVert>}
                                            </div>
                                        )}
                                        </Draggable>
                                    ))
                                    ) : (
                                    // questions 없을때 드래그 앤 드롭
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
                    <div className={classNames("e-summary",
                        {active : 'end' === activeCard}
                    )} onClick={()=>setActiveCard('end')}>
                        <h4>엔딩</h4>
                        <p>{endingMent.title ? endingMent.title : '응답해 주셔서 감사합니다.'}</p>  
                    </div>
                    </div>
                </div>                    
                )}
                </Droppable>
                <div className="q-btns">
                    <button onClick={addQuestion} disabled={activeCard === '' || activeCard === 'end'}>
                        문항 추가
                    </button>
                    <button onClick={addPage} disabled={activeCard === '' || activeCard === 'end'}>
                        페이지 추가
                    </button>
                </div>
                
            </div>
        </DragDropContext>
    )
}

export default SurveySummary
