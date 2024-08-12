import myImage from "../Images/me.jpg";

const SearchBar = ({ entryInfo = { firstInput: "", secondInput: "" }, handleInputs, fetchJobs}) => {
    return (
        <div className="nav">
                <button id="menuToggle"><i className='bx bx-menu'></i></button>

                <div className="search">
                    <i className='bx bx-search'></i>
                    <input 
                    onChange={handleInputs}
                    type="text" 
                    placeholder="Search for job eg. React"
                    name="firstInput"
                    value={entryInfo.firstInput || ""}
                    />
                </div>

                <div className="city">
                    <i className='bx bx-location-plus' ></i>
                    <input 
                    onChange={handleInputs}
                    type="text" 
                    placeholder="Enter city, state, or region"
                    name="secondInput"
                    value={entryInfo.secondInput || ""}
                    />
                </div>

                <button onClick={fetchJobs}>Search</button>
                
                <i className='bx bx-bell bx-tada'></i>
                <div className="user-info">
                    <img src={myImage} alt="abraham"/>
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