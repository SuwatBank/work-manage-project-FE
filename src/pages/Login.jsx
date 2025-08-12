import { Link } from 'react-router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '../utils/validator'
import useUserStore from '../stores/userStore'
import { toast } from 'react-toastify'


function Login() {
  const login = useUserStore(state => state.login)
  const {handleSubmit, register, formState : {errors, isSubmitting}} = useForm({
    resolver: yupResolver(loginSchema)
  })

  const hdlLogin = async(data) => {
    try {
      const response = await login(data)
      // localStorage.setItem("user", JSON.stringify(response.data.user))
      toast.success(response.data.message)
      
    } catch (error) {
        const errMessage = error.response?.data || error.message;
        console.log(error);
        toast(errMessage)
    }
  }

  
  return (
    <div className='p-65 max-w-screen'>
      <div className="max-w-screen-lg max-md:flex-col flex flex-row gap-10 justify-around">
        <div className="flex flex-col gap-4 basis-6/7 mb-4 mr-7">
          <h1 className='text-red-400 text-4xl font-bold '>Work management</h1>
          <p className='font-bold'>Help to manage and track you work</p>
        </div>
          <div className='card shadow-xl justify-center'>
            <form onSubmit={handleSubmit(hdlLogin)}>
              <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend text-lg">Login</legend>

                <label className="label">Username</label>
                {errors.userName?.message && <p className='text-sm text-error'>{errors.userName.message}</p>}
                <input type="text" 
                  className="input" 
                  placeholder="Username"
                  {...register("userName")}
                />

                <label className="label">Password</label>
                {errors.password?.message && <p className='text-sm text-error'>{errors.password.message}</p>}
                <input type="password" 
                  className="input" 
                  placeholder="Password" 
                  {...register("password")}
                />

                <button className="btn btn-primary mt-4 mb-4">Login</button>
                <p className='cursor-pointer text-center underline'>Forgot password</p>
                <div className="divider m-0"></div>
                <Link className="btn btn-success mt-4 mb-4" to={"register"}><button>Register</button></Link>
              </fieldset>
            </form>
                {/* <Link className="btn btn-success mt-4 mb-4" to={"register"}><button>Register</button></Link> */}
          </div>
        </div>
    </div>
    
  )
}

export default Login