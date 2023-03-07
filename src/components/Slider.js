import {disableBodyScroll} from "body-scroll-lock";
import {Page} from "../util/config";

export default function Slider(props) {

    //props.slider ? disableBodyScroll(document) : enableBodyScroll(document)
    //disableBodyScroll(document)
    const additionalClasses = "text-[#A259FF]"

    function closeSlider() {
        props.setSlider(false)
    }

    function setPage(page) {
        props.setPage(page)
        closeSlider()
    }

    function logout() {
        props.setUserInfo({username: "", email: ""})
        props.setLoggedIn(false)
        setPage(Page.HOME_PAGE)
    }

    return (
        <div className="md:hidden flex justify-center fixed w-full h-full overflow-hidden z-50">
            <div onClick={closeSlider} className="w-1/3 bg-black opacity-80"></div>
            <div className="bg-[#3b3b3b] h-full w-2/3">

                <div className="flex justify-end pr-3 pt-2">
                    <img onClick={closeSlider} alt="" width="32px" src="https://img.icons8.com/fluency-systems-filled/48/A259FF/multiply.png"/>
                </div>

                {!props.loggedIn && <div className="flex justify-around mt-12 flex-col items-center text-white">
                    <button onClick={() => setPage(Page.LOGIN_PAGE)} className="mb-6 transition duration-500 ease-in-out bg-[#A259FF] rounded-lg px-4 py-1 border-[#A259FF] border-2 hover:bg-transparent">Login</button>
                    <button onClick={() => setPage(Page.SIGNUP_PAGE)} className="transition duration-500 ease-in-out bg-[#A259FF] rounded-lg px-4 py-1 border-[#A259FF] border-2 hover:bg-transparent">Sign Up</button>
                </div>}

                {props.loggedIn && <div className="flex items-center flex-col text-white mt-12">
                    <p className={`text-2xl font-mono text-[#A259FF]`}>{props.userInfo.username}</p>
                    <button onClick={() => logout()} className="mt-4 w-1/3 transition duration-500 ease-in-out bg-[#A259FF] rounded-lg px-4 py-1 border-[#A259FF] border-2 hover:bg-transparent">Logout</button>
                </div>}

                <div className="text-xl mt-12 flex flex-col font-['Work_Sans'] text-white items-center">
                    <p onClick={() => setPage(Page.HOME_PAGE)} className={`mb-6 ${props.currentPage === Page.HOME_PAGE ? additionalClasses : ""}`}>Home</p>
                    <p onClick={() => setPage(Page.CONTACT)} className={`${props.currentPage === Page.CONTACT ? additionalClasses : ""}`}>Contact</p>
                </div>
            </div>
        </div>
    )
}