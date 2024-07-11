import myImage from "../Images/me.jpg";

const SearchBar = () => {
    return (
        <div className="nav">
                <button id="menuToggle"><i className='bx bx-menu'></i></button>
                <div className="search">
                    <i className='bx bx-search'></i>
                    <input type="text" placeholder="Search for job"/>
                </div>
                <div className="city">
                    <i className='bx bx-location-plus' ></i>
                    <input type="text" placeholder="Enter city, state, or region"/>
                </div>
                <button>Search</button>
                <i className='bx bx-bell bx-tada'></i>
                <div className="user-info">
                    <img src={myImage} alt=""/>
                    <div>
                    <a href={`${process.env.PUBLIC_URL}/Resume.pdf`} download="Resume.pdf">
                        Resume
                        <i className='bx bx-chevron-down'></i>
                    </a>
                        <p>resume</p>
                    </div>
                </div>
            </div>
    )
}

export default SearchBar;