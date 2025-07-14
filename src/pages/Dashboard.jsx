import React, { useEffect } from 'react'
import projectManageStore from '../stores/projectManageStore'
import useUserStore from '../stores/userStore'


function Dashboard() {
  const projects = projectManageStore(state => state.projects)
  const project = projectManageStore(state => state.getProject)
  const token = useUserStore(state => state.token)
  const user = useUserStore(state => state.user)
  useEffect(() => {
    const run = async () => {
      await project(user.id, token)
    }
    run()
  }, [])
  console.log("projects", projects)
  return (
    <div>
      <h1 className='mb-5 font-bold text-2xl'>Summary working</h1>
      <div className='flex flex-row flex-wrap'>
        <div className="card bg-primary text-primary-content w-90 mr-5 mb-5">
          <div className="card-body">
            <h2 className="card-title font-bold text-2xl mb-5">All Project</h2>
            <div className='flex flex-row justify-between'>
              <p className='text-lg mb-5'>List of project</p>
              <p className='text-lg mb-5'>Total : {projects.length}</p>
            </div>
            <div className="card-actions justify-start">
              <button className="btn">View detail</button>
            </div>
          </div>
        </div>
        <div className="card bg-success text-primary-content w-90 mr-5 mb-5">
          <div className="card-body">
            <h2 className="card-title font-bold text-2xl mb-5">Completed Project</h2>
            <div className='flex flex-row justify-between'>
              <p className='text-lg mb-5'>List of project</p>
              <p className='text-lg mb-5'>Total : 20</p>
            </div>
            <div className="card-actions justify-start">
              <button className="btn">View detail</button>
            </div>
          </div>
        </div>
        <div className="card bg-zinc-400 text-primary-content w-90 mr-5 mb-5">
          <div className="card-body">
            <h2 className="card-title font-bold text-2xl mb-5">Frozen Project</h2>
            <div className='flex flex-row justify-between'>
              <p className='text-lg mb-5'>List of project</p>
              <p className='text-lg mb-5'>Total : 5</p>
            </div>
            <div className="card-actions justify-start">
              <button className="btn">View detail</button>
            </div>
          </div>
        </div>
        <div className="card bg-warning text-primary-content w-90 mr-5 mb-5">
          <div className="card-body">
            <h2 className="card-title font-bold text-2xl mb-5">In progress</h2>
            <div className='flex flex-row justify-between'>
              <p className='text-lg mb-5'>List of project</p>
              <p className='text-lg mb-5'>Total : 10</p>
            </div>
            <div className="card-actions justify-start">
              <button className="btn">View detail</button>
            </div>
          </div>
        </div>
        <div className="card bg-error text-primary-content w-90 mr-5 mb-5">
          <div className="card-body">
            <h2 className="card-title font-bold text-2xl mb-5">Over due</h2>
            <div className='flex flex-row justify-between'>
              <p className='text-lg mb-5'>List of project</p>
              <p className='text-lg mb-5'>Total : 5</p>
            </div>
            <div className="card-actions justify-start">
              <button className="btn">View detail</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard