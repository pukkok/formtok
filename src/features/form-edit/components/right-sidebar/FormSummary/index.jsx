import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"
import AddPageQuestion from "./AddPageQuestion"
import { useFormEditStore } from "@/stores/useFormEditStore"
import { useFormEditUiStore } from "@/stores/useFormEditUiStore"
import PageSummary from "./PageSummary"
import QuestionSummary from "./QuestionSummary"
import { useScreenStore } from "@/stores/useScreenStore"
import EndingMentSummary from "./EndingMentSummary"

const FormSummary = () => {
  
  const activeCard = useFormEditUiStore(s => s.activeCard)
  const setActiveCard = useFormEditUiStore(s => s.setActiveCard)
  const foldQuestions = useFormEditUiStore(s => s.foldQuestions)

  const pages = useFormEditStore(s => s.pages)
  const reorderPage = useFormEditStore(s => s.reorderPage)
  const reorderQuestion = useFormEditStore(s => s.reorderQuestion)

  const getCardStyle = (isDragging, draggableStyle, isFold) => {
    return {
      border: isDragging && (isFold ? '2px solid #f06292' : '2px solid #7E37ED'),
      borderRadius: isDragging && '12px',
      // ...draggableStyle
    }
  }

  const dragStart = () => {
    setActiveCard('')
  }

  const dragEnd = (result) => {
    const { source, destination, type } = result

    if (!destination){ // 바깥 드랍
        if(type === "page"){
          setActiveCard(`P-${source.index}`)
        }else{
          setActiveCard(`Q-${source.droppableId}-${source.index}`)
        }
        return 
    } 

    
    if (type === "page") { // INFO: 페이지 위치 변경
      reorderPage(source.index, destination.index)
      setActiveCard(`P-${destination.index}`)
    } else if (type === "question") {
      const p1 = parseInt(source.droppableId)
      const q1 = source.index
      const p2 = parseInt(destination.droppableId)
      const q2 = destination.index
      reorderQuestion(p1, q1, p2, q2)
      setActiveCard(`Q-${p2}-${q2}`) 
    }
  }

  return (
    <div className="flex flex-col">

      <section className="h-[calc(100vh-110px)] pb-4 overflow-scroll"> 
        <DragDropContext onDragStart={dragStart} onDragEnd={dragEnd}>
          <Droppable droppableId="all-pages" type="page">
          {(provided) => (
            <div className="px-2 cursor-pointer select-none">
              <div 
                className="mx-4"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {pages.map((page, pi) => (
                  <Draggable key={page.id} draggableId={`page-${page.id}`} index={pi}>
                    {(provided, snapshot) => (
                      <div className={`mt-5 first-of-type:mt-4 dark:bg-dark-surface bg-bright-a
                        ${snapshot.isDragging ? 'rounded-xl border-2 border-point' : ''}
                        `}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        // style={getCardStyle(snapshot.isDragging, provided.draggableProps.style, foldQuestions.includes(page.id))}
                      >
                        <PageSummary
                          pageMark={`${pi + 1}/${pages.length}`} 
                          page={page} pi={pi}
                          isActive={activeCard === `P-${pi}`}
                          isDragging={snapshot.isDragging}
                          isFold={foldQuestions.includes(page.id)} 
                        />

                        <Droppable droppableId={`${pi}`} type="question">
                        {(provided) => (
                          <div 
                            className={`py-1 ${foldQuestions.includes(page.id) ? 'hidden' : ''}`}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                          >
                          {page.questions.length > 0 ? (
                            page.questions.map((question, qi) => (
                              <Draggable key={question.id} draggableId={`question-${question.id}`} index={qi}>
                              {(provided, snapshot) => (
                                <QuestionSummary 
                                  question={question}
                                  pi={pi} qi={qi}
                                  isDragging={snapshot.isDragging}
                                  isActive={activeCard === `Q-${pi}-${qi}`}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                />
                              )}
                              </Draggable>
                            ))
                          ) : (
                            <div className="h-[1px]"></div>
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

                <EndingMentSummary 
                  isActive={activeCard === 'end'}
                />
              </div>
            </div>
          )}
          </Droppable>
        </DragDropContext>
      </section>

      <AddPageQuestion />
    </div>
  )
}

export default FormSummary