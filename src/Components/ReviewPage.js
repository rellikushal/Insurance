import React, { useState, useEffect, useRef } from 'react';
import Footer1 from './Footer1';
import './ReviewPage.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import fileDownload from "js-file-download";
import p3 from '../images/p3.jpeg.jpg';
import { ClickAwayListener, Tooltip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import PhoneIcon from '@mui/icons-material/Phone';
import Button from '@mui/material/Button';
import VehicleInsuranceService from './Service/VehicleInsuranceService';
import { toast } from 'react-toastify';



const ReviewPage = () => {
  const [editMode, setEditMode] = useState({ mobile: false, email: false });
  const [otpMode, setOtpMode] = useState({ mobile: false, email: false });
  const [profile, setProfile] = useState({
    name: '',
    address: '',
    state: '',
    mobile: '',
    email: '',
  });
  const [originalMobileNumber,setOriginaNumber]=useState();
  const [originalEmail,setOriginalEmail]=useState();
  const [policy, setPolicy] = useState([]);
  const [customerid, setid] = useState('');

  const [mobileOtp, setMobileOtp] = useState(Array(5).fill(''));
  const [mobileOtpa, setMobileOtpa] = useState('');
  const [mobileOtpError, setMobileOtpError] = useState('');
  const [mobileOtpSuccessMessage, setMobileOtpSuccessMessage] = useState('');
  const [mobileError,setMobileError] = useState('');

  const [emailOtp, setEmailOtp] = useState(Array(5).fill(''));
  const [emailOtpa, setEmailOtpa] = useState('');
  const [emailOtpError, setEmailOtpError] = useState('');
  const [emailOtpSuccessMessage, setEmailOtpSuccessMessage] = useState('');
  const [emailError,setEmailError] = useState('');

  const otpRefs = useRef([]);
  const emailOtpRefs = useRef([]);

  const location = useLocation();
  const { mobileNumber } = location.state || {};

  useEffect(() => {
    if (mobileNumber) {
      getCustomerDetails(mobileNumber);
    }
  }, [mobileNumber]);

  useEffect(() => {
    if (customerid) {
      getProfileDetails(customerid);
    }
  }, [customerid]);

  const getCustomerDetails = async (mobile) => {
    try {
      const response = await VehicleInsuranceService.getCustomerDetailsByMobile(mobile);
      if (response.status === 200) {
        const customerData = response.data;
        setid(response.data.customerid);
        setOriginaNumber(response.data.mobile);
        setOriginalEmail(response.data.email);
        setProfile({
          name: `${customerData.fullName}`,
          address: customerData.address,
          state: customerData.state,
          mobile: customerData.mobile,
          email: customerData.email,
          vehicleNo: customerData.vnumber,
        });
      } else {
        console.log('Failed to get details');
      }
    } catch (error) {
      console.error('Error getting details:', error);
    }
  };

  const getProfileDetails = async (customerid) => {
    try {
      const response = await VehicleInsuranceService.getPaymentDetailsByCustomerId(customerid);
      if (response.status === 200) {
        const profileData = response.data;
        console.log(response.data);
        setPolicy(response.data)
      } else {
        console.log('Failed to get details');
      }
    } catch (error) {
      console.error('Error getting details:', error);
    }
  };

  const handleSendMobileOTP = async () => {
    if (/^[6-9]\d{9}$/.test(profile.mobile)) {
      if(originalMobileNumber==profile.mobile)
        {
          setMobileError('Please change the mobile number');
        }
      else
      {
        try {
          const response = await VehicleInsuranceService.sendMobileOtp(profile.mobile);
          console.log('mobile otp received', response.data);
          if (response.status === 200) {
            setMobileOtpa(response.data);
            setMobileOtpError('');
            setMobileOtpSuccessMessage('OTP sent successfully!');
            setOtpMode({ ...otpMode, mobile: true });
          } else {
            setMobileOtpError('Please enter a valid mobile number');
          }
        } catch (error) {
          setMobileOtpError('Error sending OTP');
        }
      }
    } else {
      setMobileOtpError('Failed to send OTP');
    }
  };

  const handleSendEmailOTP = async () => {
    if (/^[a-z0-9._%+-]+@gmail\.com$/.test(profile.email)) {

      console.log(originalEmail,profile.email)
      console.log(originalEmail==profile.email)
      if(originalEmail==profile.email)
        {
        setEmailError('Please change the Email Address');
        }
      else
      {
        try {
          const response = await VehicleInsuranceService.sendEmailOtpForUpdation(profile.email);
          console.log('email otp received', response.data);
          if (response.status === 200) {
            setEmailOtpa(response.data);
            setEmailOtpError('');
            setEmailOtpSuccessMessage('OTP sent successfully!');
            setOtpMode({ ...otpMode, email: true });
          } else {
            setEmailOtpError('Failed to send OTP');
          }
        } catch (error) {
          setEmailOtpError('Error sending OTP');
        }
      }
    } else {
      setEmailOtpError('Please enter a valid email address');
    }
  };

  const handleOTPChange = (otpType, index, value) => {
    if (value.length <= 1) {
      if (otpType === 'mobile') {
        const newOtp = [...mobileOtp];
        newOtp[index] = value;
        setMobileOtp(newOtp);

        if (value && index < otpRefs.current.length - 1) {
          otpRefs.current[index + 1].focus();
        }
      } else if (otpType === 'email') {
        const newOtp = [...emailOtp];
        newOtp[index] = value;
        setEmailOtp(newOtp);

        if (value && index < emailOtpRefs.current.length - 1) {
          emailOtpRefs.current[index + 1].focus();
        }
      }
    }
  };

  const handleVerifyOTP = async (otpType) => {
    if (otpType === 'mobile') {
      const enteredOtp = mobileOtp.join('');
      if (enteredOtp == mobileOtpa) {
        setMobileOtpError('');
        setMobileOtpSuccessMessage('Mobile OTP verified successfully!');
        setEditMode({ ...editMode, mobile: false });
        setOtpMode({ ...otpMode, mobile: false });
        // try {
        //   const response = await VehicleInsuranceService.updateCustomerMobileNumber(customerid,profile.mobile);
        //   console.log(response.data);
        //   if (response.status === 200) {
        //     console.log('sucess in changing mobile number');
        //   } else {
        //     console.log('Failed to changing mobile number');
        //   }
        // } catch (error) {
        //   console.error('Error changing mobile:', error);
        // }


        const forUpdateMobile={
          customerid:customerid,
          oldmobile:originalMobileNumber,
          mobile:profile.mobile
        }
        //setNotify(forUpdateEmail);
        profile.mobile=originalMobileNumber;
        try
        {
          const response = await VehicleInsuranceService.addNotificationForMobile(forUpdateMobile); 
          console.log(response.data);
          if (response.status === 200) {
            toast('succes in sending updation request');
          
            console.log('sucess in sending updation request');
          } else {
            toast('Failed to send updation request');
            console.log('Failed to send updation request');
            
          }
        }
        catch(error)
        {
          console.error('Error sending for notification',error);
        }


      } else {
        setMobileOtpError('Invalid OTP');
      }
    } else if (otpType === 'email') {
      const enteredOtp = emailOtp.join('');
      if (enteredOtp == emailOtpa) {
        setEmailOtpError('');
        setEmailOtpSuccessMessage('Email OTP verified successfully!');
        setEditMode({ ...editMode, email: false });
        setOtpMode({ ...otpMode, email: false });
        // try {
        //   const response = await VehicleInsuranceService.updateCustomerEmailNumber(customerid,profile.email); 
        //   console.log(response.data);
        //   if (response.status === 200) {
        //     console.log('sucess in changing email');
        //   } else {
        //     console.log('Failed to change email');
        //   }
        // } catch (error) {
        //   console.error('Error changing email:', error);
        // }



        const forUpdateEmail={
          customerid:customerid,
          oldemail:originalEmail,
          email:profile.email
        }
        
        profile.email=originalEmail;
        try
        {
          const response = await VehicleInsuranceService.addNotificationForEmail(forUpdateEmail); 
          console.log(response.data);
          if (response.status === 200) {
            toast('succes in sending updation request');
            
            console.log('sucess in sending updation request');
          } else {
            toast('Failed to send updation request');
            console.log('Failed to send updation request');
          }
        }
        catch(error)
        {
          console.error('Error sending for notification',error);
        }

      } else {
        setEmailOtpError('Invalid OTP');
      }
    }
  };

  const handleEdit = (field) => {
    setEditMode({ ...editMode, [field]: true });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = (field) => {
    console.log(profile.mobile);
    if (field === 'mobile' && !/^[6-9]\d{9}$/.test(profile.mobile)) {
      setMobileError('Mobile Number must start with 6 7 8 or 9 and should have 10 digits');
      return;
    }
    console.log(profile.email);
    if (field === 'email' && !/^[a-z0-9._%+-]+@gmail\.com$/.test(profile.email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    if (field === 'mobile') {
      setMobileError('');
      handleSendMobileOTP();
    } else if (field === 'email') {
      setEmailError('');
      handleSendEmailOTP();
    }
  };
  
    let navigate = useNavigate();
    const [click, setClick ]=useState(false);
    console.log(click)
    const handleClick = () => {
      navigate("/admin");
    };
  
    const handleNewPolicyClick = (e) => {
      e.preventDefault();
      
      // Set the click state and use a callback to navigate after the state is updated
      setClick(true);
      navigate("/Bikeentry", { state: { click: true, profile } });
    };

    const Renewal = (items)=>
      {
        navigate("/Quotation",{state:{profile,vyear:items.vyear,vnumber:items.vnumber,vname:items.vname,click:true,vprice:items.vprice}});
      }
    
  
    const [open, setOpen] = useState(false);
  
    const handleTooltipClose = () => {
      setOpen(false);
    };
  
    const handleTooltipOpen = () => {
      setOpen(true);
    };

  return (
    <div className='rp-main'>
        <div className='text-center'>
      <header>
        <div className="d-flex justify-content-between align-items-center py-2 rounded fixed" style={{ background: '#f0f8ff' }}>
          <Link to='/'><div>
              <img
                className="mx-3 ramana"
                src={p3}
                alt="RamanaSoft Insurance"
                title='RamanaSoft Insurance'
                style={{ borderRadius: '10px', cursor: 'pointer' }}
                onClick={handleClick}
              />
            </div></Link>

          <div className="ms-auto me-3">
            <ClickAwayListener onClickAway={handleTooltipClose}>
              <div>
                <Tooltip
                  PopperProps={{
                      disablePortal: true,
                      }}
                  onClose={handleTooltipClose}
                  open={open}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  title="1800-143-123"
                >
                  <Button onClick={handleTooltipOpen} className='text-center fw-semibold me-4'>
                    Call Us &nbsp;<PhoneIcon />
                  </Button>
                </Tooltip>
                <button 
                  className='mx-5 mt-1 btn btn-link fw-semibold text-decoration-none pnewpolicy' 
                  onClick={handleNewPolicyClick}
                >
                  Get new policy
                </button>
                <Link to='/'>
                  <button type="button" className="btn btn-danger fw-semibold mt-1">
                    Log-out <LogoutIcon/>
                  </button>
                </Link>
              </div>
            </ClickAwayListener>
          </div>
        </div>
      </header>
    </div>
      <div className='rp-cd ' style={{ marginTop: '60px' }}>
        <div className='row'></div>
      </div>

      <div className='row mt-2 pt-3 reviewpage-1'>
        <div className='px-3 col-12 col-md-4'>
          <h4 className='profile-heading'>Profile Details </h4>
          <div className="card rp-card">
            <div className="rp-card-body">
              <div className="profile-item">
                <label>Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</label>
                <span>{profile.name}</span>
              </div>
              <div className="profile-item">
                <label>Address &nbsp;&nbsp; :&nbsp;</label>
                <span>{profile.address}</span>
              </div>
              <div className="profile-item">
                <label>State &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :&nbsp;</label>
                <span>{profile.state}</span>
              </div>
              <div className="profile-item">
                <label>Mobile No&nbsp; :&nbsp;</label>
                {editMode.mobile ? (
                  <>
                    <input
                      type="text"
                      name="mobile"
                      value={profile.mobile}
                      onChange={handleChange}
                      maxLength="10"
                      id='mobile-field'
                      placeholder='Enter Mobile'
                      onKeyPress={(e) => {
                        const isValidInput = /[0-9]/;
                        if (!isValidInput.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                    <button className="btn btn-sm btn-primary mx-2" onClick={() => handleSave('mobile')}>Save</button>
                  </>
                ) : (
                  <>
                    <span>{profile.mobile}</span>
                    <button className="btn btn-sm btn-primary mx-2" onClick={() => handleEdit('mobile')} >Edit</button>
                  </>
                )}
              </div>
              {mobileError && <p className='text-danger'>{mobileError}</p>}
              {otpMode.mobile && (
                <div className="otp-verification">
                  <div className="otp-input">
                    {mobileOtp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOTPChange('mobile', index, e.target.value)}
                        ref={(el) => otpRefs.current[index] = el}
                      />
                    ))}
                  </div>
                  <button className="btn btn-sm btn-primary mx-2" onClick={() => handleVerifyOTP('mobile')}>Verify OTP</button>
                  <h4 className='text-danger'>{mobileOtpa}</h4>
                  {mobileOtpError && <div className="error">{mobileOtpError}</div>}
                  {mobileOtpSuccessMessage && <div className="success">{mobileOtpSuccessMessage}</div>}
                </div>
              )}
              <div className="profile-item">
                <label>Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</label>
                {editMode.email ? (
                  <>
                    <input
                      type="text"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      placeholder='Enter Email'
                      id='mobile-field'
                    />
                    <button className="btn btn-sm btn-primary mx-2 " onClick={() => handleSave('email')}>Save</button>
                  </>
                ) : (
                  <>
                    <span>{profile.email}</span>
                    <button className="btn btn-sm btn-primary mx-2" onClick={() => handleEdit('email')}>Edit</button>
                  </>
                )}
              </div>
              {emailError && <p className='text-danger'>{emailError}</p>}
              {otpMode.email && (
                <div className="otp-verification">
                  <div className="otp-input">
                    {emailOtp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOTPChange('email', index, e.target.value)}
                        ref={(el) => emailOtpRefs.current[index] = el}
                      />
                    ))}
                  </div>
                  <button className="btn btn-sm btn-primary mx-2" onClick={() => handleVerifyOTP('email')}>Verify OTP</button>
                  <h4 className='text-danger'>{emailOtpa}</h4>
                  {emailOtpError && <div className="error">{emailOtpError}</div>}
                  {emailOtpSuccessMessage && <div className="success">{emailOtpSuccessMessage}</div>}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='px-3 col-12 col-md-7'>
          <h4 className='profile-heading'>Policy Details </h4>
          {policy.length === 0 ? (
                <p>No policies have been taken by the customer.</p>
              ) : (
                policy.map((items, index) => {
                  const currentDate = new Date();
                  const endDate = new Date(items.enddate);
                  const isPolicyExpired = currentDate > endDate;

                  // Find the most recent policy for this vehicle
                  const mostRecentPolicyIndex = policy.reduce((latestIndex, currentPolicy, currentIndex) => {
                    if (currentPolicy.vnumber === items.vnumber) {
                      if (latestIndex === -1 || new Date(currentPolicy.enddate) > new Date(policy[latestIndex].enddate)) {
                        return currentIndex;
                      }
                    }
                    return latestIndex;
                  }, -1);

                  const isMostRecentPolicy = index === mostRecentPolicyIndex;

                  return (
                    <div key={index}>
                      <div className=''>
                <div class="card ">
                  <div class="card-body profile-card d-flex justify-content-between">
                    <div className="text-nowrap">
                      <label>Policy Number :&nbsp;</label>
                      <span>RSVI{items.id}</span>
                    </div>
                    <div className="text-nowrap">
                      <label>Customer Id :&nbsp;</label>
                      <span>{customerid}</span>
                    </div>

                  </div>
                </div>
                <div className="card rp-card">
                  <div className="rp-card-body ">
                    <div className="d-flex flex-column p-3 flex-md-row">
                      <div className="col rp-line" style={{ borderRight: '2px solid grey' }}>
                        <div className="profile-item text-nowrap">
                          <label>Vehicle No &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</label>
                          <span>{items.vnumber}</span>
                        </div>
                        <div className="profile-item text-nowrap">
                          <label>Vehicle Price&nbsp; &nbsp;&nbsp;&nbsp;:&nbsp;</label>
                          <span>{items.vprice}</span>
                        </div>
                        <div className="profile-item text-nowrap">
                          <label>Vehicle Name&nbsp; &nbsp;&nbsp;:&nbsp;</label>
                          <span>{items.vname}</span>
                        </div>
                        <div className="profile-item text-nowrap">
                          <label>Start Date&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;:&nbsp;</label>
                          <span>{items.startdate}</span>
                        </div> 
                      </div>
                      <div className="col-1 line-divider">
                        <div className="divider"></div>
                      </div>
                      <div className="col-7 ps-5 ms-5">
                        <div className="profile-item text-nowrap">
                          <label>IDV&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</label>
                          <span>{items.idv}</span>
                        </div>
                        <div className="profile-item text-nowrap">
                          <label>Registration Year&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</label>
                          <span>{items.vyear}</span>
                        </div>
                        <div className="profile-item text-nowrap">
                          <label>Premium Amount&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</label>
                          <span>{items.premiumAmount}</span>
                        </div>
                        <div className="profile-item text-nowrap">
                          <label>End Date&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;:&nbsp;</label>
                          <span>{items.enddate  }</span>
                        </div>
                      </div>
                    </div>
                    <button type="button" disabled={!isPolicyExpired||!isMostRecentPolicy} onClick={() => Renewal(items)} class="btn btn-primary">Renewal</button>

                    <a href={`http://122.169.207.194:9092/payment/create?paymentid=${items.paymentid}&customerid=${customerid}`} class="btn btn-primary" className='rp-invoice' download={"invoice"}>Invoice <i class="fa-solid fa-download"></i></a>
                    
                  </div>
                </div>
              </div>
            </div>
                  );
                })
              )}
      </div>
      </div>
      <Footer1 />
</div>
      );
};


      export default ReviewPage;




// import React, { useState, useEffect, useRef } from 'react';
// import Footer1 from './Footer1';
// import './ReviewPage.css';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
// import fileDownload from "js-file-download";
// import p3 from '../images/p3.jpeg.jpg';
// import { ClickAwayListener, Tooltip } from '@mui/material';
// import LogoutIcon from '@mui/icons-material/Logout';
// import PhoneIcon from '@mui/icons-material/Phone';
// import Button from '@mui/material/Button';
// import VehicleInsuranceService from './Service/VehicleInsuranceService';



// const ReviewPage = () => {
//   const [editMode, setEditMode] = useState({ mobile: false, email: false });
//   const [otpMode, setOtpMode] = useState({ mobile: false, email: false });
//   const [profile, setProfile] = useState({
//     name: '',
//     address: '',
//     state: '',
//     mobile: '',
//     email: '',
//   });
//   const [policy, setPolicy] = useState([]);
//   const [customerid, setid] = useState('');
//   const [paymentid, setpid] = useState('');

//   const [mobileOtp, setMobileOtp] = useState(Array(5).fill(''));
//   const [mobileOtpa, setMobileOtpa] = useState('');
//   const [mobileOtpError, setMobileOtpError] = useState('');
//   const [mobileOtpSuccessMessage, setMobileOtpSuccessMessage] = useState('');

//   const [emailOtp, setEmailOtp] = useState(Array(5).fill(''));
//   const [emailOtpa, setEmailOtpa] = useState('');
//   const [emailOtpError, setEmailOtpError] = useState('');
//   const [emailOtpSuccessMessage, setEmailOtpSuccessMessage] = useState('');

//   const otpRefs = useRef([]);
//   const emailOtpRefs = useRef([]);

//   const location = useLocation();
//   const { mobileNumber } = location.state || {};

//   useEffect(() => {
//     if (mobileNumber) {
//       getCustomerDetails(mobileNumber);
//     }
//   }, [mobileNumber]);

//   useEffect(() => {
//     if (customerid) {
//       getProfileDetails(customerid);
//     }
//   }, [customerid]);

//   const getCustomerDetails = async (mobile) => {
//     try {
//       const response = await VehicleInsuranceService.getCustomerDetailsByMobile(mobile);
//       //const response = await axios.get(http://192.168.1.200:9090/customer/get/${mobile});
//       if (response.status === 200) {
//         const customerData = response.data;
//         setid(response.data.customerid);
//         setProfile({
//           name: `${customerData.firstName} ${customerData.lastName}`,
//           address: customerData.address,
//           state: customerData.state,
//           mobile: customerData.mobile,
//           email: customerData.email,
//           vehicleNo: customerData.vnumber,
//         });
//       } else {
//         console.log('Failed to get details');
//       }
//     } catch (error) {
//       console.error('Error getting details:', error);
//     }
//   };

//   const getProfileDetails = async (customerid) => {
//     try {
//       const response = await VehicleInsuranceService.getPaymentDetailsByCustomerId(customerid);
//       //const response = await axios.get(http://192.168.1.200:9090/payment/fetch/${customerid});
//       if (response.status === 200) {
//         const profileData = response.data;
//         console.log(response.data);
//         setpid(response.data.paymentid);
//         setPolicy(response.data)
//       } else {
//         console.log('Failed to get details');
//       }
//     } catch (error) {
//       console.error('Error getting details:', error);
//     }
//   };

//   const handleSendMobileOTP = async () => {
//     if (/^[6-9]\d{9}$/.test(profile.mobile)) {
//       try {
//         const response = await VehicleInsuranceService.sendMobileOtp(profile.mobile);
//         // const response = await axios.get(http://192.168.1.200:9090/vehicle/sendOtp, {
//         //   params: { mobile: profile.mobile },
//         // });
//         console.log('mobile otp received', response.data);
//         if (response.status === 200) {
//           setMobileOtpa(response.data);
//           setMobileOtpError('');
//           setMobileOtpSuccessMessage('OTP sent successfully!');
//           setOtpMode({ ...otpMode, mobile: true });
//         } else {
//           setMobileOtpError('Please enter a valid mobile number');
//         }
//       } catch (error) {
//         setMobileOtpError('Error sending OTP');
//       }
//     } else {
//       setMobileOtpError('Failed to send OTP');
//     }
//   };

//   const handleSendEmailOTP = async () => {
//     if (/^[a-z0-9._%+-]+@gmail\.com$/.test(profile.email)) {

//       try {
//         const response = await VehicleInsuranceService.sendEmailOtpForUpdation(profile.email);
//         //const response = await axios.post(http://192.168.1.200:9090/vehicle/sendEmailOTPforUpdation/${profile.email});
//         console.log('email otp received', response.data);
//         if (response.status === 200) {
//           setEmailOtpa(response.data);
//           setEmailOtpError('');
//           setEmailOtpSuccessMessage('OTP sent successfully!');
//           setOtpMode({ ...otpMode, email: true });
//         } else {
//           setEmailOtpError('Failed to send OTP');
//         }
//       } catch (error) {
//         setEmailOtpError('Error sending OTP');
//       }
//     } else {
//       setEmailOtpError('Please enter a valid email address');
//     }
//   };

//   const handleOTPChange = (otpType, index, value) => {
//     if (value.length <= 1) {
//       if (otpType === 'mobile') {
//         const newOtp = [...mobileOtp];
//         newOtp[index] = value;
//         setMobileOtp(newOtp);

//         if (value && index < otpRefs.current.length - 1) {
//           otpRefs.current[index + 1].focus();
//         }
//       } else if (otpType === 'email') {
//         const newOtp = [...emailOtp];
//         newOtp[index] = value;
//         setEmailOtp(newOtp);

//         if (value && index < emailOtpRefs.current.length - 1) {
//           emailOtpRefs.current[index + 1].focus();
//         }
//       }
//     }
//   };

//   const handleVerifyOTP = async (otpType) => {
//     if (otpType === 'mobile') {
//       const enteredOtp = mobileOtp.join('');
//       if (enteredOtp == mobileOtpa) {
//         setMobileOtpError('');
//         setMobileOtpSuccessMessage('Mobile OTP verified successfully!');
//         setEditMode({ ...editMode, mobile: false });
//         setOtpMode({ ...otpMode, mobile: false });
//         try {
//           const response = await VehicleInsuranceService.updateCustomerMobileNumber(customerid,profile.mobile);
//           //const response = await axios.put(http://192.168.1.200:9090/customer/updatemobile/${customerid}/${profile.mobile});
//           console.log(response.data);
//           if (response.status === 200) {
//             console.log('sucess in changing mobile number');
//           } else {
//             console.log('Failed to changing mobile number');
//           }
//         } catch (error) {
//           console.error('Error changing mobile:', error);
//         }
//       } else {
//         setMobileOtpError('Invalid OTP');
//       }
//     } else if (otpType === 'email') {
//       const enteredOtp = emailOtp.join('');
//       if (enteredOtp == emailOtpa) {
//         setEmailOtpError('');
//         setEmailOtpSuccessMessage('Email OTP verified successfully!');
//         setEditMode({ ...editMode, email: false });
//         setOtpMode({ ...otpMode, email: false });
//         try {
//           const response = await VehicleInsuranceService.updateCustomerEmailNumber(customerid,profile.email);
//           //const response = await axios.put(http://192.168.1.200:9090/customer/updateemail/${customerid}/${profile.email});
//           console.log(response.data);
//           if (response.status === 200) {
//             console.log('sucess in changing email');
//           } else {
//             console.log('Failed to change email');
//           }
//         } catch (error) {
//           console.error('Error changing email:', error);
//         }
//       } else {
//         setEmailOtpError('Invalid OTP');
//       }
//     }
//   };

//   const handleEdit = (field) => {
//     setEditMode({ ...editMode, [field]: true });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfile({ ...profile, [name]: value });
//   };

//   const handleSave = (field) => {
//     console.log(profile.mobile);
//     if (field === 'mobile' && !/^[6-9]\d{9}$/.test(profile.mobile)) {
//       setMobileOtpError('Please enter a valid mobile number');
//       return;
//     }
//     console.log(profile.email);
//     if (field === 'email' && !/^[a-z0-9._%+-]+@gmail\.com$/.test(profile.email)) {
//       setEmailOtpError('Please enter a valid email address');
//       return;
//     }
//     if (field === 'mobile') {
//       handleSendMobileOTP();
//     } else if (field === 'email') {
//       handleSendEmailOTP();
//     }
//   };
  
//     let navigate = useNavigate();
//     const [click, setClick ]=useState(false);
    
//     console.log(click)
//     const handleClick = () => {
//       navigate("/admin");
//     };
  
//     const handleNewPolicyClick = (e) => {
//       e.preventDefault();
      
//       // Set the click state and use a callback to navigate after the state is updated
//       setClick(true);
//       navigate("/1", { state: { click: true, customerid,profile } });
//     };
    
  
//     const [open, setOpen] = useState(false);
  
//     const handleTooltipClose = () => {
//       setOpen(false);
//     };
  
//     const handleTooltipOpen = () => {
//       setOpen(true);
//     };

//   return (
//     <div className='rp-main'>
//         <div className='text-center'>
//       <header>
//         <div className="d-flex justify-content-between align-items-center py-2 rounded fixed" style={{ background: '#f0f8ff' }}>
//           <Link to='/'><div>
//               <img
//                 className="mx-3 ramana"
//                 src={p3}
//                 alt="RamanaSoft Insurance"
//                 title='RamanaSoft Insurance'
//                 style={{ borderRadius: '10px', cursor: 'pointer' }}
//                 onClick={handleClick}
//               />
//             </div></Link>

//           <div className="ms-auto me-3">
//             <ClickAwayListener onClickAway={handleTooltipClose}>
//               <div>
//                 <Tooltip
//                   PopperProps={{
//                       disablePortal: true,
//                       }}
//                   onClose={handleTooltipClose}
//                   open={open}
//                   disableFocusListener
//                   disableHoverListener
//                   disableTouchListener
//                   title="1800-143-123"
//                 >
//                   <Button onClick={handleTooltipOpen} className='text-center fw-semibold me-4'>
//                     Call Us &nbsp;<PhoneIcon />
//                   </Button>
//                 </Tooltip>
//                 <button 
//                   className='mx-5 mt-1 btn btn-link fw-semibold text-decoration-none pnewpolicy' 
//                   onClick={handleNewPolicyClick}
//                 >
//                   Get new policy
//                 </button>
//                 <Link to='/'>
//                   <button type="button" className="btn btn-danger fw-semibold mt-1">
//                     Log-out <LogoutIcon/>
//                   </button>
//                 </Link>
//               </div>
//             </ClickAwayListener>
//           </div>
//         </div>
//       </header>
//     </div>
//       <div className='rp-cd ' style={{ marginTop: '60px' }}>
//         <div className='row'></div>
//       </div>

//       <div className='row mt-2 pt-3 reviewpage-1'>
//         <div className='px-3 col-12 col-md-4'>
//           <h4 className='profile-heading'>Profile Details </h4>
//           <div className="card rp-card">
//             <div className="rp-card-body">
//               <div className="profile-item">
//                 <label>Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</label>
//                 <span>{profile.name}</span>
//               </div>
//               <div className="profile-item">
//                 <label>Address &nbsp;&nbsp; :&nbsp;</label>
//                 <span>{profile.address}</span>
//               </div>
//               <div className="profile-item">
//                 <label>State &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :&nbsp;</label>
//                 <span>{profile.state}</span>
//               </div>
//               <div className="profile-item">
//                 <label>Mobile No&nbsp; :&nbsp;</label>
//                 {editMode.mobile ? (
//                   <>
//                     <input
//                       type="text"
//                       name="mobile"
//                       value={profile.mobile}
//                       onChange={handleChange}
//                       maxLength="10"
//                       id='mobile-field'
//                       placeholder='Enter Mobile'
//                       onKeyPress={(e) => {
//                         const isValidInput = /[0-9]/;
//                         if (!isValidInput.test(e.key)) {
//                           e.preventDefault();
//                         }
//                       }}
//                     />
//                     <button className="btn btn-sm btn-primary mx-2" onClick={() => handleSave('mobile')}>Save</button>
//                   </>
//                 ) : (
//                   <>
//                     <span>{profile.mobile}</span>
//                     <button className="btn btn-sm btn-primary mx-2" onClick={() => handleEdit('mobile')} >Edit</button>
//                   </>
//                 )}
//               </div>
//               {otpMode.mobile && (
//                 <div className="otp-verification">
//                   <div className="otp-input">
//                     {mobileOtp.map((digit, index) => (
//                       <input
//                         key={index}
//                         type="text"
//                         maxLength="1"
//                         value={digit}
//                         onChange={(e) => handleOTPChange('mobile', index, e.target.value)}
//                         ref={(el) => otpRefs.current[index] = el}
//                       />
//                     ))}
//                   </div>
//                   <button className="btn btn-sm btn-primary mx-2" onClick={() => handleVerifyOTP('mobile')}>Verify OTP</button>
//                   {mobileOtpError && <div className="error">{mobileOtpError}</div>}
//                   {mobileOtpSuccessMessage && <div className="success">{mobileOtpSuccessMessage}</div>}
//                 </div>
//               )}
//               <div className="profile-item">
//                 <label>Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</label>
//                 {editMode.email ? (
//                   <>
//                     <input
//                       type="text"
//                       name="email"
//                       value={profile.email}
//                       onChange={handleChange}
//                       placeholder='Enter Email'
//                       id='mobile-field'
//                     />
//                     <button className="btn btn-sm btn-primary mx-2 " onClick={() => handleSave('email')}>Save</button>
//                   </>
//                 ) : (
//                   <>
//                     <span>{profile.email}</span>
//                     <button className="btn btn-sm btn-primary mx-2" onClick={() => handleEdit('email')}>Edit</button>
//                   </>
//                 )}
//               </div>
//               {otpMode.email && (
//                 <div className="otp-verification">
//                   <div className="otp-input">
//                     {emailOtp.map((digit, index) => (
//                       <input
//                         key={index}
//                         type="text"
//                         maxLength="1"
//                         value={digit}
//                         onChange={(e) => handleOTPChange('email', index, e.target.value)}
//                         ref={(el) => emailOtpRefs.current[index] = el}
//                       />
//                     ))}
//                   </div>
//                   <button className="btn btn-sm btn-primary mx-2" onClick={() => handleVerifyOTP('email')}>Verify OTP</button>
//                   {emailOtpError && <div className="error">{emailOtpError}</div>}
//                   {emailOtpSuccessMessage && <div className="success">{emailOtpSuccessMessage}</div>}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className='px-3 col-12 col-md-7'>
//           <h4 className='profile-heading'>Policy Details </h4>
//         {
//           policy && policy.map((items) => (
//               <div className=''>
//                 <div class="card ">
//                   <div class="card-body profile-card d-flex justify-content-between">
//                     <div className="text-nowrap">
//                       <label>Policy Number :&nbsp;</label>
//                       <span>RSVI{items.id}</span>
//                     </div>
//                     <div className="text-nowrap">
//                       <label>Customer Id :&nbsp;</label>
//                       <span>{customerid}</span>
//                     </div>

//                   </div>
//                 </div>
//                 <div className="card rp-card">
//                   <div className="rp-card-body ">
//                     <div className="d-flex flex-column p-3 flex-md-row">
//                       <div className="col rp-line" style={{ borderRight: '2px solid grey' }}>
//                         <div className="profile-item text-nowrap">
//                           <label>Vehicle No &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</label>
//                           <span>{items.vnumber}</span>
//                         </div>
//                         <div className="profile-item text-nowrap">
//                           <label>Vehicle Price&nbsp; &nbsp;&nbsp;&nbsp;:&nbsp;</label>
//                           <span>{items.vprice
//                           }</span>
//                         </div>
//                         <div className="profile-item text-nowrap">
//                           <label>Vehicle Name&nbsp; &nbsp;&nbsp;:&nbsp;</label>
//                           <span>{items.vname 
//                           }</span>
//                         </div>
//                         <div className="profile-item text-nowrap">
//                           <label>Start Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;:&nbsp;</label>
//                           <span>{items.startdate
//                           }</span>
//                         </div>
//                       </div>
//                       <div className="col-1 line-divider">
//                         <div className="divider"></div>
//                       </div>
//                       <div className="col-7 ps-5 ms-5">
//                         <div className="profile-item text-nowrap">
//                           <label>IDV&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</label>
//                           <span>{items.idv}</span>
//                         </div>
//                         <div className="profile-item text-nowrap">
//                           <label>Registration Year&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</label>
//                           <span>{items.vyear}</span>
//                         </div>
//                         <div className="profile-item text-nowrap">
//                           <label>Premium Amount&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</label>
//                           <span>{items.premiumAmount}</span>
//                         </div>
//                         <div className="profile-item text-nowrap">
//                           <label>End Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</label>
//                           <span>{items.enddate}</span>
//                         </div>
//                       </div>
//                     </div>
//                     <button type="button" disabled class="btn btn-primary">Renewal</button>

//                     <a href={`http://192.168.1.2:9096/payment/create?paymentid=${items.paymentid}&customerid=${customerid}`} class="btn btn-primary" className='rp-invoice' download={"invoice"}>Invoice <i class="fa-solid fa-download"></i></a>
//                     {/* <button className="invoice-button" onClick={handleInvoiceDownload} >  Invoice <i class="fa-solid fa-download"></i></button> */}
//                   </div>
//                 </div>
//               </div>

//                ))
//                }

//       </div>
//       </div>
//       <Footer1 />
// </div>
//       );
// };


//       export default ReviewPage;