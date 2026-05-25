import { createBrowserRouter } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import Mainlayout from "../layouts/Mainlayout";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

import ContestDetails from "../pages/ContestDetails/ContestDetails";
import Payment from "../pages/Payment/Payment";

import DashboardHome from "../pages/DashBoard/DashBoardHome";

import ManageContests from "../pages/DashBoard/Admin/ManageContests";
import ManageUsers from "../pages/DashBoard/Admin/ManageUsers";
import SubmittedTasks from "../pages/DashBoard/Admin/SubmittedTasks";

import AddContest from "../pages/DashBoard/Creator/AddContest";
import MyCreatedContests from "../pages/DashBoard/Creator/MyCreatedContests";

import MySubmittedTasks from "../pages/DashBoard/User/MySubmittedTasks";
import MyWinning from "../pages/DashBoard/User/MyWinning";

import Leaderboard from "../pages/Home/Leaderboard";
import PopularContests from "../pages/Home/PopularContests";

import AllContests from "../pages/AllContests/AllContests";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AdminRoute from "../routes/AdminRoutes";
import CreatorRoute from "../routes/CreatorRoutes";
import PrivateRoute from "../routes/PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/contest/:id",
        element: (
          <PrivateRoute>
            <ContestDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment/:id",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: "/leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "/all-contests",
        element: <PopularContests />,
      },
      {
        path: "/all-contests",
        element: <AllContests />,
      }
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },

      // ADMIN
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-contests",
        element: (
          <AdminRoute>
            <ManageContests />
          </AdminRoute>
        ),
      },
      {
        path: "submitted-tasks",
        element: (
          <AdminRoute>
            <SubmittedTasks />
          </AdminRoute>
        ),
      },

      // CREATOR
      {
        path: "add-contest",
        element: (
          <CreatorRoute>
            <AddContest />
          </CreatorRoute>
        ),
      },
      {
        path: "my-created-contests",
        element: (
          <CreatorRoute>
            <MyCreatedContests />
          </CreatorRoute>
        ),
      },

      // USER
      {
        path: "my-submitted-tasks",
        element: <MySubmittedTasks />,
      },
      {
        path: "my-winning",
        element: <MyWinning />,
      },
    ],
  },
]);

export default router;