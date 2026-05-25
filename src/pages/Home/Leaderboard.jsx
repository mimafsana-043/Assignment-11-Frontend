import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Components/LoadingSpinner";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Leaderboard = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: leaderboard = [],
    isLoading,
  } = useQuery({
    queryKey: ["leaderboard"],
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      const res = await axiosPublic.get("/leaderboard");
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

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">Leaderboard</h2>
        <p className="text-gray-500 mt-3">Top contest winners</p>
      </div>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-xl">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="p-4 text-left">Rank</th>
              <th className="p-4 text-left">Winner</th>
              <th className="p-4 text-left">Wins</th>
              <th className="p-4 text-left">Total Prize</th>
            </tr>
          </thead>

          <tbody>
            {leaderboard.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-500">
                  No winners declared yet.
                </td>
              </tr>
            ) : (
              leaderboard.map((winner, index) => (
                <tr key={winner.winnerEmail} className="border-b">
                  <td className="p-4 font-bold">#{index + 1}</td>

                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          winner.winnerPhoto ||
                          "https://i.ibb.co/4pDNDk1/avatar.png"
                        }
                        alt={winner.winnerName}
                        className="w-10 h-10 rounded-full object-cover"
                      />

                      <div>
                        <p className="font-semibold">
                          {winner.winnerName || "Unknown Winner"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {winner.winnerEmail}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">{winner.totalWins}</td>

                  <td className="p-4 text-indigo-600 font-bold">
                    ${winner.totalPrize}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Leaderboard;