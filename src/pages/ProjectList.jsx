import { useEffect, useState } from 'react'
import SubmitPage from './SubmitPage'
import projectManageStore from '../stores/projectManageStore'
import useUserStore from '../stores/userStore'

function ProjectList() {
  const [close, setClose] = useState(false)
  const token = useUserStore(state => state.token)
  const user = useUserStore(state => state.user)
  const handleClose = () => {
    setClose(prv => !prv)
  }

  const allProjects = projectManageStore(state => state.getProject)
  const projects = projectManageStore(state => state.projects)
  console.log(projects)


  useEffect(() => {
    const run = async () => {
      await allProjects(user.id, token)
    }
    run()
  }, [])

  if(projects.length > 0) {
  return (
    <div>
      <h1 className='text-2xl font-bold mt-5 mb-5'>ProjectList</h1>
      <div className="overflow-x-auto rounded-2xl shadow-2xl">
        <table className="table pb-6 ">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Taskname</th>
              <th className='w-1/5'>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Priority</legend>
                  <select defaultValue="Pick a browser" className="select">
                    <option disabled={true}>Sort priority</option>
                    <option>Highest to lowest</option>
                    <option>Lowest to hightest</option>
                  </select>
                </fieldset>
              </th>
              <th className='w-1/5'>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Due date</legend>
                  <select defaultValue="Pick a browser" className="select">
                    <option disabled={true}>Sort priority</option>
                    <option>Ascending Order</option>
                    <option>Decending Order</option>
                  </select>
                </fieldset>
              </th>
              <th>Assignee</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {projects.map((project) =>
              <tr key={project.ProjectList.id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">{project.ProjectList.name}</div>
                      <div className="text-sm opacity-50">{project.ProjectList.detail}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={project.ProjectList.priority == 1 ? "badge badge-error badge-lg text-white" : project.ProjectList.priority == 2 ? "badge badge-warning badge-lg text-white" : "badge badge-success badge-lg text-white"}>
                    {project.ProjectList.priority == 1 ? "High" : project.ProjectList.priority == 2 ? "Medium" : "Low"}
                  </span>
                </td>
                <td>{new Date(project.ProjectList.dueDate).toLocaleDateString("th-th")}</td>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
                <td>
                  <span className="badge badge-warning badge-lg text-white">In process</span>
                </td>
                <td>
                  <div className="dropdown dropdown-center dropdown-end">
                    <button className="btn btn-square btn-ghost">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path> </svg>
                    </button>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                      <li><a>Request pending</a></li>
                      <li><button onClick={() => document.getElementById("submit-form").showModal()}>Submit</button></li>
                    </ul>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <dialog id='submit-form' className='modal' onClose={handleClose}>
        <div className="modal-box">
          <SubmitPage close={close} />
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
        </div>
      </dialog>
    </div>
  )
  } else {
    return (
      <div>
        <h1 className='text-2xl text-green-400'>You have no assign project right now</h1>
      </div>
    )
  }
}

export default ProjectList