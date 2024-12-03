import React from 'react'
import Header from './Header'
import Errorimg from './images/error.jpg'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <>
    <Header/>
    <div className='mx-3 mt-5'>
        <div>
            <img src={Errorimg}alt="no data found" className='w-100 p-5' style={{height:'80vh'}}></img>
        </div>
        <div className='text-center'>
            <Link to='/'>
            <button className='btn btn-danger px-4 rounded fw-bold shadow'>Go Home</button>
            </Link>
        </div>
    </div>
    </>
    
  )
}

export default ErrorPage
