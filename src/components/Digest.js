import {useState} from "react";
import validator from "validator/es";
import {successToast, Toast} from "../util/toast";
import axios from "axios";
import {api} from "../static/config";

export default function Digest() {

    const[email, setEMail] = useState("")

    function handleChange(event) {
        setEMail(event.target.value)
    }

    function handleSubmit() {
        if (validator.isEmail(email)) {
            axios.post(`${api.url}/api/digest`, {email: email})
                .then(() => {
                    successToast("Thank You For Subscribing!")
                    clearData()
                })
                .catch(err => {
                    Toast(err.response.data.message)
                    clearData()
                })
        }
        else Toast("Invalid Email")

    }

    function clearData() {
        setEMail("")
    }

    return (
        <div className="flex bg-[#3B3B3B] rounded-[25px] mt-24 w-3/4 mx-auto">
            <div className="transition duration-500 ease-in-out hover:scale-95 w-2/5 ml-12 my-16">
                <img alt="" src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/photo-1@2x.png"/>
            </div>

            <div className="font-['Work_Sans'] text-white max-w-lg mx-auto mt-16">
                <p className="text-5xl font-bold">Join Our Monthly Digest</p>
                <p className="text-2xl mt-4">Get Exclusive Promotions & Updates Staight To Your Box</p>
                <div className="flex mt-4">
                    <input value={email} onChange={handleChange} className="text-black w-1/2 mt-6 rounded-lg px-4 z-10" placeholder="Your Email"/>
                    <button onClick={handleSubmit} className="transition duration-300 ease-out w-1/3 bg-[#A259FF] rounded-lg px-4 py-1 mt-6 text-xl border-[#A259FF] border-2 hover:bg-transparent z-20 hover:z-0 -ml-4">
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
    )
}