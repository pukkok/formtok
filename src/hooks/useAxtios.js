import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_RESTAPI_URL

const useAxios = () => {

    const login = async (e, form) => {
        e.preventDefault()
        const {userId, password} = form
        const {data} = await axios.post('/user/login',
            {userId, password}
        )
        if(data.code === 200){
            console.log('로그인 완료')
            console.log(data.data)
        }else{
            console.log(data.msg)
        }
        return data
    }
    
    return { login }
}
export { useAxios }