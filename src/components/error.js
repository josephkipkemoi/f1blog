import { faExclamationCircle, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ErrorComponent = ({ error, setError }) => {
    return (
        <div>
            {error.map(e => {
                return (
                    <div className="d-flex justify-content-between align-items-center border-0 shadow-sm alert alert-danger d-block">
                        <div className="d-flex align-items-center">
                            <FontAwesomeIcon className="m-1" icon={faExclamationCircle} size="xl" />
                            <span className="m-1">{e}</span>
                        </div>
                        <div>
                            <button className="btn" onClick={setError}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ErrorComponent