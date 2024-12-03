import Header from './Header'
import React, {useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import p5 from '../Component/images/p5.png'
import PropertyInsuranceService from './Service/PropertyInsuranceService'
import { Modal } from 'react-bootstrap'
import {GoogleLogin} from 'react-google-login';
import TextField from '@mui/material/TextField';
import { Tooltip, IconButton, InputAdornment, ClickAwayListener, Button, FormHelperText } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { regexMobileNo,regexUsername,regexEmail } from './RegularExpressions';
import Happy from './images/happy.jpg'
import HealthIn from './images/healthin.png';
import VehicleIn from './images/vehiclein.png';
import propertyIn from './images/homein.png'
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import CustomerCare from './images/customerCare.jpg'
import '../App.css'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import Ramanalogo from './images/p3.jpeg';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import LoginSharpIcon from '@mui/icons-material/LoginSharp';
import { RsContextCreater } from './UseContext/ContextMain'
import { toast } from 'react-toastify'
import p3 from '../Component/images/p3.jpeg'
import { PhonelinkLockOutlined } from '@material-ui/icons'
import PhoneIcon from '@mui/icons-material/Phone';
import RamanaLogo from './images/p4.jpeg'



const clientId = "246541673533-e90kj0pumgndrmt51j27v853d3pkon00.apps.googleusercontent.com";


function Login() {
  // var i = 0 ;

  useEffect(()=>{
    window.scrollTo(0,0);
  },[])

  const {setDetailsCon} = useContext(RsContextCreater);

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

  const [showState , setshowState] = useState(false);
  const clickClose =()=> {
    setshowState(false) ;
    window.location.reload();
  }

  const [userData, setUserData] = useState(null);

  const onSuccess = (res) => {
    console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
   // i++;
    // navigate("/login",{state:{i}}) 
    setshowState(true);
    setUserData(res.profileObj);
    console.log(userData);
  }
    const onFailure = (res) => {
     console.log("LOGIN FAILED! res: ", res);
    
  }

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
          setshowOTPInput(false);
          setData('');
          setButtonText('Send OTP');
          setButtonDisabled(false);
          setTimer(0);
          setAttempts(0);
          setNewErr('')
          setErrorMessage('')
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

      

    //   async function performLogin(){
      
    //     const response = await PropertyInsuranceService.login(values);
    //     //console.log(response)
    //     const loginResponse = response.data; 
    //     // setData( loginResponse);
    //     console.log('Login Response:', loginResponse);
    //     // i++;
    //     if (loginResponse === "Login successful!") 
    //     { 
          
    //       // setshowState(true);
    //        navigate("/login",{state:{values:values}}) 
    //     } 
    //     else 
    //     {
    //       setData( loginResponse);
    //     }
    // }
    // performLogin();
      
      //  window.location.reload();
    }

    // const handleClick=()=>
    // {
    //   navigate("/property");
    // }

    const [showOTPInput,setshowOTPInput]=useState(false);
    const [verifyotp,SetVerifyOtp]=useState("");
    const [errorMessage, setErrorMessage] =useState("")

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [buttonText, setButtonText] = useState('Send OTP');
    const [timer, setTimer] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [otpExpired , setOtpExpired] = useState(false);

    useEffect(() => {
      let interval;
      if (timer > 0) {
        interval = setInterval(() => {
          setTimer((prev) => prev - 1);
        }, 1000);
      } else if (timer === 0 && buttonDisabled && attempts < 3) {
        setButtonDisabled(false);
        setButtonText('Resend OTP');
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }, [timer, buttonDisabled]);

    const [newErr,setNewErr] = useState();
    const [showOTP ,setShowOTP] = useState(); 
  
    const sendOTP = async (e) => {
      e.preventDefault();
  
      if (regexMobileNo.test(values.mobileno)) {
        PropertyInsuranceService.checkMobileNumber(values.mobileno).then((res) => {
          console.log(res.data);
          setData(res.data);
          if (res.data === "Mobile number exists") {
            PropertyInsuranceService.getOtp1().then((res) => {
              if (attempts >= 3) {
                setButtonText('Try Later');
                setButtonDisabled(true);
                return;
              }
  
              // Clear error messages
              setErrorMessage('');
              SetVerifyOtp('');
  
              setButtonDisabled(true);
              setTimer(20);
              setAttempts((prev) => prev + 1);
              console.log(res.data);
              setShowOTP(res.data)
              const otpValue = res.data;
              SetEnterOtp(res.data);
              const mobileNumber = values.mobileno;
              PropertyInsuranceService.getOtp(mobileNumber, otpValue).then((res) => {
                console.log(res);
              }).catch((err) => {});
  
              setshowOTPInput(true);
              setNewErr('');
              setOtpExpired(false);
  
              // Start 15-minute timer
              setTimeout(() => {
                setOtpExpired(true);
              }, 15 * 60 * 1000);
            }).catch((error) => {});
          }
        })
      } else if (values.mobileno === '' || 0 || null) {
        console.log('errrrrrrrrrrrrrrrrrrr');
        setNewErr('Please Enter Your Mobile Number');
        setValidationErrors('');
      } else {
        setData("");
      }
    };

    const loginMobNoCon = values.mobileno

    const handleVerifyMobileNoOtp = (e) => {
     e.preventDefault();
      const otp = otpValues.join('');
    console.log(otp);
    if(otpExpired){
      setErrorMessage('otp has expired.Please request a new OTP.');
    }
    else if(enterotp == otp )
    {
          SetVerifyOtp("Verified Successfully");
          setshowOTPInput(false);
          navigate('/login1')
          setDetailsCon((prev) => ({
            ...prev,
            loginMobNoCon
          }));
    }
    else{SetVerifyOtp("Invalid OTP...!")}
  };
  // const HandleLogin=()=>
  //   {
  //   }

  // from here signup model
  const [toastDisplayed, setToastDisplayed] = useState(false);
        const [showModal, setShowModal] = useState(false);
        const [showOTPInputS, setshowOTPInputS] = useState(false);
        const [otpSent, setOtpSent] = useState(false);
        const [resendActive, setResendActive] = useState(false);
        const [timerS, setTimerS] = useState(20);
        const [resendCount, setResendCount] = useState(0);
        const [mobileverified, setmobileverified] = useState("send OTP");
        const [emailverified, setemailverified] = useState("send OTP");
        const [emailotp, SetemailOtp] = useState(Array(4).fill(''));
        const [otpemailValues, setOtpemailValues] = useState(Array(4).fill(''));
        const [otpValuesS,setOtpValuesS] = useState(['', '', '', '']);
        const otpInputS = useRef([]);
        const emailInputs = useRef([]);



        const [EmailOTPInput, setEmailshowOTPInput] = useState(false);
        const [otpSentMail, setOtpSentMail] = useState(false);
        const [resendActiveMail, setResendActiveMail] = useState(false);
        const [timerMail, setTimerMail] = useState(20);
        const [resendCountMail, setResendCountMail] = useState(0);
        const [data1, setData1] = useState("");
        const [data2, setData2] = useState("");
        const [otps, setOtpS] = useState("");

        const [ismobileverified, setisMobileVerifired] = useState(false);
        const [verifyemailmsg, Setverifyemailmsg] = useState("");
        const [MobileOTPInput, setMobileOTPInput] = useState(false);
        const [isemailverified, setisEmaailverified] = useState(false);
        const [verifymobilmsg, Setverifymobilmsg] = useState("");


        
        const [feilds, setFeilds] = useState({
          name: '',
          mobileno: '',
          email: '',
        });

        useEffect(() => {
          let intervalMail;
          if (otpSentMail && timerMail > 0) {
            intervalMail = setInterval(() => {
              setTimerMail((prevTimer) => prevTimer - 1);
            }, 1000);
          } else if (timerMail === 0) {
            setResendActiveMail(true);
            clearInterval(intervalMail);
          }
          return () => clearInterval(intervalMail);
        }, [otpSentMail, timerMail]);

        useEffect(() => {
          let intervalS;
          if (otpSent && timerS > 0) {
            intervalS = setInterval(() => {
              setTimerS((prevTimer) => prevTimer - 1);
            }, 1000);
          } else if (timerS === 0) {
            setResendActive(true);
            clearInterval(intervalS);
          }
          return () => clearInterval(intervalS);
        }, [otpSent, timerS]);
        
        
        const handleSignUp = () =>
        {
          setShowModal(true)
        };

        const handleClose = () => setShowModal(false);

       const changeS = (e) => {
        const { name, value } = e.target;
        setFeilds({ ...feilds, [name]: value });
        setValues({ ...values, [name]: value });
        
        // validation name:
        if (name === "name") {
          if (!regexUsername.test(value)) {
            setValidationErrors({ ...validationErrors, [name]: "Full Name must be 3 or more character ex: abc" });
          } else {
            setValidationErrors({ ...validationErrors, [name]: "" });
          }
        }
    
        // validation for mobile no :
        if (name === "mobileno") {
          setshowOTPInputS(false);
          setOtpSent(false);
          setData2('');
          setTimerS(0);
          setmobileverified('send OTP');
          setResendActive(false);
          setResendCount(0);
          if (!regexMobileNo.test(value)) {
            setValidationErrors({ ...validationErrors, [name]: "Phone must start with 6,7,8,9 series with  10 digits" });
          } else {
            setValidationErrors({ ...validationErrors, [name]: "" });
          }
        }
        
        // validation for email :
        if (name === "email") {
          setEmailshowOTPInput(false)
          setOtpSentMail(false)
          setTimerMail(0);
          setData1('')
          setemailverified('send OTP');
          setResendActiveMail(false);
          setResendCountMail(0);
          if (!regexEmail.test(value)) {
            setValidationErrors({ ...validationErrors, [name]: "Please enter valid email ex: example@gmail.com" });
          } else {
            setValidationErrors({ ...validationErrors, [name]: "" });
          }
        }
    
        sessionStorage.setItem(name, value);
      }
      
      function sendemailOTP(e) {
        e.preventDefault();
        if (regexEmail.test(feilds.email)) {
          PropertyInsuranceService.checkEmail(feilds.email).then((res) => {
            console.log(res.data);
            setData1(res.data)
    
            if (res.data === "Email is not exists") {
              setEmailshowOTPInput(true)
              
              PropertyInsuranceService.sendEmailotp(feilds.email).then((res) => {
                setEmailshowOTPInput(true);
                SetemailOtp(res.data);
              })
              console.log(EmailOTPInput);
              setOtpSentMail(true);
              setemailverified('OTP Sent');
              setTimerMail(20);
              setResendActiveMail(false);
              setResendCountMail(0);
            }
          })
        }
        else {
          console.log(feilds.email);
          setEmailshowOTPInput(false);
        }
        
      }
      
      function resendOTPMail(e){
        e.preventDefault();
        if(resendCountMail < 2 && regexEmail.test(feilds.email)){
          PropertyInsuranceService.checkEmail(feilds.email).then((res)=>{
            console.log(res.data);
            setData1(res.data)
            
            if(res.data==="Email is not exists"){
              PropertyInsuranceService.sendEmailotp(feilds.email).then((res)=>{
                SetemailOtp(res.data);
              })
              console.log(EmailOTPInput);
              setResendActiveMail(false);
              setTimerMail(20);
              setResendCountMail((prevCount)=>prevCount+1)
            }
          })
        }
      }
      
      const handleOtpemailInputChange = (index, value) => {
        if (value.match(/[0-9]/)) {
          const newOtpemailValues = [...otpemailValues];
          newOtpemailValues[index] = value;
          setOtpemailValues(newOtpemailValues);
        }
      };
      
      const handleEmailOtpChange = (index, value) => {
        try {
          if (value.length > 1) return;
          const updatedemailOtp = [...emailotp];
          updatedemailOtp[index] = value;
          SetemailOtp(updatedemailOtp);
        } catch (err) {
          console.log("error while otp updating:", err);
        }
      };
      
      
      const handleOtpInputChangeS = (index, value) => {
        if (value.match(/[0-9]/)) {
          const newOtpValues = [...otpValuesS];
          newOtpValues[index] = value;
          setOtpValuesS(newOtpValues);
        }
      };
      
      const handleMobileSOtpChange = (index, value) => {
        try {
          if (value.length > 1) return;
    
          const updatedOtp = [...otps];
          updatedOtp[index] = value;
          setOtpS(updatedOtp);
        } catch (err) {
          console.log("error while otp updating:", err);
        }
      };
      
      function sendOTPS(e) {
        e.preventDefault();
        // setshowOTPInput(true);
        if (regexMobileNo.test(feilds.mobileno)) {
          PropertyInsuranceService.checkMobileNumber(feilds.mobileno).then((res) => {
            console.log(res.data);
            setData2(res.data);
            if (res.data === "Mobile number is not exists") {
              PropertyInsuranceService.getOtp1().then((res) => {
                console.log(res.data);
                const otpValue = res.data;
                setOtpS(res.data);
                setshowOTPInputS(true);
                const mobileNumber = values.mobileno;
                PropertyInsuranceService.getOtp(mobileNumber, otpValue).then((res) => {
                  console.log(res);
                }).catch((err) => {});
                setOtpSent(true);
                setmobileverified('OTP Sent');
                setTimerS(20);
                setResendActive(false);
                setResendCount(0);
              }).catch((error) => { })
              
              console.log(showOTPInput);
              setshowOTPInputS(true);
              
              //  SetVerifyOtp("");
            }
            else if (res.data === "Mobile number exists") {
              setshowOTPInputS(false);
            }
          })
        }
        else {
          setshowOTPInput(false);
        }
      }
      
      const handleverifyEmailOtp = (e) => {
        e.preventDefault();
        console.log("fhfgh")
        setEmailshowOTPInput(false);
        const enteredemailotp = otpemailValues.join('');
        console.log(emailotp);
        console.log(enteredemailotp);
        if (emailotp== enteredemailotp) {
          setEmailshowOTPInput(false)
          setemailverified("verified 🗸")
          setisMobileVerifired(true);
        } else {
          setEmailshowOTPInput(true);
          Setverifyemailmsg("Invalid OTP...!");
        }
        
      }
      
      const handleverifyMobileSOtp = (e) => {
        e.preventDefault();
        console.log("fhfgh")
        setMobileOTPInput(false);
        const enteredmobileotp = otpValuesS.join('');
        console.log(enteredmobileotp);
        console.log(otps);
        if (otps == enteredmobileotp) {
          console.log("done")
          setshowOTPInputS(false);
          setmobileverified("verified 🗸")
          setisEmaailverified(true);
        } else {
          setMobileOTPInput(true);
          Setverifymobilmsg("Invalid OTP...!");
        }
    
      }
      
      const resendOTPMobileS = (e) => {
        e.preventDefault();
        if (resendCount < 2 && regexMobileNo.test(feilds.mobileno)) {
          PropertyInsuranceService.checkMobileNumber(feilds.mobileno).then((res) => {
            console.log(res.data);
            setData2(res.data);
            
            if (res.data === "Mobile number is not exists") {
              PropertyInsuranceService.getOtp1().then((res) => {
                console.log(res.data);
                const otpValue = res.data;
                setOtpS(res.data);
                const mobileNumber = feilds.mobileno;
                PropertyInsuranceService.getOtp(mobileNumber, otpValue).then((res) => {
                  console.log(res);
                }).catch((err) => {});
      
                setResendActive(false);
                setTimerS(20);
                setResendCount((prevCount) => prevCount + 1);
              }).catch((error) => {});
            } else if (res.data === "Mobile number exists") {
              setshowOTPInputS(false);
            }
          });
        }
      };

      const handleClick = (e) => {
  
        e.preventDefault();
    
        // console.log(i);
    
    
        if (regexUsername.test(feilds.name) && regexMobileNo.test(feilds.mobileno) && regexEmail.test(feilds.email) && isemailverified && ismobileverified) {
          const s = feilds.mobileno;
          const d = feilds.email;
          console.log(s)
          console.log(d)
          console.log(feilds.name);
          PropertyInsuranceService.createCustomer(feilds).then(res => {
            console.log(res.data);
            console.log(feilds);
          }
          );
          alert('successfully registered and please Login')
        }
    
        else {
          if (!toastDisplayed) {
            toast.error("please verify email, mobile");
            setToastDisplayed(true);
          }
    
    
        }
        setShowModal(false)
      }

      const HandleAdmin =()=>{
        navigate('/adminlogin')
      }

      const [open, setOpen] = useState(false);
          const handleTooltipClose = () => {
              setOpen(false);
            };
          
            const handleTooltipOpen = () => {
              setOpen(true);
            };

    return (
      <div className='container-fluid logbac'>
        {/* <div style={{position:'fixed',width:'100%'}}><Header/></div> */}
        <div className='' >
                <header >
                    <div class="d-flex row py-2 rounded fixed justify-content-center align-items-center" style={{background:'#f0f8ff'}} >
				        <div className="col-8" >
                            <img class="mx-3 ramana" src={p3} alt="my pic" title='RamanaSoft Insurance' style={{borderRadius:'10px'}}></img>
				        </div>
                        <div className='col-4 d-flex'>
                          <div>
                            <button className='btn btn-success float-end me-5 fw-bold py-1 mt-1' onClick={handleSignUp}>Sign Up</button>
                          </div>
                       
				        <div className="mt-1">
                            <ClickAwayListener onClickAway={handleTooltipClose}>
                                <div className=''>
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
                                        <Button onClick={handleTooltipOpen} className='text-center me-lg-4 text-nowrap'><PhoneIcon />&nbsp;Call Us </Button>
                                    </Tooltip>
                                </div>
                            </ClickAwayListener>
				        </div> 
                <div>
                            <button className='btn btn-warning float-end me-5 fw-bold py-1 mt-1' onClick={HandleAdmin}>Admin</button>
                          </div>
                        </div>
			        </div>
                </header>
            </div>
        
        <div className='row mt-5 mt-lg-3'>
          <div className='col-12 col-lg-7 mt-2 lcdiv'style={{height:'65vh'}}>
            <div className='mt-4 pt-3 ms-4'>
              <h4 className='text-secondary branddesc mt-2'><span className=''style={{textDecoration:'underline',textDecorationColor:'brown'}}>Choose</span> Confidence: Choose Ramanasoft Insurance.</h4>
              <h3 className='fw-bold'>Life is unpredictable,<h3 className='fw-bold'>insurance makes it manageable.</h3></h3>
            </div>
            <div>
              <img src={Happy} alt='get Happy life'style={{zIndex:'-1'}} className='LHomeImg ps-4 mx-5'/>
            </div>
            {/* <button className='btn btn-primary mx-3 mt-5' onClick={handleClick} >PropertyInsurance</button> */}
          </div>
          <div className='col-12 col-md-10 ms-md-5 ms-lg-0 ms-2 col-lg-5 mt-lg-2 pt-lg-4'>
          <form onSubmit={HandleSubmit} className='form-inline border rounded bg-light me-lg-4 shadow mt-5'>
              <div className='text-center fw-bold bg-success-subtle p-2 rounded '><h3>Customer Login <AccountCircleSharpIcon className='fs-2'/></h3></div>
              <div className='mx-lg-2 my-3 px-2'>
                <h3 className='fw-semibold'>Hello Customer,</h3>
                <TextField
                  className='col-lg-7 col-md-7 col-10 '
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
                <button className='btn btn-success rounded fw-bold shadow mt-2 mx-1 ms-3 py-2' onClick={sendOTP} disabled={buttonDisabled}>{buttonDisabled ? (attempts < 3 ? `Resend OTP in ${timer}s` : 'Try Later') : buttonText}</button></span>
                  <br/>
                  <h3 className='text-danger'>{showOTP}</h3>
                  <small>
                  {validationErrors.mobileno && <span className="text-danger">{validationErrors.mobileno}</span>}</small>
                  <h6 className='text-danger mt-1'>{errorMessage}</h6>
                  {data === "Mobile number is not exists" && <h4 className='text-danger mt-2 ms-lg-3'>{data}</h4>}
                  <h6 className='text-danger mt-1'>{newErr}</h6>
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
                       <button className='btn btn-info text-nowrap fw-bold shadow ms-1' onClick={handleVerifyMobileNoOtp}>Login <LoginSharpIcon className='text-dark'/></button><br/>
                      </form>
                      {verifyotp ===  "Invalid OTP...!" && <h4 className='text-danger ms-2 mt-2'>{verifyotp}<i className="fa-solid fa-xmark ms-2"></i></h4>}
                     </div>
                  </div>
                    )}
                 {verifyotp ===  "Verified Successfully" && <h4 className='text-success mt-lg-3 ms-2'>{verifyotp}<CheckCircleOutlineIcon/></h4>}
                <div className='mt-lg-3 d-flex justify-content-center'>
                    {/* <button className='btn btn-link  text-decoration-none fw-bold' onClick={handleClick} >Create Account ? </button>                 */}
                    {/* {
                    verifyotp === "Verified Successfully" &&<button className='btn btn-primary fw-bold shadow' onClick={HandleLogin}>Login <LoginSharpIcon className='text-dark'/></button>
                    } */}
                    {/* {
                      verifyotp !== "Verified Successfully" &&<button className='btn btn-primary fw-bold shadow disabled'>Login <LoginSharpIcon className='text-dark'/> </button>
                    } */}
                 </div>
              </div>
              {/* <div>
                {data !== "Login successful!" && <h4 style={{ color: 'red' }}>{data}</h4>}
              </div> */}
            </form>
          </div>
          <div className='homeDetail mt-2 mt-md-4'>
          <h4 className='branddesc mx-lg-3 text-secondary'>Ramanasoft Insurance: Where Protection Extends Across <span style={{textDecoration:'underline',textDecorationColor:'brown'}}>Multiple Domains</span></h4>
          </div>
          <div className=' d-flex justify-content-evenly mt-lg-1 py-lg-0 py-2 lbdiv'>
            <div className='lbcard'>
              <Link to='/property'className=' text-decoration-none ' >
                <div class="card shadow bg-light" style={{width:'8rem',zIndex:'-1'}}>
                  <div class="card-body">
                  <span className='text-white ms-2 fw-bold bg-success rounded px-2 py-1'>New <NewReleasesIcon/></span>
                  <img src={propertyIn} alt="..." className="img-fluid aspect-ratio-4-3 mx-1 "/>
                  {/* <a href="#" class="btn btn-primary mx-5 fw-bold text-nowrap shadow mt-2">Property Insurance</a> */}
                  </div>
                </div>
              </Link>
              <h6 className='text-center mt-1'>Property Insurance</h6>
            </div>
            <div>
            <div class="card shadow bg-light" style={{width:'8rem'}}>
              <div class="card-body">
              <span className='text-white ms-2 fw-bold bg-success rounded px-2 py-1'>New <NewReleasesIcon/></span>
              <a href="http://192.168.1.2:9099/user" class="btn btn-link  ">
                <img src={HealthIn} alt="..." className="img-fluid "/>
                </a>
              </div>
            </div>
            <h6 className='text-center mt-1'>Health Insurance</h6>
            </div>
          <div>
            <div class="card shadow bg-light" style={{width:' 8rem'}}>
              <div class="card-body">
                <span className='text-white ms-2 fw-bold bg-success rounded px-2 py-1'>New <NewReleasesIcon/></span>
                <a href="/Bikeentry" class="btn btn-link " >

                <img src={VehicleIn} alt="..." className="img-fluid "/>
                </a>
                
              </div>
            </div>
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
                      <h4 className='fw-bold'>support@ramanasoft.com</h4>
                    </div>
                  </div>
                  <div className='row w-100 border mt-5 p-2 rounded shadow'>
                    <div className='col-2 col-lg-1 mt-4 me-2 p-2'style={{borderRight:'3px solid #ccc'}}>
                    <SupportAgentIcon/>
                    </div>
                    <div className='col-8 col-lg-9'>
                      <p className='text-secondary fw-bold '>For Customer Care</p>
                      <h4 className='fw-bold'>1800-143-123</h4>
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
              <div className='d-flex justify-content-center align-items-center'><img src={Ramanalogo} alt="..." className="img-responsive rounded"style={{width:'130px'}}/></div>
              
              <p className='text-center fw-bold fs-5 mt-2 text-secondary'>&copy; All Rights Reserved 2024.</p>
             </div>
          </div>
          <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton  >
            <Modal.Title ><h3 className='text-center fw-bold text-secondary'>SignUp with <img src={RamanaLogo} alt='logo' className='rounded' style={{ width: '60px', height: '40px' }}></img></h3></Modal.Title>
          </Modal.Header>
          <Modal.Body className='mx-3'>
            <form onSubmit={handleClick}>
              <div className='row'>
                <div className='col-12'>
                  <input
                   placeholder=" Full Name"
                   name='name'
                   required
                   value={feilds.name}
                   onChange={changeS}
                   className='ps-2 fw-bold'
                   style={{width: '100%', height: '7vh', borderRadius: '.3em', border: '1px solid black'}}
                   maxLength={40}
                  />
                  <FormHelperText style={{color: 'red'}}>{validationErrors.name}</FormHelperText>
                </div>
              </div>
              <div className='row mt-3'>
                <div className='col-12 col-lg-8'>
                  <input
                   placeholder=" Mail-Id"
                   name='email'
                   required
                   value={feilds.email}
                   onChange={changeS}
                   className='ps-2 fw-bold'
                   style={{width: '100%', height: '7vh', borderRadius: '.3em', border: '1px solid black'}}
                   maxLength={60}
                   disabled={emailverified === "verified 🗸"}
                  />
                  <FormHelperText style={{color: 'red'}}>{validationErrors.email}</FormHelperText>
                </div>
                <div style={{ float: 'right' }} className='col-12 col-lg-4'>
                  <button className='btn btn-success px-3 py-2 rounded mt-2 fw-bold shadow verification' disabled={emailverified === "verified 🗸" || otpSentMail} onClick={sendemailOTP}>{emailverified}</button>
                </div>
                {data1 === "Email is exists" && <h5 className='text-danger'>{data1}</h5>}
                {EmailOTPInput && (
                  <div>
                    <div className='ms-5'>
                      <small className='text-success'>OTP sent to your email address</small>
                      <form className='w-75 d-flex flex-nowrap pt-3'>
                        {[...Array(4)].map((_, index) => (
                          <input
                            key={index}
                            type="text"
                            autoFocus={index === 0}
                            ref={(input) => emailInputs.current[index] = input}
                            onChange={(e) => {
                              handleOtpemailInputChange(index, e.target.value);
                              handleEmailOtpChange(index, e.target.value);
                            }}
                            onKeyUp={(e) => {
                              if (index < 3 && e.key !== 'Backspace' && e.target.value.length === 1) {
                                emailInputs.current[index + 1].focus(); // Move forward
                              } else if (index > 0 && e.key === 'Backspace' && e.target.value.length === 0) {
                                emailInputs.current[index - 1].focus(); // Move backward
                              }
                            }}
                            className='w-25 border ps-2 fw-bold'
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
                        <button className='btn btn-info text-nowrap fw-bold shadow ms-3' onClick={handleverifyEmailOtp}>Verify OTP</button>
                      </form>
                      {verifyemailmsg === "Invalid OTP...!" && <h5 className='mt-2 ms-2 text-danger'>{verifyemailmsg}</h5>}
                      {otpSentMail && (
                        <>
                          <button
                            className='btn btn-link'
                            onClick={resendOTPMail}
                            disabled={!resendActiveMail || resendCountMail >= 2}
                          >
                            {resendCountMail >= 2 ? 'Try later' : (resendActiveMail ? 'Resend OTP' : `Resend OTP in ${timerMail} sec`)}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className='row mt-3'>
                <div className='col-12 col-lg-8'>
                  <input
                   placeholder=" Mobile No."
                   name='mobileno'
                   required
                   value={feilds.mobileno}
                   onChange={changeS}
                   className='ps-2 fw-bold'
                   style={{width: '100%', height: '7vh', borderRadius: '.3em', border: '1px solid black'}}
                   maxLength={10}
                   disabled={mobileverified === "verified 🗸"}
                   onKeyPress={(e) => {
                    const isValidInput = /[0-9]/;
                    if (!isValidInput.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  />
                  <FormHelperText style={{color: 'red'}}>{validationErrors.mobileno}</FormHelperText>
                </div>

                <div style={{ float: 'right' }} className='col-12 col-lg-4'>
                  <button className='btn btn-success px-3 py-2 rounded mt-2 fw-bold shadow' disabled={mobileverified === "verified 🗸" || otpSent} onClick={sendOTPS}>{mobileverified}</button>
                </div>
                {data2 === "Mobile number exists" && <h5 className='text-danger'>{data2}</h5>}
                {showOTPInputS && (
                  <div>
                    <div className='ms-5'>
                      <small className='text-success '>OTP sent to your mobile Number</small>
                      <form className='w-75 d-flex flex-nowrap pt-3'>
                        {[...Array(4)].map((_, index) => (
                          <input key={index} type="text"
                            className='w-25 border ps-2 fw-bold'
                            maxLength={1}
                            style={{ marginRight: '8px' }}
                            autoFocus={index === 0}
                            ref={(input) => otpInputS.current[index] = input}
                            onChange={(e) => {
                              handleOtpInputChangeS(index, e.target.value);
                              handleMobileSOtpChange(index, e.target.value);
                            }}
                            onKeyUp={(e) => {
                              if (index < 3 && e.key !== 'Backspace' && e.target.value.length === 1) {
                                otpInputS.current[index + 1].focus(); // Move forward
                              } else if (index > 0 && e.key === 'Backspace' && e.target.value.length === 0) {
                                otpInputS.current[index - 1].focus(); // Move backward
                              }
                            }}
                            onKeyPress={(e) => {
                              const isValidInput = /[0-9]/;
                              if (!isValidInput.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                          />
                        ))}
                        <button className='btn btn-info text-nowrap fw-bold shadow ms-3' onClick={handleverifyMobileSOtp}>Verify OTP</button>
                      </form>
                      {verifymobilmsg === "Invalid OTP...!" && <h5 className='mt-2 ms-2 text-danger'>{verifymobilmsg}</h5>}
                      {otpSent && (
                        <>
                          <button
                            className='btn btn-link'
                            onClick={resendOTPMobileS}
                            disabled={!resendActive || resendCount >= 2}
                          >
                            {resendCount >= 2 ? 'Try later' : (resendActive ? 'Resend OTP' : `Resend OTP in ${timerS} sec`)}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <hr></hr>
              <div className='d-flex justify-content-center me-4 '>
                <div className=''>
                  <input type='submit' value="SignUp" className='btn btn-primary shadow px-5 fw-bold mb-2 shadow' />
                </div>
              </div>
            </form>

            <div>
            </div>
          </Modal.Body>
        </Modal>
        </div>
      </div>
    )
}

export default Login;
