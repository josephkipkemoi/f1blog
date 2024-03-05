import { faUser, faUserCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useLocalStorage } from "../hooks/useLocalStorage"
import './profile.css'

const ProfileComponent = () => {
    const [user,] = useLocalStorage("user", null)

    const{firstName, lastName, email} = user

    return (
        <div className="card profile_body">
            <div className="card card-header border-0 bg-white">
                <h5>
                    <FontAwesomeIcon icon={faUser}/>
                    <span className="m-2">Account</span>
                </h5>
            </div>
            <div className="card card-body border-0">
                <div>
                    <h2>Account</h2>
                    <p className="text-secondary mt-2 mb-2">Manage your account settings</p>
                </div>
                <div className="mt-2"> 
                    <h5 className="mt-3 mb-3">Profile</h5>
                    <hr/>
                    <div className="d-flex align-items-center profile_pic">
                        <FontAwesomeIcon className="m-3" icon={faUserCircle} size="xl" />
                        <span className="fw-bold m-3">{firstName} {lastName}</span>
                    </div>
                </div>
                <div className="mt-2"> 
                    <h5 className="mt-3 mb-3">Username</h5>
                    <hr/>
                    <div>
                        <span className="m-3">{firstName} {lastName}</span>
                    </div>
                </div>
                <div className="mt-2"> 
                    <h5 className="mt-3 mb-3">Email address</h5>
                    <hr/>
                    <div>
                        <span className="m-3">{email}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileComponent