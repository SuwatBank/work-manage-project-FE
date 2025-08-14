import useUserStore from '../stores/userStore'
import taskManageStore from '../stores/taskManageStore';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function ApproveList() {
  const token = useUserStore(state => state.token);
  const user = useUserStore(state => state.user);
  const tasks = taskManageStore(state => state.submitList);
  const submitList = taskManageStore(state => state.submitTaskList);
  const updateTask = taskManageStore(state => state.updateTask);
  const [updateStatus, setUpdateStatus] = useState(false)

  useEffect(() => {
    const run = async () => {
      await submitList(user.id, token)
    }
    run()
  }, [updateStatus]);
  console.log('tasks', tasks)

  const hdlupdateTask = async(taskId, taskStatus) => {
    try {
      const data = {taskStatus: taskStatus}
      console.log(data);
      const response = await updateTask(taskId, data, token);
      setUpdateStatus(!updateStatus)
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div>
        <h1 className='text-2xl font-bold mt-5 mb-5'>Approval List</h1>
        <div className="rounded-2xl shadow-2xl">
          <table className="table pb-6 ">
            {/* head */}
            <thead>
              <tr>
                <th >Taskname</th>
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
              {tasks.map((task) => 
                <tr>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">{task.name}</div>
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
                  <th>
                    <button className="btn btn-ghost btn-xs">{new Date(task.dueDate).toLocaleDateString("th-th")}</button>
                  </th>
                  <td>
                    <span className="badge badge-warning badge-lg text-white">{task.taskStatus}</span>
                  </td>
                  <td>
                    <div className="dropdown dropdown-center dropdown-end">
                      <button className="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path> </svg>
                      </button>
                      <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm abs ">
                        <li className='p-3 cursor-pointer hover:bg-base-300' onClick={() => hdlupdateTask(task.id, "APPROVE")}>Approve Project</li>
                        <li className='p-3 cursor-pointer hover:bg-base-300' onClick={() => hdlupdateTask(task.id, "REJECT")}>Reject Project</li>
                      </ul>
                    </div>
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

export default ApproveList