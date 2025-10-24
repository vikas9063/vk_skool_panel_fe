import { useState } from "react";
import {
    HomeIcon,
    UserGroupIcon,
    Cog6ToothIcon,
    PlusCircleIcon,
    ChevronRightIcon,
    ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

/**
 * Tailwind CSS Sidebar Layout for React
 * Responsive drawer + collapsible groups
 */
export default function SidebarLayout({ children }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [collapsed, setCollapsed] = useState({ roles: false });

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed z-40 inset-y-0 left-0 w-72 bg-white border-r border-gray-200 shadow-lg transform transition-transform lg:translate-x-0 lg:static lg:shadow-none ${mobileOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Brand */}
                <div className="px-4 py-4 flex items-center gap-3 border-b border-gray-200">
                    <div className="w-10 h-10 bg-indigo-600 rounded flex items-center justify-center text-white font-bold">
                        VK
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold">Skool Panel</h1>
                        <p className="text-sm text-gray-500">Admin dashboard</p>
                    </div>
                </div>

                {/* Search */}
                <div className="p-4 border-b border-gray-100">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="block w-full bg-gray-50 border border-gray-200 rounded-md py-2 pl-3 pr-3 text-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                {/* Navigation */}
                <nav className="px-2 py-4 overflow-y-auto flex-1">
                    <div className="mb-6">
                        <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                            Main
                        </h3>
                        <SidebarLink active icon={HomeIcon} label="Dashboard" />
                        <SidebarLink icon={ClipboardDocumentListIcon} label="Announcements" />
                    </div>

                    {/* Collapsible Roles & Permissions */}
                    <div className="mb-6">
                        <button
                            onClick={() =>
                                setCollapsed((prev) => ({ ...prev, roles: !prev.roles }))
                            }
                            className="w-full flex items-center justify-between px-3 py-2 rounded-md text-left text-sm font-semibold text-gray-700 hover:bg-gray-50"
                        >
                            <span className="flex items-center gap-3">
                                <UserGroupIcon className="w-5 h-5" />
                                Roles &amp; Permissions
                            </span>
                            <ChevronRightIcon
                                className={`w-4 h-4 transform transition-transform ${collapsed.roles ? "rotate-0" : "rotate-90"
                                    }`}
                            />
                        </button>
                        {!collapsed.roles && (
                            <div className="mt-2 space-y-1">
                                <SidebarSubLink label="All Roles" />
                                <SidebarSubLink label="Create Role" />
                                <SidebarSubLink label="Permissions" />
                            </div>
                        )}
                    </div>

                    {/* Users */}
                    <div className="mb-6">
                        <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                            Users
                        </h3>
                        <SidebarLink icon={UserGroupIcon} label="Users" />
                        <SidebarLink icon={PlusCircleIcon} label="Invite" />
                    </div>

                    {/* Settings */}
                    <div className="mt-auto pt-4 border-t border-gray-100">
                        <SidebarLink icon={Cog6ToothIcon} label="Settings" />
                    </div>
                </nav>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                <header className="w-full bg-white border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="h-16 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <button
                                    className="lg:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100"
                                    onClick={() => setMobileOpen(true)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                </button>
                                <h2 className="text-lg font-semibold">Dashboard</h2>
                            </div>

                            <div className="flex items-center gap-3">
                                <img
                                    className="w-8 h-8 rounded-full"
                                    src="https://api.dicebear.com/8.x/initials/svg?seed=VK"
                                    alt="user avatar"
                                />
                                <span className="text-sm">Vishal K</span>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-6 bg-gray-50">{children}</main>
            </div>
        </div>
    );
}

/* ---------- helper sub-components ---------- */
function SidebarLink({ icon: Icon, label, active = false }) {
    return (
        <a
            href="#"
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${active
                    ? "text-indigo-700 bg-indigo-50"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
        >
            <Icon className="w-5 h-5" />
            {label}
        </a>
    );
}

function SidebarSubLink({ label }) {
    return (
        <a
            href="#"
            className="flex items-center gap-3 px-[20%] py-1.5 rounded-md text-sm text-gray-700 hover:bg-gray-50"
        >
            {label}
        </a>
    );
}
