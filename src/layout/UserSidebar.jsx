import { Link, Outlet } from 'react-router'
import useUserStore from '../stores/userStore'
import { AddworkIcon, ApprovalIcon, AssignIcon, DashboardIcon, HomeIcon, LogoutIcon, MemberIcon, PendingIcon, SubmitIcon, TaskIcon } from '../icons'

function UserSidebar() {
  const user = useUserStore(state => state.user)
  const logout = useUserStore(state => state.logout)
  return (
    <div className='flex'>
      <div className='flex shadow-2xl flex-col mr-7 h-screen bg-[#FAF6E9] items-center p-5'>
        <Link to={"profile"}>
          <div className="avatar flex flex-col items-center">
            <div className="w-20 rounded-full mt-5 mb-5">
              <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
            </div>
            <h1 className='text-xl mb-5'>{user.firstName}</h1>
          </div>
        </Link>
        <div className="divider"></div>
        <ul className='menu bg-[#FAF6E9]'>
          <li>
            <Link className='p-5 focus:bg-[#A0C878]' to={""}>
              <HomeIcon className="w-6" />
              Home
            </Link>
          </li>
          <li>
            <Link className='p-5 focus:bg-[#A0C878]' to={"dashboard"}>
              <DashboardIcon className="w-6" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link className='p-5 focus:bg-[#A0C878]' to={"projectlist"}>
              <TaskIcon className="w-6" />
              My Project
            </Link>
          </li>
          <li>
            <Link className='p-5 focus:bg-[#A0C878]' to={"usertasklist"}>
              <TaskIcon className="w-6" />
              My Task
            </Link>
          </li>

          {user.role == "USER" &&
            <li>
              <Link className='p-5 focus:bg-[#A0C878]' to={"pendinglist"}>
                <PendingIcon className="w-6" />
                Request pending
              </Link>
            </li>
          }
          {user.role == "USER" &&
            <li>
              <Link className='p-5 focus:bg-[#A0C878]' to={"submitlist"}>
                <SubmitIcon className="w-6" />
                Submit
              </Link>
            </li>
          }
          {user.role == "LEADER" &&
            <li>
              <Link className='p-5 focus:bg-[#A0C878]' to={"assignproject"}>
                <AssignIcon className="w-6" />
                Assign project list
              </Link>
            </li>
          }
          {user.role == "LEADER" &&
            <li>
              <Link className='p-5 focus:bg-[#A0C878]' to={"addproject"}>
                <AddworkIcon className="w-6" />
                Add project
              </Link>
            </li>
          }
          {user.role == "LEADER" &&
            <li>
              <Link className='p-5 focus:bg-[#A0C878]' to={"approvallist"}>
                <ApprovalIcon className="w-6" />
                Approval List
              </Link>
            </li>
          }
          {user.role == "LEADER" &&
            <li>
              <Link className='p-5 focus:bg-[#A0C878]' to={"pendinglist"}>
                <ApprovalIcon className="w-6" />
                Pending List
              </Link>
            </li>
          }
          {user.role == "LEADER" &&
            <li>
              <Link className='p-5 focus:bg-[#A0C878]' to={"memberlist"}>
                <MemberIcon className="w-6" />
                MemberList
              </Link>
            </li>
          }
          {user.role == "ADMIN" &&
            <li>
              <Link className='p-5 focus:bg-[#A0C878]' to={"userlist"}>
                <MemberIcon className="w-6" />
                UserList
              </Link>
            </li>
          }
          <div className="divider"></div>
          <li>
            <a className='p-5' onClick={logout}><LogoutIcon className="w-6" />Logout</a>
          </li>
        </ul>
      </div>
      <div className='w-5/6 mt-5'>
        <Outlet />
      </div>
    </div>
  )
}

export default UserSidebar