import myImage from "../Images/me.jpg";
const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
    return (
        <div className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
            <div className="title_Jobs">
                <button className="a">JOBS</button>
                <button className="sidebar-close-btn" onClick={toggleSidebar}>
                    <i className='bx bx-x'></i>
                </button>
            </div>

            <div className="side-nav">
                <div className="item">
                    <i className='bx bx-search-alt-2'></i>
                    <a className="a" href="#">Home</a>
                </div>

                <div className="item">
                    <i className='bx bx-notification'></i>
                    <a className="a" href="#">Notifications</a>
                </div>

                <div className="item">
                    <i className='bx bx-briefcase' ></i>
                    <a className="a" href="#">My Works</a>
                </div>

                <div className="item">
                    <i className='bx bx-bookmarks'></i>
                    <a className="a" href="#">Saved Jobs</a>
                </div>
            </div>

            <div className="side-profile">
                <div className="info">
                    <img src={myImage} alt="Abraham" />
                    <br />
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

export default Sidebar;