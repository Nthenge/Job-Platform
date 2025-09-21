// components/Main.js
import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import Filters from "./Filters"; // Your Filters component

const Main = ({ toggleSidebar }) => { // Accept toggleSidebar prop from Layout.js
    // All your existing state variables remain here
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [selectedJobType, setSelectedJobType] = useState("");
    const [jobs, setJobs] = useState([]);
    const [timeFilter, setTimeFilter] = useState("");
    const [jobTypes, setJobTypes] = useState([]);
    const [selectedExperience, setSelectedExperience] = useState("");
    const [entryInfo, setEntryInfo] = useState({
        firstInput: "",
        secondInput: ""
    });
    const [initialFetchDone, setInitialFetchDone] = useState(false);

    // Removed: isSidebarOpen state from here, it belongs in Layout.js now.

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setEntryInfo(prevInputs => ({
            ...prevInputs,
            [name]: value
        }));
    };

    const fetchJobs = async (what = entryInfo.firstInput, where = entryInfo.secondInput) => {
        try {
            const response = await fetch(`https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=b602d1c4&app_key=9d5c5da0fa724f9c43233223ec49ed77&results_per_page=9&what=${what}&where=${where}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setJobs(data.results);
            console.log(data.results);

            const types = Array.from(new Set(data.results.map(job => job.contract_time || job.contract_type)));
            setJobTypes(types.filter(Boolean));

        } catch (error) {
            console.error('Error fetching jobs:', error);
            setJobs([]);
            setJobTypes([]);
        }
    };

    // Effect for initial default search
    useEffect(() => {
        if (!initialFetchDone) {
            setEntryInfo({
                firstInput: "developer",
                secondInput: "london"
            });
            fetchJobs("developer", "london");
            setInitialFetchDone(true);
        }
    }, [initialFetchDone]);

    // Effect for reacting to search bar input changes
    useEffect(() => {
        if (entryInfo.firstInput || entryInfo.secondInput) {
            if (initialFetchDone) {
                fetchJobs(entryInfo.firstInput, entryInfo.secondInput);
            }
        }
    }, [entryInfo.firstInput, entryInfo.secondInput, initialFetchDone]);

    // Effect for combined filtering logic
    useEffect(() => {
        let currentFilteredJobs = [...jobs];

        // Apply Time Filter
        if (timeFilter) {
            const now = new Date().getTime();
            currentFilteredJobs = currentFilteredJobs.filter(job => {
                const jobTime = new Date(job.created).getTime();
                const timeDifference = now - jobTime;
                switch (timeFilter) {
                    case "today": return timeDifference <= 24 * 60 * 60 * 1000;
                    case "week": return timeDifference <= 7 * 24 * 60 * 60 * 1000;
                    case "month": return timeDifference <= 30 * 24 * 60 * 60 * 1000;
                    default: return true;
                }
            });
        }

        // Apply Job Type Filter
        if (selectedJobType) {
            currentFilteredJobs = currentFilteredJobs.filter(job =>
                (job.contract_time || job.contract_type) === selectedJobType
            );
        }

        // Apply Experience Filter
        if (selectedExperience) {
            const experienceKeywords = {
                "entry": ["entry-level", "junior", "grad", "trainee"],
                "junior": ["junior", "jr", "associate"],
                "senior": ["senior", "sr", "lead", "principal", "staff", "architect"]
            };
            const keywords = experienceKeywords[selectedExperience.toLowerCase()];
            if (keywords) {
                currentFilteredJobs = currentFilteredJobs.filter(job => {
                    const title = (job.title || "").toLowerCase();
                    const description = (job.description || "").toLowerCase();
                    return keywords.some(keyword =>
                        title.includes(keyword) || description.includes(keyword)
                    );
                });
            }
        }

        setFilteredJobs(currentFilteredJobs);
    }, [jobs, selectedJobType, timeFilter, selectedExperience]);

    const handleTimeFilterChange = (filter) => {
        setTimeFilter(filter);
    };

    const filterJobsByType = (type) => {
        setSelectedJobType(type);
    };

    const handleExperienceFilterChange = (experience) => {
        setSelectedExperience(experience);
    };

    // Removed: toggleSidebar function from here, it belongs in Layout.js now.

    const getJobType = (job) => {
        const type = job.contract_time || job.contract_type;
        switch (type) {
            case "full_time": return "Fulltime";
            case "permanent": return "Permanent";
            case "remote": return "Remote";
            case "contract": return "Contract";
            default: return type ? type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : "Read in details";
        }
    };

    return (
        // This is now the main content wrapper (formerly 'content-area' in CSS)
        // and its class is 'main-content-wrapper' as per our CSS
        <div className="main-content-wrapper">

            {/* Search Bar Component */}
            <SearchBar
                fetchJobs={fetchJobs}
                entryInfo={entryInfo}
                handleInputs={handleInputs}
                toggleSidebar={toggleSidebar} // Pass toggleSidebar down to SearchBar for the mobile menu button
            />

            {/* This div arranges the job listings and filters side-by-side on desktop
                and stacks them vertically on smaller screens.
                It's styled by the '.job-listings-and-filters-area' CSS class */}
            <div className="job-listings-and-filters-area">
                {/* The main data section for job listings (left side on desktop) */}
                <div className="main-data">
                    <div className="header">
                        <h4><span>{filteredJobs ? filteredJobs.length : 0}</span> opportunities matching your skills.</h4>
                    </div>
                    {/* The scrollable content area for job cards */}
                    <div className="content">
                        {/* Conditional rendering for loading, no jobs, or job cards */}
                        {
                            (!jobs || jobs.length === 0) ? (
                                <p className="loading_message">
                                    {initialFetchDone && (!entryInfo.firstInput && !entryInfo.secondInput) ? "No jobs found. Please enter keywords and location to search for jobs." : "Loading, please wait..."}
                                </p>
                            ) : (
                                filteredJobs.length === 0 ? (
                                    <p className="loading_message">No jobs match your current filter selections. Try adjusting the filters.</p>
                                ) : (
                                    <div className="job-cards">
                                        {/* You're rendering the job cards directly here, which is fine!
                                            If you had a separate <Content /> component, you'd pass filteredJobs to it. */}
                                        {filteredJobs.map((job, index) => {
                                            const {
                                                company: { display_name },
                                                created,
                                                redirect_url,
                                                title,
                                                location: { display_name: locationName },
                                                description,
                                            } = job;

                                            return (
                                                <div className="card" key={job.id || index}>
                                                    <div className="card-header">
                                                        <div className="job-info">
                                                            <div>
                                                                <h5>
                                                                    {display_name}
                                                                    <span> | Posted on {new Date(created).toLocaleString()}</span>
                                                                </h5>
                                                                <a href={redirect_url} target="_blank" rel="noopener noreferrer">
                                                                    {title}
                                                                </a>
                                                                <p>{locationName}</p>
                                                            </div>
                                                        </div>
                                                        <i className='bx bx-bookmarks' aria-hidden="true"></i>
                                                    </div>
                                                    <div className="card-tags">
                                                        <a href={redirect_url} target="_blank" rel="noopener noreferrer">
                                                            {getJobType(job)}
                                                        </a>
                                                    </div>
                                                    <div className="card-desc">
                                                        {description && description.length > 200 ? `${description.substring(0, 200)}...` : description}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )
                            )
                        }
                    </div>
                </div>

                {/* The Filters section (right side on desktop) */}
                {/* Ensure the outermost div of your Filters component has the 'filters-section' class */}
                <Filters
                    handleTimeFilterChange={handleTimeFilterChange}
                    jobTypes={jobTypes}
                    filterJobsByType={filterJobsByType}
                    selectedJobType={selectedJobType}
                    timeFilter={timeFilter}
                    selectedExperience={selectedExperience}
                    handleExperienceFilterChange={handleExperienceFilterChange}
                />
            </div> {/* End of job-listings-and-filters-area */}
        </div> // End of main-content-wrapper
    );
};

export default Main;