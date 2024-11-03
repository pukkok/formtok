const initialLoginInput = {userId: '', password: ''}
const initialJoinInput = {name: '', userId: '', email: '', otp:'', phone: '', password: '', confirmPassword : ''}

const LoginForms = [
	{name : 'userId', placeholder: '아이디', type: 'text'},
	{name : 'password', placeholder: '패스워드', type: 'password'}
]

const JoinForms = [
	{name : 'userId', placeholder: '아이디', type: 'text', optionText: '중복확인', essentail : true},
	{name : 'name', placeholder: '이름', type: 'text', essentail : true},
	{name : 'phone', placeholder: '연락처', type: 'text', essentail : false},
	{name : 'email', placeholder: '이메일', type: 'email', optionText: '인증메일 발송', essentail : true},
	{name : 'otp', placeholder: '인증코드', type: 'text', optionText: '확인', essentail : true},
	{name : 'password', placeholder: '패스워드', type: 'password', essentail : true},
	{name : 'confirmPassword', placeholder: '패스워드 확인', type: 'password', essentail : true}
]

/** [0] : 로그인 [1] : 회원가입 */
const smallLoginInfos = [
	{
		formType: 'login',
		pText : '이미 회원이신가요?',
		buttonText : '로그인',
	},
	{
		formType: 'join',
		pText : '아직 회원이 아니신가요?',
		buttonText : '회원가입'
	}
]

export { 
	initialLoginInput,
	initialJoinInput,
	LoginForms, JoinForms, 
	smallLoginInfos }