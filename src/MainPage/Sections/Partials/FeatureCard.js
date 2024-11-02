import React from "react";
import styled from "styled-components";
import surveyIcons from '../../../A-Imgs/coloful-business-icons.png'
function FeatureCard ({describe, headLine, content}) {
  
  return (
    <Feature>
      <div className={describe}></div>
      <h3>{headLine}</h3>
      <p>{content}</p>
    </Feature>
  )
}

export default FeatureCard

const Feature = styled.div`
  position: relative;
  top: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 360px;

  background-color: var(--pk-charcoal);
  background-image: linear-gradient(var(--pk-charcoal) 20%, var(--pk-dark));
  padding: 35px;
  border-radius: 12px;

  flex-basis: auto;
  flex: 1 1;

  transition: transform 0.3s;
  animation: moveToHigh 1s forwards;
  animation-delay: 1s;
  & > div{
    width: 110px;
    height: 110px;
    margin-bottom: 10px;
    background-image: url(${surveyIcons});
    background-size: 500px;
    background-repeat: no-repeat;
  }

  .write{background-position: left -252px top -252px;}
  .analysis{background-position: left -140px top -28px;}
  .my-dashboard{background-position: left -30px top -252px;}

  &:hover {
    transform: translateY(-10px);
  }

  img {
    width: 80px;
    height: 80px;
    margin-bottom: 20px;
  }

  h3 {
    font-size: 26px;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
  }
`