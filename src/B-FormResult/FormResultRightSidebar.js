import React from "react";
import classNames from "classnames";
import styled from "styled-components";
import dayjs from "dayjs";
import SearchForm from "../A-Components/SearchForm";

const StyledRightSidebar = styled.aside`
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
`

function FormResultRightSidebar ( { isResultOpen, searchedResults, resultOpen, search } ) {
    
    return (
    <StyledRightSidebar className={classNames({'side-bar-mode' : isResultOpen})}>
        <div className="action-box">
            <header>
                <SearchForm placeholder="제목으로 검색" handleClick={search}/>
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

    </StyledRightSidebar>
    )
}

export default FormResultRightSidebar