const sidebarNavs = [
    {text: '홈', code: 'home', path: '/'},
    {text: '내 설문지', code: 'lab_profile', 
        depth2: [
            {text:'제작하기', code: 'edit', path:'my-form'}, 
            {text:'결과확인', code: 'search_check'},
            {text:'문항관리', code: 'folder_managed', path: '/my-form/FAQ'}
        ]},
    {text:'참여하기', code: 'inventory'}, 
    {text: '대시보드', code: 'equalizer'},
    // {text: '공개 문항', code: 'folder_open'},
    {text: '설정', code: 'settings', path: 'setting'},
]

export default sidebarNavs