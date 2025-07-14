import React, { useEffect } from 'react'
import userManageStore from '../stores/userManageStore'
import UserItem from './UserItem'

function UserList() {
  const users = userManageStore(state => state.users)
  const getAllUsers = userManageStore(state => state.getAllUsers)
  useEffect(() => {
    const run = async() => {
      await getAllUsers()
    }
    run()
  },[])
  console.log(getAllUsers)
  return (
    <div>
      <h1 className='text-2xl font-bold'>List of users</h1>
      <div className="divider"></div>
      {users.map(user => (
        <UserItem key={user.id} user={user}/>
      ))}
    </div>
  )
}

export default UserList