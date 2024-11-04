import React from "react";
import dayjs from "dayjs";
import styled from "styled-components";

function FormCardInfo ({title, createdAt, lastModifiedAt}) {

  return (<>
    <StyledTitle>{title}</StyledTitle>
    <StyledFormCardInfo>
      <p>생성일 | {dayjs(createdAt).format('YYYY-MM-DD')}</p>
      <p>마지막 수정일 | {dayjs(lastModifiedAt).format('YYYY-MM-DD')}</p>
    </StyledFormCardInfo>
  </>)
}

export default FormCardInfo

const StyledTitle = styled.h5`
  /* font-size: 18px; */
  margin-bottom: 10px;
  
  display: -webkit-box;         /* Flexbox를 사용하여 컨테이너를 만든다 */
  -webkit-box-orient: vertical; /* 텍스트가 세로 방향으로 배치되도록 설정 */
  -webkit-line-clamp: 2;     /* 최대 줄 수를 2줄로 제한 */
  overflow: hidden;             /* 넘치는 텍스트를 숨긴다 */
  text-overflow: ellipsis;      /* 넘치는 부분을 ...으로 표시 */
  white-space: normal;          /* 텍스트를 줄바꿈 */
`

const StyledFormCardInfo = styled.div`
  margin-top: auto;
  font-size: 14px;
  p:not(:nth-last-child(1)){
      padding-bottom: 5px;
  }
`