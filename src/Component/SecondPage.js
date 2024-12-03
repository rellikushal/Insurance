import Header from './Header';
import './SecondPage.css';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ShieldIcon from '@mui/icons-material/Shield';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import Footer1 from './Footer1';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import VehicleInsuranceService from './Service/VehicleInsuranceService';

const SecondPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {veh,profile,click} = location.state || {};

  const vname = veh.vname;
  const vnumber = veh.vnumber;
  const vyear = veh.vyear;
  
  const [isDefault, setIsDefault] = useState(true);
  const [formData, setFormData] = useState({
    vnumber: vnumber,
    fullName: '',
    address: '',
    state: '',
    mobile: '',
    email: ''
  });

  useEffect(()=>{
    if(click===true)
    {
      formData.fullName=profile.name;
      formData.address=profile.address;
      formData.state=profile.state;
      formData.mobile=profile.mobile;
      formData.email=profile.email;
      setIsDefault(false);
    }
  })

  const [errors, setErrors] = useState({});
  const [isMobileOTPSent, setIsMobileOTPSent] = useState(false);
  const [mobileOtp, setMobileOtp] = useState(Array(5).fill(''));
  const [mobileOtpa, setMobileOtpa] = useState(Array(5).fill(''));
  const [mobileOtpError, setMobileOtpError] = useState('');
  const [mobileOtpSuccessMessage, setMobileOtpSuccessMessage] = useState('');
  const [isMobileOTPVerified, setIsMobileOTPVerified] = useState(false);
  const [MobileOtp1Error, setMobileOtp1Error] = useState('') 

  const [isEmailOTPSent, setIsEmailOTPSent] = useState(false);
  const [emailOtp, setEmailOtp] = useState(Array(5).fill(''));
  const [emailOtpa, setEmailOtpa] = useState(Array(5).fill(''));
  const [emailOtpError, setEmailOtpError] = useState('');
  const [emailOtpSuccessMessage, setEmailOtpSuccessMessage] = useState('');
  const [isEmailOTPVerified, setIsEmailOTPVerified] = useState(false);
  const [emailOtp1Error,  setemailOtp1Error] = useState('') 

  const otpRefs = useRef([]);
  const emailOtpRefs = useRef([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.trim(),
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const validate = () => {
    const newErrors = {};

    const namePattern = /^[A-Za-z\s]+$/;
    const mobilePattern = /^[6789]\d{9}$/;
    const emailPattern = /^[a-z0-9._%+-]+@gmail\.com$/;

    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
    } else if (!namePattern.test(formData.fullName)) {
      newErrors.fullName = 'Full name can only contain letters and spaces';
    }

    if (!formData.address) {
      newErrors.address = 'Address is required';
    }

    if (!formData.state) {
      newErrors.state = 'State is required';
    }

    if (!formData.mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!mobilePattern.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must start with 6, 7, 8, or 9 and should have 10 digits';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Email address must be a valid Gmail address';
    }

    return newErrors;
  };

const handleSendMobileOTP = async () => {
  if (/^[6-9]\d{9}$/.test(formData.mobile)) {
    try {
      const response = await VehicleInsuranceService.getCustomerDetailsByMobile(formData.mobile);
      
      if (formData.mobile === response.data.mobile) {
        setMobileOtp1Error("Mobile number already exists. Please ");
      } else {
        try {
          const response1 = await VehicleInsuranceService.sendMobileOtp(formData.mobile);
          if (response1.status === 200) {
            console.log('Mobile OTP sent successfully', response1.data);
            setMobileOtpa(response1.data);
            setIsMobileOTPSent(true);
            setMobileOtpError('');
            setMobileOtp1Error('');
            setMobileOtpSuccessMessage('OTP sent successfully!');
          } else {
            console.log('Failed to send mobile OTP', response1);
            setMobileOtpError('Failed to send OTP');
          }
        } catch (error) {
          console.error('Error sending mobile OTP:', error);
          setMobileOtpError('Failed to send OTP');
        }
      }
    } catch (error) {
      console.error('Error getting mobile details:', error);
      setMobileOtpError('Error getting mobile details');
    }
  } else {
    setMobileOtpError('Please enter a valid mobile number');
  }
};

  const handleSendEmailOTP = async () => {
    if (/^[a-z0-9._%+-]+@gmail\.com$/.test(formData.email)) {
      try {
        const response = await VehicleInsuranceService.getCustomerDetailsByEmail(formData.email);
        console.log(response.data);
        if (formData.email===response.data.email) {
          setemailOtp1Error("Email is already existed. Please")
        } else {
          try {
            const response = await VehicleInsuranceService.sendEmailOtpForRegisteration(formData.email);
            if (response.status === 200) {
              console.log('Email OTP sent successfully', response.data);
              setEmailOtpa(response.data);
              setIsEmailOTPSent(true);
              setEmailOtpError('');
              setemailOtp1Error('')
              setEmailOtpSuccessMessage('OTP sent successfully!');
            } else {
              console.log('Failed to send email OTP', response);
              setEmailOtpError('Failed to send OTP');
            }
          } catch (error) {
            console.error('Error sending email OTP:', error);
            setEmailOtpError('Error sending OTP');
          }
        }
      } catch (error) {
        console.error('Error getting Email details:', error);
        setEmailOtpError('Error getting email details');
      }
    } else {
      
      setEmailOtpError('Please enter a valid Email Address');
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

  const handleVerifyOTP = (otpType) => {
    if (otpType === 'mobile') {
      const enteredOtp = mobileOtp.join('');
      console.log('Entered Mobile OTP:', enteredOtp);
      console.log('Actual Mobile OTP:', mobileOtpa);
      if (enteredOtp == mobileOtpa) {
        console.log('Mobile OTP verified successfully');
        setMobileOtpError('');
        setMobileOtpSuccessMessage('Mobile OTP verified successfully!');
        setIsMobileOTPVerified(true);
        setIsMobileOTPSent(false);
      } else {
        setMobileOtpError('Invalid OTP');
      }
    } else if (otpType === 'email') {
      const enteredOtp = emailOtp.join('');
      console.log('Entered Email OTP:', enteredOtp);
      console.log('Actual Email OTP:', emailOtpa);
      if (enteredOtp == emailOtpa) {
        console.log('Email OTP verified successfully');
        setEmailOtpError('');
        setEmailOtpSuccessMessage('Email OTP verified successfully!');
        setIsEmailOTPVerified(true);
        setIsEmailOTPSent(false);
      } else {
        setEmailOtpError('Invalid OTP');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if(click==true)
    {
      navigate('/Quotation', {
        state: {
          formData,
          veh
        }
      });
    }
    else
    {
      if (mobileOtp.join('') != mobileOtpa) {
        setMobileOtpError('Please verify the mobile OTP');
        return;
      }
  
      if (emailOtp.join('') != emailOtpa) {
        setEmailOtpError('Please verify the email OTP');
        return;
      }
  
      try {
        const response = await VehicleInsuranceService.createCustomer(formData);
        if (response.status === 200) {
          navigate('/Quotation', {
            state: {
              formData,
              veh
            }
          });
          console.log('Form submitted successfully');
        } else {
          console.log('Form submission failed');
        }
      } catch (error) {
        console.error('Error submitting form', error)
      }
    }
  };

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  
  return (
        <>
          <Header />
          <div className='container-fluid sp-background'>
            <div className='row'>
              <div className='d-flex flex-column col-lg-6 col-md-8 col-sm-10'>
                <form className='sp-form' onSubmit={handleSubmit}>
                <div className="container-fluid p-0">
                    <div className="row m-0">
                      <div className="col-12 p-0">
                        <div className="sp-form-group">
                          <label htmlFor="fullname">
                            Full Name * : (As per Aadhar Card)
                        </label>
                          <div className="d-flex flex-lg-row sp-form-group w-100 m-0">
                            <div className="flex-grow-1">
                          <input
                                className="form-control p-3 rounded w-100"
                                placeholder="Enter full name"
                                type="text"
                                id="fullname"
                                name="fullName"
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                required
                                disabled={!isDefault}
                                autoComplete="off"
                                minLength={5}
                                maxLength={30}
                                onKeyPress={(e) => {
                                
                                  const isValidInput = /[a-zA-Z\s]/;
                                  if (!isValidInput.test(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                              {errors.fullName && <p className="sp-error">{errors.fullName}</p>}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sp-form-group">
                    <label>Address * :</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required
                      disabled={!isDefault}
                      className="sp-input"
                      autoComplete='off'
                    />
                    {errors.address && <p className="sp-error">{errors.address}</p>}
                  </div>
                  <div className="sp-form-group ">
                    <label>State * :</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      disabled={!isDefault}
                      className="sp-input p-4="
                    >
                      <option value="">Select a state</option>
                      {indianStates.map((state) => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                    {errors.state && <p className="sp-error">{errors.state}</p>}
                  </div>
                  <div className="sp-form-group ">
                    <label>Mobile Number * :</label>
                    <input
                      type="text"
                      name="mobile"
                      id='mobile'
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                      disabled={!isDefault}
                      className="sp-input"
                      maxLength={10}
                      autoComplete='off'
                      onKeyPress={(e) => {
                        const isValidInput = /[0-9]/;
                        if (!isValidInput.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                    {MobileOtp1Error && (
                      <div>
                        <span className="text-danger">{MobileOtp1Error}</span>
                        <a href='/userlogin' className="text-danger" >Login</a>
                      </div>
                    )}
                    {isDefault&&<button type="button" className="sp-otp-button mt-2" onClick={handleSendMobileOTP}>Send OTP</button>}
                    <h4 className='text-danger'>{mobileOtpa}</h4>
                    {errors.mobile && <p className="sp-error">{errors.mobile}</p>}
                    {mobileOtpError && <p className="sp-error">{mobileOtpError}</p>}
                    {mobileOtpSuccessMessage && <p className="sp-success">{mobileOtpSuccessMessage}</p>}
                    
                    {isMobileOTPSent && (
                      <div>
                        <label className="sp-otp-label">Enter OTP:</label>
                        <div className="sp-otp-inputs">
                          {mobileOtp.map((value, index) => (
                            <input
                              key={index}
                              type="text"
                              className="sp-otp-input"
                              value={value}
                              onChange={(e) => handleOTPChange('mobile', index, e.target.value)}
                              maxLength="1"
                              ref={(el) => (otpRefs.current[index] = el)}
                            />
                          ))}
                        </div>
                        <button type="button" className="sp-otp-verify-button mt-2" onClick={() => handleVerifyOTP('mobile')}>Verify OTP</button>
                      </div>
                    )}
                  </div>
                  <div className="sp-form-group">
                    <label>Email * :</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={!isDefault}
                      className="sp-input"
                      autoComplete='off'
                    />
                    {emailOtp1Error && (
                      <div>
                        <span className="text-danger">{emailOtp1Error}</span>
                        <a href='/userlogin' className="text-danger" >Login</a>
                      </div>
                    )}
                    {isDefault&&<button type="button" className="sp-otp-button mt-2" onClick={handleSendEmailOTP}>Send OTP</button>}
                    <h4 className='text-danger'>{emailOtpa}</h4>
                    {errors.email && <p className="sp-error">{errors.email}</p>}
                    {emailOtpError && <p className="sp-error">{emailOtpError}</p>}
                    {emailOtpSuccessMessage && <p className="sp-success">{emailOtpSuccessMessage}</p>}
                    
                    {isEmailOTPSent && (
                      <div>
                        <label className="sp-otp-label">Enter OTP:</label>
                        <div className="sp-otp-inputs">
                          {emailOtp.map((value, index) => (
                            <input
                              key={index}
                              type="text"
                              className="sp-otp-input"
                              value={value}
                              onChange={(e) => handleOTPChange('email', index, e.target.value)}
                              maxLength="1"
                              ref={(el) => (emailOtpRefs.current[index] = el)}
                            />
                          ))}
                        </div>
                        <button type="button" className="sp-otp-verify-button mt-2" onClick={() => handleVerifyOTP('email')}>Verify OTP</button>
                      </div>
                    )}
                  </div>
                  <div className='d-flex justify-content-between'>
                  <button type="submit" className="sp-submit-button px-5 py-2 rounded">Submit</button>
                  
                  </div>
                </form>
              </div>
              <div className='d-flex flex-column col-lg-6 col-md-4 col-sm-2 mt-5 pt-5'>
                <div className="sp-card1 border rounded">
                  <div className="card-body">
                    <p className='sp-carddata1'>
                      {`${vname} / ${vnumber} / REGISTERED IN ${vyear}`}
                      <i className="fa-solid fa-motorcycle fa-2xl"></i>
                    </p>
                  </div>
                </div>
                <div className="spcard rounded shadow">
                  <div className="card-body border rounded">
                    <h5 className="card-title sp-card-title pt-2 text-center">Why buy from RS Insurance</h5>
                    <p className="card-text">
                      <ul>
                        <li><i className="fa-solid fa-globe text-success"></i> Claim assistance anytime, anywhere!</li>
                        <li><ShieldIcon className='text-warning' /> Compare and choose best plan</li>
                        <li><SupportAgentIcon className='text-dark' /> 24/7 support helpline</li>
                        <li><AvTimerIcon className='text-primary' /> Get your policy instantly with quick and easy KYC process</li>
                      </ul>
                    </p>
                  </div>
                  <div className='sp-card-footer'>
                    <p className='text-center mt-3 p-2 spfontsize'>
                      <ContentPasteIcon className='text-success mx-1' /> 10,000+ people use RS Insurance every day to insure their bike
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer1 />
        </>
      );
    };

export default SecondPage;

// import Header from './Header';
// import './SecondPage.css';
// import React, { useState, useRef } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import SupportAgentIcon from '@mui/icons-material/SupportAgent';
// import ShieldIcon from '@mui/icons-material/Shield';
// import AvTimerIcon from '@mui/icons-material/AvTimer';
// import Footer1 from './Footer1';
// import ContentPasteIcon from '@mui/icons-material/ContentPaste';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import VehicleInsuranceService from './Service/VehicleInsuranceService';
// const SecondPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { state: locationState } = location;

//   const vname = locationState?.veh?.vname;
//   const vnumber = locationState?.veh?.vnumber;
//   const vyear = locationState?.veh?.vyear;
//   const veh = locationState?.veh;
//   console.log(veh);

//   const [formData, setFormData] = useState({
//     vnumber: vnumber,
//     firstName: '',
//     lastName: '',
//     address: '',
//     state: '',
//     mobile: '',
//     email: ''
//   });

//   const [errors, setErrors] = useState({});
//   const [isMobileOTPSent, setIsMobileOTPSent] = useState(false);
//   const [mobileOtp, setMobileOtp] = useState(Array(5).fill(''));
//   const [mobileOtpa, setMobileOtpa] = useState(Array(5).fill(''));
//   const [mobileOtpError, setMobileOtpError] = useState('');
//   const [mobileOtpSuccessMessage, setMobileOtpSuccessMessage] = useState('');
//   const [isMobileOTPVerified, setIsMobileOTPVerified] = useState(false);
//   const [MobileOtp1Error, setMobileOtp1Error] = useState('') 

//   const [isEmailOTPSent, setIsEmailOTPSent] = useState(false);
//   const [emailOtp, setEmailOtp] = useState(Array(5).fill(''));
//   const [emailOtpa, setEmailOtpa] = useState(Array(5).fill(''));
//   const [emailOtpError, setEmailOtpError] = useState('');
//   const [emailOtpSuccessMessage, setEmailOtpSuccessMessage] = useState('');
//   const [isEmailOTPVerified, setIsEmailOTPVerified] = useState(false);
//   const [emailOtp1Error,  setemailOtp1Error] = useState('') 

//   const otpRefs = useRef([]);
//   const emailOtpRefs = useRef([]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value.trim(),
//     }));
//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       [name]: '',
//     }));
//   };

//   const validate = () => {
//     const newErrors = {};

//     const namePattern = /^[A-Za-z\s]+$/;
//     const mobilePattern = /^[6789]\d{9}$/;
//     const emailPattern = /^[a-z0-9._%+-]+@gmail\.com$/;

//     if (!formData.firstName) {
//       newErrors.firstName = 'First name is required';
//     } else if (!namePattern.test(formData.firstName)) {
//       newErrors.firstName = 'First name can only contain letters and spaces';
//     }

//     if (!formData.lastName) {
//       newErrors.lastName = 'Last name is required';
//     } else if (!namePattern.test(formData.lastName)) {
//       newErrors.lastName = 'Last name can only contain letters and spaces';
//     }

//     if (!formData.address) {
//       newErrors.address = 'Address is required';
//     }

//     if (!formData.state) {
//       newErrors.state = 'State is required';
//     }

//     if (!formData.mobile) {
//       newErrors.mobile = 'Mobile number is required';
//     } else if (!mobilePattern.test(formData.mobile)) {
//       newErrors.mobile = 'Mobile number must start with 6, 7, 8, or 9 and should have 10 digits';
//     }

//     if (!formData.email) {
//       newErrors.email = 'Email is required';
//     } else if (!emailPattern.test(formData.email)) {
//       newErrors.email = 'Email address must be a valid Gmail address';
//     }

//     return newErrors;
//   };


//   const handleSendMobileOTP = async () => {
//     if (/^[6-9]\d{9}$/.test(formData.mobile)) {
//       try {
//         const response=await VehicleInsuranceService.getCustomerDetailsByMobile(formData.mobile);
//         // const response = await axios.get(`http://192.168.1.2:9096/customer/get/${formData.mobile}`);
//         console.log(response.data.mobile);
//         if (formData.mobile===response.data.mobile) {
        
          
//           setMobileOtp1Error("Mobile number is already existed, please login and go through the Get New Policy.")
//         } else {
//           try {
//             // const response = await axios.get(`http://192.168.1.2:9096/vehicle/sendOtp`, {
//             //   params: { mobile:formData.mobile },
//             // });
//             const response = await VehicleInsuranceService.sendMobileOtp(formData.mobile);
//             if (response.status === 200) {
//               console.log('Mobile OTP sent successfully', response.data);
//               setMobileOtpa(response.data);
//               setIsMobileOTPSent(true);
//               setMobileOtpError('');
//               setMobileOtp1Error('')
//               setMobileOtpSuccessMessage('OTP sent successfully!');
//             } else {
//               console.log('Failed to send mobile OTP', response);
//               setMobileOtpError('Failed to send OTP');
//             }
//           } catch (error) {
//             console.error('Error getting customer data:', error);
//           }
//         }
//       } catch (error) {
        
//       }
//     } else {
      
//       setMobileOtpError('Please enter a valid mobile number');
//     }
//   };


//   const handleSendEmailOTP = async () => {
//     if (/^[a-z0-9._%+-]+@gmail\.com$/.test(formData.email)) {
//       try {
//         const response = await VehicleInsuranceService.getCustomerDetailsByEmail(formData.email);
//         // const response = await axios.get(`http://192.168.1.2:9096/customer/getByEmail/${formData.email}`);
//         console.log(response.data);
//         if (formData.email===response.data.email) {
//           setemailOtp1Error("Email is already existed, please Login and go through the Get New Policy.")
//         } else {
//           try {
//              //const response = await axios.post(`http://192.168.1.2:9096/vehicle/sendEmailOtpForUpdation/${formData.email}`);
//             const response = await VehicleInsuranceService.sendEmailOtpForRegisteration(formData.email);
//             if (response.status === 200) {
//               console.log('Email OTP sent successfully', response.data);
//               setEmailOtpa(response.data);
//               setIsEmailOTPSent(true);
//               setEmailOtpError('');
//               setemailOtp1Error('')
//               setEmailOtpSuccessMessage('OTP sent successfully!');
//             } else {
//               console.log('Failed to send email OTP', response);
//               setEmailOtpError('Failed to send OTP');
//             }
//           } catch (error) {
//             console.error('Error sending email OTP:', error);
//             setEmailOtpError('Error sending OTP');
//           }
//         }
//       } catch (error) {
//         console.error('Error sending mobile OTP:', error);
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

//   const handleVerifyOTP = (otpType) => {
//     if (otpType === 'mobile') {
//       const enteredOtp = mobileOtp.join('');
//       console.log('Entered Mobile OTP:', enteredOtp);
//       console.log('Actual Mobile OTP:', mobileOtpa);
//       if (enteredOtp == mobileOtpa) {
//         console.log('Mobile OTP verified successfully');
//         setMobileOtpError('');
//         setMobileOtpSuccessMessage('Mobile OTP verified successfully!');
//         setIsMobileOTPVerified(true);
//         setIsMobileOTPSent(false);
//       } else {
//         setMobileOtpError('Invalid OTP');
//       }
//     } else if (otpType === 'email') {
//       const enteredOtp = emailOtp.join('');
//       console.log('Entered Email OTP:', enteredOtp);
//       console.log('Actual Email OTP:', emailOtpa);
//       if (enteredOtp == emailOtpa) {
//         console.log('Email OTP verified successfully');
//         setEmailOtpError('');
//         setEmailOtpSuccessMessage('Email OTP verified successfully!');
//         setIsEmailOTPVerified(true);
//         setIsEmailOTPSent(false);
//       } else {
//         setEmailOtpError('Invalid OTP');
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     if (mobileOtp.join('') != mobileOtpa) {
//       setMobileOtpError('Please verify the mobile OTP');
//       return;
//     }

//     if (emailOtp.join('') != emailOtpa) {
//       setEmailOtpError('Please verify the email OTP');
//       return;
//     }

//     try {
//       // const response = await axios.post(`http://192.168.1.2:9096/customer/add`, formData, {
//       //   headers: {
//       //     'Content-Type': 'application/json',
//       //   },
//       // });
//       const response = await VehicleInsuranceService.createCustomer(formData);
//       if (response.status === 200) {
//         navigate('/3', {
//           state: {
//             name: `${formData.firstName} ${formData.lastName}`,
            
//             formData,veh
//           }
//         });
//         console.log('Form submitted successfully');
//       } else {
//         console.log('Form submission failed');
//       }
//     } catch (error) {
//       console.error('Error submitting form', error)
//     }
//   };

//   const indianStates = [
//     'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
//     'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
//     'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
//     'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
//     'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
//     'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
//   ];

  

  
//   return (
//         <>
//           <Header />
//           <div className='container-fluid sp-background'>
//             <div className='row'>
//               <div className='d-flex flex-column col-lg-6 col-md-8 col-sm-10'>
//                 <form className='sp-form' onSubmit={handleSubmit}>
//                   <div className="sp-form-group">
//                   <label htmlFor='firstname'>
//                     Full Name * :(As per aadhar Card)
//                   </label><br/>
//                   <div className="d-flex justify-content-around flex-column flex-lg-row sp-form-group">
//                     <div>
//                       <input
//                         className="input p-3 rounded"
//                         placeholder='Enter first name'
//                         type="text"
//                         id='firstname'
//                         name="firstName"
//                         value={formData.firstName}
//                         onChange={handleChange}
//                         required
//                         autoComplete='off'
//                       /><p/>
//                       {errors.firstName && <p className="sp-error">{errors.firstName}</p>}
//                     </div>
//                     <div>
//                       <input
//                         className="input p-3 rounded"
//                         placeholder='Enter last name'
//                         type="text"
//                         id='lastname'
//                         name="lastName"
//                         value={formData.lastName}
//                         onChange={handleChange}
//                         required
//                         autoComplete='off'
//                       />
//                       {errors.lastName && <p className="sp-error">{errors.lastName}</p>}
//                     </div>
//                   </div>
//                     {errors.lastName && <p className="sp-error">{errors.lastName}</p>}
//                   </div>
//                   <div className="sp-form-group">
//                     <label>Address * :</label>
//                     <input
//                       type="text"
//                       name="address"
//                       value={formData.address}
//                       onChange={handleChange}
//                       required
//                       className="sp-input"
//                       autoComplete='off'
//                     />
//                     {errors.address && <p className="sp-error">{errors.address}</p>}
//                   </div>
//                   <div className="sp-form-group ">
//                     <label>State * :</label>
//                     <select
//                       name="state"
//                       value={formData.state}
//                       onChange={handleChange}
//                       required
//                       className="sp-input p-4="
//                     >
//                       <option value="">Select a state</option>
//                       {indianStates.map((state) => (
//                         <option key={state} value={state}>{state}</option>
//                       ))}
//                     </select>
//                     {errors.state && <p className="sp-error">{errors.state}</p>}
//                   </div>
//                   <div className="sp-form-group ">
//                     <label>Mobile Number * :</label>
//                     <input
//                       type="text"
//                       name="mobile"
//                       id='mobile'
//                       value={formData.mobile}
//                       onChange={handleChange}
//                       required
//                       className="sp-input"
//                       maxLength={10}
//                       autoComplete='off'
//                       onKeyPress={(e) => {
//                         const isValidInput = /[0-9]/;
//                         if (!isValidInput.test(e.key)) {
//                           e.preventDefault();
//                         }
//                       }}
//                     />
//                     <button type="button" className="sp-otp-button" onClick={handleSendMobileOTP}>Send OTP</button>
//                     {errors.mobile && <p className="sp-error">{errors.mobile}</p>}
//                     {mobileOtpError && <p className="sp-error">{mobileOtpError}</p>}
//                     {mobileOtpSuccessMessage && <p className="sp-success">{mobileOtpSuccessMessage}</p>}
//                     <h6>{MobileOtp1Error}</h6>
//                     {isMobileOTPSent && (
//                       <div>
//                         <label className="sp-otp-label">Enter OTP:</label>
//                         <div className="sp-otp-inputs">
//                           {mobileOtp.map((value, index) => (
//                             <input
//                               key={index}
//                               type="text"
//                               className="sp-otp-input"
//                               value={value}
//                               onChange={(e) => handleOTPChange('mobile', index, e.target.value)}
//                               maxLength="1"
//                               ref={(el) => (otpRefs.current[index] = el)}
//                             />
//                           ))}
//                         </div>
//                         <button type="button" className="sp-otp-verify-button mt-2" onClick={() => handleVerifyOTP('mobile')}>Verify OTP</button>
//                       </div>
//                     )}
//                   </div>
//                   <div className="sp-form-group">
//                     <label>Email * :</label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                       className="sp-input"
//                       autoComplete='off'
//                     />
//                     <button type="button" className="sp-otp-button" onClick={handleSendEmailOTP}>Send OTP</button>
//                     {errors.email && <p className="sp-error">{errors.email}</p>}
//                     {emailOtpError && <p className="sp-error">{emailOtpError}</p>}
//                     {emailOtpSuccessMessage && <p className="sp-success">{emailOtpSuccessMessage}</p>}
//                     <h6>{emailOtp1Error}</h6>
//                     {isEmailOTPSent && (
//                       <div>
//                         <label className="sp-otp-label">Enter OTP:</label>
//                         <div className="sp-otp-inputs">
//                           {emailOtp.map((value, index) => (
//                             <input
//                               key={index}
//                               type="text"
//                               className="sp-otp-input"
//                               value={value}
//                               onChange={(e) => handleOTPChange('email', index, e.target.value)}
//                               maxLength="1"
//                               ref={(el) => (emailOtpRefs.current[index] = el)}
//                             />
//                           ))}
//                         </div>
//                         <button type="button" className="sp-otp-verify-button mt-2" onClick={() => handleVerifyOTP('email')}>Verify OTP</button>
//                       </div>
//                     )}
//                   </div>
//                   <div className='d-flex justify-content-between'>
//                   <button type="submit" className="sp-submit-button px-5 py-2 rounded">Register</button>
//                   <Link to='UserLogin'><button type="submit" className="sp-submit-button px-5 py-2 rounded">Login</button></Link>
//                   </div>
//                 </form>
//               </div>
//               <div className='d-flex flex-column col-lg-6 col-md-4 col-sm-2 mt-5 pt-5'>
//                 <div className="sp-card1 border rounded">
//                   <div className="card-body">
//                     <p className='sp-carddata1'>
//                       {`${vname} / ${vnumber} / REGISTERED IN ${vyear}`}
//                       <i className="fa-solid fa-motorcycle fa-2xl"></i>
//                     </p>
//                   </div>
//                 </div>
//                 <div className="spcard rounded shadow">
//                   <div className="card-body border rounded">
//                     <h5 className="card-title sp-card-title pt-2 text-center">Why buy from RS Insurance</h5>
//                     <p className="card-text">
//                       <ul>
//                         <li><i className="fa-solid fa-globe text-success"></i> Claim assistance anytime, anywhere!</li>
//                         <li><ShieldIcon className='text-warning' /> Compare and choose best plan</li>
//                         <li><SupportAgentIcon className='text-dark' /> 24/7 support helpline</li>
//                         <li><AvTimerIcon className='text-primary' /> Get your policy instantly with quick and easy KYC process</li>
//                       </ul>
//                     </p>
//                   </div>
//                   <div className='sp-card-footer'>
//                     <p className='text-center mt-3 p-2 spfontsize'>
//                       <ContentPasteIcon className='text-success mx-1' /> 10,000+ people use RS Insurance every day to insure their bike
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <Footer1 />
//         </>
//       );
//     };

// export default SecondPage;







