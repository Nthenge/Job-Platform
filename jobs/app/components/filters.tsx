import React from "react";

interface FiltersProps {
  handleTimeFilterChange: (filter: string) => void;
  jobTypes: string[];
  filterJobsByType: (type: string) => void;
  selectedJobType: string;
  timeFilter: string;
  selectedExperience: string;
  handleExperienceFilterChange: (exp: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  handleTimeFilterChange,
  jobTypes,
  filterJobsByType,
  selectedJobType,
  timeFilter,
  selectedExperience,
  handleExperienceFilterChange,
}) => {
  const availableJobTypes = jobTypes.filter(Boolean);

  const getDisplayJobType = (type: string) => {
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
          ? type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
          : "Unknown Type";
    }
  };

  return (
    <aside className="w-full md:w-1/4 p-4 bg-white rounded-lg shadow-md overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Job Filter</h3>
        <button
          className="text-sm text-blue-600 hover:underline"
          onClick={() => {
            handleTimeFilterChange("");
            filterJobsByType("");
            handleExperienceFilterChange("");
          }}
        >
          Clear all
        </button>
      </div>

      {/* Time Filter */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium">Time</h4>
          <button
            className="text-xs text-gray-500 hover:underline"
            onClick={() => handleTimeFilterChange("")}
          >
            Clear
          </button>
        </div>
        {[
          { id: "today", label: "Today" },
          { id: "week", label: "Weekly" },
          { id: "month", label: "Monthly" },
        ].map(({ id, label }) => (
          <label
            key={id}
            className="flex items-center justify-between py-1 text-sm cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="timeFilterGroup"
                value={id}
                checked={timeFilter === id}
                onChange={() => handleTimeFilterChange(id)}
                className="text-blue-600 focus:ring-blue-500"
              />
              {label}
            </div>
            <span className="text-gray-400 text-xs">50 Jobs</span>
          </label>
        ))}
      </div>

      {/* Experience Filter */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium">Experience</h4>
          <button
            className="text-xs text-gray-500 hover:underline"
            onClick={() => handleExperienceFilterChange("")}
          >
            Clear
          </button>
        </div>
        {[
          { id: "", label: "All" },
          { id: "entry", label: "Entry" },
          { id: "junior", label: "Junior" },
          { id: "senior", label: "Senior" },
        ].map(({ id, label }) => (
          <label
            key={id || "all"}
            className="flex items-center justify-between py-1 text-sm cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="experienceFilterGroup"
                value={id}
                checked={selectedExperience === id}
                onChange={() => handleExperienceFilterChange(id)}
                className="text-blue-600 focus:ring-blue-500"
              />
              {label}
            </div>
            <span className="text-gray-400 text-xs">50 Jobs</span>
          </label>
        ))}
      </div>

      {/* Job Type Filter */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium">Job Type</h4>
          <button
            className="text-xs text-gray-500 hover:underline"
            onClick={() => filterJobsByType("")}
          >
            Clear
          </button>
        </div>

        {/* All jobs option */}
        <label className="flex items-center justify-between py-1 text-sm cursor-pointer">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="jobTypeFilterGroup"
              value=""
              checked={selectedJobType === ""}
              onChange={() => filterJobsByType("")}
              className="text-blue-600 focus:ring-blue-500"
            />
            All
          </div>
          <span className="text-gray-400 text-xs">
            {jobTypes.length > 0 ? "All Jobs" : ""}
          </span>
        </label>

        {/* Dynamic job types */}
        {availableJobTypes.map((type) => {
          const displayType = getDisplayJobType(type);
          return (
            <label
              key={type}
              className="flex items-center justify-between py-1 text-sm cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="jobTypeFilterGroup"
                  value={type}
                  checked={selectedJobType === type}
                  onChange={() => filterJobsByType(type)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                {displayType}
              </div>
              <span className="text-gray-400 text-xs">100 Jobs</span>
            </label>
          );
        })}
      </div>
    </aside>
  );
};

export default Filters;
