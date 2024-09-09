import React, { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { pagesAtom, activeCardAtom } from "../../recoils/surveyAtoms";
import usePageActions from "../../hooks/usePageActions";
import DescriptionInput from "../../components/DescriptionInput";
import classNames from "classnames";

function Pcard({pi}) {
    const pages = useRecoilValue(pagesAtom)
    const [activeCard, setActiveCard] = useRecoilState(activeCardAtom)

    const [pageCnt, setPageCnt] = useState('1/1')
    useEffect(() => {
        setPageCnt(`${pi+1}/${pages.length}`)
    }, [pages, pi])

    const {changePTitle, changePDescription} = usePageActions()
    
    return (
        <div className={classNames("card", 
            {active : `P-${pi}` === activeCard})}
            onClick={()=>setActiveCard(`P-${pi}`)}>
            
            <h4 className="pd">{pageCnt} 페이지</h4>
            <div className="pd">
                <input className="title-A" 
                placeholder="페이지 제목" onChange={e=>changePTitle(e, pi)}/>
                <DescriptionInput 
                value={pages[pi].description}
                placeholder={'페이지 설명'}
                changeHandler={e=>changePDescription(e, pi)}/>
            </div>
        </div>
    )
}

export default Pcard

// const applyStyle = (style) => {
//     let tag
//     switch (style) {
//         case 'bold' : tag = 'b'; break;
//         case 'italic' : tag = 'i'; break;
//         default : tag = ''
//     }

//     const selection = window.getSelection()
//     if (selection.rangeCount > 0) {
//       const range = selection.getRangeAt(0)

//       if (!range.collapsed) {
//         // 선택된 범위를 클론하여 조작 (여러 줄에 걸친 선택에 대비)
//         const content = range.cloneContents()
//         const newTag = document.createElement(tag)

//         while (content.firstChild) {
//             newTag.appendChild(content.firstChild)
//         }

//         // 선택된 범위를 제거하고 새 요소로 교체
//         range.deleteContents()
//         range.insertNode(newTag)

//         // 업데이트된 HTML을 저장
//         setHtml(document.querySelector(".content-editor").innerHTML)

//         // 커서를 끝으로 이동
//         // selection.removeAllRanges()
//         const newRange = document.createRange()
//         newRange.selectNodeContents(newTag)
//         newRange.collapse(false)
//         selection.addRange(newRange)
//       }
//     }
// }