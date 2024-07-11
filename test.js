const App = () => (
  <div className="job-cards">
    {jobCards.map((job, index) => (
      <div className="card" key={index}>
        <div className="card-header">
          <div className="job-info">
            <i className={job.icon}></i>
            <div>
              <h5>{job.company} <span>| {job.time}</span></h5>
              <a href="#">{job.position}</a>
              <p>{job.location}</p>
            </div>
          </div>
          <i className='bx bx-bookmarks'></i>
        </div>
        <div className="card-tags">
          {job.tags.map((tag, tagIndex) => (
            <a key={tagIndex} href="#">{tag}</a>
          ))}
        </div>
        <div className="card-dosc">
          {job.description}
        </div>
      </div>
    ))}
  </div>
);

export default App;
