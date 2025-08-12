import React, { useEffect } from 'react'
import useUserStore from '../stores/userStore'
import taskManageStore from '../stores/taskManageStore';

function SubmitList() {
  const token = useUserStore(state => state.token);
  const user = useUserStore(state => state.user);
  const tasks = taskManageStore(state => state.submitList);
  const submitList = taskManageStore(state => state.submitTaskList);

  useEffect(() => {
    const run = async () => {
      await submitList(user.id, token)
    }
    run()
  }, []);
  console.log('task', tasks)
  if (tasks.length > 0) {
    return (
      <>
        <div>
          <h1 className='text-2xl font-bold mt-5 mb-5'>Submit List</h1>
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
                  <th>Submit to</th>
                  <th>Submit status</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {tasks.map((task) => {
                  <tr>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-bold"></div>
                          <div className="text-sm opacity-50">project detail</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={task.priority == 1 ? "badge badge-error badge-lg text-white" : task.priority == 2 ? "badge badge-warning badge-lg text-white" : "badge badge-success badge-lg text-white"}>
                        {task.priority == 1 ? "High" : task.priority == 2 ? "Medium" : "Low"}
                      </span>
                    </td>
                    <td></td>
                    <th>
                      <button className="btn btn-ghost btn-xs">details</button>
                    </th>
                    <td>
                      <span className="badge badge-warning badge-lg text-white">In process</span>
                    </td>
                  </tr>
                })}

              </tbody>
            </table>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='p-5 shadow-2xl rounded-xl'>
          <h1 className='text-2xl text-green-400 font-bold'>You have no submit Task right now</h1>
        </div>
      </div>
    )
  }

}

export default SubmitList