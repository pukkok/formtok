import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchForm from "../../Components/SearchForm";
import useAxios from "../../Hooks/useAxios";
import dayjs from "dayjs";

const StyledFormResult = styled.section`
    padding: var(--pk-viewer-padding);
    margin: 0px auto;

    header{

    }

    main{
        margin-top: 30px;
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

        .head{
            background-color: transparent;
            margin-bottom: 0;
            h4, p{
                font-size: 17px;
            }
        }
    }
`

function FormResult () {
    
    const token = localStorage.getItem('token')

    const [myForms, setMyForms] = useState([]) // 전체 데이터
    const [searchedForms, setSerachedForms] = useState([]) // 초기 데이터

    
    // custom hooks
    const { getMyFormList } = useAxios()

    useEffect(() => {
        const getForms = async () => {
            const forms = await getMyFormList(token)
            const openendForms = forms.filter(form => {
                return form.options.isOpen
            })
            setSerachedForms(openendForms)
            setMyForms(openendForms)
        }
        if(token && myForms.length === 0) getForms()
    }, [token, getMyFormList, myForms])

    return(
        <StyledFormResult>
            <header>
                <SearchForm/>
            </header>

            <main>
                <div className="head">
                    <h4>설문지</h4>
                    <p>응답 수</p>
                    <p>응답 제한</p>
                    <p>로그인 필요</p>
                    <p>시작일</p>
                    <p>종료일</p>
                    <p>전체 공개</p>
                    <p>상태</p>
                </div>
                {searchedForms.length > 0 && searchedForms.map(form => {
                    const {title, url, options, numberOfResponses} = form
                    const {isOpen, isEnd, isUseStartPeriod, isPublic, isNeedLogin, startDate, endDate, maximumCount} = options
                    
                    const start = startDate ? dayjs(startDate).format('YYYY-MM-DD') : null
                    const end = endDate ? dayjs(endDate).format('YYYY-MM-DD') : null

                    return <div key={url}>
                        <h4>{title}</h4>
                        <p>{numberOfResponses.length || 0}</p>
                        <p>{maximumCount ? maximumCount : '-' }</p>
                        <p>{isNeedLogin? '필요' : '-'}</p>
                        <p className="start-date">{start ? start : '무제한'}</p>                                 
                        <p className="end-date">{end ? end : '-'}</p>    
                        <p>{isPublic ? '공개' : '-'}</p>

                        {/* 나중에 수정할 부분 */}
                        <p>{isEnd ? '종료' : isOpen ? '진행 중' : '-'}</p>

                    </div>
                })}
            </main>
        </StyledFormResult>
    )
}

export default FormResult