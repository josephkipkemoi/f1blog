import { Link } from "react-router-dom"

const AboutUsComponent = () => {
    return (
        <div className="card container border-0 bg-white">
            <div className="card card-header border-0 bg-white mt-2">
                <h2>About Us</h2>
                <hr className="text-dark"/>
            </div>
            <div className="card card-body border-0 m-2">
                <p className="text-dark">SportsTidings was started by Joseph Ngetich in 2024 March as a gift to himself upon his 28th birthday which is celebrated yearly on the 21st day of March.</p>
                <p className="text-dark">
                    It has grown in size with 5 full-time active authors and 5 part-time authors with a keen interest in the world of sports. Our mission is to deliver sports information in a concise, organized and engaging manner at zero cost to users.
                </p>
                <p className="text-dark">
                    Besides regularly updating our website, we also engage our fans on Social Media platforms such as <Link className="fw-bold" to="/contact-us">Facebook</Link> <Link className="fw-bold" to="/contact-us">Telegram</Link> and <Link className="fw-bold" to="/contact-us">Twitter</Link>, this allows us to mantain a high level of user engagement.
                </p>
                <p className="text-dark"><Link className="fw-bold" to="/contact-us">Contact Us</Link> about partnerships, advertising or even becoming a contributor. If you wish to submit an event or even an article, just fill out our submission page on contact us. </p>
                <p className="text-dark">Cynkem Ltd</p>
                <p className="text-dark">Copyright &copy; www.sportstidings.com</p>
 
            </div>
        </div>
    )
}

export default AboutUsComponent