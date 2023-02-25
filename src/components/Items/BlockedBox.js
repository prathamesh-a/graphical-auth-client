import {faClose, faWarning} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function BlockedBox(props) {
    return (
        <div className="mb-12 flex rounded-lg w-1/2 bg-red-600 mx-auto flex justify-between align-middle">
                <p className="ml-8 text-white text-xl py-2"><FontAwesomeIcon className="text-white" icon={faWarning} /> This account has been blocked please check your email.</p>
                <button onClick={() => props.onClick(false)} className="mr-4">
                    <FontAwesomeIcon className="text-white" icon={faClose} />
                </button>
        </div>
    )
}