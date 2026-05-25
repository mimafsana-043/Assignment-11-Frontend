import {
  FaChartBar,
  FaHome,
  FaList,
  FaPlus,
  FaTasks,
  FaTrophy,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const [role, roleLoading] = useRole();

  if (roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  const linkClass = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
      : "flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-indigo-50 hover:text-indigo-600";

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-72 bg-white shadow-xl p-6 flex-col">
        <h2 className="text-2xl font-bold text-indigo-600 mb-8">
          ContestHub
        </h2>

        <nav className="space-y-2">
          <NavLink to="/dashboard" end className={linkClass}>
            <FaChartBar /> Dashboard Home
          </NavLink>

          {role === "admin" && (
            <>
              <NavLink to="/dashboard/manage-users" className={linkClass}>
                <FaUsers /> Manage Users
              </NavLink>

              <NavLink to="/dashboard/manage-contests" className={linkClass}>
                <FaList /> Manage Contests
              </NavLink>

              <NavLink to="/dashboard/submitted-tasks" className={linkClass}>
                <FaTasks /> Submitted Tasks
              </NavLink>
            </>
          )}

          {role === "creator" && (
            <>
              <NavLink to="/dashboard/add-contest" className={linkClass}>
                <FaPlus /> Add Contest
              </NavLink>

              <NavLink
                to="/dashboard/my-created-contests"
                className={linkClass}
              >
                <FaList /> My Created Contests
              </NavLink>
            </>
          )}

          {role === "user" && (
            <>
              <NavLink
                to="/dashboard/my-submitted-tasks"
                className={linkClass}
              >
                <FaTasks /> My Submitted Tasks
              </NavLink>

              <NavLink to="/dashboard/my-winning" className={linkClass}>
                <FaTrophy /> My Winning
              </NavLink>

              <NavLink to="/dashboard/profile" className={linkClass}>
                <FaUser /> My Profile
              </NavLink>
            </>
          )}

          <div className="border-t my-4"></div>

          <NavLink to="/" className={linkClass}>
            <FaHome /> Back Home
          </NavLink>
        </nav>
      </aside>

      {/* Mobile top menu */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow p-4">
        <select
          className="w-full border rounded-lg p-3"
          defaultValue="/dashboard"
          onChange={(e) => {
            if (e.target.value) {
              window.location.href = e.target.value;
            }
          }}
        >
          <option value="/dashboard">Dashboard Home</option>

          {role === "admin" && (
            <>
              <option value="/dashboard/manage-users">Manage Users</option>
              <option value="/dashboard/manage-contests">
                Manage Contests
              </option>
              <option value="/dashboard/submitted-tasks">
                Submitted Tasks
              </option>
            </>
          )}

          {role === "creator" && (
            <>
              <option value="/dashboard/add-contest">Add Contest</option>
              <option value="/dashboard/my-created-contests">
                My Created Contests
              </option>
            </>
          )}

          {role === "user" && (
            <>
              <option value="/dashboard/my-submitted-tasks">
                My Submitted Tasks
              </option>
              <option value="/dashboard/my-winning">My Winning</option>
              <option value="/dashboard/profile">My Profile</option>
            </>
          )}

          <option value="/">Back Home</option>
        </select>
      </div>

      {/* Content */}
      <main className="flex-1 p-4 lg:p-8 mt-20 lg:mt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;