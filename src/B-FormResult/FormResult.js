import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchForm from "../A-Components/SearchForm";
import useAxios from "../C-Hooks/useAxios";
import dayjs from "dayjs";
import classNames from "classnames";
import axios from "axios";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

const StyledFormResult = styled.section`
    /* padding: var(--pk-viewer-padding); */
    margin: 0px auto;
    position: relative;
    height: 100%;
    overflow-x: hidden;
    main{
        width: calc(100% - 400px);
        height: 100%;
        overflow: scroll;
        header{
            position: sticky;
            top: 0;
            
            padding: 20px;
            width: 100%;
            height: 60px;
            
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 10px;

            background-color: var(--pk-form-header-bg);  
            border-bottom: 1px solid var(--pk-form-header-border-bottom);

            .close-btn{
                margin-left: auto;
                background-color: var(--pk-point);
                color: var(--pk-light-grey);

                padding: 6px 12px;
                border-radius: 8px;
                font-weight: bold;
            }
        }
        .report{
            max-width: 1240px;
            margin : 0 auto;
            padding: var(--pk-viewer-padding);
            height: calc(100% - 60px);

            .report-result{
                padding: 10px;
                border: solid 1px var(--pk-dark);
                margin-bottom: 20px;
                
                .chart-box{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    max-height: 550px;
                }
            }
        }
    }

    aside{ // 오른쪽 사이드 바 전체 화면
        transition: left .7s;
        transition-delay: .3s;
        background-color: var(--pk-deep-dark);

        width: 100%;
        height: 100vh;
        padding: 20px 40px;
        position: absolute;
        top: 0;
        left: 0;

        header{
            margin-bottom: 30px;
        }

        &.side-bar-mode{ // 오른쪽 사이드 바
            transition: left .6s;
            transition-delay: 0s;
            left: calc(100% - 400px);
            padding: 0;
            border-left: 1px solid var(--pk-charcoal);
            .action-box{
                padding: 10px 20px;
                width: 400px;
                height: 100%;
            }

            .result-list{
                overflow: scroll;
                &::-webkit-scrollbar {
                    display: none;
                }

                height: calc(100% - 90px);
                div{
                    display: block;
                    h4{
                        font-size: 17px;
                        margin-bottom: 20px;
                    }

                    p{
                        display: flex;
                        justify-content: space-between;
                        font-size: 14px;
                        text-align: left;
                        padding-bottom: 5px;
                    }
                }
            }

        }

        .result-list{
            .head{
                background-color: transparent;
                margin-bottom: 0;
                h4, p{
                    font-size: 17px;
                }
            }

            div{
                display: flex;
                padding: 16px 20px;
                border-radius: 8px;
                align-items: center;
                background-color: var(--pk-dark);
                margin-bottom: 16px;
                gap: 20px;

                h4{
                    min-width: 300px;
                }

                p{
                    flex: 1;
                    text-align: center;
                    font-size: 14px;
                }
            }
            & > div:not(.head){
                cursor: pointer;
            }
            
        }

        
    }
`

function FormResult () {

    const [myResults, setMyResults] = useState([]) // 전체 데이터
    const [chartType, setChartType] = useState('pie')
    const [searchedResults, setSearchedResults] = useState([]) // 초기 데이터
    const [currentForm, setCurrentForm] = useState([])
    const [currentAnswers, setCurrentAnswers] = useState([])
    const [isResultOpen, setISResultOpen] = useState(false)

    const resultOpen = async (pages, url) => {
        const { data } = await axios.get(`/answer/form-result?url=${url}`)
        if(data.code === 200){
            setISResultOpen(true)
            setCurrentForm(pages)
            setCurrentAnswers(data.list)
        }else{
            alert('잘못 됨')
        }
    }

    const resultClose = () => {
        setISResultOpen(false)
        setCurrentForm([])
        setCurrentAnswers([])
    }
    
    // custom hooks
    const { getMyFormList } = useAxios()

    useEffect(() => {
        const getForms = async () => {
            const forms = await getMyFormList()

            const openForm = forms.filter(form => {
                return form.options.isOpen
            })
            setSearchedResults(openForm)
            setMyResults(openForm)
        }
        if(myResults.length === 0) getForms()
    }, [myResults])

    return(
    <StyledFormResult>
        <main>
            <header>
                <button>종합 결과</button>
                <button>참여자별 결과</button>
                <button
                className="close-btn"
                onClick={resultClose}
                >닫기</button>
            </header>

            <div className="report">
            {currentForm.length > 0 && currentForm.map(page => {
                const { title, id: pid, questions } = page
                return <div key={pid}>
                    <div>
                        <h1>{title}</h1>
                    </div>
                    {questions.map((question, qi) => {
                        const { q, id: qid, type, options, hasExtraOption } = question
                        
                        let list = options.reduce((acc, cur) => acc = {...acc, [cur.answer] : 0}, {})
                        if(hasExtraOption) list = {...list, '기타': 0}
                        let values = null
                        if(type === '객관식'){
                            values = currentAnswers.reduce((acc, cur) => {
                                const answer = cur.answers?.[pid]?.[qid].answer
                                return acc = { ...acc, [answer] : acc[answer]+1 }
                            }, {...list})
                        }
                        if(type === '객관식(복수 선택)'){
                            values = currentAnswers.reduce((acc, cur) => {
                                const answers = cur.answers?.[pid]?.[qid].answer
                                answers.forEach(answer => {
                                    acc = {... acc, [answer] : acc[answer] + 1}
                                })
                                return acc
                            }, {...list})
                        }

                        return (
                            <div key={qid} className="report-result">
                                <div>
                                    <h3>{qi+1}. {q} 
                                        {/* <span> | 응답 수: {currentAnswers.length}</span> */}
                                        <span> | 타입 : {type}</span>
                                    </h3>
                                    <button onClick={() => setChartType('bar')}>표</button>
                                    <button onClick={() => setChartType('pie')}>파이</button>
                                </div>
                               
                                <div className="chart-box">
                                    {['객관식', '객관식(복수 선택)'].includes(type) && 
                                    chartType === 'bar' && <BarChart values={values}/>}
                                    {['객관식', '객관식(복수 선택)'].includes(type) && 
                                    chartType === 'pie' && <PieChart values={values}/>}
                                </div>

                                <div>
                                    {['서술형', '단답형'].includes(type) && 
                                    currentAnswers.map((result, idx) => {
                                        const answer = result.answers?.[pid]?.[qid].answer
                                        return answer ? <p key={qid}>응답{idx+1} - {answer}</p> : <p>응답이 없습니다.</p>
                                    })
                                    }
                                </div>

                            
                                
                            </div>
                        )
                    })}
                </div>
            })}
            </div>
        </main>

        <aside className={classNames({'side-bar-mode' : isResultOpen})}>
            <div className="action-box">
                <header>
                    <SearchForm />
                </header>

                <div className="result-list">
                    {isResultOpen ? 
                    searchedResults.length > 0 && searchedResults.map(form => {
                        const { title, url, options, numberOfResponses, pages } = form
                        const { isOpen, isEnd, isPublic, isNeedLogin, startDate, endDate, maximumCount } = options
                        
                        const start = startDate ? dayjs(startDate).format('YYYY-MM-DD') : null
                        const end = endDate ? dayjs(endDate).format('YYYY-MM-DD') : null

                        return <div key={url} onClick={()=>resultOpen(pages, url)}>
                            <h4>{title}</h4>
                            <p>
                            <span>로그인 : {isNeedLogin ? '필요' : '-'}</span>
                            <span>응답 : {numberOfResponses.length || 0} | {maximumCount ? `최대 ${maximumCount}` : '제한 없음' }</span>
                            </p>
                            <p>공개 : {isPublic ? '전체' : '-'}
                            <span>상태 : {isEnd ? '종료' : isOpen ? '진행 중' : '-'}</span>
                            </p>
                            <p className="start-date">기간 : {start ? start : '무제한'} {end ? `| ${end}` : ''}</p>                                 

                        </div>
                    }) 
                    
                    :

                    <>
                    <div className="head">
                        <h4>설문지</h4>
                        <p>응답 수</p>
                        <p>응답 제한</p>
                        <p>로그인 필요</p>
                        <p>시작일</p>
                        <p>종료일</p>
                        <p>공개 여부</p>
                        <p>상태</p>
                    </div>

                    {searchedResults.length > 0 && searchedResults.map(form => {
                        const { title, url, options, numberOfResponses, pages } = form
                        const {isOpen, isEnd, isPublic, isNeedLogin, startDate, endDate, maximumCount} = options
                        
                        const start = startDate ? dayjs(startDate).format('YYYY-MM-DD') : null
                        const end = endDate ? dayjs(endDate).format('YYYY-MM-DD') : null

                        return <div key={url} onClick={()=>resultOpen(pages, url)}>
                            <h4>{title}</h4>
                            <p>{numberOfResponses.length || 0}</p>
                            <p>{maximumCount ? maximumCount : '-' }</p>
                            <p>{isNeedLogin? '필요' : '-'}</p>
                            <p className="start-date">{start ? start : '무제한'}</p>                                 
                            <p className="end-date">{end ? end : '-'}</p>    
                            <p>{isPublic ? '전체' : '-'}</p>

                            {/* 나중에 수정할 부분 */}
                            <p>{isEnd ? '종료' : isOpen ? '진행 중' : '-'}</p>

                        </div>
                    })}
                    </>
                    }
                </div>
            </div>

        </aside>
        </StyledFormResult>
    )
}

export default FormResult