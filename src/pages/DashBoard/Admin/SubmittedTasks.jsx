import { useQuery } from "@tanstack/react-query";
import { FaExternalLinkAlt, FaTrophy } from "react-icons/fa";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SubmittedTasks = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: submissions = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["admin-submissions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/submissions");
      return res.data;
    },
  });

  const handleDeclareWinner = id => {
    Swal.fire({
      title: "Declare winner?",
      text: "This participant will become winner for this contest.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, declare",
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/submissions/winner/${id}`).then(res => {
          if (res.data.success) {
            Swal.fire({
              icon: "success",
              title: "Winner declared",
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
    return <div className="text-center py-10"><LoadingSpinner></LoadingSpinner></div>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Submitted Tasks
        </h1>
        <p className="text-gray-500 mt-1">
          Review submissions and declare winners.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-4 rounded-l-xl">#</th>
              <th className="p-4">Contest</th>
              <th className="p-4">Participant</th>
              <th className="p-4">Task</th>
              <th className="p-4">Status</th>
              <th className="p-4 rounded-r-xl">Action</th>
            </tr>
          </thead>

          <tbody>
            {submissions.map((submission, index) => (
              <tr key={submission._id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-semibold">{index + 1}</td>

                <td className="p-4">
                  <p className="font-semibold">{submission.contestName}</p>
                  <p className="text-xs text-gray-500">
                    ID: {submission.contestId}
                  </p>
                </td>

                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        submission.participantPhoto ||
                        "https://i.ibb.co/4pDNDk1/avatar.png"
                      }
                      alt=""
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">
                        {submission.participantName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {submission.participantEmail}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="p-4">
                  <a
                    href={submission.taskLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-indigo-600 font-semibold underline"
                  >
                    View Task <FaExternalLinkAlt />
                  </a>
                </td>

                <td className="p-4">
                  {submission.isWinner ? (
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                      Winner
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                      Pending
                    </span>
                  )}
                </td>

                <td className="p-4">
                  {!submission.isWinner ? (
                    <button
                      onClick={() => handleDeclareWinner(submission._id)}
                      className="p-3 rounded-xl bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                    >
                      <FaTrophy />
                    </button>
                  ) : (
                    <span className="text-green-600 font-semibold">
                      Declared
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {submissions.length === 0 && (
          <p className="text-center py-8 text-gray-500">
            No submissions found.
          </p>
        )}
      </div>
    </div>
  );
};

export default SubmittedTasks;