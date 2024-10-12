// import React from "react";
// import styled from "styled-components";

// const SettingWrapper = styled.section`
//     padding: var(--pk-viewer-padding);

// `

// function Setting () {

//     return (
//     <SettingWrapper>
//         <h1>설정</h1>
//         <p> 필요한 사항</p>
//         <div>
//             별명 설정
//             아이디
//             주소
//             연락처
//             이메일
//             비밀번호 변경
//             비밀번호    
//         </div>
//     </SettingWrapper>
//     )
// }

// export default Setting

import React, { useState } from 'react';
import styled from 'styled-components';

const SettingsWrapper = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
    background-color: #f4f7fa;
    height: 100vh;
`;

const SettingsContent = styled.div`
    width: 100%;
    max-width: 600px;
    padding: 20px;
`;

const SettingsCard = styled.div`
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

    h3 {
        font-size: 18px;
        margin-bottom: 15px;
    }

    label {
        display: block;
        margin-bottom: 10px;
        font-size: 14px;
    }

    input {
        width: 100%;
        padding: 8px;
        margin-bottom: 15px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 14px;
    }

    button {
        background-color: #007bff;
        color: white;
        padding: 8px 12px;
        border: none;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
            background-color: #0056b3;
        }
    }
`;

const DangerZone = styled(SettingsCard)`
    border: 1px solid #ff6961;
    h3 {
        color: #ff6961;
    }

    button {
        background-color: #ff6961;

        &:hover {
            background-color: #e63946;
        }
    }
`;

function Settings() {
    // 상태 관리를 위한 useState 추가
    const [profileName, setProfileName] = useState("사용자 이름");
    const [email, setEmail] = useState("user@example.com");
    const [address, setAddress] = useState("서울특별시");
    const [phoneNumber, setPhoneNumber] = useState("010-1234-5678");
    const [password, setPassword] = useState("");

    // 저장 버튼 핸들러
    const handleSave = () => {
        // 저장 로직 추가
        alert("변경 사항이 저장되었습니다.");
    };

    return (
        <SettingsWrapper>
            <SettingsContent>
                {/* 프로필 사진 및 이름 변경 */}
                <SettingsCard>
                    <h3>프로필 사진 및 이름</h3>
                    <label>이름:</label>
                    <input 
                        type="text" 
                        value={profileName} 
                        onChange={(e) => setProfileName(e.target.value)} 
                    />
                    <button onClick={handleSave}>저장</button>
                </SettingsCard>

                {/* 이메일 변경 */}
                <SettingsCard>
                    <h3>이메일 주소</h3>
                    <label>이메일:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <button onClick={handleSave}>이메일 변경</button>
                </SettingsCard>

                {/* 주소 변경 */}
                <SettingsCard>
                    <h3>주소</h3>
                    <label>주소:</label>
                    <input 
                        type="text" 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)} 
                    />
                    <button onClick={handleSave}>주소 저장</button>
                </SettingsCard>

                {/* 연락처 변경 */}
                <SettingsCard>
                    <h3>연락처</h3>
                    <label>연락처:</label>
                    <input 
                        type="text" 
                        value={phoneNumber} 
                        onChange={(e) => setPhoneNumber(e.target.value)} 
                    />
                    <button onClick={handleSave}>연락처 저장</button>
                </SettingsCard>

                {/* 비밀번호 변경 */}
                <SettingsCard>
                    <h3>비밀번호 변경</h3>
                    <label>새 비밀번호:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <button onClick={handleSave}>비밀번호 변경</button>
                </SettingsCard>

                {/* 위험 구역 (계정 삭제) */}
                <DangerZone>
                    <h3>계정 삭제</h3>
                    <p>계정을 삭제하면 복구할 수 없습니다.</p>
                    <button>계정 삭제</button>
                </DangerZone>
            </SettingsContent>
        </SettingsWrapper>
    );
}

export default Settings;




