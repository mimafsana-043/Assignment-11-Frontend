import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../Components/LoadingSpinner";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AllContests = () => {
  const axiosPublic = useAxiosPublic();

  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [sort, setSort] = useState("");

  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["approved-contests"],
    queryFn: async () => {
      const res = await axiosPublic.get("/contests/approved");
      return res.data;
    },
  });

  const filteredContests = useMemo(() => {
    let data = [...contests];

    if (search) {
      data = data.filter(contest =>
        contest.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (type !== "all") {
      data = data.filter(contest => contest.contestType === type);
    }

    if (sort === "low") {
      data.sort((a, b) => a.prizeMoney - b.prizeMoney);
    }

    if (sort === "high") {
      data.sort((a, b) => b.prizeMoney - a.prizeMoney);
    }

    return data;
  }, [contests, search, type, sort]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">
        All Contests
      </h1>

      <div className="grid md:grid-cols-3 gap-4 mb-10">
        <input
          type="text"
          placeholder="Search by contest name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-4 py-3 rounded-xl border"
        />

        <select
          value={type}
          onChange={e => setType(e.target.value)}
          className="px-4 py-3 rounded-xl border"
        >
          <option value="all">All Types</option>
          <option value="Image Design">Image Design</option>
          <option value="Article Writing">Article Writing</option>
          <option value="Business Idea">Business Idea</option>
          <option value="Gaming Review">Gaming Review</option>
          <option value="Marketing Strategy">Marketing Strategy</option>
        </select>

        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="px-4 py-3 rounded-xl border"
        >
          <option value="">Sort By Prize</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredContests.map(contest => (
          <div key={contest._id} className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <img
              src={contest.image}
              alt={contest.name}
              className="h-56 w-full object-cover"
            />

            <div className="p-6">
              <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-600 text-sm font-semibold">
                {contest.contestType}
              </span>

              <h3 className="text-xl font-bold mt-4">{contest.name}</h3>

              <p className="text-gray-500 mt-2 line-clamp-2">
                {contest.description}
              </p>

              <div className="flex justify-between mt-4 font-semibold">
                <span>Prize: ${contest.prizeMoney}</span>
                <span>Fee: ${contest.price}</span>
              </div>

              <Link
                to={`/contest/${contest._id}`}
                className="block text-center mt-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredContests.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No contests found.
        </p>
      )}
    </div>
  );
};

export default AllContests;