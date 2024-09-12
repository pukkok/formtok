import styled from "styled-components";

const StyledCard = styled.div`
    .card{
        box-sizing: border-box;
        border: solid 2px #d7d7d7;
        background-color: #fff;
        border-radius: 12px;
        min-height: 180px;
        margin-bottom: 10px;

        .pd{
            border-radius: 8px 8px 0 0;
            padding: 10px 20px;
        }

        h4{ // 페이지네이션
            background-color: var(--light-grey);
            background-color: var(--purple);
            color: #fff;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .title-A, .title-B{
            border-bottom: 1px solid transparent;
            width: 100%;
            padding-bottom: 3px;

            &:hover{
                border-bottom: 1px solid #cecece;
            }
        }

        .title-A{
            font-size: 22px;
        }
        .title-B{
            padding-top: 5px;
            font-size: 18px;
        }

        .essential{
            position: relative;
        }
        .essential::before{
            content: '*';
            color: red;
            position: absolute;
            left: -10px;
            top: 50%;
            transform: translateY(-50%);
        }

    }

    .active{
        border: solid 2px var(--purple);
    }

    .ending-field{
        min-height: 120px;
    }
    
    

`

export default StyledCard