import Navbar from "./components/Navbar";
import {useState} from "react";
import {Page} from "./util/config";
import Home from "./components/Landing";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Loader from "./components/Items/Loader";

function App() {

    const [page, setPage] = useState("home")
    const [loading, setLoading] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [userInfo, setUserInfo] = useState({
        username: "",
        email: ""
    })

    function getCurrentPage() {
        switch (page) {
            case Page.LOGIN_PAGE:
                return <Login setLoading={setLoading} setPage={setPage} setLoggedIn={setLoggedIn} setUserInfo={setUserInfo}/>
            case Page.SIGNUP_PAGE:
                return <Signup setLoading={setLoading} setPage={setPage} setLoggedIn={setLoggedIn} setUserInfo={setUserInfo}/>
            case Page.HOME_PAGE:
            default:
                return <Home />
        }
    }

    return (
        <div>
            { loading && <Loader/> }
            <div className="">
                <Navbar setUserInfo={setUserInfo} setPage={setPage} currentPage={page} setLoggedIn={setLoggedIn} loggedIn={loggedIn} userInfo={userInfo}/>
                {getCurrentPage()}
                <Footer setPage={setPage}/>
            </div>
        </div>

    );
}
export default App;