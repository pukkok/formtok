import styled from "styled-components";

const StyledMainPage = styled.section`
    display: grid;
    grid-template-areas: 
    's h'
    's v';
    grid-template-rows: 50px 1fr;
    height: 100vh;
    transition: .5s;
`

const StyledSideBar = styled.div`
  grid-area: s;
  color: var(--pk-light-grey);  // 글자색을 밝은 회색으로
  /* background-color: #1E1E2E;  // 다크 모드 배경색 */
  position: relative;
  overflow: hidden;
  font-weight: 800;

  .tabs {
    width: 320px;  // 글자가 흔들리지 않도록 고정 크기
    background-color: var(--pk-dark);  // 탭 배경색을 약간 더 밝게
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    height: 100%;

    .logo-box {
      padding-bottom: 20px;
      button {
        margin-top: 8px;
        float: right;
        font-weight: 800;
        &:hover {
          color: var(--pk-point);
        }
      }
    }

    ul, li {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    li {
      padding: 10px 20px;
      border-radius: 8px;
      margin-bottom: 5px;
      cursor: pointer;
      transition: background-color 0.3s;  // 배경색 전환 애니메이션
      &:hover {
        background-color: var(--pk-charcoal);  // 호버시 어두운 색으로 변경
      }
      &.active {
        background-color: var(--pk-point);  // 액티브 포인트
      }
    }

    .user-info-wrapper {
      border-top: solid 1px var(--pk-charcoal);
      padding-top: 20px;
      margin-top: auto;
      display: inline-flex;

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
          color: var(--pk-point);  //포인트 컬러
        }
      }
    }
  }

  .open-tab {
    background-color: var(--pk-dark);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    &::after {
      position: fixed;
      content: '';
      width: 5px;
      height: 20px;
      background-color: var(--pk-light-grey);
      padding: 5px 0;
      border-radius: 12px;
    }
  }
`;

const StyledHeader = styled.header`
    grid-area: h;
    display: flex;
    background-color: var(--pk-deep-dark);  // 다크 모드 배경색
    border-bottom: 1px solid var(--pk-charcoal);
    align-items: center;
    padding: 30px 20px;
    position: relative;
    z-index: 100;

    &.create{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        button{
            background-color: var(--pk-point);
            color: #fff;
        }
    }

    button{
        margin-left: 10px;
        padding: 6px 12px;
        border-radius: 8px;
        font-weight: bold;
    }
    
`

const StyledViewer = styled.div`
    grid-area: v;
    background-color: #1E1E2E;  // 다크 모드 배경색
    overflow: scroll;
    
`

export {StyledMainPage as MainPageWrapper, 
    StyledSideBar as SideBarWrapper,
    StyledHeader as HeaderWrapper, 
    StyledViewer as ViewerWrapper,
}