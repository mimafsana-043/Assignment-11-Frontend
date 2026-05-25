import { useState } from "react";
import { FaBars, FaTimes, FaTrophy } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, logoutUser } = useAuth();

  const [openMenu, setOpenMenu] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-indigo-600 font-semibold"
      : "text-gray-700 hover:text-indigo-600";

  const handleLogout = () => {
    logoutUser();
    setOpenUserMenu(false);
    setOpenMenu(false);
  };

  const navLinks = (
    <>
      <NavLink to="/" className={navLinkClass} onClick={() => setOpenMenu(false)}>
        Home
      </NavLink>

      <NavLink to="/all-contests" className={navLinkClass} onClick={() => setOpenMenu(false)}>
        All Contests
      </NavLink>

      <NavLink to="/leaderboard" className={navLinkClass} onClick={() => setOpenMenu(false)}>
        Leaderboard
      </NavLink>

      {user && (
        <NavLink to="/dashboard" className={navLinkClass} onClick={() => setOpenMenu(false)}>
          Dashboard
        </NavLink>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-indigo-600"
        >
          <FaTrophy />
          ContestHub
        </Link>

        <nav className="hidden lg:flex items-center gap-8 font-medium">
          {navLinks}
        </nav>

        <div className="flex items-center gap-3 relative">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setOpenUserMenu(!openUserMenu)}
                className="flex items-center gap-2"
              >
                <img
                  src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt="user"
                  className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500"
                />

                <span className="hidden md:block text-sm font-semibold text-gray-700">
                  {user.displayName || "User"}
                </span>
              </button>

              {openUserMenu && (
                <div className="absolute right-0 mt-3 w-72 bg-white border rounded-2xl shadow-xl p-4 z-50">
                  <div className="flex items-center gap-3 border-b pb-4">
                    <img
                      src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                      alt="user"
                      className="w-12 h-12 rounded-full object-cover border"
                    />

                    <div>
                      <p className="font-bold text-gray-900">
                        {user.displayName || "No Name"}
                      </p>
                      <p className="text-sm text-gray-500 break-all">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <Link
                    to="/dashboard"
                    onClick={() => setOpenUserMenu(false)}
                    className="block mt-4 px-4 py-2 rounded-xl hover:bg-indigo-50 text-gray-700"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left mt-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-5 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Login
            </Link>
          )}

          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="lg:hidden text-2xl text-gray-700"
          >
            {openMenu ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {openMenu && (
        <div className="lg:hidden border-t bg-white px-4 py-5 shadow">
          <nav className="flex flex-col gap-4 font-medium">
            {navLinks}
          </nav>

          {user && (
            <div className="mt-5 p-4 rounded-2xl bg-indigo-50">
              <div className="flex items-center gap-3">
                <img
                  src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt="user"
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div>
                  <p className="font-bold text-gray-900">
                    {user.displayName || "No Name"}
                  </p>
                  <p className="text-sm text-gray-500 break-all">
                    {user.email}
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full mt-4 py-2 rounded-xl bg-red-500 text-white"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;