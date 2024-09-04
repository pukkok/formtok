import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useRecoilState } from 'recoil'
import { activeCardAtom, pagesAtom, randomKey } from '../../../Recoil/AdminRecoil'
import classNames from 'classnames'

// 페이지 및 질문 데이터 재정렬 함수
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
}

// 드래그된 항목의 스타일
const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    background: isDragging && '#7E37ED',
    color : isDragging && '#fff',
    ...draggableStyle,
})

// 드롭 가능한 영역의 스타일
const getListStyle = isDraggingOver => ({
    border: isDraggingOver ? '1px solid lightblue' : '1px solid #fff',
})

function QuestionTab() {
    const [pages, setPages] = useRecoilState(pagesAtom)
    const [activeCard, setActiveCard] = useRecoilState(activeCardAtom)

    const onDragEnd = (result) => {
        // 드래그가 리스트 외부에서 끝나면 아무 작업도 하지 않음
        if (!result.destination) {
            return;
        }
    
        const sourcePageIdx = parseInt(result.source.droppableId.split('-')[1]);
        const destPageIdx = parseInt(result.destination.droppableId.split('-')[1]);
    
        let newPages = [...pages] // 현재 상태의 복사본을 생성
    
        // 같은 페이지 내에서 재정렬
        if (sourcePageIdx === destPageIdx) {
            const newQuestions = reorder(
                newPages[sourcePageIdx].questions,
                result.source.index,
                result.destination.index
            )
    
            // 새로운 질문 배열을 가진 새로운 페이지 객체 생성
            newPages[sourcePageIdx] = {
                ...newPages[sourcePageIdx],
                questions: newQuestions
            }
    
            setPages(newPages)
            setActiveCard(`q-${sourcePageIdx}-${result.destination.index}`);
        } else {
            // 다른 페이지로 이동
           
            const sourceQuestions = Array.from(newPages[sourcePageIdx].questions)
            const [movedQuestion] = sourceQuestions.splice(result.source.index, 1)
    
            const destQuestions = Array.from(newPages[destPageIdx].questions)
            destQuestions.splice(result.destination.index, 0, movedQuestion)
    
            // 페이지 배열의 복사본에서 각각의 페이지를 업데이트
            newPages[sourcePageIdx] = {
                ...newPages[sourcePageIdx],
                questions: sourceQuestions
            }
            newPages[destPageIdx] = {
                ...newPages[destPageIdx],
                questions: destQuestions
            }
    
            setPages(newPages)
            setActiveCard(`q-${destPageIdx}-${result.destination.index}`)
        }
    };
    

    const addQuestion = () => {
        let id = randomKey() // 고유한 ID 생성
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
        const id = 'Q' + randomKey() // 페이지용 고유 ID 생성
        setPages([...pages, { id, title: '', description: '' , questions: [] }])
        setActiveCard(`h-${pages.length}`)
    }

    return (
        <div className="q-tab">
            <div className='summary-wrapper'>
            <DragDropContext onDragEnd={onDragEnd}>
                {pages.map((page, pageIndex) => (
                    <Droppable droppableId={`page-${pageIndex}`} key={page.id}>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                                {...provided.droppableProps}
                                className='summary-card'
                            >
                                <div
                                    onClick={() => setActiveCard(`h-${pageIndex}`)}
                                    className={classNames('h-summary', { active: `h-${pageIndex}` === activeCard })}
                                >
                                    <h4>{pageIndex + 1}/{pages.length} 페이지</h4>
                                    {page.title ? (
                                        <p>{page.title}</p>
                                    ) : (
                                        <p className="placeholder">페이지 제목</p>
                                    )}
                                </div>

                                {page.questions.map((question, questionIndex) => (
                                    <Draggable
                                        key={question.id}
                                        draggableId={question.id}
                                        index={questionIndex}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}
                                                onClick={() => setActiveCard(`q-${pageIndex}-${questionIndex}`)}
                                                className={classNames('q-summary', {
                                                    active: `q-${pageIndex}-${questionIndex}` === activeCard
                                                })}
                                            >
                                                {question.q ? question.q : `${questionIndex + 1}번 문항`}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </DragDropContext>
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
