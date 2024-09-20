import React, { useRef, useState } from "react";
import FAQs from '../../Datas/FAQs'
import questionForms from "../../Datas/questionForms";
import FAQViewerWrapper from "./_StyledFAQList";
import { Icon } from "../../Components/Icons";
import ModalWrapper from "../../Components/StyledModal";
import RadioButton from '../../Components/RadioButton'

function FAQViewer(){
    const modalRef = useRef()
    const [readMore, setReadMore] = useState()
    const [searchedFAQs, setSerachedFAQs] = useState(FAQs)
    const [searchWord, setSearchWord] = useState('')

    const readMoreView = (faq, code) => {
        setReadMore({...faq, code})
        modalRef.current.showModal()
    }

    const search = (e) => {
        e.preventDefault()
        const filteredFAQs = FAQs.filter(FAQ => {
            return FAQ.q.includes(searchWord) 
        })
        setSerachedFAQs(filteredFAQs)
    }

    const closeModal = () => {
        modalRef.current.close()
    }

    return <FAQViewerWrapper>
        <header>
            <form>
                <input placeholder="검색하기" 
                onChange={e=>setSearchWord(word => word = e.target.value)} 
                value={searchWord}/>
                <button className="filter-btn"><Icon code={'tune'}/></button>
                <button className="search-btn" onClick={search}><Icon code={'search'}/></button>
            </form>
        </header>

        <main>
            공개된 질문 리스트
        </main>
        <div className="card-box">
        {searchedFAQs.length > 0 ? 
        searchedFAQs.map((faq, idx) => {
            const {q, options, type} = faq
            const form = questionForms.find(x => x.form === type)

            return <div key={idx} className="card">
                <button 
                title="자세히 보기"
                onClick={() => readMoreView(faq, form.code)}
                className="read-more"><Icon code={'quick_reference_all'}/></button>
                <p className="type-text"><span>{type}</span></p>
                <p className="type-icon"><Icon code={form.code}/></p>
                <h4>Q. {q}</h4>
                <div className="answer-box">
                    {options.map((option, idx2) => {
                        return <p key={idx2}>{option.answer}</p>
                    })}
                </div>
                <div className="btns">
                    {/* <button onClick={() => readMoreView(faq, form.code)}>자세히 보기</button> */}
                    <button>가져가기</button>
                </div>
            </div>
        }) : <p>검색 결과가 없습니다.</p>}
        </div>
        <ModalWrapper ref={modalRef} className="modal-wrapper">
            {readMore && <div>
                <header>Q. {readMore.q}
                    <p><Icon code={readMore.code}/>{readMore.type}</p>
                </header>
                <main>
                {readMore.options && readMore.options.map((option, key) => {
                    return <h5 key={key} className="line-up"
                    ><RadioButton/>{option.answer}</h5>
                })}
                </main>
                <footer className="btns">
                    <button onClick={()=>{}}>가져가기</button>
                    <button onClick={closeModal}>닫기</button>
                </footer>
            </div>
            }
        </ModalWrapper>
    </FAQViewerWrapper>
}
export default FAQViewer