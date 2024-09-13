import React, { useRef, useState } from "react"
const {daum} = window
//https://postcode.map.daum.net/guide#usage

function FindAddress() {
    const detailRef = useRef(null)
    const [addrInfo, setAddrInfo] = useState({
        addr:'', postcode:'', detail: ''
    })

    var themeObj = {
        bgColor: "#9D6AEC", //바탕 배경색
        //searchBgColor: "", //검색창 배경색
        //contentBgColor: "", //본문 배경색(검색결과,결과없음,첫화면,검색서제스트)
        //pageBgColor: "", //페이지 배경색
        textColor: "#333333", //기본 글자색
        queryTextColor: "#222222", //검색창 글자색
        //postcodeTextColor: "", //우편번호 글자색
        emphTextColor: "#601DCD" //강조 글자색
        //outlineColor: "", //테두리
     };


    function sample3_execDaumPostcode() {
        let width = 550
        let height = 600
        // 현재 scroll 위치를 저장해놓는다.
        var currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop)
        new daum.Postcode({
            // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
            oncomplete: function(data) {
                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var addr = '' // 주소 변수
                // var extraAddr = '' // 참고항목 변수

                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    addr = data.roadAddress
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    addr = data.jibunAddress
                }

                // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                if(data.userSelectedType === 'R'){
                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    // if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    //     extraAddr += data.bname
                    // }
                    // // 건물명이 있고, 공동주택일 경우 추가한다.
                    // if(data.buildingName !== '' && data.apartment === 'Y'){
                    //     extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName)
                    // }
                
                } else {
                    // document.getElementById("sample3_extraAddress").value = ''
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                setAddrInfo({...addrInfo, postcode: data.zonecode, addr})

                // 커서를 상세주소 필드로 이동한다.
                detailRef.current.focus()

                // 우편번호 찾기 화면이 보이기 이전으로 scroll 위치를 되돌린다.
                document.body.scrollTop = currentScroll
            },
            theme: themeObj
        })
        .open({
            left: (window.screen.width / 2) - (width / 2),
            top: (window.screen.height / 2) - (height / 2)
        })
    }

    return <div className="post-box">
        <div>
            <input type="text" className="postcode" placeholder="우편번호" readOnly value={addrInfo.postcode}/>
            <button onClick={sample3_execDaumPostcode}>우편번호 찾기</button>
        </div>
        <input type="text" id="sample3_address" placeholder="주소" readOnly value={addrInfo.addr}/>
        <input type="text" 
        ref={detailRef}
        onChange={e => setAddrInfo({...addrInfo, detail: e.target.value})}
        disabled={!addrInfo.postcode}
        placeholder="상세주소" value={addrInfo.detail}/>
    </div>
    
}

export default FindAddress