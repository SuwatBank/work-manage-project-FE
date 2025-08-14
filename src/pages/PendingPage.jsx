import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import taskManageStore from '../stores/taskManageStore'
import { toast } from 'react-toastify';
import userManageStore from '../stores/userManageStore';

function PendingPage({ close, id }) {
  const tasks = taskManageStore(state => state.tasks);
  const token = userManageStore(state => state.token);
  const updateTask = taskManageStore(state => state.updateTask);
  const { handleSubmit, register, formState, reset } = useForm({
    defaultValues: {
      taskStatus: ""
    }
  })

  useEffect(() => {
    reset()
  }, [close])

  const pendingData = async(data) => {
    try {
      const response = await updateTask(id, data, token)
      toast.success(response.data.message)
      document.getElementById("pending-form").close()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='flex flex-col items-center'>
      <div className="text-2xl">Request pending Task</div>
      <div className="divider"></div>
      <form method="dialog" onSubmit={handleSubmit(pendingData)}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-4 flex flex-col justify-center">
          <legend className="fieldset-legend">Pending details</legend>

          <legend className="fieldset-legend">Status</legend>
          <select defaultValue="Select priority" className="select" {...register("taskStatus")}>
            <option disabled={true}>Select status</option>
            <option value={"REQUESTPENDING"}>Request pending</option>
          </select>

          <button className='mt-4 ml-20 p-3 border rounded-xl w-[140px] cursor-pointer bg-primary text-md text-white'>Submit</button>
        </fieldset>
      </form>
    </div>
  )
}

export default PendingPage