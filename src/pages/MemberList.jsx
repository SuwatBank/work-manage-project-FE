import { useEffect } from 'react'
import userManageStore from '../stores/userManageStore'
import MemberItems from './MemberItems'
import useUserStore from '../stores/userStore'

function MemberList() {
  const users = userManageStore(state => state.users)
  const user = useUserStore(state => state.user)
  const token = useUserStore(state => state.token)
  const getMembers = userManageStore(state => state.getMembers)
  useEffect(() => {
    const run = async() => {
      await getMembers(user.department, token)
    }
    run()
  },[])
  console.log(getMembers)
  console.log(users)
  return (
    <div>
      <h1 className='text-2xl font-bold'>List of users</h1>
      <div className="divider"></div>
      {users.map(user => (
        <MemberItems key={user.id} user={user}/>
      ))}
    </div>
  )
}

export default MemberList