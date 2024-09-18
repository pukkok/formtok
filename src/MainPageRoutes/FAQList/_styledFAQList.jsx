import styled from "styled-components";

const FAQViewerWrapper = styled.section`
    margin: 0 20px;
    .card-box{
        width: 100%;
        display: flex;
        justify-content: flex-start;
        gap: 10px;
        flex-wrap: wrap;
        text-align: center;
        margin: 0 auto;
    }
    .card{
        background-color: var(--pk-dark);
        padding: 10px;
        width: 290px;
        height: 300px;
        border-radius: 8px;

        .type-text{
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
        
        .type-icon{
            span{
                color: var(--pk-point);
                font-size: 60px;
            }
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
            height: 100px;
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
            gap: 20px;
            button{
                padding: 4px 8px;
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