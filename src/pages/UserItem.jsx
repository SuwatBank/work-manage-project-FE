import { toast } from 'react-toastify'
import userManageStore from '../stores/userManageStore'
import { useState } from 'react'
import { Link } from 'react-router'

function UserItem({ user }) {
  const [close, setClose] = useState(false)
  const handleClose = () => {
    setClose(prv => !prv)
  }
  console.log(user)
  const deleteUser = userManageStore(state => state.deleteUser)

  
  const handleDelete = async () => {
    try {
      const response = await deleteUser(user.id)
      toast.success(response.data.message)
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message
      toast(errorMessage)
    }
  }

  return (
    <>
      <li className='list-none grid grid-cols-6 gap-4 border mb-4 p-4 rounded-xl drop-shadow-2xl'>
        <div className='col-start-1 col-end-4 mb-4'>
          <div className='text-xl'><b>Firstname :</b> {user.firstName}</div>
          <div className='text-xl'><b>Lastname :</b> {user.lastName}</div>
          <div className="text-lg uppercase"><b>Department :</b> {user.department}</div>
          <div className="text-lg uppercase"><b>Phone no :</b> {user.phoneNo}</div>
          <div className="text-lg uppercase"><b>Role :</b> {user.role}</div>
        </div>
        <Link className="btn btn-warning mr-2 col-start-4 col-end-5" to={"updateUser"}><button>Edit</button></Link>
        <button onClick={() => document.getElementById("delete-form").showModal()} className="btn btn-error mr-2 col-start-5 col-end-6">Delete</button>
      </li>
      <dialog id='delete-form' className='modal' onClose={handleClose}>
        <div className="modal-box">
          <div className='flex flex-col items-center'>
            <h1 className='text-xl mb-5 mt-5 font-bold'>Are you sure that you want to delete this user?</h1>
            <div className="flex flex-row gap-10 justify-center">
              <button className='border p-3 rounded-xl bg-success border-success cursor-pointer font-bold text-white hover:text-black hover:bg-green-100 hover:border-green-100' onClick={handleDelete}>Confirm</button>
              <button className='border p-3 rounded-xl bg-error border-error cursor-pointer font-bold text-white hover:text-black hover:bg-red-100 hover:border-red-100' onClick={() => document.getElementById("delete-form").close()}>Cancel</button>
            </div>
            <button onClick={() => document.getElementById("delete-form").close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default UserItem