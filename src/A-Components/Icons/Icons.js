// import { IoIosClose } from "react-icons/io";
import styled, { css } from "styled-components";
import { IoArrowBack } from "react-icons/io5";
import { FiHome } from "react-icons/fi";

const strokeStyle = css`
  font-size: 20px;
  stroke-width: 2.3px;
`


// const closeIcon = styled(IoIosClose)`

// `
// 뒤로가기
const BackIcon = styled(IoArrowBack)`${strokeStyle}`
// 홈
const HomeIcon = styled(FiHome)`${strokeStyle}`


export { BackIcon, HomeIcon }