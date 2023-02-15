import {useEffect, useState} from "react";
import {icons} from "../static/icons_data";
import PasswordIcon from "./Items/PasswordIcon";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import validator from "validator/es";
import axios from "axios";
import {Toast} from "../util/toast";
import {checkEmail, checkUsername} from "../util/validation";
import {Page} from "../util/config";
import {api} from "../static/config";

export default function Signup(props) {

    const [next, setNext] = useState(false)
    const [iconsData, setIconsData] = useState(icons)
    const [signupInfo, setSignupInfo] = useState({
        username: "",
        email: "",
        password: "",
        pattern: []
    })

    function handleChange(event) {
        setSignupInfo(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    useEffect(function() {
        const newPattern = [];
        for(let i=0; i<iconsData.length; i++) {
            if (iconsData[i].selected) {
                newPattern.push(iconsData[i].id)
            }
        }
        setSignupInfo(prev => {
            return {
                ...prev,
                "pattern": newPattern
            }
        })
    }, [iconsData])

    function handleStateChange(nanoId) {

        let currentIndex = iconsData.length,  randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [iconsData[currentIndex], iconsData[randomIndex]] = [iconsData[randomIndex], iconsData[currentIndex]];
        }

        setIconsData(iconsData.map(prevData => {
            return prevData.id === nanoId ? {
                ...prevData,
                "selected": !prevData.selected
            } : prevData
        }))
    }

    function getIcons() {
        return iconsData.map(prev => <PasswordIcon key={prev.id} src={prev.url} selected={prev.selected} stateChange={() => handleStateChange(prev.id)}/>)
    }

    function createAccount() {
        if (signupInfo.pattern.length < 4) {
            Toast("Chose minimum 4 images!")
            return
        }
        props.setLoading(true)
        axios.post(`${api.url}/api/user/signup`, signupInfo)
            .then(res => {
                    props.setLoading(false)
                    console.log(res.data)
                    props.setUserInfo({email: res.data.email, username: res.data.username})
                    props.setLoggedIn(true)
                    props.setPage(Page.HOME_PAGE)
                }
            )
            .catch(err => {
                console.log(err)
                props.setLoading(false)
                Toast(err.response.data.message)
            })
    }

    function validateData() {
        if (signupInfo.username.length < 1) {
            Toast("Invalid username!")
            return false
        }
        else if (!validator.isEmail(signupInfo.email)) {
            Toast("Invalid email address!")
            return false
        }
        else if (signupInfo.password.length < 8) {
            Toast("Password length should be more than 8")
            return false
        }
        return true
    }

    async function validateUsernameAndEmail() {
        const isEmailExist = await checkEmail(signupInfo.email, props.setLoading)
        const isUsernameExists = await checkUsername(signupInfo.username, props.setLoading)

        if (isUsernameExists) Toast("Username already exists!")
        else if (isEmailExist) Toast("Email already exists!")

        return !isEmailExist && !isUsernameExists
    }

    async function handleNextClick(event) {
        if (validateData() && await validateUsernameAndEmail()) {setNext(true)}
    }

    return (
        <div className=" h-[32rem] mt-12">
            {!next && <div className="flex justify-center h-full">
                {/*IMAGE*/}
                <div className="">
                    <img className="transition duration-500 ease-in-out hover:scale-95 h-full" alt="" src="../static/img/signup.png"/>
                </div>
                {/*SIGNUP FORM*/}
                <div className="font-['Work_Sans'] mt-4">
                    <p className="text-white text-5xl  font-bold">Create Account</p><br/>
                    <p className="text-white text-2xl">Welcome! Enter Your Details And Experience</p>
                    <p className="text-white text-2xl">Graphical Password System.</p><br/>
                    <div className="flex flex-col w-2/3">
                        <input value={signupInfo.username} onChange={handleChange} name="username" className="rounded-full h-12 px-6 font-3xl" type="text" placeholder="Username"/>
                        <input value={signupInfo.email} onChange={handleChange} name="email" className="rounded-full h-12 px-6 font-3xl mt-4" type="email" placeholder="Email"/>
                        <input value={signupInfo.password} onChange={handleChange} name="password" className="rounded-full h-12 px-6 font-3xl mt-4" type="password" placeholder="Password"/>
                    </div>
                    <button onClick={handleNextClick} className="transition duration-500 ease-in-out h-12 bg-[#A259FF] rounded-full px-6 w-2/3 mt-6 text-white border-2 hover:bg-transparent border-[#A259FF] font-bold">Next</button>
                </div>
            </div>}

            {next && <div className="flex justify-center h-full">
                <div className="grid grid-cols-3 bg-white h-full rounded-lg w-1/3 justify-items-center pt-8">
                    {getIcons()}
                </div>

                <div className="font-['Work_Sans'] mt-4 ml-16">
                    <p className="text-white text-5xl  font-bold">Set Graphical Password</p><br/>
                    <p className="text-white text-2xl">Select Images For Your Graphical Password.</p>
                    <p className="text-white text-2xl">Chose Minimum 4 Images.</p><br/>
                    <button onClick={createAccount} className="transition duration-500 ease-in-out h-12 bg-[#A259FF] rounded-full px-6 w-2/3 mt-6 text-white border-2 hover:bg-transparent border-[#A259FF] font-bold">Create Account</button>
                    <button onClick={() => setNext(false)} className="transition duration-500 ease-in-out border-2 border-[#A259FF] rounded-full px-4 h-12 ml-4 hover:bg-[#A259FF]">
                        <FontAwesomeIcon className="text-white" icon={faArrowLeft} />
                    </button>

                </div>
            </div>}
        </div>
    )
}