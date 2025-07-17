import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import userManageStore from '../stores/userManageStore'
import useUserStore from '../stores/userStore'
import taskManageStore from '../stores/taskManageStore.js'
import { toast } from 'react-toastify'

function AddTask({ close, id }) {
  const token = useUserStore(state => state.token)
  const allUsers = userManageStore(state => state.users)
  const currUser = useUserStore(state => state.user)
  const sortUsers = allUsers.filter(user => user.role !== "ADMIN" && user.department.toLowerCase() == currUser.department.toLowerCase() && user.id !== currUser.id)
  const createTask = taskManageStore(state => state.createTask)
  const getAllUsers = userManageStore(state => state.getAllUsers)

  const { handleSubmit, register, formState, reset } = useForm({
    defaultValues: {
      detail: "",
      name: "",
      priority: null,
      userId: [],
      dueDate: null
    }
  })

  useEffect(() => {
    const fetch = async () => {
      await getAllUsers(token)
    }
    fetch()
    reset()
  }, [close])

  const taskData = async (data) => {
    try {
      const response = await createTask(id, data, token)
      toast.success(response.data.message)
      document.getElementById("task-form").close()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='flex flex-col items-center'>
      <div className="text-2xl">Add task</div>
      <div className="divider"></div>
      <form method="dialog" onSubmit={handleSubmit(taskData)}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-4 flex flex-col justify-center">
          <legend className="fieldset-legend">Task details</legend>

          <label className="label">Task Title</label>
          <input type="text" className="input" placeholder="Task name" {...register("name")} />

          <label className="label">Task detail</label>
          <textarea placeholder="Insert task detail" className="textarea textarea-md" {...register("detail")}></textarea>

          <legend className="fieldset-legend">Due date</legend>
          <label className="input">
            <span className="label">Add due date</span>
            <input type="date"  {...register("dueDate")} />
          </label>

          <legend className="fieldset-legend">Priority</legend>
          <select defaultValue="Select priority" className="select" {...register("priority")}>
            <option disabled={true}>Select priority</option>
            <option value={1}>High</option>
            <option value={2}>Medium</option>
            <option value={3}>Low</option>
          </select>

          <legend className="fieldset-legend">Select users</legend>
          <div className='flex gap-3'>
            {sortUsers.map(user => (
              <label className="label" key={user.id}>
                <input type='checkbox' className='checkbox' value={user.id} {...register("userId")} />{user.firstName}
              </label>
            ))}
          </div>
          <button className='mt-4 ml-20 p-3 border rounded-xl w-[140px] cursor-pointer bg-primary text-md text-white'>Add task</button>
        </fieldset>
      </form>
    </div>
  )
}

export default AddTask