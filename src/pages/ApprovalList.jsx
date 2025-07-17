function ApproveList() {

  return (
    <>
      <div>
        <h1 className='text-2xl font-bold mt-5 mb-5'>Approval List</h1>
        <div className="overflow-x-auto rounded-2xl shadow-2xl">
          <table className="table pb-6 ">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Taskname</th>
                <th className='w-1/5'>
                  Priority
                </th>
                <th className='w-1/5'>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Request date</legend>
                    <select defaultValue="Pick a browser" className="select">
                      <option disabled={true}>Sort priority</option>
                      <option>Ascending Order</option>
                      <option>Decending Order</option>
                    </select>
                  </fieldset>
                </th>
                <th>Due date</th>
                <th>Task Status</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold"></div>
                      <div className="text-sm opacity-50">task detail</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="badge badge-success badge-lg text-white">
                    project priority
                  </span>
                </td>
                <td></td>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
                <td>
                  <span className="badge badge-warning badge-lg text-white">On Approve</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default ApproveList