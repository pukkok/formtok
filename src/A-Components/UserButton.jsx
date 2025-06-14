import React, { useEffect } from "react";
import { Icon } from "./Icons";

function UserButton ({onClick}) {

    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const token = localStorage.getItem('token')
    useEffect(() => {

    },[token])
    // console.log(token)

    return <div className="user-button" onClick={onClick}>
        <Icon code={'account_circle'}/>
        <p>{userInfo? userInfo.userId : '비회원'}</p>
    </div>
}

export default UserButton

/* 유저버튼 UserButton */
// .user-button{
//     display: flex;
//     align-items: center;
//     gap: 5px;
//     height: 40px;
//     cursor: pointer;
// }
// .user-button p{
//     color: #777;
//     font-weight: 700;
// }
// .user-button span{
//     color: #777;
//     font-weight: 300;
//     margin-left: auto;
//     font-size: 32px;
// }