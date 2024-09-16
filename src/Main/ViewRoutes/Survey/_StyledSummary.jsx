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
            background-color: var(--pk-charcoal);
            font-weight: 500;
            color: var(--pk-light-grey);
            padding: 5px 10px;

            &:hover{
                background-color: var(--pk-point);
            }
            &:disabled{
                color: var(--pk-silver);
            }
        }
    }
`

const StyledSummaryScrollBox = styled.div`
    height: calc(100% - 100px);
    overflow: scroll;
    cursor: pointer;
    user-select: none;
    border-top: 1px solid var(--pk-charcoal);
    border-bottom: 1px solid var(--pk-charcoal);
`

const StyledSurveySummaryWrapper = styled.div`
    min-height: 100%;
    border-radius: 12px;
    padding: 10px;
    margin: 0 16px;

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
                background-color: var(--pk-silver);
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
`

const StyledPageSummaryWrapper = styled.div`
    padding: 5px 8px;
    border: 2px solid transparent;
    border-top: 2px solid var(--pk-point);

    &.active, &:hover{
        border: solid 2px var(--pk-point);
        border-radius: 12px;
    }
    &.fold{
        border-top: 2px solid var(--pk-fold-point);

        h4{
            color: var(--pk-fold-point);
        }
    }

    &.active.fold, &.fold:hover{
        border: 2px solid var(--pk-fold-point);
        border-radius: 12px;
    }

    &.dragging{
        border: none;
    }

    &.ending-summary{
        margin-top: 20px;
        padding: 5px 10px;
        border: solid 2px var(--pk-silver);
        
        border-radius: 12px;

        h4{
            color: var(--pk-silver);
        }

        &.active, &:hover{
            border: 2px solid var(--pk-point);
            h4{
                color: var(--pk-point);
            }
        }
    }

    h4{
        font-size: 14px;
        text-align: center;
        position: relative;
        top: -15px;
        width: fit-content;
        left: 50%;
        transform: translateX(-50%);
        padding: 0 10px;
        background-color: var(--pk-dark);
        color: var(--pk-point);
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
        background-color: var(--pk-point);
        color: var(--pk-light-grey);
        border-radius: 8px;
    }
    &.fold .more-vert-wrapper > button > span:hover{
        background-color: var(--pk-fold-point);
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
    transition: background-color .3s;
    &:hover{
        background-color: var(--pk-charcoal);

        p{
            color: var(--pk-light-grey);
            font-weight: 700;
        }
    }
    
    &.active, &:active{
        background-color: var(--pk-point);
        
        p{
            color: var(--pk-light-grey);
            font-weight: 700;
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