import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledFormViewerHeader = styled.header`
    position: sticky;
    top: 0;
    height: 60px;
    margin-bottom: 30px;
    background-color: var(--pk-form-header-bg);
    z-index: 100;

    & > div{
        padding: 10px 20px;
        display: flex;
        align-items: center;
        p{
            font-weight: 700;
        }
        a{
            margin-left: auto;
            background-color: var(--pk-point);
            color: var(--pk-light-grey);
            border-radius: 12px;
            padding: 6px 12px;
            cursor: pointer;
        }
    }
    
    .line{
        width: 100%;
        position: relative;
        height: 2px;
        background-color: var(--pk-charcoal);
        span{
            content: '';
            display: block;
            left: 0;
            width: 100%;
            position: absolute;
            height: 2px;
            background-color: var(--pk-point);
            transition: all.3s;
        }
    }

`

function FormViewerHeader ({surveyId, current, max}) {

    return (
        <StyledFormViewerHeader>
            <div>
                <p>진행 상황</p>
                <Link to={`/my-form/edit/${surveyId}`}>돌아가기</Link>
            </div>
            <p className="line">
                <span style={{width : ((current / max) * 100) + '%'}}></span>
            </p>
        </StyledFormViewerHeader>
    )
}

export default FormViewerHeader