import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useAxios from "../C-Hooks/useAxios";
import axios from "axios";
import ChartBox from "./ChartBox";
import { BarIcon, BarIconHorizontal, DoughnutIcon, LineIcon, PieIcon } from "../A-Components/Icons";
import FormResultRightSidebar from "./FormResultRightSidebar";
import ListBox from "./ListBox";

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
                border-radius: 12px;
                margin-bottom: 40px;
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
                        <h1>{title || '제목 없는 설문지'}</h1>
                    </div>
                    {questions.map((question, qi) => {
                        const { q, id: qid, type, options, hasExtraOption } = question
                        
                        let list = options.reduce((acc, cur) => acc = {...acc, [cur.answer] : 0}, {})
                        if(hasExtraOption) list = {...list, '기타': 0}
                        let values = null
                        let extras = []
                        if(['객관식', '드롭다운'].includes(type)){
                            values = currentAnswers.reduce((acc, cur) => {
                                const { answer, useExtra, extra } = cur.answers?.[pid]?.[qid]
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

                        return (
                            <div key={qid} className="report-result">
                                <div>
                                    <h3>{qi+1}. {q || '제목없는 질문'} 
                                        {/* <span> | 응답 수: {currentAnswers.length}</span> */}
                                        <span> | 타입 : {type}</span>
                                    </h3>
                                    {['객관식', '객관식(복수 선택)', '드롭다운'].includes(type) 
                                    &&<>
                                    <button onClick={() => chartTypeSelector(qid, 'bar-vertical')}><BarIcon/></button>
                                    <button onClick={() => chartTypeSelector(qid, 'bar-horizontal')}><BarIconHorizontal/></button>
                                    <button onClick={() => chartTypeSelector(qid, 'pie')}><PieIcon/></button>
                                    <button onClick={() => chartTypeSelector(qid, 'doughnut')}><DoughnutIcon/></button>
                                    <button onClick={() => chartTypeSelector(qid, 'line')}><LineIcon/></button>
                                    </>}
                                </div>
                                {['객관식', '객관식(복수 선택)', '드롭다운'].includes(type) &&
                                <ChartBox 
                                    chartType={chartTypes[qid]}
                                    values={values}
                                />
                                }

                                {['서술형', '단답형'].includes(type) && 
                                <ListBox 
                                    answers={currentAnswers}
                                    pid={pid}
                                    qid={qid}
                                />}
                                
                                <div>
                                    {extras.map((extra, idx) => {
                                        return <p key={idx}>{extra}</p>
                                    })}
                                </div>
                                        
                            </div>
                        )
                    })}
                </div>
            })}
            </div>
        </main>

        <FormResultRightSidebar
            search={search}
            isResultOpen={isResultOpen} 
            searchedResults={searchedResults}
            resultOpen={resultOpen}
        />
        
        </StyledFormResult>
    )
}

export default FormResult