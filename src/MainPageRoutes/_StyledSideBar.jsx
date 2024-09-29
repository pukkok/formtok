import styled from "styled-components";

const SideBarWrapper = styled.aside`
  grid-area: side;
  color: var(--pk-light-grey);
  border-right: var(--pk-side-border-right);
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  transition: 2s;
  font-weight: 800;

  .tabs {
    
    width: 320px;  // 글자가 흔들리지 않도록 고정 크기
    background-color: var(--pk-first-background);  // 탭 배경색을 약간 더 밝게  // 탭 배경색을 약간 더 밝게
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    height: 100%;
    
    .logo-box {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
      margin-bottom: 20px;
      button {
        margin-top: 8px;
        float: right;
        font-weight: 800;
        width: 36px;
        height: 36px;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--pk-lighter-white);
        color: #333;
        transition: all.2s;
        overflow: hidden;

        &:hover {
          color: var(--pk-loginout);
          justify-content: flex-start;
          width: 50px;
        }
        span{
          font-size: 32px;
        }
      }
    }

    ul, li {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .depth1{
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .depth1 > li {
      cursor: pointer;
      & button{
        padding: 8px 16px;
        border-radius: 8px;
        width: 100%;
        display: flex;
        gap: 10px;
        align-items: center;

        transition: background-color 0.3s;  // 배경색 전환 애니메이션
        &:hover{
          background-color: var(--pk-side-button-hover);  // 호버시 어두운 색으로 변경
        }

        .arrow{ // 화살표 아이콘
          margin-left: auto;
          transition: all .2s;
          &.open{
            rotate: -180deg;
          }
        }

      }

      &.active > button {
        background-color: var(--pk-side-active);  // 액티브 포인트
      }
      &.active.toggle > button{ 
        background-color: var(--pk-side-active);
      }
      &.toggle {
        & > button{ // 뎁스2가 액티브일때 뎁스1
          background-color: var(--pk-depth2-opened-depth1);
        }
        .depth2{
          margin-top: 15px;
        }
      }
      
      .depth2{
        box-sizing: border-box;
        padding: 0 10px;
        overflow: hidden;
        transition: .4s;
        display: flex;
        gap: 5px;
        flex-direction: column;
        li{
          font-size: 15px;
        }

        li.active{
          button{
            background-color: var(--pk-side-active);
          }
          span{
            font-weight: 300;
          }
        }
        
      }
    }

    footer{
      margin-top: auto;
      width: 100%;
      & > .switch-box{
        display: flex;
        justify-content: center;
        /* border: solid 1px red; */
      }
    }
    .user-info-wrapper {
      border-top: solid 1px var(--pk-user-info-border-top);
      padding-top: 20px;
      display: flex;

      & > .user-info {
        display: flex;
        gap: 12px;
        align-items: center;
        span {
          font-size: 44px;
        }

        & > div {
          h4 {
            color: var(--pk-light-grey); // 유저이름
          }
          p {
            font-size: 14px;
            color: var(--pk-silver); // 이메일
          }
        }
      }

      button {
        margin-left: auto;
        display: flex;
        align-items: center;
        gap: 10px;
        &:hover {
          color: var(--pk-loginout);  //포인트 컬러
        }
      }
    }
  }

  .open-tab {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: changeBg 1.2s ease-in forwards;
    &::after {
      position: fixed;
      content: '';
      width: 5px;
      height: 20px;
      background-color: var(--pk-light-grey);
      padding: 5px 0;
      border-radius: 12px;
    }

    @keyframes changeBg {
      0%{
        background-color: var(--pk-first-background);
      }
      100%{
        background-color: var(--pk-point);
      }
    }
  }
`

export default SideBarWrapper