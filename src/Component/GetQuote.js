import React, { useContext, useEffect, useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { regexEmail, regexMobileNo, regexPassword, regexUsername } from './RegularExpressions';
import PropertyInsuranceService from './Service/PropertyInsuranceService';
import TextField from '@mui/material/TextField';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import RamanaLogo from './images/p4.jpeg'
import shield from './images/shield.png'
import care from './images/care.png'
import '../App.css'
import Header from './Header';
import { useSpring, animated } from 'react-spring'; 
import Offcanvas from 'bootstrap/js/dist/offcanvas';
import Button from 'bootstrap/js/dist/button';
import Dropdown from 'bootstrap/js/dist/dropdown';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import { toast } from 'react-toastify';
// import Newmodel from './Service/Newmodel';
import { FormHelperText } from '@mui/material';
import p3 from '../Component/images/p3.jpeg';
import { RsContextCreater } from './UseContext/ContextMain';






function GetQuote() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {setDetailsCon} = useContext(RsContextCreater);
  const {detailsCon}=useContext(RsContextCreater);



  const location = useLocation();
  const { state } = location;

  const [otpValues, setOtpValues] = useState(Array(4).fill(''));
  const [otpemailValues, setOtpemailValues] = useState(Array(4).fill(''));
  // const [enterotp,SetEnterOtp]=useState("");
  const [otp, setOtp] = useState(Array(4).fill(''));
  const [emailotp, SetemailOtp] = useState(Array(4).fill(''));
  const [verifymobilmsg, Setverifymobilmsg] = useState("");
  const [verifyemailmsg, Setverifyemailmsg] = useState("");
  const [emailverified, setemailverified] = useState("send OTP");
  const [mobileverified, setmobileverified] = useState("send OTP");
  const [toastDisplayed, setToastDisplayed] = useState(false);
  const otpInputs = useRef([]);
  const emailInputs = useRef([]);

  const handleOtpInputChange = (index, value) => {
    if (value.match(/[0-9]/)) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);
    }
  };
  const handleOtpemailInputChange = (index, value) => {
    if (value.match(/[0-9]/)) {
      const newOtpemailValues = [...otpemailValues];
      newOtpemailValues[index] = value;
      setOtpemailValues(newOtpemailValues);
    }
  };
  const handleMobileOtpChange = (index, value) => {
    try {


      if (value.length > 1) return;

      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      // if (value && index < 4) {
      //   if (index < 3 && otpInputs.current[index + 1]) {
      //     otpInputs.current[index + 1].focus();
      //   }
      // } else if (index > 0 && otpInputs.current[index - 1]) {
      //   otpInputs.current[index - 1].focus();
      // }
    } catch (err) {
      console.log("error while otp updating:", err);
    }
  };

  const handleEmailOtpChange = (index, value) => {
    try {
      if (value.length > 1) return;
      const updatedemailOtp = [...emailotp];
      updatedemailOtp[index] = value;
      SetemailOtp(updatedemailOtp);
      // if (value && index < 4) {
      //   if (index < 3 && emailInputs.current[index + 1]) {
      //     emailInputs.current[index + 1].focus();
      //   }
      // } else if (index > 0 && emailInputs.current[index - 1]) {
      //   emailInputs.current[index - 1].focus();
      // }
    } catch (err) {
      console.log("error while otp updating:", err);
    }
  };


  const marketValue = state?.formValues?.marketValue;
  // console.log( marketValue);

  const security = state?.formValues?.security;

  const buildingAge = state?.formValues?.buildingAge;

  const squareFeet = state?.formValues?.squareFeet;
  const pincode = state?.formValues?.pincode;
  const person = state?.formValues?.person;
  const effected = state?.formValues?.effected;



  // const [value,setValue]=useState();
  const [premium, setPremium] = useState();
  const [year, setYear] = useState();
  function handleGoBack() {
    window.history.back();
  }

  const [showOTPInput, setshowOTPInput] = useState(false);

  const [otpSent, setOtpSent] = useState(false);
  const [resendActive, setResendActive] = useState(false);
  const [timer, setTimer] = useState(20);
  const [resendCount, setResendCount] = useState(0);

  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setResendActive(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const [showSignMobOtp,setShowSignMobOtp] = useState()
  function sendOTP(e) {
    e.preventDefault();
    // setshowOTPInput(true);
    if (regexMobileNo.test(feilds.mobileno)) {
      PropertyInsuranceService.checkMobileNumber(feilds.mobileno).then((res) => {
        console.log(res.data);
        setData(res.data);
        if (res.data === "Mobile number is not exists") {
          PropertyInsuranceService.getOtp1().then((res) => {
            console.log(res.data);
            setShowSignMobOtp(res.data)
            const otpValue = res.data;
            setOtp(res.data);
            setshowOTPInput(true);
            const mobileNumber = values.mobileno;
            PropertyInsuranceService.getOtp(mobileNumber, otpValue).then((res) => {
              console.log(res);
            }).catch((err) => {});
            setOtpSent(true);
            setmobileverified('OTP Sent');
            setTimer(20);
            setResendActive(false);
            setResendCount(0);
          }).catch((error) => { })

          console.log(showOTPInput);
          setshowOTPInput(true);

          //  SetVerifyOtp("");
        }
        else if (res.data === "Mobile number exists") {
          setshowOTPInput(false);
        }
      })
      console.log(showOTPInput);
    }
    else {
      setshowOTPInput(false);
    }
  }

  const resendOTPMobile = (e) => {
    e.preventDefault();
    if (resendCount < 2 && regexMobileNo.test(feilds.mobileno)) {
      PropertyInsuranceService.checkMobileNumber(feilds.mobileno).then((res) => {
        console.log(res.data);
        setData(res.data);
  
        if (res.data === "Mobile number is not exists") {
          PropertyInsuranceService.getOtp1().then((res) => {
            console.log(res.data);
            const otpValue = res.data;
            setOtp(res.data);
            const mobileNumber = feilds.mobileno;
            PropertyInsuranceService.getOtp(mobileNumber, otpValue).then((res) => {
              console.log(res);
            }).catch((err) => {});
  
            setResendActive(false);
            setTimer(20);
            setResendCount((prevCount) => prevCount + 1);
          }).catch((error) => {});
        } else if (res.data === "Mobile number exists") {
          setshowOTPInput(false);
        }
      });
    }
  };

  const [premiumIntialValue,SetPremiumIntialValue]=useState("");
  const initialValue = 0.0005;
  const securityInitialValue = security === "Yes" ? 0 : 0.0002;

  const [inputs,setInputs]=useState({
    marKetValue:"",
    buildingAge:"",
    securityCheck:""
  });


//  useEffect(()=>{

    inputs.marKetValue =String(marketValue) ;
    inputs.buildingAge =String(buildingAge) ;
    inputs.securityCheck =String(security) ;

    // console.log(JSON.stringify(inputs),inputs.marKetValue);
     PropertyInsuranceService.premium_caliculation(inputs).then((res)=>{
      // console.log(res);
      SetPremiumIntialValue(res.data)}).catch(()=>{});
//      setState1(false);
    
//  },[marketValue])

const CaliculatePremium =()=>
  {
    let buildingAgeRate = 0;
    if (buildingAge === "0 to 5 Years") buildingAgeRate = 0.0001;
    else if (buildingAge === "5 to 10 Years") buildingAgeRate = 0.00015;
    else if (buildingAge === "10 to 15 Years") buildingAgeRate = 0.0002;
    else if (buildingAge === "15 to 20 Years") buildingAgeRate = 0.00025;
    else if (buildingAge === "20 to 25 Years") buildingAgeRate = 0.0003;

    const sumOfInitialValues = initialValue + buildingAgeRate + securityInitialValue;
    const premiumValue = Math.floor(marketValue * sumOfInitialValues);
    SetPremiumIntialValue(premiumValue);
    // return premiumValue;

  }

  // caliculatePremium();
  useEffect(() => {
    CaliculatePremium();
  }, [buildingAge, security, marketValue]);

  // const caliculate1 =()=>
  //   {
  //     // CaliculatePremium();
  //     CaliculatePremium();
  //     setPremium(Math.round(premiumIntialValue))
  //   };
  // const caliculate2 =()=>{
  //   CaliculatePremium();
  //   let premiumDiscount = (premiumIntialValue/100)*10 ; // 0.1%
  //   setPremium(Math.round((premiumIntialValue * 2)-premiumDiscount));
  // };
  // const caliculate3 =()=>{
  //   CaliculatePremium();
  //   let premiumDiscount = (premiumIntialValue/100)*15 ; // 0.15%
  //   setPremium(Math.round((premiumIntialValue * 3)-premiumDiscount));
  // };
  // const caliculate4 =()=>{
  //   CaliculatePremium();
  //   let premiumDiscount = (premiumIntialValue/100)*20 ; // 0.2%
  //   setPremium(Math.round((premiumIntialValue * 4)-premiumDiscount));
  // };
  // const caliculate5 =()=>{
  //   CaliculatePremium();
  //   let premiumDiscount = (premiumIntialValue/100)*25 ; // 0.25%
  //   setPremium(Math.round((premiumIntialValue * 5)-premiumDiscount));
  // };
  const caliculate1 =()=>
    {
      setPremium(Math.round(premiumIntialValue));
    };
  const caliculate2 =()=>{
    CaliculatePremium();
    let premiumDiscount = (premiumIntialValue/100)*10 ; // 0.1%
    setPremium(Math.round((premiumIntialValue * 2)-premiumDiscount));
  };
  const caliculate3 =()=>{
    CaliculatePremium();
    let premiumDiscount = (premiumIntialValue/100)*15 ; // 0.15%
    setPremium(Math.round((premiumIntialValue * 3)-premiumDiscount));
  };
  const caliculate4 =()=>{
    CaliculatePremium();
    let premiumDiscount = (premiumIntialValue/100)*20 ; // 0.2%
    setPremium(Math.round((premiumIntialValue * 4)-premiumDiscount));
  };
  const caliculate5 =()=>{
    CaliculatePremium();
    let premiumDiscount = (premiumIntialValue/100)*25 ; // 0.25%
    setPremium(Math.round((premiumIntialValue * 5)-premiumDiscount));
  }
  
  // const caliculate1 = () => {
  //   if (marketValue === undefined) {
  //     setUrlCopy(true)
  //   }


  //   if (security === "Yes") {
  //     let baseRate = 0.001;
  //     setYear(1);

  //     if (buildingAge === "0 to 5 Years") { baseRate -= 0.0001; }

  //     else if (buildingAge === "5 to 10 Years") { baseRate -= 0.0002; }


  //     else if (buildingAge === "10 to 15 Years") { baseRate -= 0.0003; }

  //     else if (buildingAge === "15 to 20 Years") { baseRate -= 0.0004; }

  //     else if (buildingAge === "20 to 25 Years") { baseRate -= 0.0005; }

  //     setPremium(Math.floor((marketValue * baseRate) * 10));
  //     // setValue(marketValue);
  //     console.log(baseRate);
  //   }
  //   else if (security === "No") {
  //     let baseRate = 0.002;
  //     setYear(1);

  //     if (buildingAge === "0 to 5 Years") { baseRate -= 0.0001; }

  //     else if (buildingAge === "5 to 10 Years") { baseRate -= 0.0002; }


  //     else if (buildingAge === "10 to 15 Years") { baseRate -= 0.0003; }

  //     else if (buildingAge === "15 to 20 Years") { baseRate -= 0.0004; }

  //     else if (buildingAge === "20 to 25 Years") { baseRate -= 0.0005; }
  //     if (marketValue !== undefined) {
  //       setYear(1);
  //       setPremium(Math.floor((marketValue * baseRate) * 10));
  //     }

  //     // setValue(marketValue);
  //     console.log(baseRate);
  //   }
  // }
  // const caliculate2 = () => {
  //   if (marketValue === undefined) {
  //     setUrlCopy(true)
  //   }
  //   // setYear(2);

  //   if (security === "Yes") {
  //     let baseRate = 0.001;
  //     setYear(2);

  //     if (buildingAge === "0 to 5 Years") { baseRate -= 0.0001; }

  //     else if (buildingAge === "5 to 10 Years") { baseRate -= 0.0002; }


  //     else if (buildingAge === "10 to 15 Years") { baseRate -= 0.0003; }

  //     else if (buildingAge === "15 to 20 Years") { baseRate -= 0.0004; }

  //     else if (buildingAge === "20 to 25 Years") { baseRate -= 0.0005; }

  //     setPremium(Math.floor((marketValue * baseRate) * 10) * 2 - 100);
  //     // setValue(marketValue);
  //     console.log(baseRate);
  //   }
  //   else if (security === "No") {
  //     let baseRate = 0.002;
  //     setYear(2);

  //     if (buildingAge === "0 to 5 Years") { baseRate -= 0.0001; }

  //     else if (buildingAge === "5 to 10 Years") { baseRate -= 0.0002; }


  //     else if (buildingAge === "10 to 15 Years") { baseRate -= 0.0003; }

  //     else if (buildingAge === "15 to 20 Years") { baseRate -= 0.0004; }

  //     else if (buildingAge === "20 to 25 Years") { baseRate -= 0.0005; }
  //     if (marketValue !== undefined) {
  //       setYear(2);
  //       setPremium(Math.floor((marketValue * baseRate) * 10) * 2 - 100);
  //     }

  //     // setPremium(Math.floor((marketValue*baseRate)*10)*2-100);
  //     // setValue(marketValue);
  //     console.log(baseRate);

  //   }

  // }

  // const caliculate3 = () => {
  //   if (marketValue === undefined) {
  //     setUrlCopy(true)
  //   }

  //   // setYear(3);

  //   if (security === "Yes") {
  //     let baseRate = 0.001;
  //     setYear(3);

  //     if (buildingAge === "0 to 5 Years") { baseRate -= 0.0001; }

  //     else if (buildingAge === "5 to 10 Years") { baseRate -= 0.0002; }


  //     else if (buildingAge === "10 to 15 Years") { baseRate -= 0.0003; }

  //     else if (buildingAge === "15 to 20 Years") { baseRate -= 0.0004; }

  //     else if (buildingAge === "20 to 25 Years") { baseRate -= 0.0005; }

  //     setPremium(Math.floor((marketValue * baseRate) * 10) * 3 - 200);
  //     // setValue(marketValue);
  //     console.log(baseRate);
  //   }
  //   else if (security === "No") {
  //     let baseRate = 0.002;
  //     setYear(3);

  //     if (buildingAge === "0 to 5 Years") { baseRate -= 0.0001; }

  //     else if (buildingAge === "5 to 10 Years") { baseRate -= 0.0002; }


  //     else if (buildingAge === "10 to 15 Years") { baseRate -= 0.0003; }

  //     else if (buildingAge === "15 to 20 Years") { baseRate -= 0.0004; }

  //     else if (buildingAge === "20 to 25 Years") { baseRate -= 0.0005; }

  //     if (marketValue !== undefined) {
  //       setYear(3);
  //       setPremium(Math.floor((marketValue * baseRate) * 10) * 3 - 200);
  //     }
  //     // setPremium(Math.floor((marketValue*baseRate)*10)*3-200);
  //     // setValue(marketValue);
  //     console.log(baseRate);

  //   }
  // }

  // const caliculate4 = () => {
  //   if (marketValue === undefined) {
  //     setYear();
  //     setUrlCopy(true)
  //   }
  //   // setYear(4);

  //   if (security === "Yes") {
  //     let baseRate = 0.001;
  //     setYear(4);

  //     if (buildingAge === "0 to 5 Years") { baseRate -= 0.0001; }

  //     else if (buildingAge === "5 to 10 Years") { baseRate -= 0.0002; }


  //     else if (buildingAge === "10 to 15 Years") { baseRate -= 0.0003; }

  //     else if (buildingAge === "15 to 20 Years") { baseRate -= 0.0004; }

  //     else if (buildingAge === "20 to 25 Years") { baseRate -= 0.0005; }

  //     setPremium(Math.floor((marketValue * baseRate) * 10) * 4 - 300);
  //     // setValue(marketValue);
  //     console.log(baseRate);
  //   }
  //   else if (security === "No") {
  //     let baseRate = 0.002;
  //     setYear(4);

  //     if (buildingAge === "0 to 5 Years") { baseRate -= 0.0001; }

  //     else if (buildingAge === "5 to 10 Years") { baseRate -= 0.0002; }


  //     else if (buildingAge === "10 to 15 Years") { baseRate -= 0.0003; }

  //     else if (buildingAge === "15 to 20 Years") { baseRate -= 0.0004; }

  //     else if (buildingAge === "20 to 25 Years") { baseRate -= 0.0005; }
  //     if (marketValue !== undefined) {

  //       setPremium(Math.floor((marketValue * baseRate) * 10) * 4 - 300);
  //     }

  //     // setPremium(Math.floor((marketValue*baseRate)*10)*4-300);
  //     // setValue(marketValue);
  //     console.log(baseRate);

  //   }
  // }

  // const caliculate5 = () => {
  //   if (marketValue === undefined) {
  //     setUrlCopy(true)
  //   }
  //   // setYear(5);

  //   if (security === "Yes") {
  //     let baseRate = 0.001;
  //     setYear(5);

  //     if (buildingAge === "0 to 5 Years") { baseRate -= 0.0001; }

  //     else if (buildingAge === "5 to 10 Years") { baseRate -= 0.0002; }


  //     else if (buildingAge === "10 to 15 Years") { baseRate -= 0.0003; }

  //     else if (buildingAge === "15 to 20 Years") { baseRate -= 0.0004; }

  //     else if (buildingAge === "20 to 25 Years") { baseRate -= 0.0005; }

  //     setPremium(Math.floor((marketValue * baseRate) * 10) * 5 - 400);
  //     // setValue(marketValue);
  //     console.log(baseRate);
  //   }
  //   else if (security === "No") {
  //     let baseRate = 0.002;
  //     setYear(5);

  //     if (buildingAge === "0 to 5 Years") { baseRate -= 0.0001; }

  //     else if (buildingAge === "5 to 10 Years") { baseRate -= 0.0002; }


  //     else if (buildingAge === "10 to 15 Years") { baseRate -= 0.0003; }

  //     else if (buildingAge === "15 to 20 Years") { baseRate -= 0.0004; }

  //     else if (buildingAge === "20 to 25 Years") { baseRate -= 0.0005; }

  //     if (marketValue !== undefined) {
  //       setYear(5);
  //       setPremium(Math.floor((marketValue * baseRate) * 10) * 5 - 400);
  //     }

  //     // setPremium(Math.floor((marketValue*baseRate)*10)*5-400);
  //     // setValue(marketValue);
  //     console.log(baseRate);

  //   }
  // }

  const [data, setData] = useState("");
  const [data1, setData1] = useState("");
  const [login, setLogin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showstate, setState] = useState(false);


  useEffect(() => {
    // window.reload();
  },[showModal])

  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    setYear(selectedYear);

    // Call your calculate function based on selected year
    switch (selectedYear) {
      case 1:
        caliculate1();
        break;
      case 2:
        caliculate2();
        break;
      case 3:
        caliculate3();
        break;
      case 4:
        caliculate4();
        break;
      case 5:
        caliculate5();
        break;
    }
  };



  // useEffect(() => {
  //   const storedYear = sessionStorage.getItem('year');
  //   const storedPremium = sessionStorage.getItem('Premium');
  //   setYear(storedYear ? parseInt(storedYear, 10) : null);
  //   setPremium(storedPremium ? parseInt(storedPremium, 10) : null);
  // }, []);

  let startingCustomerId = parseInt(localStorage.getItem('customerId')) || 11110;


  const [feilds, setFeilds] = useState({
    name: '',
    mobileno: '',
    email: '',
    email1:'',
    customerId: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    name: '',
    mobileno: '',
    email: '',
    email1:'',
    password: '',
  });

  const [values, setValues] = useState({
    mobileno: '',
    password: '',
    email: '',
  });

  const change = (e) => {
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
      setshowOTPInput(false);
      setOtpSent(false);
      setData('');
      setTimer(0);
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

    if (name === "email1") {
      if (!regexEmail.test(value)) {
        setValidationErrors({ ...validationErrors, [name]: "Please enter valid email " });
      } else {
        setValidationErrors({ ...validationErrors, [name]: "" });
      }
    }

    // validation for password :
    if (name === "password") {
      if (!regexPassword.test(value)) {
        setValidationErrors({ ...validationErrors, [name]: "password  1 uppercase letter, 1 special symbol and 1 digit minlength 8" });
      } else {
        setValidationErrors({ ...validationErrors, [name]: "" });
      }
    }

    sessionStorage.setItem(name, value);
  }



  useEffect(() => {
    // Retrieve feilds data from sessionStorage
    const storedName = sessionStorage.getItem('name');
    const storedMobileNo = sessionStorage.getItem('mobileno');
    const storedEmail = sessionStorage.getItem('email');
    const storedPassword = sessionStorage.getItem('password');

    // Update feilds state with sessionStorage data if available
    if (storedName) {
      setFeilds((prevFeilds) => ({ ...prevFeilds, name: storedName }));
    }
    if (storedMobileNo) {
      setFeilds((prevFeilds) => ({ ...prevFeilds, mobileno: storedMobileNo }));
    }
    if (storedEmail) {
      setFeilds((prevFeilds) => ({ ...prevFeilds, email: storedEmail }));
    }
    if (storedPassword) {
      setFeilds((prevFeilds) => ({ ...prevFeilds, password: storedPassword }));
    }
  }, []);


  var j = location.state?.i || detailsCon.i;
  var mobileno = location.state?.mobileno;
  var emailId = location.state?.emailId;
  var i = 0;
  const handleSignUp = () => {
    if (marketValue === undefined) {
      setUrlCopy(true);
      setShowModal(false);

    }
    if ((year === 1 || year === 2 || year === 3 || year === 4 || year === 5) && i === 0 && j === undefined) {
      i++;
      console.log(i);
      if (marketValue === undefined) {
        setShowModal(false);
      }
      else {
        setShowModal(true)
      }

    }

    else if (j > 0) {

      if (year === 1 || year === 2 || year === 3 || year === 4 || year === 5) {

        i = j;
        setShowModal(false);

        navigate("/fill", { state: { formData: feilds, premiumData: { year, premium }, marketValue, buildingAge, security, squareFeet, pincode, person, effected, i,emailId,mobileno, startingCustomerId } })

        
      }
      else {
        setState(true);
      }
    }

    else {
      setShowModal(true)
      console.log(year)
    }

  };
  // const handleSignUp = ()=>
  // {
  //   navigate("/fill", { state: { formData: feilds, premiumData: { year, Premium } ,  marketValue ,buildingAge , security , squareFeet ,pincode,person,effected,i,startingCustomerId} })
  // }
  const [customer, setCustomer] = useState("");
  const [signUpDetails, setSignUpDetails] = useState([]);

  // useEffect(() => {
  //   if (values.mobileno) {
  //     PropertyInsuranceService.getCustomerIdByMobileNo(values.mobileno)
  //       .then((res) => {
  //         setSignUpDetails(res.data);   
  //   });
  // }
  // });

  const signUpRows = signUpDetails.map((details) => (
    <tr key={details.id}>
      {details.email}
    </tr>
  ));
  const signUpRowsAsString = signUpRows.map(row => row.props.children);
  values.email = signUpRowsAsString.join(', ');

  // console.log(feilds);
  const [verify, setVerify] = useState(false);

  const handleClose = () => setShowModal(false);
  const clickCloseMail = () => setShowMail1(false);
  const clickClose = () => setState(false);
  const clickCloseLogin =()=> setShowLogin(false);
  const clickClosebutton = () => setLogin(false);

  const closeVerify = () => {
    setVerify(false);
  }
  // navigating signup page :
  const navigate = useNavigate();

  const handleClick = (e) => {

    e.preventDefault();

    console.log(i);


    if (regexUsername.test(feilds.name) && regexMobileNo.test(feilds.mobileno) && regexEmail.test(feilds.email) && isemailverified && ismobileverified) {
      const s = feilds.mobileno;
      const d = feilds.email;
      console.log(s)
      console.log(d)

      PropertyInsuranceService.createCustomer(feilds).then(res => {
        // alert("signup donme");
        console.log(res.data);
      }
      );

      // PropertyInsuranceService.checkEmail(d).then((res)=>{

      //  const check=res.data;
      //   console.log(check);
      //   setData1(check);

      //   PropertyInsuranceService.checkMobileNumber(s).then((res)=>{

      //     console.log(res.data);
      //    setData(res.data);
      //     const ch=res.data;
      //     console.log(ch);

      //     if(ch === "Mobile number is not exists" && check ==="email is not exists")
      //  {

      i++;

      console.log(i);
      navigate("/fill", { state: { formData: feilds, premiumData: { year, premium }, marketValue, buildingAge, security, squareFeet, pincode, person, effected, i,emailId,mobileno, startingCustomerId } })

      console.log("feilds =>" + JSON.stringify(feilds));
      // PropertyInsuranceService.createCustomer(feilds);

    }

    else {
      if (!toastDisplayed) {
        toast.error("please verify email, mobile");
        setToastDisplayed(true);
      }


    }
    //  })
    //  })


    //  }

  }

  i++;

  const handleClicksignup = (e) => {
    e.preventDefault();

    async function performLogin() {

      const response = await PropertyInsuranceService.login(feilds);
      console.log(response)
      const loginResponse = response.data;
      //  setCustomer(loginResponse);
      console.log('Login Response:', loginResponse);

      i++;
      console.log(i);

      if (loginResponse === "Login successful!") {


        // setshowState(true);
        //  navigate("",{state:{values:values}})

        navigate("/fill", { state: { formData: values, premiumData: { year, premium }, marketValue, buildingAge, security, squareFeet, pincode, person, effected, i, startingCustomerId } })

      }
      else {

        setCustomer(loginResponse);
      }
    }
    performLogin();
  }

  const hanldeKey = (event) => {
    // e.preventDefault();
    const charCode = event.which ? event.which : event.keyCode;

    if ((charCode < 48 || charCode > 57) && charCode !== 8 && (charCode < 37 || charCode > 40)) {
      event.preventDefault();
    }
  }

  const [urlCopy, setUrlCopy] = useState();
  const urlOk = () => {
    navigate("/property");
  }

  const [isBuyNow, setIsBuyNow] = useState(false);

  const slideAnimation = useSpring({
    from: { transform: 'translateX(50%)' },
    to: { transform: isBuyNow ? 'translateX(-100%)' : 'translateX(0%)' },
    delay: 2000, // Delay for 1 second
    onRest: () => setIsBuyNow(!isBuyNow)
  });

  const [MobileOTPInput, setMobileOTPInput] = useState(false);
  const [EmailOTPInput, setEmailshowOTPInput] = useState(false);

  const [otpSentMail, setOtpSentMail] = useState(false);
  const [resendActiveMail, setResendActiveMail] = useState(false);
  const [timerMail, setTimerMail] = useState(20);
  const [resendCountMail, setResendCountMail] = useState(0);


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

  // function sendOTP(e){
  // e.preventDefault();
  //   setshowOTPInput(true);
  //   console.log(showOTPInput);
  // }
  function sendemailOTP(e) {
    e.preventDefault();
    if (regexEmail.test(feilds.email)) {
      PropertyInsuranceService.checkEmail(feilds.email).then((res) => {
        console.log(res.data);
        setData1(res.data)

        if (res.data === "Email is not exists") {
          setEmailshowOTPInput(true)

          PropertyInsuranceService.sendEmailOtp(feilds.email).then((res) => {
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


  const [ismobileverified, setisMobileVerifired] = useState(false);
  const [isemailverified, setisEmaailverified] = useState(false);
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

  const handleverifyMobileOtp = (e) => {
    e.preventDefault();
    console.log("fhfgh")
    setMobileOTPInput(false);
    const enteredmobileotp = otpValues.join('');
    console.log(enteredmobileotp);
    console.log(otp);
    if (otp == enteredmobileotp) {
      console.log("done")
      setshowOTPInput(false);
      setmobileverified("verified 🗸")
      setisEmaailverified(true);
    } else {
      setMobileOTPInput(true);
      Setverifymobilmsg("Invalid OTP...!");
    }

  }

  const [showMailInput,setShowMailInput] = useState(false);
  const [showMail1,setShowMail1] = useState(false);

  

  const HandleMailInput=(e)=>{
    e.preventDefault();
    // setShowMailInput(true);
    setShowMail1(true)
  }

  // const [premium,setPremium1] = useState()
  const [mailnotify,setMailNotify] = useState();

  const HandleSendMail = async() => {
    if(regexEmail.test(feilds.email1)){
      const email=feilds.email1;
      // setPremium1(Premium)
      // console.log(Premium)
      const data={marketValue,squareFeet,pincode,year,premium}
      console.log(data)
     const res= await PropertyInsuranceService.sendEmailatQuotepage(email,data)
     console.log(res.data)

     setMailNotify(res.data)

      // setShowMailInput(false)
    }

  }

  // from here login popUp
  const [showLogin,setShowLogin] = useState(false);
  
  const HandleLoginModal = () => {
    setShowModal(false);
    setShowLogin(true);
  }

  const HandleSignUpModal = () => {
    setShowModal(true);
    setShowLogin(false);
  }

  const [otpValuesLogin, setOtpValuesLogin] = useState(['', '', '', '']);
  const [enterotpLogin,SetEnterOtpLogin]=useState("");
  const [otpLogin, setOtpLogin] = useState(['', '', '', '']); 
  const otpInputsLogin = useRef([]);

  const handleOtpInputChangeLogin = (index, value) => {
      if (value.match(/[0-9]/)) {
          const newOtpValues = [...otpValuesLogin];
          newOtpValues[index] = value;
          setOtpValuesLogin(newOtpValues);
      }
  };
  const handleOtpChangeLogin = (index, value) => {
    if (value.length >1) return;
    const updatedOtp = [...otpLogin];
    updatedOtp[index] = value;
    setOtpLogin(updatedOtp);
    if (value && index < 4) {
      if (index < 3) {
        otpInputsLogin.current[index + 1].focus();
      }
      }
      else if (index > 0) {
        otpInputsLogin.current[index - 1].focus();
      }
  };

  const [valuesLogin, setValuesLogin] = useState({
    mobileno: ''
  });
  // console.log(valuesLogin);
  const [newErr,setNewErr] = useState();


  const changeLogin=(e)=>
  {
    const {name,value}=e.target;
    setValuesLogin({...valuesLogin,[name]:value}); 
    if (name === "mobileno") {
      
      if (!regexMobileNo.test(value)) {
        setValidationErrorsLogin({ ...validationErrorsLogin, [name]: "Phone No. must start with 6,7,8,9 series with  10 digits" });
        setshowOTPInputLogin(false);
        setDataLogin('');
        setButtonTextLogin('Send OTP');
        setButtonDisabledLogin(false);
        setTimerLogin(0);
        setAttemptsLogin(0);
        setNewErr('')
      } else {
        setValidationErrorsLogin({ ...validationErrorsLogin, [name]: "" });
      }
    }

  }

  const [dataLogin,setDataLogin]=useState();
 
  const [validationErrorsLogin,setValidationErrorsLogin]=useState({
    mobileno : ''
  })

  const HandleSubmitLogin=(e)=>
    {
      e.preventDefault();
      console.log("values =>"+JSON.stringify(valuesLogin));
    }
    const [showOTPInputLogin,setshowOTPInputLogin]=useState(false);
    const [verifyotpLogin,SetVerifyOtpLogin]=useState("");
    
    const [buttonDisabledLogin, setButtonDisabledLogin] = useState(false);
    const [buttonTextLogin, setButtonTextLogin] = useState('Send OTP');
    const [timerLogin, setTimerLogin] = useState(0);
    const [attemptsLogin, setAttemptsLogin] = useState(0);

    useEffect(() => {
      let interval;
      if (timerLogin > 0) {
        interval = setInterval(() => {
          setTimerLogin((prev) => prev - 1);
        }, 1000);
      } else if (timerLogin === 0 && buttonDisabledLogin && attemptsLogin < 3) {
        setButtonDisabledLogin(false);
        setButtonTextLogin('Resend OTP');
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }, [timerLogin, buttonDisabledLogin]);

    const [showLogMobOtp,setShowLogMobOtp] = useState();

    const sendOTPLogin =async(e)=>{
      e.preventDefault();
      
        if(regexMobileNo.test(valuesLogin.mobileno)){
          PropertyInsuranceService.checkMobileNumber(valuesLogin.mobileno).then((res)=>
            {
              console.log(res.data);
              setDataLogin(res.data);
              if(res.data === "Mobile number exists"){
                PropertyInsuranceService.getOtp1().then((res)=>
                  {
                    if (attemptsLogin >= 3) {
                      setButtonTextLogin('Try Later');
                      setButtonDisabledLogin(true);
                      return;
                    }
                    
                    setButtonDisabledLogin(true);
                    setTimerLogin(20); 
                    setAttemptsLogin((prev) => prev + 1);
                console.log(res.data);
                setShowLogMobOtp(res.data)
                const otpValue=res.data;
                SetEnterOtpLogin(res.data);
                const mobileNumber=valuesLogin.mobileno;
                PropertyInsuranceService.getOtp(mobileNumber,otpValue).then((res)=>
              {
                console.log(res);
                
              }).catch((err)=>
            {});
            }).catch((error)=>
          {})

          console.log(showOTPInputLogin);
            setshowOTPInputLogin(true);
            setNewErr('');
            //  SetVerifyOtp("");
          }
          })
            }
            else if(!valuesLogin.mobileno){
              console.log('errrrrrrrrrrrrrrrrrrr');
              // alert('enter mobile number')
              // toast.error('Enter Mobile Number')
              setNewErr('Please Enter Your Mobile Number');
              setValidationErrors('');
            }
            else {setDataLogin("")}
            }
    const inputMoboleNo = valuesLogin.mobileno;
    const handleVerifyMobileNoOtpLogin = (e) => {
     e.preventDefault();
      const otp = otpValuesLogin.join('');
    console.log(otp);
    if(enterotpLogin == otp )
      {
        SetVerifyOtpLogin("Verified Successfully");
        setshowOTPInputLogin(false);
        // navigate('/fill',{state:{values:valuesLogin.mobileno}})
        // navigate("/fill", { state: { formData: feilds, premiumData: { year, Premium } ,  marketValue ,buildingAge , security , squareFeet ,pincode,person,effected,i,mobileno,emailId,startingCustomerId} })
        navigate("/fill", { state: { formData: feilds, premiumData: { year, premium } ,  marketValue ,buildingAge , security , squareFeet ,pincode,person,effected,i,mobileno,emailId,startingCustomerId,inputMoboleNo} })
        setDetailsCon((prev) => ({
          ...prev,
          inputMoboleNo
        }));
      }
      else{SetVerifyOtpLogin("Invalid OTP...!")}
  };



  return (
    <div className='property'>
      <Header />
      <div className='container-fluid pt-lg-3'>
        <div className='row mt-lg-5'>
          <div className='col-12 col-lg-4 col-md-10 ms-lg-3 order-2 order-lg-1 gqfcol'>
            <div class="card mt-2 mb-3" >
              <div class="card-body bg-light border border-warning rounded shadow gqcards">
                <h5 class="card-title bg-warning-subtle text-center rounded p-1 fw-bold">Secure your home rightfully!</h5>
                <p class="card-title bg-secondary-subtle text-center rounded p-1 fw-bold">You have the right to buy home insurance from RamanaSoft</p>
                <ui className="custom-bullet">
                  <li style={{ whiteSpace: 'nowrap' }}><span className='fw-bold'>Banks accept</span> all online bought policies</li>
                  <li style={{ whiteSpace: 'nowrap' }}><span className='fw-bold'>Instant policy </span> with zero documentation</li>
                  {/* <li style={{whiteSpace:'nowrap'}}>save <span className='fw-bold'>up to 25%</span> by comparing plans</li> */}
                  <li style={{ whiteSpace: 'nowrap' }}>Buy <span className='fw-bold'>without unwanted </span> addons!</li>
                </ui>
                <small className='text-secondary ms-4'>Standard <span><a href='#offcanvasExample' data-bs-toggle="offcanvas" role="button" aria-controls="offcanvasExample" className='text-decoration-none'>terms & conditions</a></span> apply.</small>

                <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                  <div className="offcanvas-header">
                    <h5 className="offcanvas-title text-secondary fw-bold" id="offcanvasExampleLabel">Terms & Conditions</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                  </div>
                  <div className="offcanvas-body">
                    <div>
                      <ul>
                        <li className='px-2'>
                          <b>Coverage Scope: </b>Property insurance covers damage or loss to your property due to specified perils, such as fire, theft, vandalism, and natural disasters. The coverage may extend to the building structure, contents, and personal belongings within the premises.
                        </li>
                        <li className='px-2'>
                          <b>Policy Limits: </b>The policy will specify the maximum amount the insurance company will pay out for covered losses. It's essential to review these limits and ensure they adequately protect your property.
                        </li>
                        <li className='px-2'>
                          <b>Deductibles: </b> You may be required to pay a deductible before the insurance coverage kicks in. The deductible amount is typically chosen by the policyholder and can affect the cost of premiums.
                        </li>
                        <li className='px-2'>
                          <b>Premiums: </b>  Premiums are the regular payments you make to maintain coverage. The amount of the premium is determined by factors such as the value of the insured property, location, and risk factors.
                        </li>
                        <li className='px-2'>
                          <b>Claims Process: </b>  In the event of a covered loss, you must promptly notify the insurance company and file a claim. The insurer will investigate the claim and assess the damage before determining the payout.
                        </li>
                        <li className='px-2'>
                          <b>Policy Renewal: </b> Property insurance policies are typically renewable annually. The insurer may review and adjust premiums, coverage limits, and terms at the time of renewal.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card text-center mb-3">
              <div class="card-body bg-light border border-danger rounded shadow">
                <h5 class="card-title text-start bg-danger-subtle rounded fw-bold p-1 text-center">Entire Housing Society</h5>
                <p class="card-text">Secure your entire housing society against <br /><ul className='d-flex justify-content-around fw-semibold mt-1'><li className='me-2'>Fire</li><li className='me-2'>Theft</li><li className='me-2'>Natural disasters</li></ul> </p>
                {/* <button  class="btn text-success border fw-bold"><HomeIcon /></button> */}
              </div>
            </div>

            <div class="card text-center">
              <div class="card-body bg-light border border-primary rounded row">
                <h5 class="card-title fw-bold bg-secondary-subtle rounded text-dark">Talk to Expert</h5>
                <div className='col mt-lg-2 rounded'>
                  <img src={care} className='img-fluid care' alt='customer care'></img>
                </div>
                <div className='col-lg-8'>
                  <p class="card-text ">Our agent can help you to buy the best home insurance!</p>
                  <button className="btn fw-bold text-primary border mb-1"><PhoneIcon />Talk to Expert</button><br />
                  <span className=''>(1800-143-123)</span>
                </div>
              </div>
            </div>
          </div>
          <div className='col-12 col-lg-7 ms-lg-5 ms-2 order-1 order-lg-2'>
            <div className='d-flex justify-content-around align-items-center flex-wrap'>
              <div>
                <a onClick={handleGoBack} title="Back">
                  <KeyboardArrowLeftOutlinedIcon className='border bg-light fs-1 fs-lg-2 rounded text-primary' />
                </a>
              </div>
              <div className='col-7 ms-4 col-lg-4 mb-4 mt-5 mt-lg-0 pt-lg-0 pt-3'>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" className='fw-bold'><i className='fa-solid fa-arrow-right fa-bounce fs-4 fa-lg ms-4 me-4 text-primary'></i>Select Years</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={year}
                    label="Age of the Building"
                    className='fw-bold'
                    onChange={handleYearChange}
                    required
                  >
                    <MenuItem value={1} onClick={caliculate1}>1 Year</MenuItem>
                    <MenuItem value={2} onClick={caliculate2}>2 Years</MenuItem>
                    <MenuItem value={3} onClick={caliculate3}>3 years</MenuItem>
                    <MenuItem value={4} onClick={caliculate4}>4 years</MenuItem>
                    <MenuItem value={5} onClick={caliculate5}>5 years</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div>
                <p className='ms-4 fw-bold text-secondary'>
                  All premiums are inclusive of GST
                  </p>
              </div>
            </div>

            <div class="card ">
              <img src={shield} style={{ width: '45px', position: 'absolute' }} title='secure' alt="100% secured" className='p-2 bg-light rounded'></img>
              <div class="card-body d-flex flex-column flex-md-row justify-content-md-around align-items-center p-3">
                <div>
                  <img src={RamanaLogo} title='RamanaSoft' alt='company-logo' className='rounded shadow' style={{ width: '60px' }}></img>
                </div>
                <div>
                  <h5 class="card-title fw-bold mt-3">RamanaSecure Living</h5>
                </div>
                <div>
                  <p class="card-text fw-bold text-secondary">Policy Term</p>
                  <h5 className='text-center fw-bold'>{year ? year : 0}{' '}{year === 1 ? 'year' : 'years'}</h5>
                </div>
                <div className='mt-2 mt-md-0'>
                  <div className="">
                    {/* <button className="hover-button btn-primary fw-bold  buy shadow px-5 py-3 rounded mt-lg-2"  onClick={handleSignUp}>
        <span className="default-text mt-1">&#x20B9; {Premium?Premium:0}/-</span>
        <span className="hover-text mt-1">Buy Now</span>
      </button> */}
                    <button style={{ position: 'relative', width: '150px', height: '50px', overflow: 'hidden' }} className='btn btn-primary rounded buy shadow fw-bold' onClick={handleSignUp} disabled={!year}>
                      <animated.div style={{ ...slideAnimation, position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                        {isBuyNow ? 'Buy Now' : ` ₹${premium ? premium : 0}/-`}
                      </animated.div>
                    </button>
                  </div>
                  <p className='text-secondary mt-1 ms-2'>inclusive of all taxes.</p>


                </div>
              </div>
              <div class="card-footer text-body-secondary text-center fw-bold">
                <div className='d-flex flex-column flex-md-row  justify-content-evenly mt-2'>
                  <p className='text-secondary pe-4' style={{ borderRight: '6px solid #ccc' }}>Property Value -<span className='fw-bold text-dark'>&nbsp;{marketValue}</span></p>
                  <p className='text-secondary' >Age Of The Building -<span className='fw-bold text-dark'>&nbsp;{buildingAge}</span></p>
                  <p className='text-secondary px-3' style={{ borderLeft: '6px solid #ccc' }}>SquareFeet -<span className='fw-bold text-dark'>&nbsp;{squareFeet}</span></p>
                </div>
              </div>
            </div>
            <div>
        <div className='mt-2 d-flex justify-content-end'>
          <button className='btn btn-primary' onClick={HandleMailInput} disabled={!year}>
            Send Quote <i className='fa-solid fa-share ms-2'></i>
          </button>
        </div>
        {/* <div className='mt-2 row d-flex justify-content-center'>
          <div className="form-floating col-lg-7">
          <input type="email"
              className="form-control" 
              id="floatingInput" 
              placeholder=""
              name='email1'
              required
              value={feilds.email1}
              maxLength={50}
              onChange={change}
              />
            <label for="floatingInput" className='ms-3'>Email -Id</label>
            <label htmlFor="floatingInput" className='ms-3'>Email -Id</label>
            <small>
              {validationErrors.email1 && <span className="text-danger sdErrmsg">{validationErrors.email1}</span>}
            </small>
          </div>
          <div className='col-3 p-2'>
            <button className='btn btn-success' onClick={HandleSendMail}>Send Mail</button>
          </div>
        </div> */}
    </div>
          </div>
        </div>
        <div>
        <Modal show={showLogin} onHide={clickCloseLogin} className='text-center mt-5' >
          <Modal.Header closeButton>
            <img src={p3}alt='logo' className='rounded'style={{height:'40px'}}/>
          </Modal.Header>
          <Modal.Body className='mt-1'>  
            <form onSubmit={HandleSubmitLogin} className=''>
              <div className='text-center fw-bold py-1 rounded '>
                <h3>Customer Login <AccountCircleSharpIcon className='fs-2'/></h3>
              </div>
              <div className='mx-lg-2 my-3 px-2'>
                <input
                  placeholder="Enter Your Mobile No."
                  name='mobileno'
                  required
                  value={valuesLogin.mobileno}
                  maxLength={10}
                  onChange={changeLogin}
                  className='ps-2 fw-bold col-lg-7 col-md-7 col-10'
                  style={{width: '55%', height: '8vh', borderRadius: '.3em', border: '1px solid black'}}
                  onKeyPress={(e) => {
                    const isValidInput = /[0-9]/;
                    if (!isValidInput.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
                  <span>
                <button className='btn btn-success rounded fw-bold shadow  mx-1 ms-2 py-2' onClick={sendOTPLogin} disabled={buttonDisabledLogin}>{buttonDisabledLogin ? (attemptsLogin < 3 ? `Resend OTP in ${timerLogin}s` : 'Try Later') : buttonTextLogin}</button></span>
                  <br/>
                  <h3 className='text-danger'>{showLogMobOtp}</h3>
                  <small>
                  {validationErrorsLogin.mobileno && <span className="text-danger">{validationErrorsLogin.mobileno}</span>}</small>
                  {dataLogin === "Mobile number is not exists" && <h4 className='text-danger mt-2 ms-lg-3'>{dataLogin}</h4>}
                  <h6 className='text-danger mt-1'>{newErr}</h6>
                {showOTPInputLogin && (
                  <div>
                     <div className='ms-2 mt-2 row d-flex justify-content-center'>
                      <small className='text-success col-12'>OTP sent to your mobile No.</small>
                      <form className='w-75 d-flex flex-nowrap pt-3 col-12'>
                      {[...Array(4)].map((_, index) => (
                        <input
                          key={index} 
                          type="text" 
                          autoFocus = {index === 0}
                          ref={(input) => otpInputsLogin.current[index] = input}
                          onChange={(e) => 
                            {handleOtpInputChangeLogin(index, e.target.value);
                            handleOtpChangeLogin(index, e.target.value);}}
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
                       <button className='btn btn-info text-nowrap fw-bold shadow ms-1' onClick={handleVerifyMobileNoOtpLogin}>Login</button><br/>
                      </form>
                      {verifyotpLogin ===  "Invalid OTP...!" && <h4 className='text-danger ms-2 mt-2'>{verifyotpLogin}<i className="fa-solid fa-xmark ms-2"></i></h4>}
                     </div>
                  </div>
                    )}
                 {verifyotpLogin ===  "Verified Successfully" && <h4 className='text-success mt-lg-3 ms-2'>{verifyotpLogin}<CheckCircleOutlineIcon/></h4>}
              </div>
             
            </form>
            <button className='btn btn-outline-primary my-4' onClick={clickCloseLogin} >Close
            </button>
            <div className='d-flex justify-content-center me-4'>
              <span className='mt-2'>Don't you have account? </span><button className='btn btn-link'onClick={HandleSignUpModal}>Please SignUp</button> 
            </div>
          </Modal.Body>   
        </Modal>
    </div>
        <div>
        <Modal show={showMail1} onHide={clickCloseMail} className='text-center mt-5' >
          <Modal.Header closeButton>
          <img src={p3}alt='logo' className='rounded'style={{height:'40px'}}/>
          </Modal.Header>
          <Modal.Body className='mt-2'>
            <div className='row d-flex justify-content-center align-items-center'>
              <div className="col-lg-7">
                <input
                  placeholder="Please Enter Your Email Address"
                  name='email1'
                  required
                  value={feilds.email1}
                  maxLength={50}
                  onChange={change}
                  className='ps-2 fw-bold'
                  style={{width: '100%', height: '7vh', borderRadius: '.3em', border: '1px solid black'}}
                />
                {/* <FormHelperText style={{color:'red'}}>{validationErrors.email1}</FormHelperText> */}
                </div>
              <div className='col-3 p-2'>
                <button className='btn btn-success text-nowrap' onClick={HandleSendMail}>Send Mail<i className="fa-solid fa-envelope ms-2"></i></button>
              </div>
                    <small className=''>
                      {validationErrors.email1 && <span className="text-danger sdErrmsg">{validationErrors.email1}</span>}
                    </small>
            </div>
            <div>
              {mailnotify ==="issue with quote email sending proccess"&& <h6 className='mt-2 ms-2 text-success'>e-mail sent successfully</h6>}
              </div>                  
              <button className='btn btn-outline-primary my-4' onClick={clickCloseMail} >Close
              </button>
          </Modal.Body>
               
        </Modal>
    </div>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton  >
            <Modal.Title ><h3 className='text-center fw-bold text-secondary'>SignUp with <img src={RamanaLogo} alt='logo' className='rounded' style={{ width: '60px', height: '40px' }}></img></h3></Modal.Title>
          </Modal.Header>
          <Modal.Body className='mx-3'>
            <form onSubmit={handleClick}>
              <div className='row'>
                <div className='col-12'>
                  {/* <TextField
                    className='mt-2 w-100'
                    id="standard-basic"
                    // variant="outlined"
                    // label="Full Name"
                    placeholder=" Full Name"
                    name='name'
                    required
                    value={feilds.name}
                    onChange={change}
                    inputProps={{ maxLength: 30 }}
                    error={!!validationErrors.name}
                    helperText={validationErrors.name}
                  /> */}
                  <input
                   placeholder=" Full Name As Per Pan Card"
                   name='name'
                   required
                   value={feilds.name}
                   onChange={change}
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
                   onChange={change}
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
                <h3 className='text-danger'>{emailotp}</h3>

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
                   onChange={change}
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
                  <button className='btn btn-success px-3 py-2 rounded mt-2 fw-bold shadow' disabled={mobileverified === "verified 🗸" || otpSent} onClick={sendOTP}>{mobileverified}</button>
                </div>
                <h3 className='text-danger'>{showSignMobOtp}</h3>
                {data === "Mobile number exists" && <h5 className='text-danger'>{data}</h5>}
                {showOTPInput && (
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
                            ref={(input) => otpInputs.current[index] = input}
                            onChange={(e) => {
                              handleOtpInputChange(index, e.target.value);
                              handleMobileOtpChange(index, e.target.value);
                            }}
                            onKeyUp={(e) => {
                              if (index < 3 && e.key !== 'Backspace' && e.target.value.length === 1) {
                                otpInputs.current[index + 1].focus(); // Move forward
                              } else if (index > 0 && e.key === 'Backspace' && e.target.value.length === 0) {
                                otpInputs.current[index - 1].focus(); // Move backward
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
                        <button className='btn btn-info text-nowrap fw-bold shadow ms-3' onClick={handleverifyMobileOtp}>Verify OTP</button>
                      </form>
                      {verifymobilmsg === "Invalid OTP...!" && <h5 className='mt-2 ms-2 text-danger'>{verifymobilmsg}</h5>}
                      {otpSent && (
                        <>
                          <button
                            className='btn btn-link'
                            onClick={resendOTPMobile}
                            disabled={!resendActive || resendCount >= 2}
                          >
                            {resendCount >= 2 ? 'Try later' : (resendActive ? 'Resend OTP' : `Resend OTP in ${timer} sec`)}
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
                <div className='d-flex justify-content-center me-4'>
                    <span className='mt-2'>Already have account! </span><button className='btn btn-link'onClick={HandleLoginModal}>Please Login</button> 
                  </div>

            </form>

            <div>
            </div>
          </Modal.Body>
        </Modal>

      </div>

      <div>
        <Modal show={showstate} onHide={clickClose} className='text-center' >

          <Modal.Body>
            <h4 className='mt-5'>Please Select Any one Of The Year Premium</h4>
            <button className='btn btn-outline-primary my-5' onClick={clickClose} >Close</button>
          </Modal.Body>
        </Modal>
      </div>
      <div>
        <Modal show={urlCopy} className='text-center' >

          <Modal.Body>
            <h4 className='mt-5'>Please Enter the Property Details</h4>
            <button className='btn btn-outline-primary my-5 px-4' onClick={urlOk} >OK</button>
          </Modal.Body>

        </Modal>
      </div>

    </div>
  );
}

export default GetQuote;