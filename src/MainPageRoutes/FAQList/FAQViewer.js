import React, { useEffect, useRef, useState } from "react";
import questionForms from "../../Datas/questionForms";
import FAQViewerWrapper from "./_StyledFAQList";
import { Icon } from "../../Components/Icons";
import ModalWrapper from "../../Components/StyledModal";
import RadioButton from '../../Components/RadioButton'
import useAxios from "../../Hooks/useAxios";

function FAQViewer(){
    const modalRef = useRef()
    const [readMore, setReadMore] = useState()
    const [loadQuestions, setLoadQuestions] = useState([])
    const [searchedFAQs, setSerachedFAQs] = useState([])
    const [searchWord, setSearchWord] = useState('')
    const token = localStorage.getItem('token')
    const { getMyQuestionList } = useAxios()

    useEffect(() => {
        const getQuestions = async () => {
            const questions = await getMyQuestionList(token)
            setLoadQuestions(questions)
            setSerachedFAQs(questions)
        }
        getQuestions()
    }, [])

    const readMoreView = (faq, code) => {
        setReadMore({...faq, code})
        modalRef.current.showModal()
    }

    const search = (e) => {
        e.preventDefault()
        const filteredFAQs = loadQuestions.filter(FAQ => {
            return FAQ.q.includes(searchWord) 
        })
        setSerachedFAQs(filteredFAQs)
    }

    const closeModal = () => {
        modalRef.current.close()
    }
    
    
    const checkedRef = useRef([])
    const takeQuestion = () => {
        let x = checkedRef.current.filter(input => {
            return input.checked
        })
        console.log(x)
    }

    return <FAQViewerWrapper>
        <header>
            <form>
                <input placeholder="검색하기" 
                onChange={e=>setSearchWord(word => word = e.target.value)} 
                value={searchWord}/>
                {/* <button className="filter-btn"><Icon code={'tune'}/></button> */}
                <button className="search-btn" onClick={search}><Icon code={'search'}/></button>
            </form>
            <div className="btns">
                <button onClick={takeQuestion}>사용</button>
                <button>삭제</button>
            </div>
        </header>

        <main>
            공개된 질문 리스트
        </main>
        <div className="card-box">
        {searchedFAQs.length > 0 ? 
        searchedFAQs.map((faq, idx) => {
            const {q, options, type} = faq
            const form = questionForms.find(x => x.form === type)

            return <label key={idx} className="card">
                <div className="check-box">
                    <input name={idx} type={'checkbox'} 
                    ref={el => checkedRef.current[idx] = el}/>
                    <Icon code={'check'}/>
                </div>
                <p className="type-text"><span>{type}</span></p>
                <p className="type-icon"><Icon code={form.code}/></p>
                <h4>Q. {q}</h4>
                <div className="answer-box">
                    {options.map((option, idx2) => {
                        return <p key={idx2}>{option.answer}</p>
                    })}
                </div>
                <div className="btns">
                    <button onClick={() => readMoreView(faq, form.code)}>자세히 보기</button>
                </div>
            </label>
        }) : token ? <p>검색 결과가 없습니다.</p> : <p>해당 탭은 로그인 후 사용 가능합니다.</p>}
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