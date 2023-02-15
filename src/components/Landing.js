import {faUnlock} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AttackBlock from "./Items/AttackBlock";
import Digest from "./Digest";

export default function Home() {

    function handleKnowMore() {
        const element = document.getElementById('home--2')
        if (element) element.scrollIntoView({behavior: "smooth"})
    }

    return (
        <div>
            <div className="flex justify-around mt-16 font-['Work_Sans']">
                {/*INFO*/}
                <div className="text-white ml-8 mt-8">
                    <p className="text-6xl font-bold">Discover </p>
                    <p className="text-6xl font-bold">Graphical Password</p>
                    <p className="text-6xl font-bold">Authentication</p>
                    <p className="text-3xl mt-6">A Novel Approach For Security </p>
                    <p className="text-3xl">And User Experience Of </p>
                    <p className="text-3xl">Graphical Password Authentication.</p>
                    <button onClick={handleKnowMore} className="transition duration-500 ease-in-out w-1/3 bg-[#A259FF] rounded-lg px-4 py-1 mt-6 text-xl border-[#A259FF] border-2 hover:bg-transparent">
                        <FontAwesomeIcon className="text-white mr-3" icon={faUnlock} />
                        Know More
                    </button>
                </div>
                {/*IMAGE*/}
                <div className="-ml-24 ">
                    <img alt="" className=" hover:scale-95 transition duration-500 ease-in-out hover:shadow-2xl hover:shadow-[#A259FF80] rounded-[25px] w-full" src="https://i.pinimg.com/736x/67/a1/a1/67a1a1b9b21505a42648010e3669076e.jpg"/>
                </div>
            </div>

            <div id="home--2" className=" mt-48 font-['Work_Sans']">
                <div className="ml-28 pt-24">
                    <p className="text-white text-5xl font-bold">Resistance To Attacks</p>
                    <p className="text-white text-2xl mt-3">Our System Provides Security Against Popular Attacks.</p>
                    <div className="grid grid-cols-2 mt-8">
                        <AttackBlock
                            icon="https://img.icons8.com/ios-filled/100/A259FF/re-enter-pincode.png"
                            title="Bruteforce"
                            desc="After reaching max tries, the user will be notified via message through email. And the further authentication through the generic URL/website is disabled for that user account, instead, they have to use the link that will be sent by the company in the notification email. This also lets the legitimate user know about the adversary."
                        />
                        <AttackBlock
                            icon="https://img.icons8.com/ios-filled/100/A259FF/show-password.png"
                            title="Shoulder Surfing"
                            desc="Shoulder surfing is a type of social engineering technique used to obtain information such as personal identification numbers (PINs), passwords and other confidential data by looking over the victim's shoulder. The system we adopt is similar to the Phone pattern system."
                        />
                        <AttackBlock
                            icon="https://img.icons8.com/ios-filled/100/A259FF/spyware-free.png"
                            title="Spyware"
                            desc="Graphical password systems resist spyware more easily than regular passwords. Key-loggers secretly capture keystrokes and transfer, but if the spyware wants to track the mouse movements, it can be tracked, but the adversary wouldn’t know which part of the mouse event is actually the graphical password."
                        />
                        {/*<AttackBlock*/}
                        {/*    icon="https://img.icons8.com/ios-filled/100/A259FF/wall-mount-camera-error--v1.png"*/}
                        {/*    title="Hidden Camera"*/}
                        {/*    desc="There will be a camera in front of the user which identifies a face while authentication i.e., the number of pixels the face occupies should be 80-90% of the total pixels in the current frame and if this condition is not satisfied then the screen does not show the graphical password. It alerts the user to cover the screen with a proper posture. But this will be a costly operation."*/}
                        {/*/>*/}
                        <AttackBlock
                            icon="https://img.icons8.com/ios-filled/100/A259FF/enter-pin.png"
                            title="Phishing"
                            desc="Since the adversary is made to believe that the password is a set of images, it’s not possible to make a fake page, since the adversary thinks he doesn’t know the images."
                        />
                    </div>
                </div>
            </div>
            <Digest/>
        </div>
    )
}