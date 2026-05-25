import { useQuery } from "@tanstack/react-query";
import { FaExternalLinkAlt } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MySubmittedTasks = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: submissions = [], isLoading } = useQuery({
    queryKey: ["my-submissions", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/submissions/user/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-10">Loading submissions...</div>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        My Submitted Tasks
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-4 rounded-l-xl">#</th>
              <th className="p-4">Contest</th>
              <th className="p-4">Task</th>
              <th className="p-4 rounded-r-xl">Status</th>
            </tr>
          </thead>

          <tbody>
            {submissions.map((submission, index) => (
              <tr key={submission._id} className="border-b hover:bg-gray-50">
                <td className="p-4">{index + 1}</td>

                <td className="p-4 font-semibold">
                  {submission.contestName}
                </td>

                <td className="p-4">
                  <a
                    href={submission.taskLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-indigo-600 underline font-semibold"
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
                      Submitted
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {submissions.length === 0 && (
          <p className="text-center py-8 text-gray-500">
            No submitted tasks found.
          </p>
        )}
      </div>
    </div>
  );
};

export default MySubmittedTasks;