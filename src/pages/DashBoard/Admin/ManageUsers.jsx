import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleRoleChange = (id, role) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Change this user role to ${role}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, change it",
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/role/${id}`, { role })
          .then(res => {
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                icon: "success",
                title: "Role updated successfully",
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Manage Users
          </h1>
          <p className="text-gray-500 mt-1">
            Control user roles and dashboard access.
          </p>
        </div>

        <div className="px-5 py-3 rounded-xl bg-indigo-50 text-indigo-600 font-bold">
          Total Users: {users.length}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[750px]">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left">
              <th className="p-4 rounded-l-xl">#</th>
              <th className="p-4">User</th>
              <th className="p-4">Email</th>
              <th className="p-4">Current Role</th>
              <th className="p-4 rounded-r-xl">Change Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((singleUser, index) => (
              <tr
                key={singleUser._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium">{index + 1}</td>

                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={singleUser.photo || "https://i.ibb.co/4pDNDk1/avatar.png"}
                      alt={singleUser.name}
                      className="w-11 h-11 rounded-full object-cover border"
                    />

                    <div>
                      <p className="font-semibold text-gray-900">
                        {singleUser.name || "No Name"}
                      </p>
                      <p className="text-xs text-gray-500">
                        Joined user
                      </p>
                    </div>
                  </div>
                </td>

                <td className="p-4 text-gray-600">
                  {singleUser.email}
                </td>

                <td className="p-4">
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-indigo-100 text-indigo-700 capitalize">
                    {singleUser.role}
                  </span>
                </td>

                <td className="p-4">
                  <select
                    value={singleUser.role}
                    onChange={(e) =>
                      handleRoleChange(singleUser._id, e.target.value)
                    }
                    className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="user">User</option>
                    <option value="creator">Creator</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            No users found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;