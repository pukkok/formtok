import React, { useEffect } from "react";
import { Icon } from "./Icons";

function UserButton ({onClick}) {

    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const token = localStorage.getItem('token')
    useEffect(() => {

    },[token])
    console.log(token)

    return <div className="user-button" onClick={onClick}>
        <p>{userInfo? userInfo.userId : '비회원'}</p>
        <Icon code={'account_circle'}/>
    </div>
}

export default UserButton