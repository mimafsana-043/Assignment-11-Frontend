import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddContest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = data => {
    const contestInfo = {
      name: data.name,
      image: data.image,
      description: data.description,
      price: data.price,
      prizeMoney: data.prizeMoney,
      taskInstruction: data.taskInstruction,
      contestType: data.contestType,
      deadline: data.deadline,
      creatorName: user?.displayName,
    };

    axiosSecure.post("/contests", contestInfo)
      .then(res => {
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Contest added successfully",
            text: "Your contest is now pending for admin approval.",
            timer: 1800,
            showConfirmButton: false,
          });

          reset();
        }
      })
      .catch(error => {
        Swal.fire({
          icon: "error",
          title: "Failed to add contest",
          text: error.response?.data?.message || error.message,
        });
      });
  };
  

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Add New Contest
        </h1>
        <p className="text-gray-500 mt-2">
          Create a contest and submit it for admin approval.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div>
          <label className="block font-semibold mb-2">Contest Name</label>
          <input
            type="text"
            placeholder="e.g. Logo Design Challenge"
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
            {...register("name", { required: true })}
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Image URL</label>
          <input
            type="text"
            placeholder="https://..."
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
            {...register("image", { required: true })}
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Entry Price</label>
          <input
            type="number"
            placeholder="20"
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
            {...register("price", { required: true })}
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Prize Money</label>
          <input
            type="number"
            placeholder="500"
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
            {...register("prizeMoney", { required: true })}
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Contest Type</label>
          <select
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
            {...register("contestType", { required: true })}
          >
            <option value="">Select type</option>
            <option value="Image Design">Image Design</option>
            <option value="Article Writing">Article Writing</option>
            <option value="Business Idea">Business Idea</option>
            <option value="Gaming Review">Gaming Review</option>
            <option value="Marketing Strategy">Marketing Strategy</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-2">Deadline</label>
          <input
            type="date"
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
            {...register("deadline", { required: true })}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold mb-2">Contest Description</label>
          <textarea
            rows="4"
            placeholder="Write a clear description about this contest..."
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
            {...register("description", { required: true })}
          ></textarea>
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold mb-2">Task Instruction</label>
          <textarea
            rows="4"
            placeholder="Tell participants what they need to submit..."
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
            {...register("taskInstruction", { required: true })}
          ></textarea>
        </div>

        <div className="md:col-span-2">
          <button className="w-full md:w-auto px-8 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700">
            Submit Contest
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddContest;