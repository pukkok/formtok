import React from "react";
import { Icon } from "./Icons";

function UserButton ({onClick}) {

    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    console.log(userInfo)
    return <div className="user-button" onClick={onClick}>
        <p>{userInfo? userInfo.userId : '비회원'}</p>
        <Icon code={'account_circle'}/>
    </div>
}
export default UserButton