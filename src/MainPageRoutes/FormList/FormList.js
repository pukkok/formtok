import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchForm from "../../Components/SearchForm";
import axios from "axios";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { endingMentAtom, pagesAtom, surveyListStyleAtom, surveyOptionsAtom, surveyTitleAtom } from "../../Recoils/surveyAtoms";

const StyledFormList = styled.section`
    padding: var(--pk-viewer-padding);
    margin: 0 auto;
    max-width: var(--pk-board-container);

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

            &:hover{
                background-color: var(--pk-survey-card-hover);
            }

            h4 {
                font-size: 18px;
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

        }
    }
`

function FormList () {
    const setTitle = useSetRecoilState(surveyTitleAtom)
    const setPages = useSetRecoilState(pagesAtom)
    const setEndingMent = useSetRecoilState(endingMentAtom)
    const setSurveyListStyle = useSetRecoilState(surveyListStyleAtom)
    const setSurveyOptions = useSetRecoilState(surveyOptionsAtom)

    const [searchedForms, setSerachedForms] = useState([])
    const [loadForms, setLoadForms] = useState([])

    const token = localStorage.getItem('token')

    useEffect(() => {
        const loadAllForms = async () => {
            const {data} = await axios.get('/form/all-forms')
            if(data.code === 200){
                console.log(data.forms)
                setLoadForms(data.forms)
                setSerachedForms(data.forms)
            }
        }
        loadAllForms()
    }, [])

    const search = (word) =>{
        const filteredForms = loadForms.filter(form => form.title.includes(word))
        setSerachedForms(filteredForms)
    }

    // const testlayouts = [
    //     {count: '응답 72', full: '응답제한 200', startDate: '2024.05.12', endDate: '2024.05.24', light: 'stop'},
    //     {count: '응답 10', full: '응답제한 없음', startDate: '2024.05.24', endDate: '2024.05.30', light: 'making'},
    //     {count: '응답 100', full: '응답제한 100', startDate: '2024.06.30', endDate: '2024.07.15', light: 'stop'},
    //     {count: '응답 25', full: '응답제한 50', startDate: '2024.07.11', endDate: null, light: 'ready' },
    //     {count: '응답 80', full: '응답제한 200', startDate: '2024.07.24', endDate: '2024.08.02', light: 'ready'},
    //     {count: '응답 120', full: '응답제한 없음', startDate: '2024.08.03', endDate: null, light: 'working'},
    //     {count: '응답 110', full: '응답제한 200', startDate: '2024.08.08', endDate: null, light: 'working'},
    //     {count: '응답 60', full: '응답제한 300', startDate: '2024.08.13', endDate: '2024.09.12', light: 'green'},
    //     {count: '응답 40', full: '응답제한 100', startDate: '2024.09.27', endDate: '2024.09.28', light: 'green'},
    //     {count: '응답 80', full: '응답제한 120', startDate: '2024.10.12', endDate: '2024.10.19', light: 'green'},
    //     {count: '응답 20', full: '응답제한 100', startDate: '2024.10.12', endDate: null},
    // ]
    const naviate = useNavigate()

    const goToView = (url, title, pages, endingMent, listStyle, options) => {
        const {isNeedLogin, startDate, endDate} = options
        if(isNeedLogin){
            if(!token) return alert('로그인이 필요한 설문지 입니다.')
        }
        if(dayjs(startDate) >= dayjs()){
            return alert('참여할 수 있는 기간이 아닙니다.')
        }
        if(dayjs(endDate) <= dayjs()){
            return alert('종료된 설문지입니다.')
        }
        setTitle(title)
        setPages(pages)
        setEndingMent(endingMent)
        setSurveyListStyle(listStyle)
        setSurveyOptions(options)
        naviate(`/view/${url}`)
    }

    return (
        <StyledFormList>
            <SearchForm placeholder="제목으로 검색" handleClick={search}/>

            <div className="template-box">
                {searchedForms.length > 0 && searchedForms.map((form, idx) => {
                    const {title, url, pages, endingMent, listStyle, options} = form
                    const allQuetinoCount = pages.reduce((acc, currentPage) => acc += currentPage.questions.length, 0)
                    const {startDate, endDate, maximumCount, isNeedLogin} = options

                    return <div key={url} className="card">
                        <div className="form-box" onClick={() => goToView(url, title, pages, endingMent, listStyle, options)}>
                            <h4>{title}</h4>
                            <div className="info">
                                <p>로그인 : {isNeedLogin ? '필요' : '필요 없음'}</p>
                                <p>총 문항 수 : {allQuetinoCount}</p>
                                <p>인원 : {0} | {maximumCount ? `최대 ${maximumCount}`: '제한 없음' }</p>
                                <p>기간 : {startDate ? <> 
                                    {startDate ? dayjs(startDate).format('YYYY-MM-DD') : '기간 제한 없음'}
                                    <span> ~ </span>  
                                    {endDate && dayjs(endDate).format('YYYY-MM-DD') || '제한 없음'}
                                    </> :
                                    '기간 제한 없음'
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </StyledFormList>
    )

}

export default FormList