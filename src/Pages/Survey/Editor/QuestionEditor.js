import React, {useState} from "react";
import ContentEditable from "react-contenteditable";

function QuestionEditor ({type = '장문형'}) {
    const [title, setTitle] = useState('') // page title
    const [html, setHtml] = useState('') // page description
    const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);
    const changeTitle = (e) => {
        setTitle(e.target.value)
    }

    const changeDescription = (e) => {
        const {value} = e.target
        setHtml(value)
        // value가 없을때 placeholder 상태
        setIsPlaceholderVisible(value === "")
    }

    const [typeSummary, setTypeSummary] = useState('객관식')
    const changeSummary = (e) => {
        setTypeSummary(e.target.innerText)
    }

    return <>
        <div className="pd-box">
            <input className="question-title" placeholder="질문" onChange={changeTitle}/>
            <div className="content-editor-wrapper">
                {isPlaceholderVisible && (
                <p className="content-placeholder">
                    질문 설명
                </p>
                )}
                <ContentEditable
                className="content-editor"
                html={html}
                tagName="p"
                onChange={changeDescription}
                />
                {type === '장문형' && <TextAnswer style={'long'}/>}
            </div>

            <details>
                <summary>{typeSummary}</summary>
                <button onClick={changeSummary}>서술형</button>
                <button onClick={changeSummary}>단답형</button>
                <button onClick={changeSummary}>객관식</button>
                <button onClick={changeSummary}>드롭다운</button>
                <button onClick={changeSummary}>날짜/시간</button>
                <button onClick={changeSummary}>표형</button>
                <button onClick={changeSummary}>점수 선택형</button>
            </details>
        </div>
        
    </>
}

export default QuestionEditor

function TextAnswer ({style = 'long'}) {
    const text = style === 'long' ? '장문형' : '단답형'

    return <input className={style} placeholder={text} disabled={true}/>
}

function MultipleAnswer () {

    return <input/>
}