import {BrowserRouter as Link} from "react-router-dom"

const Filters = ({handleTimeFilterChange}) => {
    return (
            <div className="filters">
                <div className="header">
                            <h3>Job Filter</h3>
                            <Link to="#">Clear all</Link>
                </div>

                <div className="item">
                            <div className="title">
                                <h4>Time</h4>
                                <Link to="#">Clear</Link>
                            </div>
                            <div className="checkbox">
                                <div>
                                    <input 
                                    type="checkbox" 
                                    name="today"
                                    onChange={() => handleTimeFilterChange("today")}
                                    />
                                    <label htmlFor="today">Just Now</label>
                                </div>
                                <p>50 Jobs</p>
                            </div>
                            <div className="checkbox">
                                <div>
                                    <input 
                                    type="checkbox" 
                                    name="weekly"
                                    onChange={handleTimeFilterChange("week")}
                                    />
                                    <label htmlFor="weekly">Weekly</label>
                                </div>
                                <p>150 Jobs</p>
                            </div>
                            <div className="checkbox">
                                <div>
                                    <input 
                                    type="checkbox" 
                                    name="monthly"
                                    onChange={handleTimeFilterChange("month")}
                                    />
                                    <label htmlFor="monthly">Monthly</label>
                                </div>
                                <p>200 Jobs</p>
                            </div>
                </div>

                <div className="item">
                            <div className="title">
                                <h4>Experience</h4>
                                <Link to="#">Clear</Link>
                            </div>
                            <div className="checkbox">
                                <div>
                                    <input type="checkbox" name="trainer"/>
                                    <label htmlFor="trainer">Entry</label>
                                </div>
                                <p>50 Jobs</p>
                            </div> 
                            <div className="checkbox">
                                <div>
                                    <input type="checkbox" name="junior"/>
                                    <label htmlFor="junior">Junior</label>
                                </div>
                                <p>100 Jobs</p>
                            </div>
                            <div className="checkbox">
                                <div>
                                    <input type="checkbox" name="senior"/>
                                    <label htmlFor="senior">Senior</label>
                                </div>
                                <p>50 Jobs</p>
                            </div>
                </div>

                <div className="item">
                            <div className="title">
                                <h4>Job Type</h4>
                                <Link to="#">Clear</Link>
                            </div>
                            <div className="checkbox">
                                <div>
                                    <input type="checkbox" name="fulltime"/>
                                    <label htmlFor="fulltime">Full Time</label>
                                </div>
                                <p>100 Jobs</p>
                            </div>
                            <div className="checkbox">
                                <div>
                                    <input type="checkbox" name="parttimr"/>
                                    <label htmlFor="partime">Part Time</label>
                                </div>
                                <p>50 Jobs</p>
                            </div>
                            <div className="checkbox">
                                <div>
                                    <input type="checkbox" name="contract"/>
                                    <label htmlFor="contract">Contract</label>
                                </div>
                                <p>50 Jobs</p>
                            </div>
                </div>
            </div>
            )
}

export default Filters