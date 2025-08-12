import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import UserSidebar from "../layout/UserSidebar";
import Dashboard from "../pages/Dashboard";
import ProjectList from "../pages/ProjectList";
import Profile from "../pages/Profile";
import useUserStore from "../stores/userStore";
import RequestPendingList from "../pages/RequestPendingList";
import SubmitList from "../pages/SubmitList";
import ApprovalList from "../pages/ApprovalList";
import AddProject from "../pages/AddProject";
import UserList from "../pages/UserList";
import UpdateUserForm from "../pages/UpdateUserForm";
import AssignProjectList from "../pages/AssignProjectList";
import MemberList from "../pages/MemberList";
import TaskList from "../pages/TaskList";
import UserTaskList from "../pages/UserTaskList";

const guestRouter = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <Navigate to="/" /> }
]);

const userRouter = createBrowserRouter([
  {
    path: "/", element: <UserSidebar />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/profile", element: <Profile /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/projectlist", element: <ProjectList /> },
      { path: "/usertasklist", element: <UserTaskList /> },
      { path: "/profile/updateUser/:id", element: <UpdateUserForm /> },
      { path: "/pendinglist", element: <RequestPendingList /> },
      { path: "/submitlist", element: <SubmitList/> },
      { path: "/tasklist/:projectId", element: <TaskList /> },
      { path: "*", element: <Navigate to="/" /> }
    ]
  }
]);

const leaderRouter = createBrowserRouter([
  {
    path: "/", element: <UserSidebar />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/profile", element: <Profile /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/projectlist", element: <ProjectList /> },
      { path: "/usertasklist", element: <UserTaskList /> },
      { path: "/pendinglist", element: <RequestPendingList /> },
      { path: "/submitlist", element: <SubmitList /> },
      { path: "/approvallist", element: <ApprovalList /> },
      { path: "/assignproject", element: <AssignProjectList /> },
      { path: "/profile/updateUser/:id", element: <UpdateUserForm /> },
      { path: "/addproject", element: <AddProject /> },
      { path: "/tasklist/:projectId", element: <TaskList /> },
      { path: "/memberlist", element: <MemberList /> },
      { path: "*", element: <Navigate to="/" /> }
    ]
  }
]);

const adminRouter = createBrowserRouter([
  {
    path: "/", element: <UserSidebar />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/profile", element: <Profile /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/projectlist", element: <ProjectList /> },
      { path: "/pendinglist", element: <RequestPendingList /> },
      { path: "/userlist", element: <UserList /> },
      { path: "/userlist/updateUser/:id", element: <UpdateUserForm /> },
      { path: "*", element: <Navigate to="/" /> }
    ]
  }
]);

function AppRouter() {
  const user = useUserStore(state => state.user)
  // const selectRouter = user ? userRouter : guestRouter;

  const selectRouter = (
    user?.role == "ADMIN" ? adminRouter 
    : user?.role == "LEADER" ? leaderRouter 
    : user?.role == "USER" ? userRouter 
    : guestRouter
  );

  return (
    <RouterProvider router={selectRouter} />
  )
}

export default AppRouter
