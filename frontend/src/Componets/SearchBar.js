import React, { useState } from 'react';
import myImage from "../Images/me.jpg";

const SearchBar = ({entryInfo,handleInputs,fetchJobs}) => {
  
  const [isBlinking, setIsBlinking] = useState(false);
  let {firstInput, secondInput} = entryInfo;

  const SearchButton = () => {
      setIsBlinking(true);
      fetchJobs();
      setTimeout(() => setIsBlinking(false), 500);
  };

  return (
    <div className="nav">
      <button id="menuToggle"><i className='bx bx-menu'></i></button>

      <div className="search">
        <i className='bx bx-search'></i>
        <input 
          type="text" 
          placeholder="Search for job e.g. React"
          name="firstInput"
          value={firstInput}
          onChange={handleInputs}
        />
      </div>

      <div className="city">
        <i className='bx bx-location-plus'></i>
        <input 
          type="text" 
          placeholder="Enter city, state, or region"
          name="secondInput"
          value={secondInput}
          onChange={handleInputs}
        />
      </div>

      <button 
        onClick={SearchButton} 
        className={isBlinking ? 'blinking' : ''}
      >
        Search
      </button>
      
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
  );
}

export default SearchBar;
