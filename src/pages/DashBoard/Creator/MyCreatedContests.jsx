import { useQuery } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

import { useState } from "react";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyCreatedContests = () => {

  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const [search, setSearch] = useState("");

  const {
    data: contests = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["creator-contests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/contests/creator/${user.email}`
      );

      return res.data;
    },
  });

  const handleDelete = (id) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this contest?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Delete",
    }).then(result => {

      if (result.isConfirmed) {

        axiosSecure.delete(`/contests/${id}`)
          .then(res => {

            if (res.data.deletedCount > 0) {

              Swal.fire({
                icon: "success",
                title: "Contest deleted",
                timer: 1500,
                showConfirmButton: false,
              });

              refetch();
            }
          });
      }
    });
  };

  const filteredContests = contests.filter(contest =>
    contest.name.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="text-center py-10">
       <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            My Created Contests
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all your created contests.
          </p>
        </div>

        <input
          type="text"
          placeholder="Search contest..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
        />

      </div>

      <div className="overflow-x-auto">

        <table className="w-full min-w-[850px]">

          <thead>

            <tr className="bg-gray-100 text-left">

              <th className="p-4 rounded-l-xl">#</th>

              <th className="p-4">Contest</th>

              <th className="p-4">Type</th>

              <th className="p-4">Prize</th>

              <th className="p-4">Participants</th>

              <th className="p-4">Status</th>

              <th className="p-4 rounded-r-xl">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {
              filteredContests.map((contest, index) => (

                <tr
                  key={contest._id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  <td className="p-4 font-medium">
                    {index + 1}
                  </td>

                  <td className="p-4">

                    <div className="flex items-center gap-3">

                      <img
                        src={contest.image}
                        alt=""
                        className="w-14 h-14 rounded-xl object-cover"
                      />

                      <div>

                        <p className="font-semibold">
                          {contest.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          Deadline: {contest.deadline}
                        </p>

                      </div>

                    </div>

                  </td>

                  <td className="p-4">
                    {contest.contestType}
                  </td>

                  <td className="p-4">
                    ${contest.prizeMoney}
                  </td>

                  <td className="p-4">
                    {contest.participantsCount}
                  </td>

                  <td className="p-4">

                    <span className={`
                      px-3 py-1 rounded-full text-sm font-semibold capitalize

                      ${contest.status === "pending" && "bg-yellow-100 text-yellow-700"}

                      ${contest.status === "confirmed" && "bg-green-100 text-green-700"}

                      ${contest.status === "rejected" && "bg-red-100 text-red-700"}
                    `}>
                      {contest.status}
                    </span>

                  </td>

                  <td className="p-4">

                    {
                      contest.status === "pending" && (
                        <button
                          onClick={() => handleDelete(contest._id)}
                          className="p-3 rounded-xl bg-red-100 text-red-600 hover:bg-red-200"
                        >
                          <FaTrash />
                        </button>
                      )
                    }

                  </td>

                </tr>
              ))
            }

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default MyCreatedContests;