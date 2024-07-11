import Filters from "./Filters";
import SearchBar from "./SearchBar";
import Data from "./Data";

const JobsData = () => {
    return (
        <div className="container">
            <SearchBar />
            <div className="main">

                    <div className="content">
                        <div className="header">
                            <h4> <span>38</span> oppotunities matching your skills. <span>   Here are jobs that fit your skill set</span> </h4>
                        </div>

                        <div className="job-cards">
                            {Data.map((job,index) => (
                                <div className="card" key= {index}>
                                    <div className="card-header">
                                        <div className="job-info">
                                            <i className={job.icon}></i>
                                            <div>
                                                <h5>{job.company} <span>| {job.time} </span></h5>
                                                <a href="#">{job.position}</a>
                                                <p>{job.location}</p>
                                            </div>
                                        </div>
                                        <i className='bx bx-bookmarks'></i>
                                    </div>
                                    <div className="card-tags">
                                        {job.tags.map((tag, index) => (
                                            <a key={index} href="#">{tag}</a>
                                        ))}
                                    </div>
                                    <div className="card-dosc">
                                    {job.description}
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>

                <Filters/> 

            </div> 
        </div>
    )
}

export default JobsData;