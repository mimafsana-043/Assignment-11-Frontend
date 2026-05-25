import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-lg">
        <h1 className="text-6xl font-black text-indigo-600">404</h1>
        <h2 className="text-2xl font-bold mt-4">Page Not Found</h2>

        <p className="text-gray-500 mt-3">
          {error?.statusText || error?.message || "Something went wrong"}
        </p>

        <Link
          to="/"
          className="inline-block mt-6 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
        >
          Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;