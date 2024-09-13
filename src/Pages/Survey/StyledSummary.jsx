import styled from "styled-components";

const StyledSurveySummaryTab = styled.section`
    height: 100%;

    .action-btns{
        margin: 10px 20px 0 20px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        user-select: none;

        button{
            border-radius: 8px;
            border: solid 1px var(--purple);
            padding: 5px 10px;

            &:hover{
                background-color: var(--purple);
                color: #fff;
            }
            &:disabled{
                color: var(--deep-grey);
            }
        }
    }
`

const StyledSummaryScrollBox = styled.div`
    height: calc(100% - 100px);
    overflow: scroll;
    cursor: pointer;
    user-select: none;
    border-top-right-radius: 12px;
`

const StyledSurveySummaryWrapper = styled.div`
    min-height: 100%;
    border-radius: 12px;
    padding: 10px;
    margin: 0 20px;
    border: solid 1px #f1f1f1;

    p.placeholder{
        color: #aaa;
    }

    .more-vert-wrapper{
        margin-left: auto;
        .options{
            width: 70px;

            button{
                width: 100%;
                text-align: center;
                font-weight: 700;
            }
        }   
        

        button{
            &:hover{
                background-color: #ddd;
                border-radius: 8px;
            }
            &:disabled{
                color: #aaa;
                &:hover{
                    background-color: #eee;
                }
            }
            &.remove{
                color: #e8291b;
                &:hover{
                    background-color: #ffb6b6;
                    border-radius: 8px;
                }

                &:disabled{
                    color: #ffb6b6;
                    &:hover{
                        background-color: #eee;
                    }
                }
            }
        }
    }
`

const StyledPageSummaryListWrapper = styled.div`
    margin-top: 10px;
    background-color: #fff;
`

const StyledPageSummaryWrapper = styled.div`
    padding: 5px 8px;
    border: 2px solid transparent;
    border-top: 2px solid var(--purple);
    
    &.active, &:hover{
        border: solid 2px var(--purple);
        border-radius: 12px;
    }
    &.fold{
        border-top: 2px solid var(--fold-red);

        h4{
            color: var(--fold-red);
        }
    }

    &.active.fold, &.fold:hover{
        border: 2px solid var(--fold-red);
        border-radius: 12px;
    }

    &.dragging{
        border: none;
    }

    &.ending-summary{
        margin-top: 20px;
        padding: 5px 10px;
        border: solid 2px var(--light-grey);
        border-radius: 12px;

        h4{
            color: var(--light-grey);
        }

        &.active, &:hover{
            border: 2px solid var(--purple);
            h4{
                color: var(--purple);
            }
        }
    }

    h4{
        font-size: 14px;
        color: var(--purple);
        text-align: center;
        position: relative;
        top: -15px;
        width: fit-content;
        left: 50%;
        transform: translateX(-50%);
        padding: 0 10px;
        background-color: #fff;
    }

    .title-box{
        display: flex;
    }

    p{
        font-weight: bold;
        margin-bottom: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .more-vert-wrapper > button > span:hover{
        background-color: var(--purple);
        color: #fff;
        border-radius: 8px;
    }
    &.fold .more-vert-wrapper > button > span:hover{
        background-color: var(--fold-red);
    }

    .more-vert-wrapper .options{
        
        &.on{
            height: 120px;
            padding: 5px;
        }

        
    }
`

const StyledQuestionSummaryListWrapper = styled.div`
    box-sizing: content-box;
    padding: 5px 0;
    display: block;
    &.fold{
        display: none;
    }

    .question-empty{
        height: 1px;
    }
`

const StyledQuestionSummaryWrapper = styled.div`
    padding-left: 10px;
    margin: 5px 0;
    height: 40px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    position: relative;

    &:hover, &.active, &:active{
        background-color: var(--purple);
        
        p{
            color: #fff;
            font-weight: bold;
        }
    }

    p{
        max-width: 80%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    

    .more-vert-wrapper{
        margin-right: 10px;
        span{
            color: #fff;
        }
        .options.on{
            height: 80px;
            padding: 5px;
        }
    }
`

export {
    StyledSurveySummaryTab as SurveySummaryTab, 
    StyledSummaryScrollBox as SummaryScrollBox,
    StyledSurveySummaryWrapper as SurveySummaryWrapper,
    StyledPageSummaryListWrapper as PageSummaryListWrapper,
    StyledPageSummaryWrapper as PageSummaryWrapper,
    StyledQuestionSummaryListWrapper as QuestionSummaryListWrapper,
    StyledQuestionSummaryWrapper as QuestionSummaryWrapper
}