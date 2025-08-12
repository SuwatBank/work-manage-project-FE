import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import userManageStore from '../stores/userManageStore'
import useUserStore from '../stores/userStore'
import taskManageStore from '../stores/taskManageStore.js'
import { toast } from 'react-toastify'
import projectManageStore from '../stores/projectManageStore.js'

function UpdateProject({ close, id }) {
  const token = useUserStore(state => state.token)
  const updateProject = projectManageStore(state => state.updateProject)
  const getAllUsers = userManageStore(state => state.getAllUsers)

  const { handleSubmit, register, formState, reset } = useForm({
    defaultValues: {
      projectStatus: null,
    }
  })

  useEffect(() => {
    const fetch = async () => {
      await getAllUsers(token)
    }
    fetch()
    reset()
  }, [close])

  const projectStatus = async (data) => {
    try {
      const response = await updateProject(id, data, token)
      toast.success(response.data.message)
      document.getElementById("update-form").close()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='flex flex-col items-center'>
      <div className="text-2xl">Update project</div>
      <div className="divider"></div>
      <form method="dialog" onSubmit={handleSubmit(projectStatus)}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-4 flex flex-col justify-center">
          <legend className="fieldset-legend">Project details</legend>

          <legend className="fieldset-legend">Project status</legend>
          <select defaultValue="Select status" className="select" {...register("projectStatus")}>
            <option disabled={true}>Select status</option>
            <option value={"ONGOING"}>ONGOING</option>
            <option value={"COMPLETED"}>COMPLETED</option>
            <option value={"PENDING"}>PENDING</option>
            <option value={"OVERDUE"}>OVERDUE</option>
          </select>
          <button className='mt-4 ml-20 p-3 border rounded-xl w-[140px] cursor-pointer bg-primary text-md text-white'>Update Project</button>
        </fieldset>
      </form>
    </div>
  )
}

export default UpdateProject