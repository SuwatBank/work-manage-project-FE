import React from 'react'
import { useForm } from 'react-hook-form'
import { updateSchema } from '../utils/validator'
import { yupResolver } from '@hookform/resolvers/yup'
import userManageStore from '../stores/userManageStore'
import { toast } from 'react-toastify'

function UpdateUserForm() {
  const { handleSubmit, register, formState } = useForm({
    resolver: yupResolver(updateSchema)
  })

  const updateUser = userManageStore(state => state.updateUser)

  const handleUpdate = async () => {
    try {
      const response = await updateUser()
      toast.success(response.data.message)
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message
      toast(errorMessage)
    }
  }
  return (
    <div>
      <div className="p-30">
        <div className="flex justify-center items-center">
          <form onSubmit={handleSubmit(handleUpdate)}>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xl border p-4">
              <legend className="fieldset-legend">Update data</legend>
              <div className='flex flex-row justify-between max-md:flex-col'>
                <div className='max-md:flex max-md:mb-4 max-md:justify-between'>
                  <label className="label">First name</label>
                  <input type="text"
                    className="input"
                    placeholder="First name"
                    {...register("firstName")}
                  />
                </div>
                <div className='max-md:flex max-md:mb-4 max-md:justify-between'>
                  <label className="label">Last name</label>
                  <input type="text"
                    className="input"
                    placeholder="Last name"
                    {...register("lastName")}
                  />
                </div>
              </div>
              <div className='flex flex-row justify-between max-md:flex-col'>
                <div className='max-md:flex max-md:mb-4 max-md:justify-between w-60'>
                  <label className="label">Email</label>
                  <input type="email"
                    className="input"
                    placeholder="Email"
                    {...register("email")}
                  />
                </div>
                <div className='max-md:flex max-md:mb-4 max-md:justify-between w-60'>
                  <label className="label">Phone</label>
                  <input type="tel"
                    className="input"
                    placeholder="Mobile Phone"
                    {...register("phoneNo")}
                  />
                </div>
              </div>
              <div className='flex flex-row justify-between max-md:flex-col'>
                <div className='max-md:flex max-md:mb-4 max-md:justify-between'>
                  <label className="label">Department</label>
                  <input type="text" className="input" placeholder="Department" {...register("department")} />
                </div>
                <div className='max-md:flex max-md:mb-4 max-md:justify-between w-60'>
                  <label className="label">Role</label>
                  <select defaultValue="Choose a role" className="select" {...register("role")}>
                    <option disabled={true}>Choose a role</option>
                    <option>ADMIN</option>
                    <option>USER</option>
                    <option>LEADER</option>
                  </select>
                </div>
              </div>
              <button className="btn btn-success mt-4 mb-4">Update data</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateUserForm