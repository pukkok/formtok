import React, { useState } from "react";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { VscAccount } from "react-icons/vsc";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledUserInfo = styled.div`
  border-top: solid 1px var(--pk-user-info-border-top);
  padding-top: 20px;
  display: flex;

  & > .user-info {
    display: flex;
    gap: 12px;
    align-items: center;

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
`

function UserInfo ({userInfo}) {

  const navigate = useNavigate()
  const location = useLocation()
  const logout = () => {
    alert('로그아웃 되었습니다.')
    localStorage.clear()
    navigate('/')
  }

  return (
  <StyledUserInfo>
    <div className="user-info">
      <VscAccount fontSize={'34px'}/>
      <div>
        <h4>{userInfo?.userId || '비회원'}</h4>
        <p>{userInfo?.email || '이메일 없음'}</p>
      </div>
    </div>

    {userInfo ? 
      <button onClick={logout}><LuLogOut /></button> :
      <button onClick={()=>navigate('/user/login', {state : { from: location.pathname }})}>
      <LuLogIn />
      </button>
    }
  </StyledUserInfo>
  )
}

export default UserInfo