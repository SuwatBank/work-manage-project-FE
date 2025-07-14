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

const guestRouter = createBrowserRouter([
  {path : "/", element: <Login/>},
  {path : "/register", element: <Register/>},
  {path : "*", element: <Navigate to="/"/>}
])

const userRouter = createBrowserRouter([
  {path : "/", element: <UserSidebar/>,
  children: [
    {path : "/", element: <Home/>},
    {path : "/profile", element: <Profile/>},
    {path : "/dashboard", element: <Dashboard/>},
    {path : "/projectlist", element: <ProjectList/>},
    {path : "/pendinglist", element: <RequestPendingList/>},
    {path : "/submitlist", element: <SubmitList/>},
    {path : "/approvallist", element: <ApprovalList/>},
    {path : "/assignproject", element: <AssignProjectList/>},
    {path : "/addproject", element: <AddProject/>},
    {path : "/userlist", element: <UserList/>},
    {path : "/memberlist", element: <MemberList/>},
    {path : "/userlist/updateUser", element: <UpdateUserForm/>},
  ]
  }
])

function AppRouter(){
  const user = useUserStore(state => state.user)
  const selectRouter = user ? userRouter : guestRouter
  return(
    <RouterProvider router={selectRouter}/>
  )
}

export default AppRouter
