import styled from "styled-components";

const MyQuestionsWrapper = styled.section`
    display: flex;
    flex-direction: column;
    padding: 20px 30px;
    max-width: 2100px;
    margin: 0 auto;

    header{
        display: flex;
        align-items: center;
        margin-bottom: 30px;

        form{
            width: 100%;
        }

        .btns{
            margin-left: auto;
            button{
                padding: 6px 12px;
                border-radius: 8px;
                background-color: var(--pk-point);
                color: var(--pk-light-grey);
                margin-left: 10px;
                font-weight: 800;
            }
        }
    }
    

    .card-box{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
        column-gap: 15px;
        row-gap: 25px;
        flex-wrap: wrap;
        text-align: center;
        width: 100%;
        
        user-select: none;
    }
    .card{
        background-color: var(--pk-myquestion-card);
        box-shadow: var(--pk-myquestion-card-shadow);
        padding: 20px 10px;
        max-width: 350px;
        border-radius: 12px;
        cursor: pointer;

        .check-box{
            float: left;
            width: 20px;
            height: 20px;
            border-radius: 4px;
            background-color: var(--pk-myquestion-checkbox);
            input[type=checkbox]{
                display: none;
            }
            input + span{
                display: flex;
                width: 0px;
                height: 20px;
                overflow: hidden;
                /* transition: .3s; */
            }
            input:checked + span{
                justify-content: center;
                align-items: center;
                width: 20px;
                border-radius: 4px;
                color: #EDEDED;
                background-color: var(--pk-fold-point);
                font-weight: 700;
            }
            
        }

        .type-text{ // 질문 타입
            text-align: right;
            
            & > span{
                border: solid 2px var(--pk-myquestion-typetext-border);
                padding: 4px 8px;
                border-radius: 2px;
                font-size: 14px;
                font-weight: 700;
                color: var(--pk-silver);
            }
        }
        
        .type-icon{ // 질문 타입 아이콘
            span{
                /* color: var(--pk-point); */
                font-size: 60px;
            }
            margin-bottom: 10px;
        }

        h4{//질문 타이틀
            font-size: 18px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .answer-box{
            margin: 10px 0;
            padding-left: 30px;
            text-align: left;
            height: 110px;
            overflow: scroll;
            border: solid 2px var(--pk-myquestion-answer-box);
            border-radius: 12px;
            p:not(:nth-last-child(1)){
                padding-bottom: 5px;
            }
        }

        .btns{
            display: flex;
            justify-content: center;
            margin-top: 20px;
            gap: 20px;
            button{
                padding: 8px 12px;
                border-radius: 8px;
                background-color: var(--pk-myquestion-detail-btn);
                transition: background-color .2s;
                &:hover{
                    background-color: var(--pk-point);
                    color: var(--pk-light-grey);
                }
            }
        }
    }
`
export default MyQuestionsWrapper