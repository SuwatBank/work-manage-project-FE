import React, { useState,useEffect } from 'react'
import userManageStore from '../stores/userManageStore';
import projectManageStore from '../stores/projectManageStore';
import useUserStore from '../stores/userStore';
import UpdateProject from './UpdateProject';
import { Link } from 'react-router';

function AssignProjectList() {
  const token = useUserStore(state => state.token);
  const user = useUserStore(state => state.user);
  const assignProject = projectManageStore(state => state.assignProject);
  const projects = projectManageStore(state => state.assignProjects);
  const removeProject = projectManageStore(state => state.removeProject);
  const [hdlProject, setHdlProject] = useState(false)
  const [sortProject, setSortProject] = useState(projects)
  const [selectProject, setSelectProject] = useState(null);
  
  // console.log('projects', projects)
  // console.log('token', token)
  // console.log('selectProject', selectProject)
  // console.log('user', user)

  useEffect(() => {
    const run = async () => {
      await assignProject(user.id, token)
    }
    run()
  }, [hdlProject]);

  const handleClose = () => {
    setClose(prv => !prv)
  }

  const updateProject = (id) => {
    document.getElementById("update-form").showModal()
    setHdlProject(!hdlProject)
    setSelectProject(id)
  }

  const deleteProject = async(id) => {
    try {
      const response = await removeProject(id)
      setHdlProject(!hdlProject)
      toast.success(response.data.message)
    } catch (error) {
      console.log(error)
    }
  }

  const hdlSelectPriority = (e) => {
    const sortPriority = [...projects]
    if(e.target.value  == "1") {
      setSortProject(sortPriority.sort((a,b) => a.priority - b.priority))
    }
    if(e.target.value  == "2") {
      setSortProject(sortPriority.sort((a,b) => b.priority - a.priority))
    }
    if(e.target.value  == "3") {
      setSortProject(sortPriority.sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate)))
    }
    if(e.target.value  == "4") {
      setSortProject(sortPriority.sort((a,b) => new Date(b.dueDate) - new Date(a.dueDate)))
    }
  }

  return (
    <>
      <div>
        <h1 className='text-2xl font-bold mt-5 mb-5'>Assign project List</h1>
        <div className="rounded-2xl shadow-2xl">
          <table className="table pb-6 ">
            {/* head */}
            <thead>
              <tr>
                <th>Project name</th>
                <th className='w-1/5'>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Priority</legend>
                    <select defaultValue="Pick a browser" className="select" onChange={hdlSelectPriority}>
                      <option disabled={true}>Sort priority</option>
                      <option value={"1"}>Highest to lowest</option>
                      <option value={"2"}>Lowest to hightest</option>
                    </select>
                  </fieldset>
                </th>
                <th className='w-1/5'>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Due date</legend>
                    <select defaultValue="Pick a browser" className="select" onChange={hdlSelectPriority}>
                      <option disabled={true}>Sort priority</option>
                      <option value={"3"}>Ascending Order</option>
                      <option value={"4"}>Decending Order</option>
                    </select>
                  </fieldset>
                </th>
                <th>Task</th>
                <th>Project status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              
              {sortProject.length > 0 ? sortProject.map((project) => {
                const handleSelectProject = () => {
                  setSelectProject(project.id);
                  console.log("Project ID", project.id)
                }
                return <tr key={project.id}>
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
                    <button onClick={handleSelectProject} className="btn btn-ghost btn-s">
                    <Link to={{
                      pathname: `/tasklist/${project.id}`,
                      state: { id: selectProject }
                    }}>Task detail</Link>
                    </button>
                  </th>
                  <td>
                    <span className={project.projectStatus == "OVERDUE" ? "badge badge-error badge-lg text-white" : project.projectStatus == "ONGOING" ? "badge badge-warning badge-lg text-white" : "badge badge-success badge-lg text-white"}>{project.projectStatus}</span>
                  </td>
                  <td>
                    <div className="dropdown dropdown-center dropdown-end">
                      <button className="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path> </svg>
                      </button>
                      <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm abs ">
                        {user.role == "LEADER" &&
                        <div>
                          <li><button onClick={() => deleteProject(project.id)}>Remove Project</button></li>
                          <li><button onClick={() => updateProject(project.id)}>Update Project status</button></li>
                        </div>
                        }
                      </ul>
                    </div>
                  </td>
                </tr>
              }) : projects.map((project) => {
                const handleSelectProject = () => {
                  setSelectProject(project.id);
                  console.log("Project ID", project.id)
                }
                return <tr key={project.id}>
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
                    <button onClick={handleSelectProject} className="btn btn-ghost btn-s">
                    <Link to={{
                      pathname: `/tasklist/${project.id}`,
                      state: { id: selectProject }
                    }}>Task detail</Link>
                    </button>
                  </th>
                  <td>
                    <span className={project.projectStatus == "OVERDUE" ? "badge badge-error badge-lg text-white" : project.projectStatus == "ONGOING" ? "badge badge-warning badge-lg text-white" : "badge badge-success badge-lg text-white"}>{project.projectStatus}</span>
                  </td>
                  <td>
                    <div className="dropdown dropdown-center dropdown-end">
                      <button className="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path> </svg>
                      </button>
                      <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm abs ">
                        {user.role == "LEADER" &&
                        <div>
                          <li><button onClick={() => deleteProject(project.id)}>Remove Project</button></li>
                          <li><button onClick={() => updateProject(project.id)}>Update Project status</button></li>
                        </div>
                        }
                      </ul>
                    </div>
                  </td>
                </tr>
              })
              
              }
            </tbody>
          </table>
        </div>
        <dialog id='update-form' className='modal' onClose={handleClose}>
          <div className="modal-box">
            <UpdateProject close={close} id={selectProject} />
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
          </div>
        </dialog>
      </div>
    </>
  )
}

export default AssignProjectList