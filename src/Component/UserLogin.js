import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserLogin.css';
import Header from './Header';
import Footer1 from './Footer1';
import VehicleInsuranceService from './Service/VehicleInsuranceService';

const UserLogin = () => {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState('');
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [otp, setOtp] = useState(Array(5).fill(''));
  const [otpa, setOtpa] = useState(Array(5).fill(''));
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const otpRefs = useRef([]);
  const [otperror, setotpError] = useState('');

  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };

  const validateMobileNumber = (number) => {
    const regex = /^[6-9]\d{9}$/;
    return regex.test(number);
  };

  const handleSendOTP = async () => {
    if (validateMobileNumber(mobileNumber)) {
      try {
        const response = await VehicleInsuranceService.getCustomerDetailsByMobile(mobileNumber);
        console.log(response.data.mobile);
        if (mobileNumber === response.data.mobile) {
          try {
            const response = await VehicleInsuranceService.sendMobileOtp(mobileNumber);
            if (response.status === 200) {
              console.log('OTP sent successfully', response.data);
              setOtpa(response.data);
              setIsOTPSent(true);
              setError('');
              setSuccessMessage('OTP sent successfully!');
            } else {
              console.log('Failed to send OTP', response);
              setError('Failed to send OTP');
            }
          } catch (error) {
            console.error('Error sending OTP:', error);
            setError('Error sending OTP');
          }
        } else {
          setError("This is not a registered mobile number");
        }
      } catch (error) {
        setError("Details are not fetching for the entered mobile number");
      }
    } else {
      console.log('Please enter a valid mobile number');
      setError('Enter a valid mobile number');
    }
  };

  const handleOTPChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input if a value is entered
      if (value && index < otpRefs.current.length - 1) {
        otpRefs.current[index + 1].focus();
      }
    }
  };

  const handleVerifyOTP = async () => {
    const enteredOtp = otp.join('');
    console.log('Verifying OTP:', enteredOtp); // Debugging log
    
    if (enteredOtp == otpa) {
      console.log('Success');
      navigate('/userProfile', {
        state: { mobileNumber }
      });
    } else {
      setotpError('Please enter a valid OTP');
    }
  };

  return (
    <div className='ulogin-main'>
      <Header/>
      <div className='cont'>
        <h2 className='ulogin-bold'>Login Form</h2>
        <div className='ulogin-form'>
          <label className="ulogin-label">Mobile Number:</label>
          <input
            type="text"
            className="ulogin-input"
            value={mobileNumber}
            onChange={handleMobileNumberChange}
            maxLength="10"
            onKeyPress={(e) => {
              const isValidInput = /[0-9]/;
              if (!isValidInput.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
          {error && <p className="ulogin-message" style={{ color: 'red' }}>{error}</p>}
          <button type="button" className="ulogin-button ulogin-btn-primary" onClick={handleSendOTP}>Send OTP</button>
          <h4 className='text-danger'>{otpa}</h4>
          {successMessage && <p className="ulogin-message" style={{ color: 'green' }}>{successMessage}</p>}
        </div>
        {isOTPSent && (
          <div className='ulogin-form'>
            <label className="ulogin-label">Enter OTP:</label>
            <div className="ulogin-otp-inputs">
              {otp.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  className="ulogin-otp-input"
                  value={value}
                  onChange={(e) => handleOTPChange(index, e.target.value)}
                  maxLength="1"
                  ref={(el) => (otpRefs.current[index] = el)}
                />
              ))}
            </div>
            {otperror && <p className='text-danger'>{otperror}</p>}
            {otp.every((digit) => digit) && (
              <button type="button" className="ulogin-button ulogin-btn-success" onClick={handleVerifyOTP}>Verify OTP</button>
            )}
          </div>
        )}
      </div>
      {/* <Footer1/> */}
    </div>
  );
};

export default UserLogin;




// import React, { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './UserLogin.css';
// import Header from './Header';
// import Footer1 from './Footer1';
// import VehicleInsuranceService from './Service/VehicleInsuranceService';

// const UserLogin = () => {
//   const navigate = useNavigate();
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [isOTPSent, setIsOTPSent] = useState(false);
//   const [otp, setOtp] = useState(Array(5).fill(''));
//   const [otpa, setOtpa] = useState(Array(5).fill(''));
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const otpRefs = useRef([]);
  

//   const handleMobileNumberChange = (e) => {
//     setMobileNumber(e.target.value);
//   };

//   const validateMobileNumber = (number) => {
//     const regex = /^[6-9]\d{9}$/;
//     return regex.test(number);
//   };

//   const handleSendOTP = async () => {
//     if (validateMobileNumber(mobileNumber)) {
//       try {
//         const response = await VehicleInsuranceService.getCustomerDetailsByMobile(mobileNumber);
//         console.log(response.data.mobile);
//         if (mobileNumber===response.data.mobile) {
        
//           try {
//             const response = await VehicleInsuranceService.sendMobileOtp(mobileNumber);
    
//             if (response.status === 200) {
//               console.log('OTP sent successfully', response.data);
//               setOtpa(response.data);
//               setIsOTPSent(true);
//               setError('');
//               setSuccessMessage('OTP sent successfully!');
//             } else {
//               console.log('Failed to send OTP', response);
//               setError('Failed to send OTP');
//             }
//           } catch (error) {
//             console.error('Error sending OTP:', error);
//             setError('Error sending OTP');
//           }
          
//         } else {
//           setError("This is not a registered mobile number");
//         }
//       } catch (error) {
//         console.error('Error fetching mobile details:', error);
//         setError('Error fetching mobile details');
//       }
//     } else {
      
//       console.log('Please enter a valid mobile number');
//       setError('Enter a valid mobile number');
//     }
//   };


//   const handleOTPChange = (index, value) => {
//     if (value.length <= 1) {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);

//       // Move to the next input if a value is entered
//       if (value && index < otpRefs.current.length - 1) {
//         otpRefs.current[index + 1].focus();
//       }
//     }
//   };

//   const handleVerifyOTP = async () => {
//     const enteredOtp = otp.join('');
//     console.log('Verifying OTP:', enteredOtp); // Debugging log
    
//     if(enteredOtp == otpa)
//       {
//         console.log('sus');
//         navigate('/userProfile',{
//           state:{mobileNumber}
//         });
//       }
      
//   };

//   return (
    
//     <div className='ulogin-main'>
//       <Header/>
//       <div className='cont'>
//       <h2 className='ulogin-bold '>Login-Form</h2>
//       <div>
//         <label className="ulogin-label">Mobile Number:</label>
//         <input
//           type="text"
//           className="ulogin-input"
//           value={mobileNumber}
//           onChange={handleMobileNumberChange}
//           maxLength="10"
//           onKeyPress={(e) => {
//             const isValidInput = /[0-9]/;
//             if (!isValidInput.test(e.key)) {
//               e.preventDefault();
//             }
//           }}
//         />
//         {error && <p className="ulogin-message" style={{ color: 'red' }}>{error}</p>}
//         <button type="button" className="ulogin-button ulogin-btn-primary " onClick={handleSendOTP}>Send OTP</button>
//         {successMessage && <p className="ulogin-message" style={{ color: 'green' }}>{successMessage}</p>}
//       </div>
//       {isOTPSent && (
//         <div>
//           <label className="ulogin-label">Enter OTP:</label>
//           <div className="ulogin-otp-inputs">
//             {otp.map((value, index) => (
//               <input
//                 key={index}
//                 type="text"
//                 className="ulogin-otp-input"
//                 value={value}
//                 onChange={(e) => handleOTPChange(index, e.target.value)}
//                 maxLength="1"
//                 ref={(el) => (otpRefs.current[index] = el)}
//               />
//             ))}
//           </div>
//           {otp.every((digit) => digit) && (
//             <button type="button" className="ulogin-button ulogin-btn-success" onClick={handleVerifyOTP}>Verify OTP</button>
//           )}
//         </div>
//       )}
//       </div>
//      <Footer1/>
//     </div>
//   );
// };

// export default UserLogin





