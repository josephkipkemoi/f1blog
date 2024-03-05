import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./message.css"
import { faMessage } from "@fortawesome/free-solid-svg-icons"

const MessageComponent = () => {
    return (
        <div className="card message_body">
            <div className="card card-header border-0 bg-white">
                <h5>
                    <FontAwesomeIcon icon={faMessage}/>
                    <span className="m-2">Messages</span>
                </h5>
            </div>
            <hr/>
            <div>
                <span className="text-secondary m-3">You have 0 messages</span>
            </div>
        </div>
    )
}

export default MessageComponent