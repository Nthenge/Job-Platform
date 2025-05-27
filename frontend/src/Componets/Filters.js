import React from 'react';
// If you're using React Router for actual navigation, import Link like this:
// import { Link } from "react-router-dom";
// Otherwise, just use <a> or <button> for "Clear" actions

const Filters = ({
    handleTimeFilterChange,
    jobTypes,
    filterJobsByType,
    selectedJobType,
    timeFilter, // Add timeFilter prop to correctly manage 'checked' state
    selectedExperience, // NEW PROP
    handleExperienceFilterChange // NEW PROP
}) => {
    const availableJobTypes = jobTypes.filter(Boolean);

    const getDisplayJobType = (type) => {
        switch (type) {
            case "full_time": return "Fulltime";
            case "permanent": return "Permanent";
            case "remote": return "Remote";
            case "contract": return "Contract";
            default: return type ? type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : "Unknown Type";
        }
    };

    return (
        <div className="filters">
            <div className="header">
                <h3>Job Filter</h3>
                <button onClick={() => {
                    handleTimeFilterChange("");
                    filterJobsByType("");
                    handleExperienceFilterChange(""); // Clear experience filter
                }}>Clear all</button>
            </div>

            <div className="item">
                <div className="title">
                    <h4>Time</h4>
                    <button onClick={() => handleTimeFilterChange("")}>Clear</button>
                </div>
                <div className="checkbox">
                    <div>
                        <input
                            type="radio"
                            name="timeFilterGroup"
                            id="time-today"
                            value="today"
                            checked={timeFilter === "today"}
                            onChange={() => handleTimeFilterChange("today")}
                        />
                        <label htmlFor="time-today">Today</label>
                    </div>
                    <p>50 Jobs</p>
                </div>
                <div className="checkbox">
                    <div>
                        <input
                            type="radio"
                            name="timeFilterGroup"
                            id="time-weekly"
                            value="week"
                            checked={timeFilter === "week"}
                            onChange={() => handleTimeFilterChange("week")}
                        />
                        <label htmlFor="time-weekly">Weekly</label>
                    </div>
                    <p>150 Jobs</p>
                </div>
                <div className="checkbox">
                    <div>
                        <input
                            type="radio"
                            name="timeFilterGroup"
                            id="time-monthly"
                            value="month"
                            checked={timeFilter === "month"}
                            onChange={() => handleTimeFilterChange("month")}
                        />
                        <label htmlFor="time-monthly">Monthly</label>
                    </div>
                    <p>200 Jobs</p>
                </div>
            </div>

            <div className="item">
                <div className="title">
                    <h4>Experience</h4>
                    {/* Clear button for experience filter */}
                    <button onClick={() => handleExperienceFilterChange("")}>Clear</button>
                </div>
                {/* All Experience option */}
                <div className="checkbox">
                    <div>
                        <input
                            type="radio"
                            name="experienceFilterGroup" // Consistent name for radio group
                            id="exp-all"
                            value=""
                            checked={selectedExperience === ""} // Checked if no experience filter is active
                            onChange={() => handleExperienceFilterChange("")}
                        />
                        <label htmlFor="exp-all">All</label>
                    </div>
                    <p>50 Jobs</p> {/* Placeholder */}
                </div>
                {/* Entry Level */}
                <div className="checkbox">
                    <div>
                        <input
                            type="radio"
                            name="experienceFilterGroup"
                            id="exp-entry"
                            value="entry"
                            checked={selectedExperience === "entry"}
                            onChange={() => handleExperienceFilterChange("entry")}
                        />
                        <label htmlFor="exp-entry">Entry</label>
                    </div>
                    <p>50 Jobs</p>
                </div>
                {/* Junior Level */}
                <div className="checkbox">
                    <div>
                        <input
                            type="radio"
                            name="experienceFilterGroup"
                            id="exp-junior"
                            value="junior"
                            checked={selectedExperience === "junior"}
                            onChange={() => handleExperienceFilterChange("junior")}
                        />
                        <label htmlFor="exp-junior">Junior</label>
                    </div>
                    <p>100 Jobs</p>
                </div>
                {/* Senior Level */}
                <div className="checkbox">
                    <div>
                        <input
                            type="radio"
                            name="experienceFilterGroup"
                            id="exp-senior"
                            value="senior"
                            checked={selectedExperience === "senior"}
                            onChange={() => handleExperienceFilterChange("senior")}
                        />
                        <label htmlFor="exp-senior">Senior</label>
                    </div>
                    <p>50 Jobs</p>
                </div>
            </div>

            <div className="item">
                <div className="title">
                    <h4>Job Type</h4>
                    <button onClick={() => filterJobsByType("")}>Clear</button>
                </div>
                <div className="checkbox">
                    <div>
                        <input
                            type="radio"
                            name="jobTypeFilterGroup"
                            id="job-type-all"
                            value=""
                            checked={selectedJobType === ""}
                            onChange={() => filterJobsByType("")}
                        />
                        <label htmlFor="job-type-all">All</label>
                    </div>
                    <p>{jobTypes.length > 0 ? "All Jobs" : ""}</p>
                </div>
                {
                    availableJobTypes.map((type) => {
                        const displayType = getDisplayJobType(type);
                        return (
                            <div key={type} className="checkbox">
                                <div>
                                    <input
                                        type="radio"
                                        name="jobTypeFilterGroup"
                                        id={`job-type-${type}`}
                                        value={type}
                                        checked={selectedJobType === type}
                                        onChange={() => filterJobsByType(type)}
                                    />
                                    <label htmlFor={`job-type-${type}`}>{displayType}</label>
                                </div>
                                <p>100 Jobs</p>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default Filters;