"use client";
import { useState } from "react";
import Image from "next/image";

interface SearchBarProps {
  entryInfo: { firstInput: string; secondInput: string };
  handleInputs: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fetchJobs: () => void;
  toggleSidebar: () => void;
}

export default function SearchBar({
  entryInfo,
  handleInputs,
  fetchJobs,
  toggleSidebar,
}: SearchBarProps) {
  const [isBlinking, setIsBlinking] = useState(false);
  const { firstInput, secondInput } = entryInfo;

  const SearchButton = () => {
    setIsBlinking(true);
    fetchJobs();
    setTimeout(() => setIsBlinking(false), 500);
  };

  return (
    <nav className="w-full flex flex-wrap items-center gap-3 bg-none p-3 overflow-x-hidden h-1/14">
      <button
        onClick={toggleSidebar}
        className="text-2xl p-2 hover:bg-gray-100 rounded lg:hidden"
        aria-label="Open menu"
      >
        <i className="bx bx-menu"></i>
      </button>

      {/* Job search input */}
      <div className="flex items-center flex-grow min-w-[200px] border rounded px-3 py-2 bg-gray-50">
        <i className="bx bx-search mr-2 text-gray-500"></i>
        <input
          type="text"
          placeholder="Search for job e.g. React"
          name="firstInput"
          value={firstInput}
          onChange={handleInputs}
          className="bg-transparent outline-none w-full"
        />
      </div>

      {/* Location input */}
      <div className="flex items-center flex-grow min-w-[200px] border rounded px-3 py-2 bg-gray-50">
        <i className="bx bx-location-plus mr-2 text-gray-500"></i>
        <input
          type="text"
          placeholder="Enter city, state, or region"
          name="secondInput"
          value={secondInput}
          onChange={handleInputs}
          className="bg-transparent outline-none w-full"
        />
      </div>

      {/* Search button */}
      <button
        onClick={SearchButton}
        className={`px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition ${
          isBlinking ? "animate-pulse" : ""
        }`}
      >
        Search
      </button>

      <button
        className="text-2xl text-gray-600 hover:text-gray-900"
        aria-label="Notifications"
      >
        <i className="bx bx-bell bx-tada"></i>
      </button>

      <div className="flex items-center gap-2">
        <Image
          src="/Images/me.jpg"
          alt="Abraham"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <div className="flex flex-col leading-tight">
          <a
            href="/Resume.pdf"
            download="Resume.pdf"
            className="flex items-center gap-1 text-blue-500 hover:underline"
          >
            Visit <i className="bx bx-chevron-down"></i>
          </a>
          <p className="text-xs text-gray-500">Developer</p>
        </div>
      </div>
    </nav>
  );
}
