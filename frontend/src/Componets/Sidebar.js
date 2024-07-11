import myImage from "../Images/me.jpg";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <a href="#">JOBS</a>

            <div className="side-nav">

                <div className="item" active>
                    <i className='bx bx-search-alt-2'></i>
                    <a href="#">Home</a>
                </div>

                <div className="item">
                    <i className='bx bx-notification'></i>
                    <a href="#">Notificatons</a>
                </div>

                <div className="item">
                    <i className='bx bx-briefcase' ></i>
                    <a href="#">My Works</a>
                </div>

                <div className="item">
                    <i className='bx bx-bookmarks'></i>
                    <a href="#">Saved Jobs</a>
                </div>

                <div className="item">
                    <i className='bx bxs-cog'></i>
                    <a href="#">Settings</a>
                </div>
            </div>

            <div className="side-profile">
                <div className="info">
                    <img src={myImage} alt="Abraham"/>
                    <a href="#">Abraham.com</a>
                    <p>Portfolio</p>
                </div>
                <div className="skills">
                    <h5>Skills and Expertise</h5>
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
                <button>View Profile</button>
        </div>
    </div>
    )
}

export default Sidebar