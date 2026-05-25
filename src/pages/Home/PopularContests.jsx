import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../Components/LoadingSpinner";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ErrorPage from "../ErrorPage/ErrorPage";

const PopularContests = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: contests = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["approved-contests"],
    queryFn: async () => {
      const res = await axiosPublic.get("/contests/approved");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500"><LoadingSpinner></LoadingSpinner></p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-red-500"><ErrorPage></ErrorPage></p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900">
          Popular Contests
        </h2>

        <p className="text-gray-500 mt-3">
          Explore latest approved contests
        </p>
      </div>

      {contests.length === 0 ? (
        <p className="text-center text-gray-500">
          No approved contests found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contests.slice(0, 6).map((contest) => (
            <div
              key={contest._id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:-translate-y-1 transition"
            >
              <img
                src={contest.image || "https://i.ibb.co/6Jq9xMh/contest.jpg"}
                alt={contest.name}
                className="h-56 w-full object-cover"
              />

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-600 text-sm font-semibold">
                    {contest.contestType}
                  </span>

                  <span className="font-bold text-indigo-600">
                    ${contest.prizeMoney}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3">
                  {contest.name}
                </h3>

                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {contest.description?.slice(0, 100)}...
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>Participants: {contest.participantsCount || 0}</span>
                  <span>Fee: ${contest.price}</span>
                </div>

                <Link
                  to={`/contest/${contest._id}`}
                  className="block text-center w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PopularContests;