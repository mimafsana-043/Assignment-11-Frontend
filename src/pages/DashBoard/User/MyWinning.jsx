import { useQuery } from "@tanstack/react-query";

import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyWinning = () => {

  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const {
    data: contests = [],
  } = useQuery({
    queryKey: ["winning", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {

      const res = await axiosSecure.get(
        `/winning-contests/${user.email}`
      );

      return res.data;
    },
  });

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">

      <h1 className="text-3xl font-bold mb-8">
        My Winning Contests
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {
          contests.map(contest => (

            <div
              key={contest._id}
              className="border rounded-2xl p-5"
            >

              <img
                src={contest.image}
                alt=""
                className="w-full h-48 object-cover rounded-xl"
              />

              <h3 className="text-xl font-bold mt-4">
                {contest.name}
              </h3>

              <p className="mt-2 text-indigo-600 font-bold">
                Prize: ${contest.prizeMoney}
              </p>

            </div>
          ))
        }

      </div>

    </div>
  );
};

export default MyWinning;