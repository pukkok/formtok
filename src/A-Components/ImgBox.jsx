import React from "react";
import styled from "styled-components";

function ImgBox ({className, boxStyle, src, alt="", draggable=false}) {

  return (
    <StyledImgBox className={className} style={boxStyle}>
      <img src={src} alt={alt} draggable={draggable}/>
    </StyledImgBox>
  )
}

export default ImgBox

const StyledImgBox = styled.div`
  overflow: hidden;
`