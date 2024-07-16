import myImage from "../Images/me.jpg";

const SearchBar = ({ entryInfo = { firstInput: "", secondInput: "" }, handleInputs, fetchJobs}) => {
    console.log(entryInfo.firstInput)
    return (
        <div className="nav">
                <button id="menuToggle"><i className='bx bx-menu'></i></button>

                <div className="search">
                    <i className='bx bx-search'></i>
                    <input 
                    type="text" 
                    placeholder="Search for job eg. React"
                    name="firstInput"
                    defaultValue={entryInfo.firstInput || ""}
                    onChange={handleInputs}
                    />
                </div>

                <div className="city">
                    <i className='bx bx-location-plus' ></i>
                    <input 
                    type="text" 
                    placeholder="Enter city, state, or region"
                    name="secondInput"
                    defaultValue={entryInfo.secondInput || ""}
                    onChange={handleInputs}
                    />
                </div>

                <button onClick={fetchJobs}>Search</button>
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