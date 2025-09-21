"use client";

import { useState } from "react";
import Sidebar from "./components/sidebar";
import Main from "./components/main";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar: () => void = () => {
  setIsSidebarOpen((prev) => !prev);
};

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-x-hidden bg-gray-50">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <Main toggleSidebar={toggleSidebar} />
      </div>
    </div>
  );
}
