import useRole from "../../hooks/useRole";

const DashboardHome = () => {
  const [role] = useRole();

  return (
    <div className="bg-white p-8 rounded-2xl shadow">
      <h1 className="text-3xl font-bold mb-2">Welcome to Dashboard</h1>
      <p className="text-gray-500">Your current role is: <span className="font-bold text-indigo-600">{role}</span></p>
    </div>
  );
};

export default DashboardHome;