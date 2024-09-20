import styled from "styled-components";

const FAQViewerWrapper = styled.section`
    display: flex;
    flex-direction: column;
    padding: 20px 30px;
    max-width: 2100px;
    margin: 0 auto;

    header{
        display: flex;
        .filter-btn{
            
        }
    }
    form{
        border-radius: 12px;
        margin-bottom: 30px;
        background-color: var(--pk-dark);
        min-width: 310px;
        max-width: 400px;
        height: 50px;
        padding: 6px;
        display: flex;
        & > * {
            height: 100%;
        }
        input{
            padding-left: 10px;
            flex: 1;
        }
        button.search-btn{
            margin-left: auto;
            display: flex;
            align-items: center;
            padding: 4px 12px;
            border-radius: 16px;
            background-color: var(--pk-point);
            span{
                font-size: 24px;
                font-weight: 700;
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
    }
    .card{
        background-color: var(--pk-dark);
        padding: 20px 10px;
        max-width: 350px;
        border-radius: 12px;

        .read-more{
            float: left;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 300;
        }

        .type-text{ // 질문 타입
            text-align: right;
            
            & > span{
                border: solid 2px var(--pk-charcoal);
                padding: 4px 8px;
                border-radius: 2px;
                font-size: 14px;
                font-weight: 700;
                color: var(--pk-silver);
            }
        }
        
        .type-icon{ // 질문 타입 아이콘
            span{
                color: var(--pk-point);
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
            border: solid 2px var(--pk-charcoal);
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
                background-color: var(--pk-charcoal);
                transition: background-color .2s;
                &:hover{
                    background-color: var(--pk-point);
                }
            }
        }
    }
`
export default FAQViewerWrapper