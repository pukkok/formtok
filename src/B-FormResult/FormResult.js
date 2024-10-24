import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useAxios from "../C-Hooks/useAxios";
import axios from "axios";
import ChartBox from "./ChartBox";
import { BarIcon, BarIconHorizontal, DoughnutIcon, LineIcon, PieIcon } from "../A-Components/Icons";
import FormResultRightSidebar from "./FormResultRightSidebar";
import ListBox from "./ListBox";
import ExtraBox from "./ExtraBox";
import classNames from "classnames";
import DateBox from "./DateBox";
import RadarChart from "./Chart/RadarChart";
import LineChart from "./Chart/LineChart";
import { constant } from "lodash";

const StyledFormResult = styled.section`
    margin: 0px auto;
    position: relative;
    height: 100%;
    overflow-x: hidden;
    main{
        width: calc(100% - 400px);
        height: 100%;
        header{
            position: sticky;
            top: 0;
            
            padding: 20px;
            width: 100%;
            height: 60px;
            
            display: flex;
            align-items: center;
            justify-content: flex-start;

            background-color: var(--pk-form-header-bg);  
            border-bottom: 1px solid var(--pk-form-header-border-bottom);

            div{
                display: flex;
                gap: 12px;

                &.tabs{
                    button{
                        &.active{
                            font-weight: 800;
                            color: var(--pk-point);
                        }
                    }
                }

                &.btns{
                    margin-left: auto;

                    button{
                        background-color: var(--pk-point);
                        color: var(--pk-light-grey);

                        padding: 6px 12px;
                        border-radius: 8px;
                        font-weight: bold;
                    }
                }
            }
        }
        .report-scroll-wrapper{
            height: calc(100% - 60px);
            overflow: scroll;
        }
        .report{
            max-width: 1240px;
            margin : 0 auto;
            padding: var(--pk-viewer-padding);
            height: calc(100% - 60px);

            .report-result{
                padding: 20px;
                border: solid 1px var(--pk-dark);
                border-radius: 12px;
                margin-bottom: 40px;

                h3{
                    display: flex;
                    align-items: center;
                    span{
                        margin-left: auto;
                        font-size: 14px;
                        padding: 2px 4px;
                        border: solid 1px var(--pk-charcoal);
                    }
                    margin-bottom: 30px;
                }
                
                .chart-btns{
                    display: flex;
                    justify-content: flex-start;
                    gap: 6px;
                    button{
                        width: 24px;
                        height: 24px;
                    }
                    p{
                        margin-left: auto;
                    }
                    margin-bottom: 12px;
                }
            }
        }
    }

    
`

function FormResult () {

    const [myResults, setMyResults] = useState([]) // 전체 데이터
    const [chartTypes, setChartTypes] = useState({})
    const [searchedResults, setSearchedResults] = useState([]) // 초기 데이터
    const [currentForm, setCurrentForm] = useState([])
    const [currentAnswers, setCurrentAnswers] = useState([])
    const [isResultOpen, setISResultOpen] = useState(false)
    const [active, setActive] = useState(null)
    const [activeHeaderTab, setActiveHeaderTab] = useState('combined')

    const resultOpen = async (pages, url) => {
        const { data } = await axios.get(`/answer/form-result?url=${url}`)
        if(data.code === 200){
            setISResultOpen(true)
            setCurrentForm(pages)
            setCurrentAnswers(data.list)
            setActive(url)
        }else{
            alert('잘못 됨')
        }
    }
    const resultClose = () => {
        setISResultOpen(false)
        setCurrentForm([])
        setCurrentAnswers([])
        setActive(null)
    }
    
    const search = (word) => {
        const filteredResult = myResults.filter(form => form.title.includes(word))
        setSearchedResults(filteredResult)
    }

    // custom hooks
    const { getMyFormList } = useAxios()

    useEffect(() => {
        const getForms = async () => {
            const forms = await getMyFormList()
            if(forms){
                const openForm = forms.filter(form => {
                    return form.options.isOpen
                })
                setSearchedResults(openForm)
                setMyResults(openForm)
            }else{
                setSearchedResults([])
                setMyResults([])
            }
        }
        getForms()
    }, [getMyFormList])

    const chartTypeSelector = (qid, type) => {
        setChartTypes(prev => ({ ...prev, [qid]: type }))
    }

    useEffect(() => {
        if (currentForm.length > 0) {
            const initialChartTypes = {}
            currentForm.forEach(page => {
                page.questions.forEach(question => {
                    initialChartTypes[question.id] = 'bar-vertical' // 모든 질문을 'bar'로 초기화
                })
            })
            setChartTypes(initialChartTypes)
        }
    }, [currentForm])

    function createRangeObj (min, max) {
        const result = {}
        for(let i=min; i<= max; i++){
            result[i] = 0
        }

        return result
    }

    return(
    <StyledFormResult>
        <main>
            <header>
                <div className="tabs">
                    <button 
                    className={classNames({active : activeHeaderTab === 'combine'})}
                    onClick={() => setActiveHeaderTab('combine')}>종합 결과</button>
                    <button 
                    className={classNames({active : activeHeaderTab === 'individual'})}
                    onClick={() => setActiveHeaderTab('individual')}>참여자별 결과</button>
                </div>
                <div className="btns">
                    <button>저장</button>
                    <button onClick={resultClose}>닫기</button>
                </div>
            </header>

            <div className="report-scroll-wrapper">

            

            <div className="report">
            {currentForm.length > 0 && currentForm.map((page, pi) => {
                const { title, id: pid, questions } = page
                return <div key={pid}>
                    <div>
                        <h1>{pi+1}페이지 - {title || '제목 없는 설문지'}</h1>
                    </div>
                    {questions.map((question, qi) => {
                        const { q, id: qid, type, options, hasExtraOption, scoreRanges } = question
                        
                        
                        // console.log(rangeObj, '1')
                        let list = options.reduce((acc, cur) => acc = {...acc, [cur.answer] : 0}, {})
                        if(hasExtraOption) list = {...list, '기타': 0}
                        let values = null
                        let extras = []
                        let count = 0
                        if(['객관식', '드롭다운'].includes(type)){
                            values = currentAnswers.reduce((acc, cur) => {
                                const { answer, useExtra, extra } = cur.answers[pid]?.[qid]
                                count++
                                if(useExtra){
                                    acc = {...acc, '기타' : acc['기타']+1}
                                    extras = [...extras, extra]
                                }else{
                                    acc = { ...acc, [answer] : acc[answer]+1 }
                                }
                                return acc
                            }, {...list})
                        }
                        if(type === '객관식(복수 선택)'){
                            values = currentAnswers.reduce((acc, cur) => {
                                const answers = cur.answers?.[pid]?.[qid].answer
                                answers.forEach(answer => {
                                    acc = {...acc, [answer] : acc[answer] + 1}
                                })
                                return acc
                            }, {...list})
                        }
                        if(type === '점수 선택형'){
                            const {min, max} = scoreRanges
                            const rangeObj = createRangeObj(min, max)
                            values = currentAnswers.reduce((acc, cur) => {
                                const answer = cur.answers?.[pid]?.[qid].answer
                                return acc = { ...acc, [answer] : acc[answer]+1}
                            }, {...rangeObj})
                        }

                        return (
                            <div key={qid} className="report-result">
                                <div>
                                    <h3>{qi+1}. {q || '제목없는 질문'} 
                                        {/* <span> | 응답 수: {currentAnswers.length}</span> */}
                                        <span>{type}</span>
                                    </h3>
                                    <div className="chart-btns">
                                    {['객관식', '객관식(복수 선택)', '드롭다운', '점수 선택형'].includes(type) 
                                    &&<>
                                    <button onClick={() => chartTypeSelector(qid, 'bar-vertical')}><BarIcon/></button>
                                    <button onClick={() => chartTypeSelector(qid, 'bar-horizontal')}><BarIconHorizontal/></button>
                                    <button onClick={() => chartTypeSelector(qid, 'pie')}><PieIcon/></button>
                                    <button onClick={() => chartTypeSelector(qid, 'doughnut')}><DoughnutIcon/></button>
                                    <button onClick={() => chartTypeSelector(qid, 'line')}><LineIcon/></button>
                                    </>}
                                    <p>응답 인원 {count}</p>
                                    </div>
                                </div>

                                {['객관식', '객관식(복수 선택)', '드롭다운', '점수 선택형'].includes(type) &&
                                <ChartBox chartType={chartTypes[qid]} values={values}/>}
                                
                                {/* {type === '점수 선택형' &&
                                <LineChart values={values}/>
                                } */}

                                {['서술형', '단답형'].includes(type) && 
                                <ListBox answers={currentAnswers} pid={pid} qid={qid}/>}

                                {['날짜', '시간', '날짜 + 시간'].includes(type) &&
                                <DateBox dateType={type} answers={currentAnswers} pid={pid} qid={qid}/>}

                                {extras.length > 0 && 
                                <ExtraBox extras={extras}/>}
                            </div>
                        )
                    })}
                </div>
            })}
            </div>

            </div>
        </main>

        <FormResultRightSidebar
            active={active}
            search={search}
            isResultOpen={isResultOpen} 
            searchedResults={searchedResults}
            resultOpen={resultOpen}
        />
        
        </StyledFormResult>
    )
}

export default FormResult