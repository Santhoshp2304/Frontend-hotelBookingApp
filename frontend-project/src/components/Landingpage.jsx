import React from 'react'
import{Link} from 'react-router-dom'
function Landingpage() {
  return (
    <div>
        <h1 className='p-5 text-center'>Welcome to HotelBooking.com</h1>
        <h2 className='p-5 text-center'>Click on <Link to='/login'>Login</Link>  if you have account</h2>
        <h2 className='p-5 text-center'>Click on <Link to='/register'>Register</Link> if you don't have account</h2>
    </div>
  )
}

export default Landingpage