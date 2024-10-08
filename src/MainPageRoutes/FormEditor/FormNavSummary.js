import React, { useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import classNames from "classnames"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { activeCardAtom, endingMentAtom, pagesAtom } from "../../Recoils/surveyAtoms"
import MoreVert from "../../Components/MoreVert"
import usePageActions from "../../Hooks/usePageActions"
import {SurveySummaryTab, SummaryScrollBox, SurveySummaryWrapper, PageSummaryListWrapper, PageSummaryWrapper, QuestionSummaryListWrapper, QuestionSummaryWrapper } from "./_StyledFormSummary"
import useAxios from "../../Hooks/useAxios"
import { modeAtom } from "../../Recoils/screenAtom"

/** 문항관리 탭 */
function FormSummary({token}) {
    const pages = useRecoilValue(pagesAtom)
    const mode = useRecoilValue(modeAtom)
    const [activeCard, setActiveCard] = useRecoilState(activeCardAtom)
    const endingMent = useRecoilValue(endingMentAtom)
    
    const { 
        addPage, addQuestion, // 추가
        changePLocation, changeQLocation, // 내용변경
        copyP, copyQ, // 복사
        deleteP, deleteQ // 삭제
    } = usePageActions()
    
    const { saveQ } = useAxios()

    // 질문상자 접기
    const [foldQuestions, setFoldQuestions] = useState([])
    const toggleFoldQ = (id) => {
        foldQuestions.includes(id) ?
        setFoldQuestions(prev=> prev.filter(q => q !== id)) :
        setFoldQuestions([...foldQuestions, id])
    }

    // 드롭 가능한 영역의 스타일
    const getCardStyle = (isDragging, draggableStyle, isFold) => {
        return {
            border: isDragging && (isFold ? '2px solid #f06292' : '2px solid #7E37ED'),
            borderRadius: isDragging && '12px',
            backgroundColor : mode === 'dark' ? '#2A2A40' : '#fafbfc',
            ...draggableStyle
        }
    }

    // 드래그 시작할때
    const onDragStart = () => {
        setActiveCard('')
    }

    // 드래그 끝났을때
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
        <SurveySummaryTab>
            <Droppable droppableId="all-pages" type="page">
            {(provided) => (
            <SummaryScrollBox>
                <SurveySummaryWrapper
                ref={provided.innerRef}
                {...provided.droppableProps}
                >
                {pages.map((page, idx) => (
                <Draggable key={page.id} draggableId={`page-${page.id}`} index={idx}>
                {(provided, snapshot) => (
                    <PageSummaryListWrapper
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getCardStyle(snapshot.isDragging, provided.draggableProps.style, foldQuestions.includes(page.id))}
                    >
                        <PageSummaryWrapper
                        onClick={() => setActiveCard(`P-${idx}`)}
                        className={classNames({ 
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
                                    <button onClick={() => toggleFoldQ(page.id)} disabled={page.questions.length === 0}>{foldQuestions.includes(page.id) ? '펼치기' : '접기'}</button>
                                    <button onClick={() => copyP(idx)}>복사</button>
                                    <button className="remove" disabled={pages.length<=1} onClick={() => deleteP(idx)}>삭제</button>
                                </MoreVert>}
                            </div>
                        </PageSummaryWrapper>

                        <Droppable droppableId={`${idx}`} type="question">
                        {(provided) => (
                            <QuestionSummaryListWrapper 
                            className={classNames({fold : foldQuestions.includes(page.id)})} 
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
                                        <QuestionSummaryWrapper
                                            className={classNames({ active: `Q-${idx}-${idx2}` === activeCard })}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            onClick={() => setActiveCard(`Q-${idx}-${idx2}`)}
                                        >
                                            {question.q ? <p>{question.q}</p> : <p className="placeholder">{`${idx2 + 1}번 문항`}</p>}
                                            {`Q-${idx}-${idx2}` === activeCard && 
                                            <MoreVert >
                                                <button onClick={() => saveQ(idx, idx2, token)}>저장</button>
                                                <button onClick={() => copyQ(idx, idx2)}>복사</button>
                                                <button className="remove" onClick={() => deleteQ(idx, idx2)}>삭제</button>
                                            </MoreVert>}
                                        </QuestionSummaryWrapper>
                                    )}
                                    </Draggable>
                                ))
                                ) : (
                                // questions 없을때 드래그 앤 드롭
                                <div className="question-empty"></div>
                                )}
                                {provided.placeholder}
                            </QuestionSummaryListWrapper>
                        )}
                        </Droppable>
                    </PageSummaryListWrapper>
                )}
                </Draggable>
                ))}
                {provided.placeholder}

                <PageSummaryWrapper className={classNames("ending-summary",
                    {active : 'end' === activeCard}
                )} onClick={()=>setActiveCard('end')}>
                    <h4>엔딩</h4>
                    {endingMent.title ? <p>{endingMent.title}</p> : <p className="placeholder">응답해 주셔서 감사합니다.</p>}  
                </PageSummaryWrapper>

                </SurveySummaryWrapper>
            </SummaryScrollBox>                    
            )}
            </Droppable>
        
            <div className="action-btns">
                <button onClick={addQuestion} disabled={activeCard === '' || activeCard === 'end'}>
                    문항 추가
                </button>
                <p>추가하기</p>
                <button onClick={addPage} disabled={activeCard === '' || activeCard === 'end'}>
                    페이지 추가
                </button>
            </div>
        </SurveySummaryTab>   
    </DragDropContext>
    )
}

export default FormSummary
