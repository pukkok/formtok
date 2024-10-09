import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { surveyTitleAtom } from "../../Recoils/surveyAtoms";

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

    const title = useRecoilValue(surveyTitleAtom)

    return (
        <StyledFormViewerHeader>
            <div>
                <p>{title || '제목없는 설문지'}</p>
                <Link to={-1}>돌아가기</Link>
            </div>
            <p className="line">
                <span style={{width : ((current / max) * 100) + '%'}}></span>
            </p>
        </StyledFormViewerHeader>
    )
}

export default FormViewerHeader