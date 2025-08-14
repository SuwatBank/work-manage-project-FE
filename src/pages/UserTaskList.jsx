import { useEffect, useState } from "react"
import taskManageStore from "../stores/taskManageStore"
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
  const [taskStatus, setTaskStatus] = useState(false)
  const [sortTask, setSortTask] = useState(tasks)
  console.log(user)
  console.log(tasks)

  const handleClose = () => {
    setClose(prv => !prv)
  }

  const submitTask = (id) => {
    document.getElementById("submit-form").showModal()
    setSelectTask(id)
    setTaskStatus(!taskStatus)
  }
  const pendingTask = (id) => {
    console.log(id);
    document.getElementById("pending-form").showModal()
    setSelectTask(id)
  }

  const deleteTask = async (id) => {
    try {
      const response = await removeTask(id)
      setTaskStatus(!taskStatus)
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
  }, [taskStatus])

  const hdlSelectPriority = (e) => {
    const sortPriority = [...tasks]
    if (e.target.value == "1") {
      setSortTask(sortPriority.sort((a, b) => a.priority - b.priority))
    }
    if (e.target.value == "2") {
      setSortTask(sortPriority.sort((a, b) => b.priority - a.priority))
    }
    if (e.target.value == "3") {
      setSortTask(sortPriority.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)))
    }
    if (e.target.value == "4") {
      setSortTask(sortPriority.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate)))
    }
  }
  if (tasks.length > 0) {
    return (
      <div>
        <h1 className='text-2xl font-bold mt-5 mb-5'>Task List</h1>
        <div className=" rounded-2xl shadow-2xl">
          <table className="table pb-6 ">
            {/* head */}
            <thead>
              <tr>
                <th>Task name</th>
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
                <th>Task Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {sortTask.length > 0 ? sortTask.map((task) => {
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
                  <td>{new Date(task.dueDate).toLocaleDateString("th-th")}</td>
                  <td>
                    <span className={task.taskStatus === "OVERDUE" ? "badge badge-error badge-lg text-white" : task.taskStatus === "APPROVE" ? "badge badge-success badge-lg text-white" : task.taskStatus === "ONGOING" || "ONAPPROVE" ? "badge badge-warning badge-lg text-white" : "badge badge-warning badge-lg text-white"}>{task.taskStatus}</span>
                  </td>
                  <td>
                    <div className="dropdown dropdown-center dropdown-end">
                      <button className="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path> </svg>
                      </button>
                      <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm abs ">
                        <li><button onClick={() => pendingTask(task.id)}>Request pending</button></li>
                        <li><button onClick={() => submitTask(task.id)}>Submit</button></li>
                        {user.role == "LEADER" &&
                          <li><button onClick={() => deleteTask(task.id)}>Delete</button></li>
                        }
                      </ul>
                    </div>
                  </td>
                </tr>
              }
              ) : tasks.map((task) => {
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
                  <td>{new Date(task.dueDate).toLocaleDateString("th-th")}</td>
                  <td>
                    <span className={task.taskStatus === "OVERDUE" ? "badge badge-error badge-lg text-white" : task.taskStatus === "APPROVE" ? "badge badge-success badge-lg text-white" : task.taskStatus === "ONGOING" || "ONAPPROVE" ? "badge badge-warning badge-lg text-white" : "badge badge-warning badge-lg text-white"}>{task.taskStatus}</span>
                  </td>
                  <td>
                    <div className="dropdown dropdown-center dropdown-end">
                      <button className="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path> </svg>
                      </button>
                      <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm abs ">
                        <li><button onClick={() => pendingTask(task.id)}>Request pending</button></li>
                        <li><button onClick={() => submitTask(task.id)}>Submit</button></li>
                        {user.role == "LEADER" &&
                          <li><button onClick={() => deleteTask(task.id)}>Delete</button></li>
                        }
                      </ul>
                    </div>
                  </td>
                </tr>
              }
              )}
            </tbody>
          </table>
        </div>
        <dialog id='submit-form' className='modal' onClose={handleClose}>
          <div className="modal-box">
            <SubmitPage close={close} id={selectTask} />
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
          </div>
        </dialog>
        <dialog id='pending-form' className='modal' onClose={handleClose}>
          <div className="modal-box">
            <PendingPage close={close} id={selectTask} />
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
          </div>
        </dialog>
      </div>
    )
  } else {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='p-5 shadow-2xl rounded-xl'>
          <h1 className='text-2xl text-green-400 font-bold'>You have no assign task right now</h1>
        </div>
      </div>
    )
  }
}

export default UserTaskList