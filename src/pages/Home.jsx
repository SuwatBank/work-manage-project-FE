import { useEffect } from 'react'
import useUserStore from '../stores/userStore'
import projectManageStore from '../stores/projectManageStore'
import ProjectNearDue from './ProjectNearDue'
import NewComingProject from './NewComingProject'

function Home() {
  const token = useUserStore(state => state.token)
  const user = useUserStore(state => state.user)
  const allProjects = projectManageStore(state => state.getProject)
  const projects = projectManageStore(state => state.projects)
  console.log("user", user)


  useEffect(() => {
    const run = async () => {
      await allProjects(user.id, token)
    }
    run()
  }, [])

  if(projects.length > 0){
    return (
        <div>
          <ProjectNearDue/>
          <div className="divider"></div>
          <NewComingProject/>
        </div>
    )

  }else {
    return(
      <div className='flex justify-center items-center h-screen'>
        <div className='p-5 shadow-2xl rounded-xl'>
          <h1 className='text-2xl text-green-400 font-bold'>You have no assign project right now</h1>
        </div>
      </div>
    )
  }
}

export default Home