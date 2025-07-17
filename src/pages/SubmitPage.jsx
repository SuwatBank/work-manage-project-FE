import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import taskManageStore from '../stores/taskManageStore'
import { toast } from 'react-toastify';
import userManageStore from '../stores/userManageStore';

function SubmitPage({ close, id }) {
  const tasks = taskManageStore(state => state.tasks);
  const token = userManageStore(state => state.token)
  const allTask = taskManageStore(state => state.getAllTasks)
  const submitTask = taskManageStore(state => state.submitTask)
  const { handleSubmit, register, formState, reset } = useForm({
    defaultValues: {
      feedback: "",
      taskStatus: ""
    }
  })

  console.log('tasks', tasks)
  useEffect(() => {
    reset()
  }, [close])

  const submitData = async (data) => {
    try {
      const response = await submitTask(id, data, token)
      toast.success(response.data.message)
      document.getElementById("submit-form").close()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='flex flex-col items-center'>
      <div className="text-2xl">Submit Project</div>
      <div className="divider"></div>
      <form method="dialog" onSubmit={handleSubmit(submitData)}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-4 flex flex-col justify-center">
          <legend className="fieldset-legend">Submit details</legend>

          {/* <label className="label">Task Name</label>
          <input type="text" className="input" placeholder="Insert Task name"/> */}

          <label className="label">Feedback</label>
          <textarea placeholder="Insert Your comment" className="textarea textarea-md" {...register("feedback")}></textarea>

          <legend className="fieldset-legend">Priority</legend>
          <select defaultValue="Select priority" className="select" {...register("taskStatus")}>
            <option disabled={true}>Select priority</option>
            <option value={"ONAPPROVE"}>On Approve</option>
          </select>

          <button className='mt-4 ml-20 p-3 border rounded-xl w-[140px] cursor-pointer bg-primary text-md text-white'>Submit</button>
        </fieldset>
      </form>
    </div>
  )
}

export default SubmitPage