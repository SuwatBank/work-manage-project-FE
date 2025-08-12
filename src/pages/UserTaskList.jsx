import { useEffect, useState } from "react"
import taskManageStore from "../stores/taskManageStore"
import projectManageStore from "../stores/projectManageStore"
import useUserStore from "../stores/userStore"
import { useLocation, useParams } from "react-router"
import SubmitPage from "./SubmitPage"
import PendingPage from "./PendingPage"
import { toast } from "react-toastify"

function UserTaskList() {
  const { projectId } = useParams();
  const token = useUserStore(state => state.token)
  const allUserTask = taskManageStore(state => state.getAllUserTask)
  const removeTask = taskManageStore(state => state.removeTask)
  const user = useUserStore(state => state.user)
  const tasks = taskManageStore(state => state.userTasks)
  const [selectTask, setSelectTask] = useState(null)
  const [close, setClose] = useState(false)
  console.log(user)

  const handleClose = () => {
    setClose(prv => !prv)
  }

  const submitTask = (id) => {
    document.getElementById("submit-form").showModal()
    setSelectTask(id)
  }

  const deleteTask = async(id) => {
    try {
      const response = await removeTask(id)
      toast.success(response.data.message)
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message
      toast(errorMessage)
    }
  }

  useEffect(() => {
    const run = async () => {
      await allUserTask(user.id, token)
    }
    run()
  }, [])

  return (
    <>
      <div>
        <h1 className='text-2xl font-bold mt-5 mb-5'>Task List</h1>
        <div className="rounded-2xl shadow-2xl">
          <table className="table pb-6 ">
            {/* head */}
            <thead>
              <tr>
                <th>Taskname</th>
                <th className='w-1/5'>
                  Priority
                </th>
                <th className='w-1/5'>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Request date</legend>
                    <select defaultValue="Pick a browser" className="select">
                      <option disabled={true}>Sort priority</option>
                      <option>Ascending Order</option>
                      <option>Decending Order</option>
                    </select>
                  </fieldset>
                </th>
                <th>Due date</th>
                <th>Task Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {tasks.length > 0 ? (
                <>
                  {tasks.map((task) => {
                    return <tr key={task.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="font-bold">{task.name}</div>
                            <div className="text-sm opacity-50">{task.detail}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={task.priority == 1 ? "badge badge-error badge-lg text-white" : task.priority == 2 ? "badge badge-warning badge-lg text-white" : "badge badge-success badge-lg text-white"}>
                          {task.priority == 1 ? "High" : task.priority == 2 ? "Medium" : "Low"}
                        </span>
                      </td>
                      <td>
                        <div>{new Date(task.createAt).toLocaleDateString("th-th")}</div>
                      </td>
                      <td>
                        <div>{new Date(task.dueDate).toLocaleDateString("th-th")}</div>
                      </td>
                      <td>
                        {/* <span className="badge badge-warning badge-lg text-white">{task.status[0]?.taskStatus}</span> */}
                      </td>
                      <td>
                        <div className="dropdown dropdown-center dropdown-end">
                          <button className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path> </svg>
                          </button>
                          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm abs ">
                            <li><button onClick={() => document.getElementById("pending-form").showModal()}>Request pending</button></li>
                            <li><button onClick={() => submitTask(task.id)}>Submit</button></li>
                            {user.role == "LEADER" && 
                              <li><button onClick={() => deleteTask(task.id)}>Delete</button></li>
                            }
                          </ul>
                        </div>
                      </td>
                    </tr>
                  })}

                </>
              ) : (
                <tr>
                  <th>No tasks found</th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <dialog id='submit-form' className='modal' onClose={handleClose}>
          <div className="modal-box">
            <SubmitPage close={close} id={selectTask}/>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
          </div>
        </dialog>
        <dialog id='pending-form' className='modal' onClose={handleClose}>
          <div className="modal-box">
            <PendingPage close={close} />
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
          </div>
        </dialog>
      </div>
    </>
  )
}

export default UserTaskList