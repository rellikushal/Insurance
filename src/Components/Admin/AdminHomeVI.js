import React from 'react'
import Header from '../Header';
import { useNavigate } from 'react-router-dom';
import adminimg from '../../images/Bike.jpg'

const AdminHomePageVI = () => {
    
    let navigate = useNavigate();

    const HandlePolicy = ()=>{
        navigate('/adminpolicyVI')
    }
    
    const HandleCustomer = ()=>{
        navigate('/admincustomerVI')
    }
    const HandlePayments = ()=>{
        navigate('/adminpaymentsVI')
    }
    const HandleClaims = ()=>{
        navigate('/adminclaimsVI')
    }
    const HandleNotifications = ()=>{
        navigate('/adminnotificationsVI')
    }
    // const HandlePremium = ()=>{
    //     navigate('/adminpremium')
    // }

  return (
    <div className='container-fluid row AdminHomeB'>
        <Header/>
        {/* <h2 className='text-center mt-5'>Welcome to Admin Page....</h2> */}
        <div className='col-3 mt-5'>
            <div className='mt-5'>
                <img src={adminimg} className='rounded' style={{height:'24rem',width:'18rem'}} />
            </div> 
        </div>
        <div className='col-9 mt-5'>
            <div className='row mt-4 mb-2'>
                <div className='col card mx-1 d-flex justify-content-center' style={{height:'25vh',background:'#b7d0f7',cursor:'pointer'}} onClick={HandlePolicy}>
                    <h4 className='text-center'>Policy Management <i className="fa-solid fa-building-shield"></i></h4>
                </div>
                <div className='col card mx-1 d-flex justify-content-center text-nowrap' style={{height:'25vh',background:'#f5abf0',cursor:'pointer'}} onClick={HandleCustomer}>
                    <h4 className='text-center'>Customer Management <i className="fa-solid fa-user-tie"></i></h4>
                </div>
                <div className='col card mx-1 d-flex justify-content-center text-nowrap' style={{height:'25vh',background:'#abf5d7',cursor:'pointer'}} onClick={HandlePayments}>
                    <h4 className='text-center'>Payments <i className="fa-solid fa-credit-card"></i></h4>
                </div>
            </div>
            <div className='row'>
                <div className='col card mx-1 d-flex justify-content-center' style={{height:'25vh',background:'#f5b9ab',cursor:'pointer'}} onClick={HandleClaims}>
                    <h4 className='text-center'>Claims <i className="fa-solid fa-house-crack"></i></h4>
                </div>
                <div className='col card mx-1 d-flex justify-content-center' style={{height:'25vh',background:'#bafff9',cursor:'pointer'}} onClick={HandleNotifications}>
                    <h4 className='text-center'>Notifications <i className="fa-solid fa-bell"></i></h4>
                </div>
                {/* <div className='col card mx-1 d-flex justify-content-center' style={{height:'25vh',background:'#afb6bc',cursor:'pointer'}} onClick={HandlePremium}>
                    <h4 className='text-center'>Premiums <i className="fa-solid fa-coins"></i></h4>
                </div> */}
            </div>
        </div>
    </div>
  )
}

export default AdminHomePageVI;