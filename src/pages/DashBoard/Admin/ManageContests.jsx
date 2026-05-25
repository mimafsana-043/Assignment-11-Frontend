import { useQuery } from "@tanstack/react-query";
import { FaCheck, FaTimes, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

import LoadingSpinner from "../../../Components/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageContests = () => {



    const axiosSecure = useAxiosSecure();

    const {
        data: contests = [],
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ["all-contests"],
        queryFn: async () => {
            const res = await axiosSecure.get("/contests");
            return res.data;
        },
    });

    // APPROVE
    const handleApprove = (id) => {

        axiosSecure.patch(`/contests/approve/${id}`)
            .then(res => {

                if (res.data.modifiedCount > 0) {

                    Swal.fire({
                        icon: "success",
                        title: "Contest approved",
                        timer: 1500,
                        showConfirmButton: false,
                    });

                    refetch();
                }
            });
    };

    // REJECT
    const handleReject = (id) => {

        axiosSecure.patch(`/contests/reject/${id}`)
            .then(res => {

                if (res.data.modifiedCount > 0) {

                    Swal.fire({
                        icon: "success",
                        title: "Contest rejected",
                        timer: 1500,
                        showConfirmButton: false,
                    });

                    refetch();
                }
            });
    };

    // DELETE
    const handleDelete = (id) => {

        Swal.fire({
            title: "Delete contest?",
            text: "This action cannot be undone.",
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

    if (isLoading) {
        return (
            <div className="text-center py-10">
               <LoadingSpinner></LoadingSpinner>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

                <div>

                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                        Manage Contests
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Approve, reject and manage all contests.
                    </p>

                </div>

                <div className="px-5 py-3 rounded-xl bg-indigo-50 text-indigo-600 font-bold">
                    Total Contests: {contests.length}
                </div>

            </div>

            <div className="overflow-x-auto">

                <table className="w-full min-w-[1000px]">

                    <thead>

                        <tr className="bg-gray-100 text-left">

                            <th className="p-4 rounded-l-xl">#</th>

                            <th className="p-4">Contest</th>

                            <th className="p-4">Creator</th>

                            <th className="p-4">Type</th>

                            <th className="p-4">Prize</th>

                            <th className="p-4">Participants</th>

                            <th className="p-4">Status</th>

                            <th className="p-4 rounded-r-xl">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            contests.map((contest, index) => (

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
                                                className="w-16 h-16 rounded-xl object-cover"
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

                                        <div>

                                            <p className="font-semibold">
                                                {contest.creatorName}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                {contest.creatorEmail}
                                            </p>

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

                                        <div className="flex items-center gap-2">

                                            {
                                                contest.status === "pending" && (
                                                    <>
                                                        <button
                                                            onClick={() => handleApprove(contest._id)}
                                                            className="p-3 rounded-xl bg-green-100 text-green-600 hover:bg-green-200"
                                                        >
                                                            <FaCheck />
                                                        </button>

                                                        <button
                                                            onClick={() => handleReject(contest._id)}
                                                            className="p-3 rounded-xl bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                                                        >
                                                            <FaTimes />
                                                        </button>
                                                    </>
                                                )
                                            }

                                            <button
                                                onClick={() => handleDelete(contest._id)}
                                                className="p-3 rounded-xl bg-red-100 text-red-600 hover:bg-red-200"
                                            >
                                                <FaTrash />
                                            </button>

                                        </div>

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

export default ManageContests;