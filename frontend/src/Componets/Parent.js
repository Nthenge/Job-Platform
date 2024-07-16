import JobsData from "./JobsData";
import SearchBar from "./SearchBar";
import { useState } from "react";

const Parent = () => {
    const [entryInfo, setEntryInfo] = useState({
        firstInput: "",
        secondInput: ""
    });

    const handleInputs = (event) => {
        const { name, value } = event.target;
        setEntryInfo(prevInputs => ({
            ...prevInputs,
            [name]: value
        }));
    };

    const [jobs, setJobs] = useState([]);

    const fetchJobs = async () => {
        try {
            window.alert("Cliked")
            console.log("Fetching jobs with:", entryInfo);
            const response = await fetch(`https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=b602d1c4&app_key=9d5c5da0fa724f9c43233223ec49ed77&results_per_page=6&where=london&what=javascript`);
            if (!response.ok) {
                throw new Error('Network error');
            }
            const data = await response.json();
            console.log("Fetched jobs data:", data);
            setJobs(data.results);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    return (
        <>
            <SearchBar 
                entryInfo={entryInfo}
                handleInputs={handleInputs}
                fetchJobs={fetchJobs}
            />
            <JobsData jobs={jobs} />
        </>
    );
};

export default Parent;
