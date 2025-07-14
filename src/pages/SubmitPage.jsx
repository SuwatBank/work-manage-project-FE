import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

function SubmitPage({close}) {
  const { handleSubmit, register, formState, reset } = useForm({
  })

  useEffect(() => {
    reset()
  },[close])
  
  const submitData = () =>{
    try {
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
          <legend className="fieldset-legend">Page details</legend>

          <label className="label">Title</label>
          <input type="text" className="input" placeholder="My awesome page" />

          <label className="label">Project detail</label>
          <textarea placeholder="Insert project submit detail" className="textarea textarea-md"></textarea>

          <label className="label">Attached file</label>
          <input type="text" className="input" placeholder="Name" />
          <button className='mt-4 ml-20 p-3 border rounded-xl w-[140px] cursor-pointer bg-primary text-md text-white'>Submit</button>
        </fieldset>
      </form>
    </div>
  )
}

export default SubmitPage