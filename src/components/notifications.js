import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./notifications.css"
import { faBell } from "@fortawesome/free-solid-svg-icons"

const NotificationComponent = () => {
    return (
        <div className="card notifications_body">
            <div className="card card-header bg-white border-0">
                <h5>
                    <FontAwesomeIcon icon={faBell} />
                    <span className="m-3">Notifications</span>
                </h5>
            </div>
            <hr/>
            <div className="card card-body border-0">
                <span className="text-secondary">You do not have any new notifications</span>
            </div>
        </div>
    )
}

export default NotificationComponent