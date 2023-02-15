import axios from "axios";
import {api} from "../static/config";

async function checkUsername(username, setLoading) {
    let flag
    setLoading(true)
    await axios.post(`${api.url}/api/user/check/username`, {username: username})
        .then(r => {
            //console.log(username, r.data)
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
    await axios.post(`${api.url}/api/user/check/email`, { email: email })
        .then(r => {
            //console.log(email, r.data)
            flag = r.data.exists
            setLoading(false)
        })
        .catch(err => console.log(err))
    setLoading(false)
    return flag
}

export { checkEmail, checkUsername }