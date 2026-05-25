import { Link } from "react-router-dom";
import ExtraSections from "./ExtraSections";
import Leaderboard from "./Leaderboard";
import PopularContests from "./PopularContests";

const Home = () => {
  return (
    <div>
      <section className="min-h-[80vh] bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-600 font-semibold mb-4">
              Create • Compete • Win
            </p>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900">
              Discover Creative Contests & Win Big Rewards
            </h1>

            <p className="mt-6 text-gray-600 text-lg">
              Join design, article writing, business idea, gaming review and creative contests from one modern platform.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/all-contests"
                className="px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 text-center"
              >
                Explore Contests
              </Link>

              <Link
                to="/leaderboard"
                className="px-8 py-3 rounded-full border border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 text-center"
              >
                View Leaderboard
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-6">
            <img
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df"
              alt="contest"
              className="rounded-2xl h-[350px] w-full object-cover"
            />

            <div className="grid grid-cols-3 gap-4 mt-6 text-center">
              <div>
                <h3 className="text-2xl font-bold text-indigo-600">50+</h3>
                <p className="text-sm text-gray-500">Contests</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-indigo-600">1K+</h3>
                <p className="text-sm text-gray-500">Users</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-indigo-600">$5K</h3>
                <p className="text-sm text-gray-500">Prizes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PopularContests />
      <Leaderboard />
      <ExtraSections/>
    </div>
  );
};

export default Home;