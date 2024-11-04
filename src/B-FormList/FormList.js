import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchForm from "../A-Components/SearchForm";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import useAxios from "../C-Hooks/useAxios";
import { useSetRecoilState } from "recoil";
import { pagesAtom } from "../C-Recoils/surveyAtoms";
import SearchFilter from "../A-Components/SearchFilter";
import { LinkIcon } from "../A-Components/Icons/Icons";

const StyledFormList = styled.section`
    padding: var(--pk-viewer-padding);
    margin: 0 auto;
    /* max-width: var(--pk-board-container); */

    .template-box{
        margin-top: 30px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(340px, 350px));
        flex-wrap: wrap;
        column-gap: 10px;
        row-gap: 20px;
    }

    .card{
        transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        overflow: hidden;
        height: 210px;
        border-radius: 12px;
        box-shadow: rgba(0, 0, 0, 0.1) 2px 4px 10px;
        padding: 0px;
        background-color: var(--pk-survey-card);
        cursor: pointer;

        .form-box{
            width: 100%;
            height: 100%;
            padding: 20px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            position: relative;
            &:hover{
                background-color: var(--pk-survey-card-hover);
            }

            h5 {
                margin-bottom: 10px;
                
                display: -webkit-box;         /* Flexbox를 사용하여 컨테이너를 만든다 */
                -webkit-box-orient: vertical; /* 텍스트가 세로 방향으로 배치되도록 설정 */
                -webkit-line-clamp: 2;     /* 최대 줄 수를 2줄로 제한 */
                overflow: hidden;             /* 넘치는 텍스트를 숨긴다 */
                text-overflow: ellipsis;      /* 넘치는 부분을 ...으로 표시 */
                white-space: normal;          /* 텍스트를 줄바꿈 */
            }
            .info{
                margin-top: auto;
                font-size: 14px;
                p:not(:nth-last-child(1)){
                    padding-bottom: 5px;
                }
            }

            button{
                position: absolute;
                bottom: 10px;
                right: 10px;
                padding: 5px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                &:hover{
                    background-color: var(--pk-point);
                    span{
                        color: #fff;
                    }
                }
                span{
                    rotate: -45deg;
                    color: var(--pk-modal-font);
                }
            }
        }
    }
`
/** 결과 확인 */
function FormList () {

    const { loadAllForms } = useAxios()
    const [searchedForms, setSerachedForms] = useState([])
    const [loadForms, setLoadForms] = useState([])
    const setPages = useSetRecoilState(pagesAtom)
    const token = localStorage.getItem('token')
    const naviate = useNavigate()

    useEffect(() => {
        const loadAllFormAction = async () => {
            const forms = await loadAllForms()
            if(forms){
                setPages([]) // 초기화
                setLoadForms(forms)
                setSerachedForms(forms)
            }
        }
        loadAllFormAction()
    }, [setPages, loadAllForms])

    

    const goToView = (url, options) => {
        const {isNeedLogin} = options
        if(isNeedLogin){
            if(!token) return alert('로그인이 필요한 설문지 입니다.')
        }
        naviate(`/view/${url}`)
    }

    const linkOpen = (e, url) => {
        e.stopPropagation()
        navigator.clipboard.writeText(`${origin}/view/${url}`)
        alert('링크가 복사되었습니다.')
    }

    const [active, setActive] = useState('working')
    const search = (word) =>{
        const filteredForms = loadForms.filter(form => form.title.includes(word))
        setActive(null)
        setSerachedForms(filteredForms)
    }

    const filtering = (work) => {
        setActive(work)
        if(!work) return setSerachedForms(loadForms)
        if(work==='faq') return setSerachedForms([loadForms.find(form => form.title === '문의하기')])

        const now = dayjs()
        const filteredForms = loadForms.filter(form => {
            const {isNeedLogin, isEnd, isuseStartPeriod, startDate, endDate} = form.options
            const start = startDate ? dayjs(startDate) : null
            const end = endDate ? dayjs(endDate) : null
            switch (work) {
                case 'stop':
                    // 종료된 설문 (설문이 끝났거나, 종료일이 현재보다 이전인 경우)
                    return isEnd || (end && end.isBefore(now))
    
                case 'working':
                    // 진행 중인 설문 (시작일이 현재보다 이전이고, 종료일이 현재보다 이후인 경우)
                    return !isEnd && (!isuseStartPeriod || (start?.isBefore(now) && end?.isAfter(now)))
    
                case 'noLogin':
                    // 비로그인 가능 설문
                    return !isNeedLogin
    
                default:
                    return false
            }
        })
        setSerachedForms(filteredForms)
    }

    const filters = [
        {work : null, text: '전체'},
        {work : 'faq', text: 'FAQ', bgColor: "#779ecb"},
        {work : 'noLogin', text: '비로그인', bgColor: "#ffd700"},
        {work : 'working', text: '진행중인 설문', bgColor: "#77dd77"},
        {work : 'stop', text: '종료된 설문', bgColor: "#ff6961"}
    ]

    return (
        <StyledFormList>
            <header>
            <SearchForm placeholder="제목으로 검색" handleClick={search}/>
            <SearchFilter filters={filters} fitering={filtering} active={active} />
            </header>


            <div className="template-box">
                {searchedForms.length > 0 && searchedForms.map(form => {
                    const {title, url, pages, options, numberOfResponses} = form
                    const allQuetinoCount = pages.reduce((acc, currentPage) => acc += currentPage.questions.length, 0)
                    const {startDate, endDate, maximumCount, isNeedLogin} = options

                    return <div key={url} className="card">
                        <div className="form-box" onClick={() => goToView(url, options)}>
                            <h5>{title}</h5>
                            <div className="info">
                                <p>로그인 : {isNeedLogin ? '필요' : '필요 없음'}</p>
                                <p>총 문항 수 : {allQuetinoCount}</p>
                                <p>참여 : {numberOfResponses.length || 0} | {maximumCount ? `최대 ${maximumCount}`: '제한 없음' }</p>
                                <p>기간 : {startDate ? <> 
                                    {startDate ? dayjs(startDate).format('YYYY-MM-DD') : '기간 제한 없음'}
                                    <span> ~ </span>  
                                    {endDate ? dayjs(endDate).format('YYYY-MM-DD') : '제한 없음'}
                                    </> :
                                    '기간 제한 없음'
                                    }
                                </p>
                            </div>
                        <button className="link" onClick={e => linkOpen(e, url)}><LinkIcon /></button>
                        </div>
                    </div>
                })}
            </div>
        </StyledFormList>
    )

}

export default FormList