import { Link } from "react-router"
import useUserStore from "../stores/userStore"

function Profile() {
  const user = useUserStore(state => state.user)
  return (
    <div>
      <h1 className="text-2xl font-bold">Profile page</h1>
      <div className="divider"></div>
      <div className="grid grid-cols-10 gap-5 mb-5">
        <div className="col-start-1 col-end-2">
          <h2 className="text-xl font-bold">First Name</h2>
          <p className="text-xl">{user.firstName}</p>
        </div>
        <div className="col-start-3 col-end-4">
          <h2 className="text-xl font-bold">Last Name</h2>
          <p className="text-xl">{user.lastName}</p>
        </div>
      </div>
      <div className="grid grid-cols-10 gap-5 mb-5">
        <div className="col-start-1 col-end-2">
          <h2 className="text-xl font-bold">Department</h2>
          <p className="text-xl">{user.department}</p>
        </div>
        <div className="col-start-3 col-end-4">
          <h2 className="text-xl font-bold">Email</h2>
          <p className="text-xl">{user.email}</p>
        </div>
      </div>
      <div className="grid grid-cols-10 gap-5 mb-5">
        <div className="col-start-1 col-end-2">
          <h2 className="text-xl font-bold">Phone no.</h2>
          <p className="text-xl">{user.phoneNo}</p>
        </div>
        <div className="col-start-3 col-end-4">
          <h2 className="text-xl font-bold">Role</h2>
          <p className="text-xl">{user.role}</p>
        </div>
      </div>
      <div>
        <Link className="btn btn-warning mr-2 col-start-4 col-end-5" to={`updateUser/${user.id}`}><button>Edit Profile</button></Link>
        {/* <button className="p-5 bg-amber-300">Edit Profile</button> */}
      </div>
      <dialog id="edit-form" className="modal">
        <div className="modal-box">
          {/* <AddTask close={close} /> */}
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
        </div>
      </dialog>
    </div>
  )
}

export default Profile