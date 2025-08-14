import { useEffect } from 'react'
import useUserStore from '../stores/userStore'
import projectManageStore from '../stores/projectManageStore'

function NewComingProject() {
  const token = useUserStore(state => state.token)
  const user = useUserStore(state => state.user)
  const newComingProject = projectManageStore(state => state.newComingProject)
  const projects = projectManageStore(state => state.projects)

  useEffect(() => {
    const run = async () => {
      await newComingProject(user.id, token)
    }
    run()
  }, [])
  console.log(projects)

  return (
    <div>
      <div>
        <h2 className='font-bold text-2xl mb-5'>New Coming project</h2>
        <div className='flex flex-row'>
          {projects.map((project) => {
            return(
            <div key={project.id} className="card bg-[#93DA97] w-96 mb-5 mr-5 shadow-2xl">
              <div className="card-body">
                <h2 className="card-title text-2xl font-bold mb-4">{project.name}</h2>
                <p>Detail : {project.detail}</p>
                <p className='font-bold underline'>Create date : {new Date(project.createAt).toLocaleDateString("th-th")}</p>
                <p className='font-bold underline mb-6'>Due date : {new Date(project.dueDate).toLocaleDateString("th-th")}</p>
                {/* <div className="card-actions justify-start">
                  <button className="btn btn-[#E8FFD7] ">Submit</button>
                </div> */}
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default NewComingProject