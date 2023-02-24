import axios from "axios";
import {api} from "../static/config";

async function checkUsername(username, setLoading) {
    let flag
    setLoading(true)
    await axios.get(`${api.url}/api/user/check?username=${username}`)
        .then(r => {
            flag =  r.data.exists
            setLoading(false)
        })
        .catch(err => console.log(err))
    setLoading(false)
    return flag
}

async function checkEmail(email, setLoading) {
    let flag
    setLoading(true)
    await axios.get(`${api.url}/api/user/check?email=${email}`)
        .then(r => {
            flag = r.data.exists
            setLoading(false)
        })
        .catch(err => console.log(err))
    setLoading(false)
    return flag
}

export { checkEmail, checkUsername }