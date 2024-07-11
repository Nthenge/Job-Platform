const Filters = () => {
    return (
        <div className="filters">
                        <div className="header">
                            <h3>Job Filter</h3>
                            <a href="#">Clear all</a>
                        </div>

                        <div className="item">
                            <div className="title">
                                <h4>Time</h4>
                                <a href="#">Clear</a>
                            </div>
                            <div className="checkbox">
                                <div>
                                    <input type="checkbox" name="today"/>
                                    <label for="today">Just Now</label>
                                </div>
                                <p>50 Jobs</p>
                            </div>
                            <div className="checkbox">
                                <div>
                                    <input type="checkbox" name="weekly"/>
                                    <label for="weekly">Weekly</label>
                                </div>
                                <p>150 Jobs</p>
                            </div>
                            <div className="checkbox">
                                <div>
                                    <input type="checkbox" name="monthly"/>
                                    <label for="monthly">Monthly</label>
                                </div>
                                <p>200 Jobs</p>
                            </div>
                        </div>

                        <div className="item">
                            <div className="title">
                                <h4>Experience</h4>
                                <a href="#">Clear</a>
                            </div>
                            <div className="checkbox">
                                <div>
                                    <input type="checkbox" name="trainer"/>
                                    <label for="trainer">Entry</label>
                                </div>
                                <p>50 Jobs</p>
                            </div> 
                            <div className="checkbox">
                                <div>
                                    <input type="checkbox" name="junior"/>
                                    <label for="junior">Junior</label>
                                </div>
                                <p>100 Jobs</p>
                            </div>
                            <div className="checkbox">
                                <div>
                                    <input type="checkbox" name="middle"/>
                                    <label for="midlle">Middle</label>
                                </div>
                                <p>100 Jobs</p>
                            </div>
                            <div className="checkbox">
                                <div>
                                    <input type="checkbox" name="senior"/>
                                    <label for="senior">Senior</label>
                                </div>
                                <p>50 Jobs</p>
                            </div>
                        </div>

                        <div className="item">
                            <div className="title">
                                <h4>Job Type</h4>
                                <a href="#">Clear</a>
                            </div>
                            <div className="checkbox">
                                <div>
                                    <input type="checkbox" name="fulltime"/>
                                    <label for="fulltime">Full Time</label>
                                </div>
                                <p>100 Jobs</p>
                            </div>
                            <div className="checkbox">
                                <div>
                                    <input type="checkbox" name="parttimr"/>
                                    <label for="partime">Part Time</label>
                                </div>
                                <p>50 Jobs</p>
                            </div>
                            <div className="checkbox">
                                <div>
                                    <input type="checkbox" name="contract"/>
                                    <label for="contract">Contract</label>
                                </div>
                                <p>50 Jobs</p>
                            </div>
                        </div>
                        
                        <div className="item">
                            <div className="title">
                                <h4>Time</h4>
                                <a href="#">Clear</a>
                            </div>
                            <div className="checkbox">
                                <div>
                                    <input type="checkbox" name="onsite"/>
                                    <label for="onsite">On Site</label>
                                </div>
                                <p>50 Jobs</p>
                            </div>

                            {/* <div className="location">
                                <i className='bx bx-location-plus' ></i>
                                <input type="text" placeholder="Search location"/>
                            </div> */}

                            <div className="checkbox">
                                <div>
                                    <input type="checkbox" name="remote"/>
                                    <label for="remote">Remote</label>
                                </div>
                                <p>100 Jobs</p>
                            </div>
                        </div>
                    </div>
    )
}

export default Filters