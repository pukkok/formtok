import React, { useRef } from "react";
import './FindAddress.css'
const {daum} = window

function FindAddress() {

    const wrapRef = useRef(null)

    let themeObj = {
        bgColor: "#7E37ED", //바탕 배경색
        // searchBgColor: "#0B65C8", //검색창 배경색
        // contentBgColor: "#ffc0cb", //본문 배경색(검색결과,결과없음,첫화면,검색서제스트)
        // pageBgColor: "#ffc0cb", //페이지 배경색
        // textColor: "#ffc0cb", //기본 글자색
        // queryTextColor: "#ffc0cb" //검색창 글자색
        // postcodeTextColor: "", //우편번호 글자색
        // emphTextColor: "#7E37ED", //강조 글자색
        outlineColor: "#7E37ED", //테두리
     };

    function foldDaumPostcode() {
        // iframe을 넣은 element를 안보이게 한다.
        wrapRef.current.style.display = 'none'
    }

    function sample3_execDaumPostcode() {
        // 현재 scroll 위치를 저장해놓는다.
        var currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop)
        new daum.Postcode({
            // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
            oncomplete: function(data) {
                
                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var addr = ''; // 주소 변수
                var extraAddr = ''; // 참고항목 변수

                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    addr = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    addr = data.jibunAddress;
                }

                // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                if(data.userSelectedType === 'R'){
                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if(extraAddr !== ''){
                        extraAddr = ' (' + extraAddr + ')';
                    }
                    // 조합된 참고항목을 해당 필드에 넣는다.
                    document.getElementById("sample3_extraAddress").value = extraAddr;
                
                } else {
                    document.getElementById("sample3_extraAddress").value = '';
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById('sample3_postcode').value = data.zonecode;
                document.getElementById("sample3_address").value = addr;
                // 커서를 상세주소 필드로 이동한다.
                document.getElementById("sample3_detailAddress").focus();

                // iframe을 넣은 element를 안보이게 한다.
                // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
                wrapRef.current.style.display = 'none';

                // 우편번호 찾기 화면이 보이기 이전으로 scroll 위치를 되돌린다.
                document.body.scrollTop = currentScroll;
            },
            theme : themeObj,
            // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분. iframe을 넣은 element의 높이값을 조정한다.
            onresize : function(size) {
                wrapRef.current.style.height = size.height+ 10+'px';
            },
            width : '100%',
            height : '100%'
        }).embed(wrapRef.current)

        // iframe을 넣은 element를 보이게 한다.
        wrapRef.current.style.display = 'flex'
    }

    return <div className="test-box">
            <input type="text" id="sample3_postcode" placeholder="우편번호"/>
        <input type="button" onClick={sample3_execDaumPostcode} value="우편번호 찾기"/><br/>
        <input type="text" id="sample3_address" placeholder="주소"/><br/>
        <input type="text" id="sample3_detailAddress" placeholder="상세주소"/>
        <input type="text" id="sample3_extraAddress" placeholder="참고항목"/>

        <div ref={wrapRef} className="wrapper">
            {/* <button onClick={foldDaumPostcode}>닫기</button> */}
        </div>

    </div>
    
}

export default FindAddress