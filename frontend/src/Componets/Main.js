import Filters from "./Filters";
import SearchBar from "./SearchBar";
import { useState } from "react";

const Main = () => {

    const [jobs, setJobs] = useState([]);
    const [timeFilter, setTimeFilter] = useState("");

    const [entryInfo, setEntryInfo] = useState({
        firstInput: "",
        secondInput: ""
    });
    const [jobTypes, setJobTypes] = useState([]);

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setEntryInfo(prevInputs => ({
            ...prevInputs,
            [name]: value
        }));
    };

    const fetchJobs = async () => {
        try {
            const response = await fetch(`https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=b602d1c4&app_key=9d5c5da0fa724f9c43233223ec49ed77&results_per_page=9&what=${entryInfo.firstInput}&where=${entryInfo.secondInput}`);
            if (!response.ok) {
                throw new Error('Network error');
            }
            const data = await response.json();
            setJobs(data.results);

            const types = Array.from(new Set(data.results.map(job => job.contract_time || job.contract_type)));
            setJobTypes(types);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
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
                return "Read in details";
        }
    };

    const now = new Date().getTime();
    const filterJobByTime = jobs.filter(job => {
        const jobTime = new Date(job.created).getTime();
        const timeDifference = now - jobTime;

        if(timeFilter === "today"){
            return timeDifference <= 24*3600*1000
        }else if(timeFilter === "week"){
            return timeDifference <= 7*24*3600*1000
        }else if(timeFilter == "month"){
            return timeDifference <= 30*24*3600*1000
        }else{
            return true
        }
    })

    const handleTimeFilterChange = (filter) => {
        setTimeFilter(filter)
    }

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
                        
                        <h4><span>{jobs ? jobs.length : 0}</span> opportunities matching your skills.</h4>
                    </div>
                    {
                        !jobs || jobs.length === 0 ? (
                            <p className="loading_message">Loading, please wait...</p>
                        ) : (
                            <div className="job-cards">
                                {jobs.map((job, index) => {
                                    const {
                                        company: { display_name },
                                        created,
                                        redirect_url,
                                        title,
                                        location: { display_name: locationName },
                                        description,
                                        icon
                                    } = job;

                                    return (
                                        <div className="card" key={index}>
                                            <div className="card-header">
                                                <div className="job-info">
                                                    <i className={icon} aria-hidden="true"></i>
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
                                                <i className="bx bx-bookmarks" aria-hidden="true"></i>
                                            </div>
                                            <div className="card-tags">
                                                <a href={redirect_url} target="_blank" rel="noopener noreferrer">
                                                    {getJobType(job)}
                                                </a>
                                            </div>
                                            <div className="card-desc">
                                                {description}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )
                    }
                </div>
            </div>

            <div className="main">
                <Filters
                    handleTimeFilterChange = {handleTimeFilterChange}
                    jobTypes = {jobTypes}
                />
            </div>
        </div>
    );
};

export default Main;
