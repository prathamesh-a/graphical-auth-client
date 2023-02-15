import axios from "axios";
import {api} from "../static/config";

async function checkUsername(username) {
    let flag
    await axios.post(`${api.url}/api/user/check/username`, {username: username})
        .then(r => {
            //console.log(username, r.data)
            flag =  r.data.exists
        })
        .catch(err => console.log(err))
    return flag
}

async function checkEmail(email) {
    let flag
    await axios.post(`${api.url}/api/user/check/email`, { email: email })
        .then(r => {
            //console.log(email, r.data)
            flag = r.data.exists
        })
        .catch(err => console.log(err))
    return flag
}

export { checkEmail, checkUsername }