import JobsData from "./JobsData";
import SearchBar from "./SearchBar";

const Parent = () => {

    const [entryInfo, setEntryInfo] = useState(
        {
            firstInput: "",
            secondInput: ""
        }
    );


    const handleInputs = (event) => {
        const {name, value} = event.target
        setEntryInfo(prevInputs => ({
            ...prevInputs,
            [name]: value
        }));        
    }

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch(`https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=b602d1c4&app_key=9d5c5da0fa724f9c43233223ec49ed77&results_per_page=6&what=${entryInfo.firstInput}&where=${entryInfo.secondInput}`);
                if (!response.ok) {
                    throw new Error('Network error');
                }
                const data = await response.json();
                setJobs(data.results);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        if (entryInfo.firstInput.trim() !== "" && entryInfo.secondInput.trim() !== "") {
            fetchJobs();
        }

        setEntryInfo(
            { firstInput: "", secondInput: "" }
        )

        console.log("Clicked")
    }, [entryInfo]);


    return (
        <>
            <SearchBar 
            entryInfo = {entryInfo}
            handleInputs = {handleInputs}
            fetchJobs={fetchJobs}
            />

            <JobsData
            jobs = {jobs}
            />
        </>
    )
}

export default Parent;