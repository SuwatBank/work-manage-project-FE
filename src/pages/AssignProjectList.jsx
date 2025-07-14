import React, { useEffect } from 'react'
import userManageStore from '../stores/userManageStore'
import projectManageStore from '../stores/projectManageStore'
import useUserStore from '../stores/userStore'

function AssignProjectList() {
  const token = useUserStore(state => state.token)
  const user = useUserStore(state => state.user)
  const assignProject = projectManageStore(state => state.assignProject)
  const projects = projectManageStore(state => state.projects)
  console.log('projects', projects)
  console.log('token', token)
  console.log('user', user)

  useEffect(() => {
    const run = async () => {
      await assignProject(user.id, token)
    }
    run()
  }, [])

  return (
    <>
      <div>
        <h1 className='text-2xl font-bold mt-5 mb-5'>Assign project List</h1>
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
                <th>Assign to</th>
                <th>Project status</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {projects.map((project) =>
                <tr key={project.id}>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">{project.name}</div>
                        <div className="text-sm opacity-50">{project.detail}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={project.priority == 1 ? "badge badge-error badge-lg text-white" : project.priority == 2 ? "badge badge-warning badge-lg text-white" : "badge badge-success badge-lg text-white"}>
                      {project.priority == 1 ? "High" : project.priority == 2 ? "Medium" : "Low"}
                    </span>
                  </td>
                  <td>
                    {new Date(project.dueDate).toLocaleDateString()}
                  </td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                  <td>
                    <span className="badge badge-warning badge-lg text-white">In process</span>
                  </td>
                </tr>

              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default AssignProjectList