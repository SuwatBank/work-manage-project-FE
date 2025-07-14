import React from 'react'
import userManageStore from '../stores/userManageStore';
import useUserStore from '../stores/userStore';
import { useForm } from 'react-hook-form';
import { createProject } from '../api/projectApi';
import projectManageStore from '../stores/projectManageStore';
import { toast } from 'react-toastify';

function AddProject() {
  const token = useUserStore(state => state.token)
  const allUsers = userManageStore(state => state.users)
  console.log(allUsers)
  const currUser = useUserStore(state => state.user)
  const sortUsers = allUsers.filter(user => user.role !== "ADMIN" && user.department.toLowerCase() == currUser.department.toLowerCase())
  const { handleSubmit, register } = useForm({
    defaultValues: {
      detail: "",
      dueDate: null,
      name: "",
      priority: null, 
      userIds: []
    }
  })
  const createProject = projectManageStore(state => state.createProject)

  const addProject = async (data) => {
    // console.log("data------", data)
    try {
      const response = await createProject(currUser.id, data, token)
      toast.success(response.data.message)
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message
      toast(errorMessage)
    }
  }

  return (
    <div className='flex justify-center mt-30'>
      <div>
        <h1 className='text-2xl font-bold mb-4'>Create new project</h1>
        <form onSubmit={handleSubmit(addProject)}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-md border p-4">
            <legend className="fieldset-legend">Project detail</legend>

            <label className="label">Project name</label>
            <input type="text" className="input w-md" placeholder="Project name" {...register("name")} />

            <label className="label mt-2">Project detail</label>
            <textarea className="textarea w-md" placeholder="Project Detail" {...register("detail")}></textarea>

            <legend className="fieldset-legend">Due date</legend>
            <label className="input w-md">
              <span className="label">Add due date</span>
              <input type="date"  {...register("dueDate")} />
            </label>

            <legend className="fieldset-legend">Priority</legend>
            <select defaultValue="Select priority" className="select w-md" {...register("priority")}>
              <option disabled={true}>Select priority</option>
              <option value={1}>High</option>
              <option value={2}>Medium</option>
              <option value={3}>Low</option>
            </select>

            <legend className="fieldset-legend">Select users</legend>
            <div className='flex gap-3'>
              {sortUsers.map(user => (
                <label className="label" key={user.id}>
                  <input type='checkbox' className='checkbox' value={user.id} {...register("userIds")} />{user.firstName}
                </label>
              ))}
            </div>
            <button className='mt-5 border rounded-xl p-3 cursor-pointer bg-success border-success text-lg'>Submit</button>
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default AddProject