"use client";
import { useState, useEffect } from "react";
import SearchBar from "./searchbar";
import Filters from "./filters";

interface MainProps {
  toggleSidebar: () => void;
}
export default function Main({ toggleSidebar }: MainProps) {
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
  const [selectedJobType, setSelectedJobType] = useState("");
  const [jobs, setJobs] = useState<any[]>([]);
  const [timeFilter, setTimeFilter] = useState("");
  const [jobTypes, setJobTypes] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState("");
  const [entryInfo, setEntryInfo] = useState({
    firstInput: "",
    secondInput: "",
  });
  const [initialFetchDone, setInitialFetchDone] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const handlePageplus = () => {
      console.log("Next page button clicked")
      setCurrentPage((prev) => prev + 1);
      fetchJobs(entryInfo.firstInput, entryInfo.secondInput, currentPage + 1);
  }

  const handlePageminus = () => {
      console.log("Next page button clicked")
      setCurrentPage((prev) => prev - 1);
      fetchJobs(entryInfo.firstInput, entryInfo.secondInput, currentPage + 1);
  }
  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEntryInfo((prev) => ({ ...prev, [name]: value }));
  };

  const fetchJobs = async (
    what = entryInfo.firstInput,
    where = entryInfo.secondInput,
    page: number = currentPage
  ) => {
    console.log(`Fetching jobs for page ${page}`);
    try {
      const response = await fetch(
        `https://api.adzuna.com/v1/api/jobs/gb/search/${page}?app_id=b602d1c4&app_key=9d5c5da0fa724f9c43233223ec49ed77&results_per_page=9&what=${what}&where=${where}`
      );
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log(`Received api response for page ${page}`, data);
      setJobs(data.results);
      setTotalCount(data.count);
      setTotalPages(Math.ceil(data.count / 12));
      const types: any = Array.from(
        new Set(
          data.results.map((job: any) => job.contract_time || job.contract_type)
        )
      ).filter(Boolean);
      setJobTypes(types);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]);
      setJobTypes([]);
    }
  };

  useEffect(() => {
    if (!initialFetchDone) {
      setEntryInfo({ firstInput: "developer", secondInput: "london" });
      fetchJobs("developer", "london", currentPage);
      setInitialFetchDone(true);
    }
  }, [initialFetchDone]);

  useEffect(() => {
    if ((entryInfo.firstInput || entryInfo.secondInput) && initialFetchDone) {
      fetchJobs(entryInfo.firstInput, entryInfo.secondInput, currentPage);
    }
  }, [entryInfo.firstInput, entryInfo.secondInput, initialFetchDone]);

  useEffect(() => {
    let current = [...jobs];

    if (timeFilter) {
      const now = Date.now();
      current = current.filter((job) => {
        const jobTime = new Date(job.created).getTime();
        const diff = now - jobTime;
        return (
          (timeFilter === "today" && diff <= 86400000) ||
          (timeFilter === "week" && diff <= 7 * 86400000) ||
          (timeFilter === "month" && diff <= 30 * 86400000)
        );
      });
    }

    if (selectedJobType) {
      current = current.filter(
        (job) =>
          (job.contract_time || job.contract_type) === selectedJobType
      );
    }

    if (selectedExperience) {
      const keywordsMap: Record<string, string[]> = {
        entry: ["entry-level", "junior", "grad", "trainee"],
        junior: ["junior", "jr", "associate"],
        senior: ["senior", "sr", "lead", "principal", "staff", "architect"],
      };
      const keywords = keywordsMap[selectedExperience.toLowerCase()] || [];
      current = current.filter((job) => {
        const title = job.title?.toLowerCase() || "";
        const desc = job.description?.toLowerCase() || "";
        return keywords.some(
          (kw) => title.includes(kw) || desc.includes(kw)
        );
      });
    }

    setFilteredJobs(current);
  }, [jobs, selectedJobType, timeFilter, selectedExperience]);

  const getJobType = (job: any) => {
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
        return type
          ? type.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())
          : "Read in details";
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      {/* Search Bar */}
      <SearchBar
        fetchJobs={fetchJobs}
        entryInfo={entryInfo}
        handleInputs={handleInputs}
        toggleSidebar={toggleSidebar}
      />

      {/* Filters + Job Listings in main grid */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Job Listings */}
        <div className="lg:col-span-3">
          <h4 className="text-lg font-semibold mb-4">
            <span className="text-blue-600">{totalCount < 1 ? "0" : totalCount - 1}</span>{" "}
            opportunities match your skills.
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {!jobs.length ? (
              <p className="text-gray-500 col-span-full">
                {initialFetchDone &&
                !entryInfo.firstInput &&
                !entryInfo.secondInput
                  ? "No jobs found. Please enter keywords and location."
                  : "Loading, please wait..."}
              </p>
            ) : filteredJobs.length === 0 ? (
              <p className="text-gray-500">
                No jobs match your current filter selections. Try adjusting the filters.
              </p>
            ) : (
              filteredJobs.map((job, i) => (
                <div
                  key={job.id || i}
                  className="bg-white rounded-lg shadow p-4 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-semibold text-gray-800">
                        {job.company.display_name}
                        <span className="text-sm text-gray-500 ml-2">
                          | Posted on {new Date(job.created).toLocaleDateString()}
                        </span>
                      </h5>
                      <a
                        href={job.redirect_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline block"
                      >
                        {job.title}
                      </a>
                      <p className="text-gray-500">{job.location.display_name}</p>
                    </div>
                    <i className="bx bx-bookmarks text-xl text-gray-500"></i>
                  </div>
                  <div className="mt-2">
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                      {getJobType(job)}
                    </span>
                  </div>
                  <p className="mt-3 text-gray-600 text-sm">
                    {job.description?.length > 200
                      ? job.description.substring(0, 150) + "..."
                      : job.description}
                  </p>
                </div>
              ))
            )}
          </div>
            <div className="flex gap-2 mt-6">
                <button
                    disabled={currentPage <= 1}
                    onClick={handlePageminus}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
                >
                    Previous
                </button>
                <span className="self-center">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    disabled={currentPage >= totalPages}
                    onClick={handlePageplus}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
                >
                    Next
                </button>
            </div>

        </div>
        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4">
          <Filters
            handleTimeFilterChange={setTimeFilter}
            jobTypes={jobTypes}
            filterJobsByType={setSelectedJobType}
            selectedJobType={selectedJobType}
            timeFilter={timeFilter}
            selectedExperience={selectedExperience}
            handleExperienceFilterChange={setSelectedExperience}
          />
        </div>
      </div>
    </div>
  );
}
