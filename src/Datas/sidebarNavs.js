const sidebarNavs = [
    {text: '홈', code: 'home', path: '/'},
    {text: '내 설문지', code: 'lab_profile', 
        depth2: [
            {text:'제작하기', code: 'edit', path:'/my-form/manager'}, 
            {text:'결과확인', code: 'search_check'},
            {text:'문항관리', code: 'folder_managed', path: '/my-form/questions'}
        ]},
    {text:'참여하기', code: 'inventory', path: '/form-list'}, 
    {text: '대시보드', code: 'equalizer', path: '/dash-board'},
    {text: '설정', code: 'settings', path: 'setting'},
]

export default sidebarNavs