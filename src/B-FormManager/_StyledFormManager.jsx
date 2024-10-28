import styled from "styled-components";

const SurveyManagerWrapper = styled.section`
    padding: var(--pk-viewer-padding);
    margin: 0px auto;

    header{
        div{
            display: flex;
            gap: 8px;
            margin-top: 16px;
            
            button {
                padding: 8px 16px;
                border-radius: 12px;
                background-color: var(--pk-survey-card);
                border: none;
                cursor: pointer;
                font-size: 14px;
                color: var(--pk-dark-grey);

                &:hover, &.active {
                    background-color: var(--pk-point);
                    color: #fff;
                    &.stop{
                        background-color: #ff6961;
                    }
                    &.ready{
                        background-color: #ffd700;
                    }
                    &.working{
                        background-color: #77dd77;
                    }
                    &.making{
                        background-color: #779ecb;
                    }
                }
            }
        }
    }

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

                    &.stop{
                        background-color: #ff6961;
                    }
                    &.ready{
                        background-color: #ffd700;
                    }
                    &.working{
                        background-color: #77dd77;
                    }
                    &.making{
                        background-color: #779ecb;
                    }
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
            .info{
                margin-top: auto;
                font-size: 14px;
                p:not(:nth-last-child(1)){
                    padding-bottom: 5px;
                }
            }

        }
    }

    .create-survey-button{ // 설문지 만들기 버튼(카드)
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--pk-create-survey-btn);
        width: 100%;
        height: 100%;
        padding: 24px;

        &:hover{
            background-color: var(--pk-create-survey-btn-hover);
            svg path{
                fill: var(--pk-point);
            }
        }
        svg{
            font-size: 60px;

            path{
                fill: #CDCDCD;
            }
        }
    }
`

export { SurveyManagerWrapper }