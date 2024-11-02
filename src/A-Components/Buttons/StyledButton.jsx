import styled, { css } from "styled-components";

// 로그인 페이지 상단 아이콘 버튼
const StyledButton = styled.button`
  &:hover{
    transition: all.2s;
    scale: 1.1;
  }
`
// 로그인 아이콘 스타일
const StyledButtonIcon = css`
  font-size: 20px;
  stroke-width: 2.3px;
  color: var(--pk-purple-font);
`



export { 
  StyledButton,
  StyledButtonIcon 
}