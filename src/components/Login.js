import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import { checkUsername} from "../util/validation";
import Toast from "../util/toast";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import PasswordIcon from "./Items/PasswordIcon";
import {icons} from "../static/icons_data";
import axios from "axios";
import {Page} from "../util/config";
import {api} from "../static/config";

export default function Login(props) {

    const [next, setNext] = useState(false)
    const [iconsData, setIconsData] = useState(icons)
    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: "",
        pattern: []
    })

    function handleChange(event) {
        setLoginInfo(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    function validateData() {
        if (loginInfo.username.length < 1) {
            toast.error('Invalid Username', {position: "top-center", autoClose: 3000, hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            return false
        }
        else if (loginInfo.password.length < 8) {
            toast.error('Password Length Must Be Greater Than 8', {position: "top-center", autoClose: 3000, hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            return false
        }
        return true
    }

    async function validateUsernameAndEmail() {
        const isUsernameExists = await checkUsername(loginInfo.username)
        if (!isUsernameExists) Toast("Username does not exists!")
        return isUsernameExists
    }

    async function handleNextClick(event) {
        if (validateData() && await validateUsernameAndEmail()) setNext(true)
    }

    useEffect(function() {
        const newPattern = [];
        for(let i=0; i<iconsData.length; i++) {
            if (iconsData[i].selected) {
                newPattern.push(iconsData[i].id)
            }
        }
        setLoginInfo(prev => {
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

    function login() {
        if (loginInfo.pattern.length < 4) {
            Toast("Chose minimum 4 images!")
            return
        }

        axios.post(`${api.url}/api/user/login`, loginInfo)
            .then(res => {
                console.log(res.data)
                props.setUserInfo({email: res.data.email, username: res.data.username})
                props.setLoggedIn(true)
                props.setPage(Page.HOME_PAGE)
            })
            .catch(err => {
                //console.log(err.response.data.message)
                Toast(err.response.data.message)
            })
    }

    return (
        <div className=" h-[32rem] mt-12">
            {!next && <div className="flex justify-center h-full">
                {/*IMAGE*/}
                <div className="">
                    <img className="transition duration-500 ease-in-out hover:scale-95 h-full" alt="" src="../static/img/signup.png"/>
                </div>
                {/*LOGIN FORM*/}
                <div className="font-['Work_Sans'] mt-16">
                    <p className="text-white text-5xl  font-bold">Login</p><br/>
                    <p className="text-white text-2xl">Welcome Back! Enter Your Details Below</p>
                    <p className="text-white text-2xl"></p><br/>
                    <div className="flex flex-col w-2/3">
                        <input value={loginInfo.username} onChange={handleChange} name="username" className="rounded-full h-12 px-6 font-3xl" type="text" placeholder="Username"/>
                        <input value={loginInfo.password} onChange={handleChange} name="password" className="rounded-full h-12 px-6 font-3xl mt-4" type="password" placeholder="Password"/>
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
                    <button onClick={login} className="transition duration-500 ease-in-out h-12 bg-[#A259FF] rounded-full px-6 w-2/3 mt-6 text-white border-2 hover:bg-transparent border-[#A259FF] font-bold">Create Account</button>
                    <button onClick={() => setNext(false)} className="transition duration-500 ease-in-out border-2 border-[#A259FF] rounded-full px-4 h-12 ml-4 hover:bg-[#A259FF]">
                        <FontAwesomeIcon className="text-white" icon={faArrowLeft} />
                    </button>

                </div>
            </div>}
        </div>

    )
}