import React, { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { registerSchema } from '../utils/validator'
import { authApi } from '../api/authApi'
import { toast } from 'react-toastify'

function Register() {
  
  const {handleSubmit, register, formState} = useForm({
    resolver: yupResolver(registerSchema)
  })
  let navigate = useNavigate()
  const backToLogin  = (() => {
    navigate("/")
  })

  const onSubmit = async data => {
    try {
      const response = await authApi.post("/register",data)
      toast.success(response.data.message)
      backToLogin()
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message
      toast.error(errorMessage, {
        position: "top-right"
      })
      console.log(error)
    }
  }
  return (
    <>
      <div className="p-30">
        <div className="flex justify-center items-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xl border p-4">
              <legend className="fieldset-legend">Sign up</legend>
              <div className='flex flex-row justify-between max-md:flex-col'>
                <div className='max-md:flex max-md:mb-4 max-md:justify-between'>
                  <label className="label">Username</label>
                  <input type="text"
                    className="input"
                    placeholder="Username"
                    {...register("userName")}
                  />
                </div>
                <div className='max-md:flex max-md:mb-4 max-md:justify-between'>
                  <label className="label">Password</label>
                  <input type="password" 
                    className="input"
                    placeholder="Password"
                    {...register("password")}
                  />
                </div>
              </div>
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
                  <input type="text" className="input" placeholder="Department" {...register("department")}/>
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
              <button className="btn btn-success mt-4">Register</button>
              <div className="divider"></div>
              <p className='text-center text-sm'>Already have account?</p>
              <Link className="btn btn-primary mt-4" to={"login"}><button>Sign in</button></Link>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register