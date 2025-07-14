import { useEffect } from 'react'
import useUserStore from '../stores/userStore'
import projectManageStore from '../stores/projectManageStore'

function Home() {
  const token = useUserStore(state => state.token)
  const user = useUserStore(state => state.user)
 
  const allProjects = projectManageStore(state => state.getProject)
  const projects = projectManageStore(state => state.projects)
  console.log(typeof projects)


  useEffect(() => {
    const run = async () => {
      await allProjects(user.id, token)
    }
    run()
  }, [])
  return (
      <div>
        <div>
          <h2 className='font-bold text-2xl mb-5'>Project near due date</h2>
          <div className='flex flex-row'>
            <div className="card card-border bg-base-300 w-96 mb-5 mr-5">
              <div className="card-body">
                <h2 className="card-title">Project Title 1</h2>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                <p className='font-bold underline'>Due date : xx/xx/xxxx</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Submit</button>
                </div>
              </div>
            </div>
            <div className="card card-border bg-base-300 w-96 mb-5">
              <div className="card-body">
                <h2 className="card-title">Project Title 2</h2>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                <p className='font-bold underline'>Due date : xx/xx/xxxx</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className='font-bold text-2xl mb-5'>New coming project</h2>
          <div className='flex flex-row'>
            <div className="card card-border bg-base-300 w-96 mb-5 mr-5">
              <div className="card-body">
                <h2 className="card-title">Project Title 1</h2>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                <p className='font-bold underline'>Due date : xx/xx/xxxx</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Submit</button>
                </div>
              </div>
            </div>
            <div className="card card-border bg-base-300 w-96 mb-5">
              <div className="card-body">
                <h2 className="card-title">Project Title 2</h2>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                <p className='font-bold underline'>Due date : xx/xx/xxxx</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Home