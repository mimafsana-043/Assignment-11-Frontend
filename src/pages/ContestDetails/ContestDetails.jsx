import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import LoadingSpinner from "../../Components/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ContestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useAuth();

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const [taskLink, setTaskLink] = useState("");

  const {
    data: contest = null,
    isLoading,
  } = useQuery({
    queryKey: ["contest-details", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosPublic.get(`/contests/${id}`);
      return res.data;
    },
  });

  const { data: paymentStatus = {} } = useQuery({
    queryKey: ["payment-check", id, user?.email],
    enabled: !!id && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payments/check/${id}/${user.email}`
      );

      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  if (!contest) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Contest not found
      </div>
    );
  }

  const isEnded = contest.deadline
    ? new Date(contest.deadline) < new Date()
    : false;

  const handlePaymentNavigate = () => {
    if (isEnded) {
      return Swal.fire({
        icon: "info",
        title: "Contest Ended",
        text: "You cannot register for this contest anymore.",
      });
    }

    navigate(`/payment/${id}`);
  };

  const handleSubmitTask = () => {
    if (!taskLink) {
      return Swal.fire("Error", "Please add your task link", "error");
    }

    const submission = {
      contestId: id,
      contestName: contest.name,
      participantName: user?.displayName,
      participantEmail: user?.email,
      participantPhoto: user?.photoURL,
      taskLink,
    };

    axiosSecure
      .post("/submissions", submission)
      .then(res => {
        if (res.data.insertedId) {
          Swal.fire("Success", "Task submitted successfully", "success");
          setTaskLink("");
        } else {
          Swal.fire("Info", res.data.message, "info");
        }
      })
      .catch(error => {
        Swal.fire({
          icon: "error",
          title: "Submit failed",
          text: error.response?.data?.message || error.message,
        });
      });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <img
        src={contest.image}
        alt={contest.name}
        className="w-full h-[260px] md:h-[420px] object-cover rounded-3xl shadow-xl"
      />

      <div className="grid md:grid-cols-3 gap-8 mt-10">
        <div className="md:col-span-2 bg-white p-6 md:p-8 rounded-2xl shadow">
          <h1 className="text-3xl md:text-4xl font-bold">
            {contest.name}
          </h1>

          <p className="mt-4 text-gray-600">
            {contest.description}
          </p>

          <div className="mt-8">
            <h3 className="text-xl font-bold mb-2">
              Task Instruction
            </h3>

            <p className="text-gray-600">
              {contest.taskInstruction}
            </p>
          </div>

          {contest.winnerName && (
            <div className="mt-8 p-5 rounded-2xl bg-green-50">
              <h3 className="font-bold text-green-700">
                Winner
              </h3>

              <div className="flex items-center gap-3 mt-3">
                <img
                  src={contest.winnerPhoto || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt={contest.winnerName}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <p>{contest.winnerName}</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow h-fit">
          <p className="text-gray-500">Contest Type</p>

          <h3 className="font-bold text-lg">
            {contest.contestType}
          </h3>

          <div className="mt-5">
            <p className="text-gray-500">Entry Fee</p>

            <h3 className="text-xl font-bold">
              ${contest.price}
            </h3>
          </div>

          <div className="mt-5">
            <p className="text-gray-500">Prize Money</p>

            <h3 className="text-3xl font-bold text-indigo-600">
              ${contest.prizeMoney}
            </h3>
          </div>

          <div className="mt-5">
            <p className="text-gray-500">Participants</p>

            <h3 className="font-bold">
              {contest.participantsCount || 0}
            </h3>
          </div>

          <div className="mt-5">
            <p className="text-gray-500">Deadline</p>

            <h3 className="font-bold">
              {isEnded ? "Contest Ended" : contest.deadline}
            </h3>
          </div>

          {!paymentStatus.paid ? (
            <button
              type="button"
              onClick={handlePaymentNavigate}
              className={`block w-full text-center mt-6 py-3 rounded-xl text-white font-semibold ${
                isEnded
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              Register / Pay
            </button>
          ) : (
            <div className="mt-6">
              <p className="mb-2 font-semibold text-green-600">
                Registered Successfully
              </p>

              <textarea
                rows="4"
                value={taskLink}
                onChange={(e) => setTaskLink(e.target.value)}
                placeholder="Submit your task link..."
                className="w-full border rounded-xl p-3"
              />

              <button
                onClick={handleSubmitTask}
                className="w-full mt-3 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
              >
                Submit Task
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContestDetails;