import {Page} from "../util/config";

export default function Navbar(props) {

    const additionalClasses = "text-[#A259FF]"

    function setPage(property) {
        props.setPage(property)
    }

    function logout() {
        props.setUserInfo({username: "", email: ""})
        props.setLoggedIn(false)
        setPage(Page.HOME_PAGE)
    }

    return (
        <div className="p-6 flex justify-around">

            {/*logo and text*/}
            <div className="flex items-center">
                <img className="" width="24px" src="https://img.icons8.com/material-rounded/48/A259FF/cyber-security.png" alt=""/>
                <p className="text-xl text-white ml-2 font-['Space_Mono']">Graphical Password Auth</p>
            </div>

            {/*nav element*/}
            <div className="font-['Work_Sans'] text-white flex items-center">
                <p className={`text-xl cursor-pointer ${props.currentPage === Page.HOME_PAGE ? additionalClasses : ""}`} onClick={() => setPage(Page.HOME_PAGE)}>Home</p>
                <p className={`text-xl ml-12 ${props.currentPage === Page.ABOUT ? additionalClasses : ""}`}>About Us</p>
                <p className={`text-xl ml-12 mr-20 ${props.currentPage === Page.CONTACT ? additionalClasses : ""}`}>Contact</p>

                {!props.loggedIn && <div>
                    <button onClick={() => setPage(Page.LOGIN_PAGE)} className="transition duration-500 ease-in-out bg-[#A259FF] rounded-lg px-4 py-1 ml-12 border-[#A259FF] border-2 hover:bg-transparent">Login</button>
                    <button onClick={() => setPage(Page.SIGNUP_PAGE)} className="transition duration-500 ease-in-out bg-[#A259FF] rounded-lg px-4 py-1 ml-6 border-[#A259FF] border-2 hover:bg-transparent">Sign Up</button>
                </div>}

                {props.loggedIn && <div className="flex">
                    <p className={`text-2xl font-mono text-[#A259FF]`}>{props.userInfo.username}</p>
                    <button onClick={() => logout()} className="transition duration-500 ease-in-out bg-[#A259FF] rounded-lg px-4 py-1 ml-4 border-[#A259FF] border-2 hover:bg-transparent">Logout</button>
                </div>}

            </div>
        </div>
    )
}