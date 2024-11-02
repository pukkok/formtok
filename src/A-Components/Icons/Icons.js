import { IoIosClose } from "react-icons/io";
import styled, { css } from "styled-components";
import { IoArrowBack } from "react-icons/io5";


const strokeStyle = css`
  font-size: 20px;
  stroke-width: 2.3px;
`


const closeIcon = styled(IoIosClose)`

`

const BackIcon = styled(IoArrowBack)`${strokeStyle}`



export { BackIcon }