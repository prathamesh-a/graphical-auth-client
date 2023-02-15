export default function PasswordIcon(props) {

    const selectedClasses = "bg-purple-500 shadow-xl"

    return (
        <img onClick={props.stateChange} alt="" src={props.src} className={`transition duration-500 ease-in-out hover:shadow-2xl hover:scale-105 rounded-full p-4 cursor-pointer ${props.selected ? selectedClasses : ""}`}/>
    )
}