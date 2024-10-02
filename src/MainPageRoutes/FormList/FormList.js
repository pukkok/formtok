import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchForm from "../../Components/SearchForm";
import axios from "axios";

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

    const [searchedForms, setSerachedForms] = useState([])
    const [loadForms, setLoadForms] = useState([])

    useEffect(() => {
        const loadAllForms = async () => {
            const {data} = await axios.get('/form/all-forms')
            if(data.code === 200){
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

    const testlayouts = [
        {count: '응답 72', full: '응답제한 200', startDate: '2024.05.12', endDate: '2024.05.24', light: 'stop'},
        {count: '응답 10', full: '응답제한 없음', startDate: '2024.05.24', endDate: '2024.05.30', light: 'making'},
        {count: '응답 100', full: '응답제한 100', startDate: '2024.06.30', endDate: '2024.07.15', light: 'stop'},
        {count: '응답 25', full: '응답제한 50', startDate: '2024.07.11', endDate: null, light: 'ready' },
        {count: '응답 80', full: '응답제한 200', startDate: '2024.07.24', endDate: '2024.08.02', light: 'ready'},
        {count: '응답 120', full: '응답제한 없음', startDate: '2024.08.03', endDate: null, light: 'working'},
        {count: '응답 110', full: '응답제한 200', startDate: '2024.08.08', endDate: null, light: 'working'},
        {count: '응답 60', full: '응답제한 300', startDate: '2024.08.13', endDate: '2024.09.12', light: 'green'},
        {count: '응답 40', full: '응답제한 100', startDate: '2024.09.27', endDate: '2024.09.28', light: 'green'},
        {count: '응답 80', full: '응답제한 120', startDate: '2024.10.12', endDate: '2024.10.19', light: 'green'},
        {count: '응답 20', full: '응답제한 100', startDate: '2024.10.12', endDate: null},
    ]

    return (
        <StyledFormList>
            <SearchForm placeholder="제목으로 검색" handleClick={search}/>

            <div className="template-box">
                {searchedForms.length > 0 && searchedForms.map((form, idx) => {
                    const {title, url, pages, endingMent} = form
                    // console.log(pages, endingMent)
                    console.log(testlayouts[idx])
                    //임시
                    // const {count, full, startDate, endDate} = testlayouts[idx]
                    return <div key={url} className="card">
                        <div className="form-box" onClick={() => {}}>
                            <h4>{title}</h4>
                            <div className="info">
                                <p>준비중</p>
                                {/* <p>{count} | {full}</p>
                                <p>{startDate} ~ {endDate || ''}</p> */}
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </StyledFormList>
    )

}

export default FormList