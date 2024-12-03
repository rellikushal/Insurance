import Header from './Header'
import React, {useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PropertyInsuranceService from './Service/PropertyInsuranceService'
import TextField from '@mui/material/TextField';

import { regexMobileNo } from './RegularExpressions';
import Happy from '../images/happy.jpg'
import HealthIn from '../images/healthin.png'
//import VehicleIn from '../images/vehiclein.png';
import p5 from '../images/p5.png';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import CustomerCare from '../images/customerCare.jpg'
import '../App.css'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import p3 from '../images/p3.jpeg.jpg';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import LoginSharpIcon from '@mui/icons-material/LoginSharp';
import '../App.css';
import vehiclein from "../images/vehile.jpg"


function Login() {
  // var i = 0 ;

  useEffect(()=>{
    window.scrollTo(0,0);
  },[])

  const [otpValues, setOtpValues] = useState(['', '', '', '']);
  const [enterotp,SetEnterOtp]=useState("");
  const [otp, setOtp] = useState(['', '', '', '']); 
  const otpInputs = useRef([]);


  const handleOtpInputChange = (index, value) => {
      if (value.match(/[0-9]/)) {
          const newOtpValues = [...otpValues];
          newOtpValues[index] = value;
          setOtpValues(newOtpValues);
      }
  };
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    if (value && index < 4) {
      if (index < 3) {
        otpInputs.current[index + 1].focus();
      }
      }
      else if (index > 0) {
        otpInputs.current[index - 1].focus();
      }
  };
    let navigate=useNavigate();

    const [values, setValues] = useState({
      mobileno: ''
    });
  

    const change=(e)=>
    {
      const {name,value}=e.target;
      setValues({...values,[name]:value}); 
      if (name === "mobileno") {
        
        if (!regexMobileNo.test(value)) {
          setValidationErrors({ ...validationErrors, [name]: "Phone No. must start with 6,7,8,9 series with  10 digits" });
        } else {
          setValidationErrors({ ...validationErrors, [name]: "" });
        }
      }
  
    }
  
    const [data,setData]=useState();
   
    const [validationErrors,setValidationErrors]=useState({
      mobileno : ''
    })

    const HandleSubmit=(e)=>
    {
      e.preventDefault();
      console.log("values =>"+JSON.stringify(values));
    }

    const [showOTPInput,setshowOTPInput]=useState(false);
    const [verifyotp,SetVerifyOtp]=useState("");

  
      const sendOTP =async(e)=>{

      e.preventDefault();
      if(regexMobileNo.test(values.mobileno)){
        PropertyInsuranceService.checkMobileNumber(values.mobileno).then((res)=>
        {
          console.log(res.data);
          setData(res.data);
          if(res.data === "Mobile number exists"){
            PropertyInsuranceService.getOtp1().then((res)=>
            {
              console.log(res.data);
              const otpValue=res.data;
              SetEnterOtp(res.data);
              const mobileNumber=values.mobileno;
              PropertyInsuranceService.getOtp(mobileNumber,otpValue).then((res)=>
            {
              console.log(res);
            }).catch((err)=>
          {

          });
            }).catch((error)=>
          {})

          console.log(showOTPInput);
            setshowOTPInput(true);
            //  SetVerifyOtp("");
          }
          })
              
              }
              else {setData("")}
            }
    const handleVerifyMobileNoOtp = (e) => {
     e.preventDefault();
      const otp = otpValues.join('');
    console.log(otp);
    if(enterotp === otp )
    {
          SetVerifyOtp("Verified Successfully");
          setshowOTPInput(false);
          navigate('/profile',{state:{values:values.mobileno}})
    }
    else{SetVerifyOtp("Invalid OTP...!")}
  };
    return (
      <div className='container-fluid logbac'>
        <div style={{position:'fixed',width:'100%'}}><Header/></div>
        
        <div className='row mt-5 mt-lg-3'>
          <div className='col-12 col-lg-7 mt-2 lcdiv'style={{height:'63vh'}}>
            <div className='mt-4 pt-3 ms-4'>
              <h4 className='text-secondary branddesc mt-2'><span className=''style={{textDecoration:'underline',textDecorationColor:'brown'}}>Choose</span> Confidence: Choose Ramanasoft Insurance.</h4>
              <h3 className='fw-bold'>Life is unpredictable,<h3 className='fw-bold'>insurance makes it manageable.</h3></h3>
            </div>
            <div>
              <img src={Happy} alt='get Happy life'style={{zIndex:'-1'}} className='LHomeImg ps-4 mx-5 w-25'/>
            </div>
            {/* <button className='btn btn-primary mx-3 mt-5' onClick={handleClick} >PropertyInsurance</button> */}
          </div>
          <div className='col-12 col-md-10 ms-md-5 ms-lg-0 ms-2 col-lg-5 mt-lg-2 pt-lg-4'>
          <form onSubmit={HandleSubmit} className='form-inline border rounded bg-light me-lg-4 shadow mt-5'>
              <div className='text-center fw-bold bg-success-subtle p-2 rounded '><h3>Customer Login <AccountCircleSharpIcon className='fs-2'/></h3></div>
              <div className='mx-lg-2 my-3 px-2'>
                <h3 className='fw-semibold'>Hello Customer,</h3>
                <TextField
                  className='col-lg-7 col-md-7 col-10'
                  id="outlined-basic"
                  label="Mobile No."
                  placeholder="Enter Your Mobile No."
                  name='mobileno'
                  onChange={change}
                  value={values.mobileno}
                   
                  // required
                  inputProps={{ maxLength: 10 }}
                  onKeyPress={(e) => {
                    const isValidInput = /[0-9]/;
                    if (!isValidInput.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  />
                  <span>
                <button className='btn btn-success rounded fw-bold shadow mt-2 mx-2 ms-3 py-2' onClick={sendOTP}>Send OTP</button></span>
                  <br/>
                  <small>
                  {validationErrors.mobileno && <span className="text-danger">{validationErrors.mobileno}</span>}</small>
                  {data === "Mobile number is not exists" && <h4 className='text-danger mt-2 ms-lg-3'>{data}</h4>}
                {showOTPInput && (
                  <div>
                     <div className='ms-2 mt-2'>
                      <small className='text-success '>OTP sent to your mobile No.</small>
                      <form className='w-75 d-flex flex-nowrap pt-3'>
                      {[...Array(4)].map((_, index) => (
                        <input
                          key={index} 
                          type="text" 
                          autoFocus = {index === 0}
                          ref={(input) => otpInputs.current[index] = input}
                          onChange={(e) => 
                            {handleOtpInputChange(index, e.target.value);
                            handleOtpChange(index, e.target.value);}}
                          className='w-25 border ps-lg-3 fw-semibold rounded' 
                          maxLength={1} 
                          style={{ marginRight: '8px' }} 
                          onKeyPress={(e) => {
                            const isValidInput = /[0-9]/;
                            if (!isValidInput.test(e.key)) {
                            e.preventDefault();
                            }
                          }}
                        />
                       ))}
                       <button className='btn btn-info text-nowrap fw-bold shadow ms-1' onClick={handleVerifyMobileNoOtp}>Login  <LoginSharpIcon className='text-dark'/></button><br/>
                      </form>
                      {verifyotp ===  "Invalid OTP...!" && <h4 className='text-danger ms-2 mt-2'>{verifyotp}<i className="fa-solid fa-xmark ms-2"></i></h4>}
                     </div>
                  </div>
                    )}
                 {verifyotp ===  "Verified Successfully" && <h4 className='text-success mt-lg-3 ms-2'>{verifyotp}<CheckCircleOutlineIcon/></h4>}
                <div className='mt-lg-3 d-flex justify-content-center'>
                
                 </div>
              </div>
             
            </form>
          </div>
          <div className='homeDetail mt-2 mt-md-4'>
          <h4 className='branddesc mx-lg-3 text-secondary'>Ramanasoft Insurance: Where Protection Extends Across <span style={{textDecoration:'underline',textDecorationColor:'brown'}}>Multiple Domains</span></h4>
          </div>
          <div className=' d-flex justify-content-evenly mt-lg-1 py-lg-0 py-2 lbdiv'>
            <div className='lbcard'>
              <Link to='/property'className='text-decoration-none' >
                <div class="card shadow bg-light" style={{width:'8rem',height:'85%',zIndex:'-1'}}>
                  <div class="card-body">
                  {/* <span className='text-white ms-2 fw-bold bg-success rounded px-2 py-1'>New <NewReleasesIcon/></span> */}
                  <img src={p5} alt="..." className="img-fluid  mx-1 "/>
                  {/* <a href="#" class="btn btn-primary mx-5 fw-bold text-nowrap shadow mt-2">Property Insurance</a> */}
                  </div>
                </div>
              </Link>
              <h6 className='text-center mt-1'>Property Insurance</h6>
            </div>
            <div>
              <Link to ='/progress'  className='text-decoration-none' >
            <div class="card shadow bg-light"  style={{width:'8rem', height:'85%', zIndex:'-1'}}>
              <div class="card-body" >
                {/* <span className='text-dark  fw-bold bg-warning rounded p-2'>Upcoming  </span> */}
                {/* <span className='text-white ms-2 fw-bold bg-success rounded px-2 py-1'>New <NewReleasesIcon/></span> */}
                <img src={HealthIn} alt="..." className="img-fluid  w-100 mx-1 " ob/>
                {/* <a href="#" class="btn btn-primary mx-5 fw-bold text-nowrap shadow mt-2 disabled">Health Insurance</a> */}
              </div>
            </div>
            </Link>
            <h6 className='text-center mt-1'>Health Insurance</h6>
            </div>
          <div>
          <Link to ="/Bikeentry" className='text-decoration-none' >
            <div class="card shadow bg-light"  style={{width:' 8rem',height:'85%',zIndex:'-1'}}>
              <div class="card-body">
                {/* <span className='text-dark  fw-bold bg-warning rounded p-1'>Upcoming </span> */}
                {/* <span className='text-white ms-2 fw-bold bg-success rounded px-2 py-1'>New <NewReleasesIcon/></span> */}
                <img src={vehiclein} alt="..." className="img-fluid  w-100 mx-1 mt-4"/>
                {/* <a href="#" class="btn btn-primary mx-5 fw-bold text-nowrap shadow mt-2 disabled">Vehicle Insurance</a> */}
              </div>
            </div>
            </Link>
            <h6 className='text-center mt-1'>Vehicle Insurance</h6>
          </div>
          </div>
          <div>
            <div className='row'>
              <div className='ms-lg-5 col-12 col-lg-5 pt-5'>
                <h2 className='branddesc'>Have a Question?</h2>
                <h2 className='branddesc'>Here <span style={{textDecoration:'underline',textDecorationColor:'brown'}}>to Help</span> </h2>
                <p className='mt-4 fw-semibold'>Get quick assistance from Ramanasoft Insurance via phone or email. Whether you have questions, need help with claims, or want to learn about our coverage, our team is here for you. Reach out today for reliable support.</p>
                <div>
                  <div className='row  w-100 border mt-5 p-2 rounded shadow'>
                    <div className='col-2 col-lg-1 mt-4 me-lg-2 p-2'style={{borderRight:'3px solid #ccc'}}>
                     <MailOutlineIcon/>
                    </div>
                    <div className='col-8 col-lg-9 lbmail'>
                      <p className='text-secondary fw-bold'>For General Enquires</p>
                      <h4 className='fw-bold'><a href="mailto:'support@ramanasoft@.com" className='text-decoration-none text-dark'>support@ramanasoft.com</a></h4>
                    </div>
                  </div>
                  <div className='row w-100 border mt-5 p-2 rounded shadow'>
                    <div className='col-2 col-lg-1 mt-4 me-2 p-2'style={{borderRight:'3px solid #ccc'}}>
                    <SupportAgentIcon/>
                    </div>
                    <div className='col-8 col-lg-9'>
                      <p className='text-secondary fw-bold '>For Customer Care</p>
                      <h4 className='fw-bold'>1800-258-2465</h4>
                    </div>
                  </div>
                </div>
              </div>
                <div className='col-lg-5 col-12 mx-lg-0 mx-3 mt-lg-0 mt-3'>
                  <img src={CustomerCare} alt="..." className="img-fluid rounded"/>
                </div>
            </div>
            <hr>
            </hr>
            <div className='footer px-1 mx-1 px-lg-5 mx-lg-5'>
              <p className='text-center fw-semibold'>RamanaSoft Insurance Company is a trusted name in insurance, known for its tailored solutions and customer-centric approach. With a focus on technology and personalized service, RamanaSoft offers a range of insurance products for individuals and businesses. Committed to excellence and social responsibility, RamanaSoft is a reliable partner for protecting what matters most.</p>
            </div>
             <div>
              <div className='d-flex justify-content-center align-items-center'><img src={p3} alt="..." className="img-responsive rounded"style={{width:'130px'}}/></div>
              
              <p className='text-center fw-bold fs-5 mt-2 text-secondary'>&copy; All Rights Reserved 2024.</p>
             </div>
          </div>
        </div>
      </div>
    )
}

export default Login;