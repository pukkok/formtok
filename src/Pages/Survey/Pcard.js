import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { pagesAtom } from "../../recoils/surveyAtoms";
import ContentEditable from "react-contenteditable";
import usePageActions from "../../hooks/usePageActions";

function Pcard({pi}) {
    const [pages, setPages] = useRecoilState(pagesAtom)

    const [pageCnt, setPageCnt] = useState('1/1')
    useEffect(() => {
        setPageCnt(`${pi+1}/${pages.length}`)
    }, [pages, pi])

    const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);
    const pageDescRef = useRef(null)


    const {changePTitle, changePDescription} = usePageActions()
    const changePDescriptionAction = (e, pi) => {
        changePDescription(e, pi)
        // value가 없을때 placeholder 상태
        setIsPlaceholderVisible(e.target.value === "")
    } 
    
    return (
        <>
            <h4 className="pd-box">{pageCnt} 페이지</h4>
            <div className="pd-box">
                <input className="page-title" 
                placeholder="페이지 제목" onChange={e=>changePTitle(e, pi)}/>
                <div className="content-editor-wrapper">
                    {isPlaceholderVisible && (
                    <p className="content-placeholder">
                        페이지 설명
                    </p>
                    )}
                    <ContentEditable
                    ref={pageDescRef}
                    className="content-editor"
                    html={pages[pi].description}
                    tagName="p"
                    onChange={e=>changePDescriptionAction(e, pi)}
                    />
                </div>
                {/* <button onClick={()=>applyStyle('bold')}>굵게</button>
                 /
                <button onClick={()=>applyStyle('italic')}>기울이기</button> */}
            </div>
        </>
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