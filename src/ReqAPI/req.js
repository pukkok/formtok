import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_RESTAPI_URL

const login = async () => {
    const {data} = await axios.post('/user/login',
        {userId, password}
    )
    return data
}

export { login }