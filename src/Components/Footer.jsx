import { FaFacebook, FaLinkedin, FaTrophy } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
        
        <div>
          <div className="flex items-center gap-2 text-2xl font-bold text-white">
            <FaTrophy className="text-indigo-400" />
            ContestHub
          </div>
          <p className="mt-4 text-sm text-gray-400">
            A modern platform to create, discover and participate in creative contests.
          </p>
          <p className="mt-4 text-sm text-gray-400">
            Join us to enhance your knowledge.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-white mb-4">Quick Links</h3>
          <div className="flex flex-col gap-2">
            <Link to="/">Home</Link>
            <Link to="/all-contests">All Contests</Link>
            <Link to="/leaderboard">Leaderboard</Link>
            <Link to="/dashboard">Dashboard</Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-white mb-4">Follow Us</h3>
          <div className="flex gap-4 text-2xl">
            <a href="https://www.facebook.com/mim.afsana.5015" target="_blank" rel="noreferrer">
              <FaFacebook />
            </a>
            <a href="https://www.linkedin.com/in/mim-afsana-63a647308?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 text-center py-4 text-sm">
        Copyright © 2025 ContestHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;