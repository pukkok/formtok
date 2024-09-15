const LoginForms = [
    {name : 'userId', placeholder: '아이디', type: 'text'},
    {name : 'password', placeholder: '패스워드', type: 'password'}
]

const JoinForms = [
    {name : 'name', placeholder: '이름', type: 'text', essentail : true},
    {name : 'userId', placeholder: '아이디', type: 'text', essentail : true},
    {name : 'email', placeholder: '이메일', type: 'email', essentail : false},
    {name : 'phone', placeholder: '연락처', type: 'text', essentail : false},
    {name : 'password', placeholder: '패스워드', type: 'password', essentail : true},
    {name : 'confirmPassword', placeholder: '패스워드 확인', type: 'password', essentail : true}
]

export { LoginForms, JoinForms }