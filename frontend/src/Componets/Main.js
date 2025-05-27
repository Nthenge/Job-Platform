import Filters from "./Filters";
import SearchBar from "./SearchBar";
import { useState, useEffect } from "react";

const Main = () => {
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [selectedJobType, setSelectedJobType] = useState("");
    const [jobs, setJobs] = useState([]);
    const [timeFilter, setTimeFilter] = useState("");
    const [jobTypes, setJobTypes] = useState([]);
    // NEW STATE for Experience Filter
    const [selectedExperience, setSelectedExperience] = useState("");
    const [entryInfo, setEntryInfo] = useState({
        firstInput: "",
        secondInput: ""
    });
    // State to track if an initial fetch has happened
    const [initialFetchDone, setInitialFetchDone] = useState(false);


    const handleInputs = (e) => {
        const { name, value } = e.target;
        setEntryInfo(prevInputs => ({
            ...prevInputs,
            [name]: value
        }));
    };

    const fetchJobs = async (what = entryInfo.firstInput, where = entryInfo.secondInput) => {
        // Use provided arguments or current state for flexibility
        try {
            const response = await fetch(`https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=b602d1c4&app_key=9d5c5da0fa724f9c43233223ec49ed77&results_per_page=9&what=${what}&where=${where}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setJobs(data.results);
            console.log(data.results);

            const types = Array.from(new Set(data.results.map(job => job.contract_time || job.contract_type)));
            setJobTypes(types.filter(Boolean)); // Filter out any null/undefined types

        } catch (error) {
            console.error('Error fetching jobs:', error);
            setJobs([]);
            setJobTypes([]);
        }
    };

    // --- EFFECT FOR INITIAL DEFAULT SEARCH ---
    useEffect(() => {
        // Only run this effect once on mount and if initial fetch hasn't happened
        if (!initialFetchDone) {
            // Set default search terms
            setEntryInfo({
                firstInput: "developer", // Default job keyword
                secondInput: "london"    // Default location
            });
            // Fetch jobs with default terms. Pass them directly to avoid state lag.
            fetchJobs("developer", "london");
            setInitialFetchDone(true); // Mark initial fetch as done
        }
    }, [initialFetchDone]); // Dependency: initialFetchDone to prevent re-running


    // --- EFFECT FOR REACTING TO SEARCH BAR INPUT CHANGES ---
    // This effect runs when entryInfo changes (triggered by SearchBar's inputs or initial fetch)
    useEffect(() => {
        // Only trigger fetch if the user has provided input or it's the initial default search
        // and if it's not the first render (handled by initialFetchDone check in the other useEffect)
        if (entryInfo.firstInput || entryInfo.secondInput) {
             // To prevent double fetch on initial load (if default search is set via setEntryInfo)
             // this useEffect will be triggered by setEntryInfo, so we need to be careful.
             // The `initialFetchDone` flag helps ensure `WorkspaceJobs` is called only once for defaults.
             // For subsequent user searches, this effect correctly triggers.
             // You could also add a ref for more fine-grained control:
             // const isFirstRender = useRef(true);
             // useEffect(() => {
             //   if (isFirstRender.current) {
             //     isFirstRender.current = false;
             //     return;
             //   }
             //   // ... normal fetchJobs logic
             // }, [entryInfo])
            if (initialFetchDone) { // Only fetch if initial load is done OR if user actively typed
                fetchJobs(entryInfo.firstInput, entryInfo.secondInput);
            }
        }
    }, [entryInfo.firstInput, entryInfo.secondInput]); // Dependencies for user initiated searches


    // --- EFFECT FOR COMBINED FILTERING LOGIC ---
    useEffect(() => {
        let currentFilteredJobs = [...jobs];

        // 1. Apply Time Filter
        if (timeFilter) {
            const now = new Date().getTime();
            currentFilteredJobs = currentFilteredJobs.filter(job => {
                const jobTime = new Date(job.created).getTime();
                const timeDifference = now - jobTime;

                switch (timeFilter) {
                    case "today":
                        return timeDifference <= 24 * 60 * 60 * 1000;
                    case "week":
                        return timeDifference <= 7 * 24 * 60 * 60 * 1000;
                    case "month":
                        return timeDifference <= 30 * 24 * 60 * 60 * 1000;
                    default:
                        return true;
                }
            });
        }

        // 2. Apply Job Type Filter
        if (selectedJobType) {
            currentFilteredJobs = currentFilteredJobs.filter(job =>
                (job.contract_time || job.contract_type) === selectedJobType
            );
        }

        // 3. Apply Experience Filter (NEW LOGIC)
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
    }, [jobs, selectedJobType, timeFilter, selectedExperience]); // Add selectedExperience to dependencies


    const handleTimeFilterChange = (filter) => {
        setTimeFilter(filter);
    };

    const filterJobsByType = (type) => {
        setSelectedJobType(type);
    };

    // NEW HANDLER for Experience Filter
    const handleExperienceFilterChange = (experience) => {
        setSelectedExperience(experience);
    };

    const getJobType = (job) => {
        const type = job.contract_time || job.contract_type;
        switch (type) {
            case "full_time":
                return "Fulltime";
            case "permanent":
                return "Permanent";
            case "remote":
                return "Remote";
            case "contract":
                return "Contract";
            default:
                return type ? type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : "Read in details";
        }
    };

    return (
        <div className="container">
            <div className="main-data">
                <SearchBar
                    fetchJobs={fetchJobs}
                    entryInfo={entryInfo}
                    handleInputs={handleInputs}
                />

                <div className="content">
                    <div className="header">
                        <h4><span>{filteredJobs ? filteredJobs.length : 0}</span> opportunities matching your skills.</h4>
                    </div>
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

            <div className="main">
                <Filters
                    handleTimeFilterChange={handleTimeFilterChange}
                    jobTypes={jobTypes}
                    filterJobsByType={filterJobsByType}
                    selectedJobType={selectedJobType}
                    timeFilter={timeFilter} // Pass timeFilter for radio 'checked' state
                    // NEW PROPS for Experience Filter
                    selectedExperience={selectedExperience}
                    handleExperienceFilterChange={handleExperienceFilterChange}
                />
            </div>
        </div>
    );
};

export default Main;