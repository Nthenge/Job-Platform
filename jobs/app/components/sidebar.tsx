"use client";
import Image from "next/image";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isSidebarOpen, toggleSidebar }: SidebarProps) {
  return (
    <aside
      className={`fixed top-0 left-0 z-50 h-full w-64 transform bg-gray-900 text-white transition-transform duration-300 ease-in-out overflow-y-auto overflow-x-hidden
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <span className="text-xl font-bold tracking-wide">JOBS</span>
        <button
          onClick={toggleSidebar}
          className="text-2xl hover:text-gray-300 transition"
          aria-label="Close sidebar"
        >
          <i className="bx bx-x"></i>
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-4 space-y-1">
        {[
          { icon: "bx bx-search-alt-2", label: "Home" },
          { icon: "bx bx-notification", label: "Notifications" },
          { icon: "bx bx-briefcase", label: "My Works" },
          { icon: "bx bx-bookmarks", label: "Saved Jobs" },
        ].map((item, idx) => (
          <a
            key={idx}
            href="#"
            className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            <i className={item.icon}></i>
            {item.label}
          </a>
        ))}
      </nav>

      {/* Footer/Profile */}
      <div className="p-4 mt-4 border-t border-gray-700">
        {/* Profile */}
        <div className="text-center">
          <Image
            src="/Images/me.jpg"
            alt="Abraham"
            width={80}
            height={80}
            className="rounded-full mx-auto object-cover"
          />
          <a
            href="#"
            className="block mt-2 text-blue-400 hover:underline break-words"
          >
            Abraham.com
          </a>
        </div>

        {/* Skills */}
        <div className="mt-4">
          <h5 className="mb-2 text-sm font-semibold">Skills & Expertise</h5>
          <div className="flex flex-wrap gap-2">
            {["Web Developer", "Movies app", "Weather app", "J Furnitures"].map(
              (skill, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs text-gray-300 bg-gray-800 rounded"
                >
                  {skill}
                </span>
              )
            )}
          </div>
        </div>

        {/* View profile */}
        <div className="mt-4">
          <button className="w-full px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition">
            View Profile
          </button>
        </div>
      </div>
    </aside>
  );
}
