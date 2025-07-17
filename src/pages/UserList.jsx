import React, { useEffect } from 'react'
import userManageStore from '../stores/userManageStore'
import UserItem from './UserItem'
import useUserStore from '../stores/userStore'
import { toast } from 'react-toastify'

function UserList() {
  const token = useUserStore(state => state.token)
  const users = userManageStore(state => state.users)
  const getAllUsers = userManageStore(state => state.getAllUsers)
  const deleteUser = userManageStore(state => state.deleteUser);
  useEffect(() => {
    const run = async () => {
      await getAllUsers(token)
    }
    run()
  }, [])

  console.log(users);

  const handleDelete = async (id) => {
    try {
      console.log(id)
      const response = await deleteUser(id)
      toast.success(response.data.message)
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message
      toast(errorMessage)
    }
  }

  return (
    <div>
      <h1 className='text-2xl font-bold'>List of users</h1>
      <div className="divider"></div>
      {users.map(user => (
        <UserItem key={user.id} user={user} onDelete={handleDelete} />
      ))}
    </div>
  )
}

export default UserList