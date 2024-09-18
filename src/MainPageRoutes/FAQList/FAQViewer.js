import React, { useRef, useState } from "react";
import FAQs from '../../Datas/FAQs'
import questionForms from "../../Datas/questionForms";
import FAQViewerWrapper from "./_styledFAQList";
import { Icon } from "../../Components/Icons";

function FAQViewer(){
    const modalRef = useRef()
    const [readMore, setReadMore] = useState()
    const readMoreView = (faq) => {
        setReadMore(faq)
        modalRef.current.showModal()
    }

    const closeModal = () => {
        modalRef.current.close()
    }

    return <FAQViewerWrapper>
        <input placeholder="검색어 입력"/><button>검색</button>
        <div className="card-box">
        {FAQs.map((faq, idx) => {
            const {q, options, type} = faq
            const form = questionForms.find(x => x.form === type)

            return <div key={idx} className="card">
                <p className="type-text"><span>{type}</span></p>
                <p className="type-icon"><Icon code={form.code}/></p>
                <h4>Q. {q}</h4>
                <div className="answer-box">
                    {options.map((option, idx2) => {
                        return <p key={idx2}>{option.answer}</p>
                    })}
                </div>
                <div className="btns">
                    <button onClick={() => readMoreView(faq)}>자세히 보기</button>
                    <button>가져가기</button>
                </div>
            </div>
        })}
        </div>
        <dialog ref={modalRef} className="modal-wrapper">
            {readMore && <div className="card">
                {readMore.q}
                {/* {readMore.options} */}

                <div className="btns">
                    <button onClick={()=>{}}>가져가기</button>
                    <button onClick={closeModal}>닫기</button>
                </div>
            </div>
            }
            <div>
                
            </div>
        </dialog>
    </FAQViewerWrapper>
}
export default FAQViewer