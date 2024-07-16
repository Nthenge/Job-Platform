import {useEffect, useState} from "react"
import {Link} from 'react-router-dom'
import Filters from "./Filters";
import SearchBar from "./SearchBar";

const JobsData = ({jobs}) => {
    const getJobType = (job) => {
        switch(job.contract_time || job.contract_type){
            case "full_time":
                return "Fulltime"
                break;
            case "permanent":
                return "Permanent"
                break;
            case "remote":
                return "Remote"
                break;
            case "contract":
                return "Contract"
                break;
            default:
                return "Read in details"
                break;
        }
    }

    return (
        <div className="container">
            <SearchBar />
            <div className="main">
                    <div className="content">
                        <div className="header">
                            <h4> <span>{jobs ? jobs.length : 0}</span> oppotunities matching your skills. <span>   Here are jobs that fit your skill set</span> </h4>
                        </div>
                        {
                            !jobs || jobs.length === 0 ? <p>Loading, please wait...</p> : (
                                <div className="job-cards">
                            {jobs.map((job,index) => (
                                <div className="card" key= {index}>
                                    <div className="card-header">
                                        <div className="job-info">
                                            <i className={job.icon}></i>
                                            <div>
                                                <h5>{job.company.display_name} <span>| Posted on {new Date(job.created).toLocaleString()} </span></h5>
                                                <a to={job.redirect_url} target="_blank">{job.title}</a>
                                                <p>
                                                    {
                                                    job.location.display_name    
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <i className='bx bx-bookmarks'></i>
                                    </div>
                                    <div className="card-tags">
                                        <a to={job.redirect_url}>
                                            {
                                               getJobType(job)                 
                                            }
                                        </a>
                                    </div>
                                    <div className="card-dosc">
                                    {job.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                            )
                        }                 

                    </div>

                <Filters/> 

            </div> 
        </div>
    )
}

export default JobsData;