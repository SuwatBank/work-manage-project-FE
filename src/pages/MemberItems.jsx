
function MemberItems({ user }) {
  console.log(user)
  return (
    <>
      <li className='list-none grid grid-cols-6 gap-4 border mb-4 p-4 rounded-xl drop-shadow-2xl'>
        <div className='col-start-1 col-end-4 mb-4'>
          <div className='text-xl'><b>Firstname :</b> {user.firstName}</div>
          <div className='text-xl'><b>Lastname :</b> {user.lastName}</div>
          <div className="text-lg uppercase"><b>Department :</b> {user.department}</div>
          <div className="text-lg uppercase"><b>Phone no :</b> {user.phoneNo}</div>
          <div className="text-lg uppercase"><b>Role :</b> {user.role}</div>
        </div>
      </li>
    </>
  )
}

export default MemberItems