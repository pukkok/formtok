import styled from "styled-components";

const StyledSurveyManagerWrapper = styled.section`
    max-width: fit-content;
    max-width: calc(260px * 5 + 20px * 4 + 20px * 2);
    padding: 0 20px;
    margin: 30px auto;

    .template-box{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        gap: 20px;
    }
    &.dark-mode{
        .card{
            background-color: var(--pk-dark);
            color: var(--pk-light-grey);

            .form-box:hover{
                background-color: var(--pk-charcoal);
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
        

        .modal{
            background-color: var(--pk-dark);
            color: var(--pk-light-grey);

            h4, .btns{
                border-top: 1px solid var(--pk-charcoal);
            }
        }
    }

    .white-mode{

    }
    .card{
        color: rgb(33, 33, 33);
        transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        overflow: hidden;
        width: 260px;
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

                .more-vert-wrapper{
                    margin-left: auto;
                    padding: 5px;
                    width: 30px;
                    height: 30px;

                }
            }

            h4{
                margin-bottom: 10px;
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
                fill: var(--purple-box);
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

    .modal{
        box-sizing: border-box;
        padding: 20px;
        border-radius: 12px;
        border: solid 2px var(--pk-point);
        & > div{
            min-width: 500px;
            min-height: 300px;
            display: flex;
            flex-direction: column;

            input{
                padding-bottom: 10px;
                font-weight: bold;
                font-size: 18px;
                width: 100%;
                border-bottom: none;
            }

            h4{
                border-top: solid 1px var(--pk-light-grey);
                padding-top: 10px;
                margin-bottom: 10px;
            }

            p{
                font-size: 14px;
                margin-bottom: 5px;
            }

            .btns{
                border-top: solid 1px var(--pk-light-grey);
                padding-top: 10px;
                margin-top: auto;
                display: flex;
                justify-content: flex-end;
                gap: 20px;

                button{
                    border-radius: 12px;
                    padding: 10px;
                    color: var(--pk-light-grey);
                    font-weight: bold;
                    background-color: var(--pk-point);

                    &:hover{
                        background-color: var(--pk-point-hover);
                    }
                }
            }

            
        }
    }
`

export { StyledSurveyManagerWrapper as SurveyManagerWrapper}