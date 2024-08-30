import React, { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { activeCardAtom, pagesAtom } from "../../../Recoil/AdminRecoil";
import classNames from "classnames";

function QuestionTab () {
    const [pages, setPages] = useRecoilState(pagesAtom)
    const [activeCard, setActiveCard] = useRecoilState(activeCardAtom)

    const addQuestion = () => {
        let pageCnt = activeCard.split('-')[1]
        let length
        setPages(prev => {
            return prev.map((page, idx) => {
                if(+pageCnt === idx){
                    length = page.questions.length
                    page = {...page, questions : [...page.questions, {type: 'multiple', q:'', a: []}]}
                }
                return page
            })
        })
        setActiveCard(`q-${pageCnt}-${length}`)
    }

    const addPage = () => {
        setPages([...pages, {header: {title: '', description :''}, questions: []}])
        setActiveCard(`h-${pages.length}`)
    }

    const dragItem = useRef()
    const dragOverItem = useRef()
    const [itemA, setItemA] = useState(null)
    const [itemB, setItemB] = useState(null)

    const dragStartHandler = (e, idx, idx2) => {
        // const img = new Image()
        // img.src= ''
        // e.dataTransfer.setDragImage(img, 0, 0)

        dragItem.current = {pageIdx: idx, quizIdx: idx2}
        setItemA({pageIdx: idx, quizIdx: idx2})
    }

    const dragEnterHandler = (idx, idx2) => {
        dragOverItem.current = {pageIdx: idx, quizIdx: idx2}
        if(itemA) setItemB({...itemA})
    }

    const drop = () => {
        const copyListItems = [...pages]
        console.log(copyListItems[dragItem.current.pageIdx])
    }

    return(
        <div className="q-tab">
            <div className="summary-wrapper">
                {pages.map((page, idx) => {
                    const {header : {title}, questions } = page
                    return <div key={idx} className="summary-card">
                        <div onClick={()=>setActiveCard(`h-${idx}`)}
                        className={classNames('h-summary',
                        {active : `h-${idx}` === activeCard})}
                        >
                            <h4>{idx+1}/{pages.length} 페이지</h4>
                            {title ? <p>{title}</p> : <p className="placeholder">페이지 제목</p>}
                        </div>
                        {questions.map((question, idx2)=> {
                            const {type, q, a} = question
                            return <div
                            onClick={()=>setActiveCard(`q-${idx}-${idx2}`)}
                            className={classNames('q-summary', 
                            {active : `q-${idx}-${idx2}` === activeCard})}
                            key={idx2}
                            draggable={true}
                            onDragStart={e => dragStartHandler(e, idx, idx2)}
                            onDragEnter={() => dragEnterHandler(idx)}
                            onDragOver={e => e.preventDefault()}
                            onDragEnd={drop}
                            >문항{idx2+1}</div>
                        })}
                    </div> 
                })}
            </div>
            <div className="q-btns">
                <button onClick={addQuestion}>문항 추가</button>
                <button onClick={addPage}>페이지 추가</button>
            </div>
        </div>
    )
}

function RemoteControl () {
    const [activeBtn, setActiveBtn] = useState(0)

    const btns = ['전체 문항', '설문 설정']

    return <div className="remote-control">
        <nav>
            {btns.map((btn, idx) => {
                return <button key={btn+idx}
                className={classNames({active : activeBtn === idx})}
                onClick={()=>setActiveBtn(idx)}>{btn}</button>
            })}
        </nav>
        {activeBtn === 0 && <QuestionTab/>}
    </div>
}

export default RemoteControl


