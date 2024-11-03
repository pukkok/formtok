import styled from "styled-components";

const LoginForm = styled.form`
    color: var(--pk-light-grey);
    
    p{
        background-color: var(--pk-charcoal);
        padding: 10px 10px;
        margin-bottom: 8px;
        border-bottom: 1px solid #cecece;
        display: flex;
        align-items: center;

        &.hide{
            display: none;
        }
    }

    // 추가 옵션이 생기면 그 크기만큼 줄어들게 함
    input{
        display: block;
        box-sizing: border-box;
        flex: 1;
        font-weight: bold;
    }
`

export default LoginForm