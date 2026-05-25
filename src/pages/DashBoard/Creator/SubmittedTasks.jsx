import { useQuery } from "@tanstack/react-query";
import { FaTrophy } from "react-icons/fa";
import Swal from "sweetalert2";

import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SubmittedTasks = () => {

  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const {
    data: submissions = [],
    refetch,
  } = useQuery({
    queryKey: ["creator-submissions", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {

      const res = await axiosSecure.get(
        `/submissions/creator/${user.email}`
      );

      return res.data;
    },
  });

  const handleDeclareWinner = id => {

    Swal.fire({
      title: "Declare winner?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then(result => {

      if (result.isConfirmed) {

        axiosSecure.patch(`/submissions/winner/${id}`)
          .then(res => {

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

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">

      <h1 className="text-3xl font-bold mb-8">
        Submitted Tasks
      </h1>

      <div className="overflow-x-auto">

        <table className="w-full min-w-[900px]">

          <thead>

            <tr className="bg-gray-100">

              <th className="p-4">Contest</th>

              <th className="p-4">Participant</th>

              <th className="p-4">Task Link</th>

              <th className="p-4">Status</th>

              <th className="p-4">Action</th>

            </tr>

          </thead>

          <tbody>

            {
              submissions.map(submission => (

                <tr
                  key={submission._id}
                  className="border-b"
                >

                  <td className="p-4">
                    {submission.contestName}
                  </td>

                  <td className="p-4">

                    <div>
                      <p className="font-semibold">
                        {submission.participantName}
                      </p>

                      <p className="text-sm text-gray-500">
                        {submission.participantEmail}
                      </p>
                    </div>

                  </td>

                  <td className="p-4">

                    <a
                      href={submission.taskLink}
                      target="_blank"
                      className="text-indigo-600 underline"
                    >
                      View Submission
                    </a>

                  </td>

                  <td className="p-4">

                    {
                      submission.isWinner ? (
                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                          Winner
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                          Pending
                        </span>
                      )
                    }

                  </td>

                  <td className="p-4">

                    {
                      !submission.isWinner && (
                        <button
                          onClick={() =>
                            handleDeclareWinner(submission._id)
                          }
                          className="p-3 rounded-xl bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                        >
                          <FaTrophy />
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

export default SubmittedTasks;