import myImage from "../Images/me.jpg";
import { BrowserRouter as Link } from "react-router-dom";
const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="title_Jobs">
                <Link className = "a" to="#">JOBS</Link>
            </div>

            <div className="side-nav">

                <div className="item">
                    <i className='bx bx-search-alt-2'></i>
                    <Link className = "a" to="#">Home</Link>
                </div>

                <div className="item">
                    <i className='bx bx-notification'></i>
                    <Link className = "a" to="#">Notifications</Link>
                </div>

                <div className="item">
                    <i className='bx bx-briefcase' ></i>
                    <Link className = "a" to="#">My Works</Link>
                </div>

                <div className="item">
                    <i className='bx bx-bookmarks'></i>
                    <Link className = "a" to="#">Saved Jobs</Link>
                </div>
            </div>

            <div className="side-profile">
                <div className="info">
                    <img src={myImage} alt="Abraham"/>
                    <br/>
                    <a href="#">Abraham.com</a>
                </div>

                <div className="skills">
                    <h5>Skills & Expertise</h5>
                    <div className="skill-tags">
                        <div className="item">
                            <p>Web Developer</p>
                        </div>
                        <div className="item">
                            <p>Movies app</p>
                        </div>
                        <div className="item">
                            <p>Weather app</p>
                        </div>
                        <div className="item">
                            <p>J Furnitures</p>
                        </div>
                    </div>
                </div>

                <div className="sidebar-btn">
                    <button>View Profile</button>
                </div>
            
            </div>

        </div>
    )
}

export default Sidebar