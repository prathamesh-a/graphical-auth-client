import {useState} from "react";
import validator from "validator/es";
import {successToast, Toast} from "../util/toast";
import axios from "axios";
import {api} from "../static/config";

export default function Contact() {

    const [data, setData] = useState({
        name: "",
        email: "",
        message: ""
    })

    function handleChange(event) {
        setData(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    function handleSubmit() {
        if (!validateData()) return

        axios.post(`${api.url}/api/contact`, data)
            .then(res => {
                successToast("Message Sent")
                clearData()
            })
            .catch(err => Toast(err.response.data.message))
    }

    function clearData() {
        setData({
            name: "",
            email: "",
            message: ""
        })
    }

    function validateData() {
        if (data.name.length < 3) {
            Toast("Invalid Name")
            return false
        }
        if (!validator.isEmail(data.email)) {
            Toast("Invalid Email")
            return false
        }
        if (data.message.length < 3) {
            Toast("Enter a valid message")
            return false
        }
        return true
    }

    return (
        <div className="h-full flex justify-center font-['Work_Sans'] mt-12">
            <div className="w-2/5">
                <p className="text-5xl text-white px-6">Connect With Us</p>
                <p className="text-2xl text-gray-300 px-6">We would love to respond to your queries.</p>
                <p className="text-2xl text-gray-300 px-6">Feel free to get in touch with us.</p>
                <div className="flex flex-col px-6 py-6 mt-4">
                    <div className="mb-4">
                        <p className="text-xl text-white mb-1">Full Name</p>
                        <input onChange={handleChange} name="name" value={data.name} className="bg-gray-300 rounded-full h-12 px-6 font-3xl w-3/4" type="text"/>
                    </div>
                    <div className="mb-4">
                        <p className="text-xl text-white mb-1">Email</p>
                        <input onChange={handleChange} name="email" value={data.email} className="bg-gray-300 rounded-full h-12 px-6 font-3xl w-3/4" type="email"/>
                    </div>
                    <div>
                        <p className="text-xl text-white mb-1">Message</p>
                        <textarea onChange={handleChange} name="message" value={data.message} rows="4" className="bg-gray-300 rounded-xl px-6 font-3xl py-2 w-3/4" />
                    </div>
                </div>
                <button onClick={handleSubmit} className="w-1/4 ml-6 transition duration-500 ease-in-out h-12 bg-[#A259FF] rounded-full px-6 text-white border-2 hover:bg-transparent border-[#A259FF] font-bold">Submit</button>
            </div>

            <div className="flex items-center w-2/5">
                <img className="transition duration-500 ease-in-out hover:scale-95 rounded-xl" alt="" src="https://i.ibb.co/P1zYDgh/image.jpg"/>
            </div>
        </div>
)
}