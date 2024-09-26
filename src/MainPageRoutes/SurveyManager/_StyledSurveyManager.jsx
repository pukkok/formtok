import styled from "styled-components";

const SurveyManagerWrapper = styled.section`
    max-width: fit-content;
    max-width: 2100px;
    padding: 10px 30px;
    margin: 30px auto;

    .template-box{
        margin-top: 30px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 280px));
        flex-wrap: wrap;
        column-gap: 10px;
        row-gap: 20px;
    }

    .card{
        transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        overflow: hidden;
        height: 180px;
        border-radius: 12px;
        box-shadow: rgba(0, 0, 0, 0.1) 2px 4px 10px;
        padding: 0px;
        cursor: pointer;
    }
    .form-box{
        width: 100%;
        height: 100%;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        .form-status{
            display: flex;
            justify-content: flex-end;
            align-items: flex-start;
            margin-bottom: 10px;
            gap: 10px;

            .light{
                margin-right: auto;
                width: 10px;
                height: 10px;
                border-radius: 50%;

                background-color: #666a73;
                background-color: #d1180b;
                background-color: #599468;
                background-color: #ffd900;
                background-color: #0020c2;
            }

            button{
                &:hover span{
                    color: var(--pk-point);
                }
            }
        }
    }

    .white-mode{
        .form-box:hover{
            background-color: rgb(246, 246, 246);
        }
    }

    &.dark-mode{
        .card{
            background-color: var(--pk-dark);

            .form-box{
                width: 100%;
                height: 100%;
                padding: 20px;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;

                &:hover{
                    background-color: var(--pk-charcoal);
                }

                .form-status{
                    display: flex;
                    justify-content: flex-end;
                    align-items: flex-start;
                    margin-bottom: 10px;
                    gap: 10px;

                    .light{
                        margin-right: auto;
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;

                        background-color: #666a73;
                        background-color: #d1180b;
                        background-color: #599468;
                        background-color: #ffd900;
                        background-color: #0020c2;
                    }

                    button{
                        &:hover span{
                            color: var(--pk-point);
                        }
                    }
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

                p{
                    margin-top: auto;
                }
            }
        }

        .create-survey-button{
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: var(--pk-charcoal);
            width: 100%;
            height: 100%;
            padding: 24px;

            &:hover{
                background-color: var(--pk-charcoal);

                svg path{
                    fill: var(--pk-point);
                }
            }
            svg{
                width: 56px;
                height: 56px;

                path{
                    fill: var(--pk-light-grey);
                }
            }
        }
    }

    .create-survey-button{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(246, 246, 246);
        width: 100%;
        height: 100%;
        padding: 24px;

        &:hover{
            background-color: rgb(240, 242, 245);
            svg path{
                fill: var(--pk-point);
            }
        }
        svg{
            width: 56px;
            height: 56px;

            path{
                fill: #CDCDCD;
            }
        }
    }
`

const SurveyCard = styled.div`
    &.card{ // 화이트 모드일때 쓸것
        color: rgb(33, 33, 33);
        transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        overflow: hidden;
        max-width: 280px;
        height: 160px;
        border-radius: 12px;
        box-shadow: rgba(0, 0, 0, 0.1) 2px 4px 10px;
        padding: 0px;
        background-color: rgb(255, 255, 255);
        cursor: pointer;

        .form-box{
            width: 100%;
            height: 100%;
            padding: 20px;
            &:hover{
                background-color: rgb(246, 246, 246);
            }

            .form-status{
                display: flex;
                align-items: center;
                margin-bottom: 10px;

                .light{
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    
                    background-color: #666a73;
                    background-color: #d1180b;
                    background-color: #599468;
                    background-color: #ffd900;
                    background-color: #0020c2;
                }
            }

            h4{
                margin-bottom: 10px;
            }
        }
    }
`

export { SurveyManagerWrapper }