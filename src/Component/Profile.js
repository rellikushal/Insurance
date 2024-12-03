import React, { useState, useEffect, useContext } from 'react';
// import './Profile.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PropertyInsuranceService from './Service/PropertyInsuranceService';
import { integerRege6, regexEmail, regexFullName, regexHouseNo,  regexMobileNo, regexStreet,  regexUsername } from './RegularExpressions';
import { FormLabel, TextField } from '@mui/material';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import PreventBacKNavigation from './PreventBackNavigation';
import p3 from '../Component/images/p3.jpeg';
import '../App.css';
import PhoneIcon from '@mui/icons-material/Phone';
import Button from '@mui/material/Button';
import { ClickAwayListener, Tooltip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { RsContextCreater } from './UseContext/ContextMain';


function Profile() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
      const {detailsCon} = useContext(RsContextCreater)

      const {setDetailsCon} = useContext(RsContextCreater)

      const [open, setOpen] = React.useState(false);
      const handleTooltipClose = () => {
        setOpen(false);
      };
    
      const handleTooltipOpen = () => {
        setOpen(true);
      };

    //   useEffect(() => {
    //     // e.preventDefault();
    //     window.scrollTo(0, 0);
    //     // Prevent going back
    //     const preventNavigation = () => {
    //       window.history.pushState(null, null, "/Profile");
    //     };
    //     window.history.pushState(null, null, "/Profile");
    //     window.addEventListener("popstate", preventNavigation);
    //     return () => {
    //       window.removeEventListener("popstate", preventNavigation);
    //     };
    //   }, []);

    const location = useLocation();
    const { state } = location;
    const [mobileno] = useState(state?.values);
    const mobileFromCon = detailsCon.loginMobNoCon;
    // const mobileno = 8074266396;

    const storedMobileNumber = sessionStorage.getItem('mobileNumber');
    sessionStorage.setItem('mobileNumber', mobileno || mobileFromCon);

    const [signUpDetails, setSignUpDetails] = useState([]);
    const [StrucutureDetails, setStructureDetails] = useState([]);
    const [fillDetails, setFilldetails] = useState([]);
    const [paymentDetails, setPaymentDetails] = useState([]);

    const [showContactForm, setShowContactForm] = useState(false);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [verified, setVerified] = useState(false);
    const [notVerified, setNotVerified] = useState('');

    const [contact, setContact] = useState({
        id: '',
        name: '',
        mobileno: mobileno || mobileFromCon,
        email: '',
    });

    const [address, setAddress] = useState({
        pincode:"",
        houseno:"",
        city:"",
        state:"",
        streetno:""
    });

    const [validationErrors, setValidationErrors] = useState({
        name: '',
        mobileno: '',
        email: '',
        pincode: '',
        city:"",
        state:"",
        houseno: '',
        streetno: '',
    });

    const [emailotp,setEmailotp]=useState("");

    const [isEditingMobile, setIsEditingMobile] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [otpSent, setOtpSent] = useState(false); // State to track whether OTP has been sent
    const [otpSent1, setOtpSent1] = useState(false);
    const[enteredOtp,SetEnterOtp]=useState("");
    const [otp, setOtp] = useState('');

    const [data, setData] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in contact) {
            setContact({
                ...contact,
                [name]: value
            });
        } else if (name in address) {
            setAddress({
                ...address,
                [name]: value
            });
        }

        // Validation
        switch (name) {
            case 'name':
                setValidationErrors({ ...validationErrors, [name]: regexUsername.test(value) ? '' : 'Username must be 3 or more characters' });
                break;
            case 'mobileno':
                setValidationErrors({ ...validationErrors, [name]: regexMobileNo.test(value) ? '' : 'Please Enter a Valid MobileNo' });
                break;
            case 'email':
                setValidationErrors({ ...validationErrors, [name]: regexEmail.test(value) ? '' : 'Please enter a valid email address' });
                break;
            case 'pincode':
                setValidationErrors({ ...validationErrors, [name]: integerRege6.test(value) ? '' : 'Enter Valid Pincode' });
                break;
            case 'houseno':
                setValidationErrors({ ...validationErrors, [name]: regexHouseNo.test(value) ? '' : 'Enter Valid House number' });
                break;
            case 'streetno':
                setValidationErrors({ ...validationErrors, [name]: regexStreet.test(value) ? '' : 'Enter valid streetno name' });
                break;
            case 'city':
                setValidationErrors({ ...validationErrors, [name]: regexFullName.test(value) ? '' : 'Enter valid city name' });
                break;
            case 'state':
                setValidationErrors({ ...validationErrors, [name]: regexFullName.test(value) ? '' : 'Enter valid state name' });
                break;
            default:
                break;
        }
    };
    
    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const res = await PropertyInsuranceService.getCustomerIdByMobileNo(storedMobileNumber);
                setSignUpDetails(res.data);
                const customerId = res.data[0]?.customerId;
                if (customerId) {
                    try {
                        const structureRes = await PropertyInsuranceService.getStructureDetailsByCustomerId(customerId);
                        setStructureDetails(structureRes.data);
                    } catch (error) {
                        console.error('Error fetching structure details:', error);
                    }
                    try {
                        const fillRes = await PropertyInsuranceService.getFillDetailsByCustomerId(customerId);
                        setFilldetails(fillRes.data);
                    } catch (error) {
                        console.error('Error fetching fill details:', error);
                    }
                    try {
                        const paymentRes = await PropertyInsuranceService.getPaymentDetailsByCustomerId(customerId);
                        setPaymentDetails(paymentRes.data);
                    } catch (error) {
                        console.error('Error fetching payment details:', error);
                    }
                }
            } catch (error) {
                console.error('Error fetching customer ID:', error);
            }
        };

        fetchCustomerData();
    }, [storedMobileNumber]);

    // useEffect(() => {     
        
    //     PropertyInsuranceService.getCustomerIdByMobileNo(storedMobileNumber)
    //         .then((res) => {
    //             setSignUpDetails(res.data);
    //             const customerId = res.data[0]?.customerId;
    //             if (customerId) {
    //                 PropertyInsuranceService.getStructureDetailsByCustomerId(customerId)
    //                     .then((res) => {
    //                         setStructureDetails(res.data);
    //                     });
    //                 PropertyInsuranceService.getFillDetailsByCustomerId(customerId)
    //                     .then((res) => {
    //                         setFilldetails(res.data);
    //                     });
    //                 PropertyInsuranceService.getPaymentDetailsByCustomerId(customerId)
    //                     .then((res) => {
    //                         setPaymentDetails(res.data);
    //                     })
    //                     .catch((error) => {
    //                         console.error();
    //                     });
    //             }
    //         });
    //     }, []); 

    const handleShowForm = (e) => {
        e.preventDefault();
        setShowContactForm(true);
        setShowAddressForm(true);
    };

    useEffect(() => {
        try {
            setContact({
            ...contact,
            email: signUpDetails[0]?.email,
            mobileno: signUpDetails[0]?.mobileno,
            name: signUpDetails[0]?.name,
        });
        setAddress({
            ...address,
            pincode:fillDetails[0]?.pincode,
            houseno:fillDetails[0]?.houseno,
            streetno: fillDetails[0]?.streetno,
            city:fillDetails[0]?.city,
            state:fillDetails[0]?.state
        });
        } catch (error) {
            console.log('error occured',error);
        }
        
    }, [signUpDetails,fillDetails]);

    const handleEditAddress = (e) => {
        e.preventDefault();
        setIsEditingAddress(true);
    };

    const handleEditMobile = (e) => {
        e.preventDefault();
        setIsEditingMobile(true);
    };

    const handleEditEmail = (e) => {
        e.preventDefault();
        setIsEditingEmail(true);
    };

    const [dataForMobile,setDataForMobile]=useState({
        customerId :"",
        mobileNo:"",
    });

    const [dataForEmail,setDataForEmail]=useState({
        customerId :"",
        email:"",
    });

    const handleSaveMobile = () => {
        // e.preventDefault();
        if (regexMobileNo.test(contact.mobileno)) {
            var id=signUpDetails[0].id;
        var mobno=contact.mobileno;
console.log(id,mobno)
if (id && mobno) {
    const data = {
        mobileNo: mobno,
        customerId: signUpDetails[0]?.customerId,
    };
    console.log(data);

    PropertyInsuranceService.checkForEMobile(data.customerId)
    .then((res)=>{
        console.log(res.data);
        if(res.data == "Details are not existed")
        {
             PropertyInsuranceService.updateCustomerByMobileNo(data)
        .then((res) => {
            console.log("details:", res.data);
            const updateResponse = res.data;
            console.log(updateResponse);
            contact.mobileno = signUpDetails[0]?.mobileno;
            setIsEditingMobile(false);
        })
        .catch((error) => {
            console.error(error);
        });
        }
    });

    // PropertyInsuranceService.updateCustomerByMobileNo(data)
    //     .then((res) => {
    //         console.log("details:", res.data);
    //         const updateResponse = res.data;
    //         console.log(updateResponse);
    //         contact.mobileno = signUpDetails[0]?.mobileno;
    //         setIsEditingMobile(false);
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });
} else {
    console.error("ID or mobile number is missing");
}
        }
    };

    const handleSaveEmail = () => {
        // e.preventDefault();
        const email=contact.email
        if (regexEmail.test(email)) {
            var id = signUpDetails[0]?.id;
            var emailId=contact.email;
            const data = {
                email: emailId,
                customerId: signUpDetails[0]?.customerId,
            };
            console.log(data,contact);

            PropertyInsuranceService.checkForEmail(data.customerId)
            .then((res)=>{
                console.log(res.data);
                if(res.data == "Details are not existed")
                {
                        PropertyInsuranceService.updateCustomerByEmailId(data)
            .then((res) => {
                console.log("details :"+ res.data);
                const updateResponse = res.data;
                console.log(updateResponse);
                setIsEditingEmail(false);
            }).catch((error) => {
                console.error(error);
            });
                }
            })
        
            
        }
    };

    const handleSaveAddress = (e) => {
        e.preventDefault();
console.log(address);
        if(regexHouseNo.test(address.houseno) && regexStreet.test(address.streetno) && regexFullName.test(address.city)&& regexFullName.test(address.state) && integerRege6.test (address.pincode)) {
            console.log(fillDetails);
            for (let i = 0; i < fillDetails.length; i++) {
                const id = fillDetails[i]?.id;
                console.log(id);
                PropertyInsuranceService.updateFillDetailById(id,address).then((res) => {
                    console.log("details :"+ res.data);
                    const updateResponse = res.data;
                    console.log(updateResponse);
                    setIsEditingAddress(false);
                });
            }
            setIsEditingAddress(false);
        }
        
    };

    const[showMobileOtp,setShowMobileOtp] = useState();

    const handleSendOTP = () => {

       console.log(contact.mobileno); 
       if(regexMobileNo.test(contact.mobileno))
        {
        PropertyInsuranceService.checkMobileNumber(contact.mobileno).then((res)=>
    {

        console.log(res.data);
        setData(res.data);
        if (res.data === "Mobile number is not exists")
    {
        setOtpSent(true);
        PropertyInsuranceService.getOtp1().then((res) => 
        {
          console.log(res.data);
          setShowMobileOtp(res.data)
          const otp=res.data;
          SetEnterOtp(res.data);
          PropertyInsuranceService.getOtp(contact.mobileno,otp).then(() => {
          
          }).catch(error => {
            console.error(error);
          });
        })
    }
    }).catch(error => {
        console.error(error);
      });
    }
    else {setData("")}
    };

    const [showMailOtp,setShowMailOtp] = useState();
    const handleSendOTP1 = () => {

        if(regexMobileNo.test(contact.mobileno))
        {

        PropertyInsuranceService.checkEmail(contact.email).then((res)=>
    {
        console.log(res.data);
        setData(res.data);
        if (res.data === "Email is not exists")
  {

        setOtpSent1(true);
        // console.log(otp,enteredOtp);
        PropertyInsuranceService.sendEmailotp(contact.email).then((res) => {
            console.log(res.data);
            setShowMailOtp(res.data)
            const otp=res.data;
            SetEnterOtp(res.data);
            
        }).catch(error => {
          console.error(error);
        });
  }

    }).catch(error => {
        console.error(error);
      });
    }
    };

    const handleVerifyOTP = () => {
console.log(signUpDetails,contact.mobileno)
        if (otp == enteredOtp.toString()) {
            setNotVerified("Mobile Number Verified Successfully!");
            //navigate("/login",{state:{values:mobileNumber}})
           signUpDetails[0].mobileno=contact.mobileno;
        //    var id=signUpDetails[0].id;
        // var mobn=contact.mobileno;
            handleSaveMobile();
            // console.log(mobn,id)
            setVerified(true);
            setOtpSent(false);
        setIsEditingMobile(false);
        setIsEditingEmail(false);
        setOtp("");
          } else {
            setNotVerified("Enter Valid otp!");
            setVerified(false);
            setOtp("");
          }

    };
    const handleVerifyOTP1 = () => {
       
            if (otp == enteredOtp.toString()) {
                 setNotVerified(" Verified Successfully!");
                 //navigate("/login",{state:{values:mobileNumber}})
                 signUpDetails[0].email=contact.email;
                 handleSaveEmail();
                 setVerified(true);
                 setOtpSent1(false);
             setIsEditingMobile(false);
             setIsEditingEmail(false);
             setOtp("");
               } else {
                 setNotVerified("Enter Valid otp!");
                 setVerified(false);
                 setOtp("");
                
               }
    };

    const renderOTPFieldOrButton = () => {
        if (otpSent) {
            return (
                <div>
        <h3 className='text-danger'>{showMobileOtp}</h3>

                    {/* <label>Enter OTP:</label> */}
                    <TextField
                        id="outlined-basic"
                        placeholder='Enter OTP'
                        label="OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
              {/* <input 
                type="text" 
                placeholder="Enter OTP" 
                value={otp} 
                onChange={} 
              /> */}
                    <button onClick={handleVerifyOTP} className='btn btn-success mt-2'>Verify</button>
                    {/* <p>{notVerified}</p> */}
                </div>
            );
        }
    };

    const renderOTPFieldOrButton1 = () => {
        if (otpSent1) {
            return (
                <div>
                    <h3 className='text-danger'>{showMailOtp}</h3>

                    {/* <label>Enter OTP:</label> */}
                    <TextField
                        id="outlined-basic"
                        placeholder='Enter OTP'
                        label="OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
              {/* <input 
                type="text" 
                placeholder="Enter OTP" 
                value={otp} 
                onChange={(e) => setOtp(e.target.value)} 
              /> */}
                    <button onClick={handleVerifyOTP1} className='btn btn-success'>Verify</button>
                    {/* <p>{notVerified}</p> */}
                </div>
            );
        }
    };

    // const handleCancel=()=>
    // {
    //     setOtpSent1(false);
    //     setOtpSent(false);
    //     setIsEditingMobile(false);
    //     setIsEditingEmail(false);
    //     contact.mobileno=signUpDetails[0].mobileno;
    //     contact.email=signUpDetails[0].email;
    //     setValidationErrors("");
    //     setData("");
    //     setNotVerified("");
    // }

    const handleCancel=()=>
        {
            setOtpSent1(false);
            setOtpSent(false);
            setIsEditingMobile(false);
            // setIsEditingEmail(false);
            contact.mobileno=signUpDetails[0].mobileno;
            contact.email=signUpDetails[0].email;
            setValidationErrors("");
            setData("");
            setNotVerified("");
        }
        const handleCancel1=()=>
        {
            setOtpSent1(false);
            setOtpSent(false);
            // setIsEditingMobile(false);
            setIsEditingEmail(false);
            contact.mobileno=signUpDetails[0].mobileno;
            contact.email=signUpDetails[0].email;
            setValidationErrors("");
            setData("");
            setNotVerified("");
        }
        const handleCancel2=()=>
        {
            // setOtpSent1(false);
            // setOtpSent(false);
            // setIsEditingMobile(false);
            // setIsEditingEmail(false);
            setIsEditingAddress(false);
            address.houseno = fillDetails[0].houseno;
            address.streetno = fillDetails[0].streetno;
            address.city = fillDetails[0].city;
            address.state = fillDetails[0].state;
            address.pincode = fillDetails[0].pincode;
            // contact.mobileno=signUpDetails[0].mobileno;
            // contact.email=signUpDetails[0].email;
            setValidationErrors("");
            // setData("");
            setNotVerified("");
        }

        let navigate = useNavigate();

        const HandleNewPolicy=()=>{
            var i = 1;
            var emailId = signUpDetails[0].email;
            navigate('/property',{state:{i,mobileno,emailId}})
            setDetailsCon((prev) => ({
                ...prev,
                mobileno
              }));
        }

    console.log(address)
    console.log(signUpDetails,StrucutureDetails,fillDetails,paymentDetails)

    const BlockReload = () => {
        useEffect(() => {
          const handleKeyDown = (event) => {
            if (event.key === 'F5' || (event.ctrlKey && event.key.toLowerCase() === 'r')) {
              event.preventDefault();
            }
          };
      
          const handleContextMenu = (event) => {
            event.preventDefault();
          };
      
          const handleBeforeUnload = (event) => {
            const confirmationMessage = 'Are you sure you want to leave this page?';
            event.returnValue = confirmationMessage;
            return confirmationMessage;
          };
      
          window.addEventListener('keydown', handleKeyDown);
          window.addEventListener('contextmenu', handleContextMenu);
          window.addEventListener('beforeunload', handleBeforeUnload);
      
          // Cleanup event listeners on component unmount
          return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('contextmenu', handleContextMenu);
            window.removeEventListener('beforeunload', handleBeforeUnload);
          };
        }, []);};
        BlockReload();
    // const interartingCustomerDetails = () => {
    //     return (
    //         <div>
    //         {fillDetails.length === 0 ? (
    //             <>
    //             <h3 className="text-center fw-bold text-secondary mt-4"><button onClick={HandleNewPolicy} className='btn btn-link fw-bold fs-4'>Buy any policy</button></h3>
    //             </>
    //         ) : (
    //             fillDetails.map((_, index) => (
    //                 <div key={index}>
    //                     <div className="card shadow mt-3 fillOutPage">
    //                         <div className="card-header pcdetails d-flex justify-content-between flex-wrap">
    //                             <h4 className="text-start fw-bold text-secondary">
    //                                 Property Insurance : {index + 1}
    //                             </h4>
    //                             <h5 className="text-end mt-2 mt-md-0">
    //                                 {/* <span className="fw-bold text-secondary"> Policy ID :</span> */}
    //                                 <span className="fw-bold text-secondary">Customer ID :</span>
    //                                 {paymentDetails[index]?.customerId}
    //                             </h5>
    //                         </div>
    //                         <div className="card-body">
    //                             <div className="row pcdetails">
    //                                 <div className="col-md-6" style={{borderRight:'solid 2px #dcdcdc'}}>
    //                                     <p className="card-text fw-bold">
    //                                         Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: 
    //                                         <span className="fw-bold text-secondary">
    //                                         &nbsp; {fillDetails[index]?.fullname}
    //                                         </span>
    //                                     </p>
    //                                     {/* 
    //                                     <p className="card-text fw-bold">
    //                                         Email &nbsp;&nbsp;&nbsp;: <span className="fw-bold text-secondary">
    //                                             {signUpDetails[0]?.email}
    //                                         </span>
    //                                     </p>
    //                                     <p className="card-text fw-bold">
    //                                         Mobile&nbsp; :<span className="fw-bold text-secondary"> {mobileno}</span>
    //                                     </p> 
    //                                     */}
    //                                     <p className="card-text fw-bold">
    //                                         Property Value &nbsp;&nbsp;&nbsp; : 
    //                                         <span className="fw-bold text-secondary">
    //                                         &nbsp;{StrucutureDetails[index]?.marketValue}
    //                                         </span>
    //                                     </p>
    //                                     <p className="card-text fw-bold">
    //                                         Square Feet &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: 
    //                                         <span className="fw-bold text-secondary">
    //                                         &nbsp;{StrucutureDetails[index]?.squareFeet}
    //                                         </span>
    //                                     </p>
    //                                     <div className='d-flex'>
    //                                     <p className="card-text fw-bold col-4">
    //                                 Address &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;: </p>
    //                                 <span className="fw-bold text-secondary col-8">
    //                                 &nbsp;{fillDetails[index]?.propertyhouseNo} ,&nbsp;
    //                                     {fillDetails[index]?.propertystreetNo} ,&nbsp;
    //                                     {fillDetails[index]?.propertycity} , &nbsp;
    //                                     {fillDetails[index]?.propertystate} ,&nbsp;
    //                                     {fillDetails[index]?.propertypincode}
                                    
    //                                 </span>
    //                                 </div>
    //                                 </div>
    //                                 <div className="col-md-6 mt-3 mt-md-0">
    //                                     {/* 
    //                                     <p className="card-text fw-bold">
    //                                         Age of the building : <span className="fw-bold text-secondary">
    //                                             {StrucutureDetails[index]?.buildingAge}
    //                                         </span>
    //                                     </p> 
    //                                     */}
    //                                     <p className="card-text fw-bold">
    //                                         Premium Amount &nbsp; &nbsp;&nbsp;: 
    //                                         <span className="fw-bold text-secondary">
    //                                         &nbsp;₹ {paymentDetails[index]?.premium} /-
    //                                         </span>
    //                                     </p>
    //                                     {/* 
    //                                     <p className="card-text fw-bold">
    //                                         Property Value &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : 
    //                                         <span className="fw-bold text-secondary"> 
    //                                             {StrucutureDetails[index]?.marketValue}
    //                                         </span>
    //                                     </p> 
    //                                     */}
    //                                     <p className="card-text fw-bold">
    //                                         No. of Years &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : 
    //                                         <span className="fw-bold text-secondary">
    //                                         &nbsp;{paymentDetails[index]?.year}&nbsp;Years
    //                                         </span>
    //                                     </p>
    //                                     <p className="card-text fw-bold">
    //                                         Age of the building &nbsp; : 
    //                                         <span className="fw-bold text-secondary">
    //                                         &nbsp;{StrucutureDetails[index]?.buildingAge}
    //                                         </span>
    //                                     </p>
    //                                 </div>
    //                                 <div className='d-flex justify-content-end'>
    //                                 <a className='btn btn-success' href={`http://192.168.1.3:9092/api/v1/create/${paymentDetails[index]?.paymentId}`} download='invoice' target='_blank'><i className="fa-solid fa-download me-2"></i>Invoice
    //                                 </a>
    //                             </div>
    //                             </div>
                                
    //                         </div>
    //                     </div>
    //                 </div>
    //             ))
    //         )}
            
    //     </div>
    //     );
    // };

    const HandleClaim=()=>{
        navigate('/claims')
    }

    const interartingCustomerDetails = () => {
        const verifiedDetails = [];
    
        for (let i = 0; i < paymentDetails.length; i++) {
            const paymentId = paymentDetails[i]?.paymentId;
    
            for (let j = 0; j < StrucutureDetails.length; j++) {
                if (StrucutureDetails[j]?.paymentId === paymentId) {
                    for (let k = 0; k < fillDetails.length; k++) {
                        if (fillDetails[k]?.paymentId === paymentId) {
                            verifiedDetails.push({
                                fillDetail: fillDetails[k],
                                paymentDetail: paymentDetails[i],
                                structureDetail: StrucutureDetails[j]
                            });
                        }
                    }
                }
            }
        }
    
        return (
            <div>
                {verifiedDetails.length === 0 ? (
                    <h3 className="text-center mt-4">
                        <button className='mx-5 fs-4 btn btn-link' onClick={HandleNewPolicy}>Get any policy</button>
                    </h3>
                ) : (
                    verifiedDetails.map((detail, index) => (
                        <div key={index}>
                            <div className="card shadow mt-3 fillOutPage">
                                <div className="card-header pcdetails d-flex justify-content-between flex-wrap">
                                    <h4 className="text-start fw-bold text-secondary">
                                        RamanaSecure Living Insurance : {index + 1}
                                    </h4>
                                    <h5 className="text-end mt-2 mt-md-0">
                                        <span className="fw-bold text-secondary">ID :</span>
                                        {detail.paymentDetail.customerId}
                                    </h5>
                                </div>
                                <div className="card-body">
                                    <div className="row pcdetails">
                                        <div className="col-md-6" style={{ borderRight: 'solid 2px #dcdcdc' }}>
                                            <p className="card-text fw-bold">
                                                Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                                                <span className="fw-bold text-secondary">
                                                &nbsp;{detail.fillDetail.fullname}
                                                </span>
                                            </p>
                                            <p className="card-text fw-bold">
                                                Property Value &nbsp;&nbsp;&nbsp;:
                                                <span className="fw-bold text-secondary">
                                                    &nbsp;{detail.structureDetail.marketValue}
                                                </span>
                                            </p>
                                            <p className="card-text fw-bold">
                                                Square Feet &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                                                <span className="fw-bold text-secondary">
                                                    &nbsp;{detail.structureDetail.squareFeet}
                                                </span>
                                            </p>
                                            <div className='d-flex'>
                                                <p className="card-text fw-bold col-4">
                                                    Address &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;:
                                                </p>
                                                <span className="fw-bold text-secondary col-8">
                                                    &nbsp;{detail.fillDetail.propertyhouseNo} ,&nbsp;
                                                    {detail.fillDetail.propertystreetNo} ,&nbsp;
                                                    {detail.fillDetail.propertycity} , &nbsp;
                                                    {detail.fillDetail.propertystate} ,&nbsp;
                                                    {detail.fillDetail.propertypincode}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mt-3 mt-md-0">
                                            <p className="card-text fw-bold">
                                                Premium Amount &nbsp; &nbsp;:
                                                <span className="fw-bold text-secondary">
                                                    &nbsp;₹ {detail.paymentDetail.premium} /-
                                                </span>
                                            </p>
                                            <p className="card-text fw-bold">
                                                No. of Years &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                                                <span className="fw-bold text-secondary">
                                                    &nbsp;{detail.paymentDetail.year}&nbsp;Years
                                                </span>
                                            </p>
                                            <p className="card-text fw-bold">
                                                Age of the building &nbsp;:
                                                <span className="fw-bold text-secondary">
                                                    &nbsp;{detail.structureDetail.buildingAge}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-end'>
                                        <button className='btn btn-info mx-5' onClick={HandleClaim}>Claims <i className='fa-solid fa-hand-holding-heart'></i></button>
                                        <a className='btn btn-success' href={`http://122.169.207.194:9092/api/v1/create/${detail.paymentDetail.paymentId}`} download='invoice' target='_blank'>
                                            <i className="fa-solid fa-download me-2"></i>Invoice
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        );
    };

    return (
        <div>
            {/* <PreventBacKNavigation/> */}
        <div className='row container-fluid pay'>
        <div className='mb-5' >
                <header >
                    <div class="d-flex row py-2 rounded fixed justify-content-center align-items-center" style={{background:'#f0f8ff'}} >
				        <div className="col-7" >
                            <img class="mx-3 ramana" src={p3} alt="my pic" title='RamanaSoft Insurance' style={{borderRadius:'10px'}}></img>
				        </div>
                        <div className='col-5 d-flex'>
                        <div>
                        <button className='mx-5 btn btn-link fw-semibold text-decoration-none pnewpolicy' onClick={HandleNewPolicy}>  Get new policy</button>
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
                        <Link to='/'><button className='btn btn-danger float-end ms-4 fw-bold py-1 mt-1'>Log Out <LogoutIcon className='fs-5'/> </button></Link>
                        </div>
                        </div>
			        </div>
                </header>
            </div>
            <div className='col-12 col-lg-3 col-md-4 mt-3 rounded line' style={{borderRight:'3px solid grey'}}>
                <h2 className='text-light fw-bold text-center rounded' style={{background:'#318ce7'}}>Profile <AccountCircleSharpIcon className='fs-1'/></h2>
                <div className='overflow-y-scroll' style={{height:'80vh'}}>
                    <h4 className='text-secondary'>Contact Details</h4>
                    <div className='ms-lg-2'>
                        {/* <span className='fw-semibold'>Name:</span> */}
                        {/* {isEditing ? (
                            <input
                                type="text"
                                name="name"
                                value={fillDetails[0]?.fullname}
                                onChange={handleChange}
                            />
                            ) : ( */}
                            <FormLabel>Name</FormLabel>

                                <TextField
                                    className='col-12 col-lg-11'
                                    id="outlined-disabled-input"
                                    // label="Name "
                                    name='name'
                                    // value={fillDetails[0]?.fullname}
                                    value={contact.name}
                                    // defaultValue={fillDetails[0]?.fullname}
                                    InputProps={{
                                    disabled:true,
                                    className:'fw-bold text-secondary',
                                    }}
                                />
                            {/* // <span className='fw-bold text-dark mx-2'>{contact.name}</span> */}
                        {/* )} */}
                        <br/>
                        <small>
                            {isEditing && validationErrors.name && <span className="ms-5 error text-danger">{validationErrors.name}</span>}
                        </small>
                    </div>
                    <div className='ms-lg-2 mt-2'>
                        <FormLabel>Mobile No</FormLabel>
                        {isEditingMobile ? (
                            <div>
                            <TextField
                                type="text"
                                className='col-12 col-lg-11'
                                name="mobileno"
                                // label="Mobile No"
                                variant="outlined"
                                value={contact.mobileno}
                                onChange={handleChange}
                                onKeyPress={(e) => {
                                // Prevent input if the key pressed is not a number
                                const onlyNumbers = /[0-9]/;
                                if (!onlyNumbers.test(e.key)) {
                                    e.preventDefault();
                                }
                                }}
                                inputProps={{maxLength:10}}
                                
                            />
                              {/* <p>{notVerified}</p> */}
                            </div>
                            ) : (
                                <TextField
                                    className='col-12 col-lg-11'
                                    id="outlined-disabled-input"
                                    // label="Mobile No."
                                    name='mobileno'
                                    onChange={handleChange}
                                    defaultValue={contact.mobileno}
                                    InputProps={{
                                    disabled: true,
                                    className:'fw-bold',
                                    }}
                                />
                            )}
                            <div>{data === "Mobile number exists" && <h5 style={{ color: 'red' }}>{data}</h5>}</div>
                        <small>
                        {isEditingMobile && validationErrors.mobileno && <span className="ms-3 error text-danger">{validationErrors.mobileno}</span>}
                        </small>
                        <p className='mt-2 text-center me-5'>
                            {isEditingMobile ? (
                                <>
                                    <Link onClick={handleSendOTP} className='me-4 text-decoration-none text-success'>Send OTP</Link>
                                    <Link onClick={handleCancel} className='text-decoration-none text-danger'>Cancel</Link>
                                </>

                            ) : (
                                <Link onClick={handleEditMobile} className=" text-decoration-none ">
                                   Update <i className="fas fa-pencil-alt text-primary"></i>
                                </Link>
                            )}
                        </p>
                        <div className="text-center my-2">
                            {renderOTPFieldOrButton()}
                        </div>
                    </div>
                    <div className='ms-lg-2'>
                    <FormLabel>E-Mail</FormLabel>
                        {isEditingEmail ? (
                            <TextField
                                type="text"
                                className='col-12 col-lg-11'
                                name="email"
                                // label="E-Mail"
                                variant="outlined"
                                value={contact.email}
                                onChange={handleChange}
                                inputProps={{maxLength : 100}}
                            />
                            ) : (
                                <TextField
                                    className='col-12 col-lg-11'
                                    id="outlined-disabled-input"
                                    // label="E-Mail"
                                    name='email'
                                    onChange={handleChange}
                                    value={contact.email}
                                    InputProps={{
                                    disabled: true,
                                    className:'fw-bold',
                                    }}
                                />
                        )}
                        <p className='mt-2 text-center me-5'>
                            {isEditingEmail ? (
                                <>
                                    <Link onClick={handleSendOTP1} className='me-4 text-decoration-none text-success'>SendOTP</Link>
                                    <Link onClick={handleCancel1} className='text-decoration-none text-danger'>Cancel</Link>
                                </>
                                ) : (
                                    <Link onClick={handleEditEmail}className=" text-decoration-none">Update <i className="fas fa-pencil-alt text-primary"></i></Link>
                            )}
                        </p>
                        <small>
                        {isEditingEmail && validationErrors.email && <span className="ms-5 error text-danger">{validationErrors.email}</span>}
                        {data === "Email is exists" && <h5 className='text-danger'>{data}</h5>}</small>
                        <div className="text-center my-2">
                            {renderOTPFieldOrButton1()}
                        </div>
                    </div> 
                    {fillDetails.length === 0 ? (
                        ""
                    ) : (
                        <>
                    <h4 className='text-secondary'>Address Details</h4>
                    <div className='ms-lg-2'>
                    <div>
                    <FormLabel className='mt-2'>House No</FormLabel>
                        {isEditingAddress ?
                            (
                                <TextField
                                    type="text"
                                    className='col-12 col-lg-11'
                                    name="houseno"
                                    // label="House No."
                                    variant="outlined"
                                    value={address.houseno}
                                    onChange={handleChange}
                                    inputProps={{maxLength : 20}}
                                />
                            ) : (
                                <TextField
                                    className='col-12 col-lg-11'
                                    id="outlined-disabled-input"
                                    // label="House No."
                                    name='houseno'
                                    onChange={handleChange}
                                    value={address.houseno}
                                    InputProps={{
                                    disabled: true,
                                    className:'fw-bold',
                                    }}
                                />
                        )}<small>
                        {isEditingAddress && validationErrors.houseno && <span className="ms-5 error text-danger">{validationErrors.houseno}</span>}</small>
                    </div>
                    <div>
                    <FormLabel className='mt-2'>Street</FormLabel>
                        {isEditingAddress ?
                            (
                                <TextField
                                    type="text"
                                    className='col-12 col-lg-11'
                                    name="streetno"
                                    // label="Street No."
                                    variant="outlined"
                                    value={address.streetno}
                                    onChange={handleChange}
                                    inputProps={{maxLength : 20}}
                                />
                            ) : (
                                <TextField
                                    className='col-12 col-lg-11'
                                    id="outlined-disabled-input"
                                    // label="Street No."
                                    name='streetno'
                                    onChange={handleChange}
                                    value={address.streetno}
                                    InputProps={{
                                    disabled: true,
                                    className:'fw-bold',
                                    }}
                                />
                        )}<small>
                        {isEditingAddress && validationErrors.streetno && <span className="ms-5 error text-danger">{validationErrors.streetno}</span>}</small>
                    </div>
                    <div>
                    <FormLabel className='mt-2'>City</FormLabel>
                        {isEditingAddress ?
                            (
                                <TextField
                                    type="text"
                                    className='col-12 col-lg-11'
                                    name="city"
                                    // label="City"
                                    variant="outlined"
                                    value={address.city}
                                    required
                                    onChange={handleChange}
                                    // onKeyPress={(e) => {
                                    //     // Prevent input if the key pressed is not a number
                                    //     const onlyNumbers = /[0-9]/;
                                    //     if (!onlyNumbers.test(e.key)) {
                                    //         e.preventDefault();
                                    //     }
                                    //     }}
                                    inputProps={{maxLength : 40}}
                                />
                            ) : (
                                <TextField
                                    className='col-12 col-lg-11'
                                    id="outlined-disabled-input"
                                    // label="City"
                                    name='city'
                                    onChange={handleChange}
                                    value={address.city}
                                
                                    InputProps={{
                                    disabled: true,
                                    className:'fw-bold',
                                    }}
                                />
                        )}<small>
                        {isEditingAddress && validationErrors.city && <span className="ms-5 error text-danger">{validationErrors.city}</span>}</small>
                    </div>
                    <div>
                    <FormLabel className='mt-2'>State</FormLabel>
                        {isEditingAddress ?
                            (
                                <TextField
                                    type="text"
                                    className='col-12 col-lg-11'
                                    name="state"
                                    // label="state"
                                    variant="outlined"
                                    value={address.state}
                                    onChange={handleChange}
                                    required
                                    inputProps={{maxLength : 40}}
                                />
                            ) : (
                                <TextField
                                    className='col-12 col-lg-11'
                                    id="outlined-disabled-input"
                                    // label="state"
                                    name='state'
                                    onChange={handleChange}
                                    value={address.state}
                                    InputProps={{
                                    disabled: true,
                                    className:'fw-bold',
                                    }}
                                />
                        )}<small>
                        {isEditingAddress && validationErrors.state && <span className="ms-5 error text-danger">{validationErrors.state}</span>}</small>
                    </div>
                    <div>
                    <FormLabel className='mt-2'>Pincode</FormLabel>
                        {isEditingAddress ?
                            (
                                <TextField
                                    type="text"
                                    className='col-12 col-lg-11'
                                    name="pincode"
                                    // label="Pincode"
                                    variant="outlined"
                                    value={address.pincode}
                                    onChange={handleChange}
                                    onKeyPress={(e) => {
                                        // Prevent input if the key pressed is not a number
                                        const onlyNumbers = /[0-9]/;
                                        if (!onlyNumbers.test(e.key)) {
                                            e.preventDefault();
                                        }
                                        }}
                                    inputProps={{maxLength : 6}}
                                />
                            ) : (
                                <TextField
                                    className='col-12 col-lg-11'
                                    id="outlined-disabled-input"
                                    // label="Pincode"
                                    name='pincode'
                                    onChange={handleChange}
                                    value={address.pincode}
                                    InputProps={{
                                    disabled: true,
                                    className:'fw-bold',
                                    }}
                                />
                        )}<small>
                        {isEditingAddress && validationErrors.pincode && <span className="ms-5 error text-danger">{validationErrors.pincode}</span>}</small>
                    </div>
                    <div className="text-center my-2">
                            {isEditingAddress ? (
                                <>
                                    <Link onClick={handleSaveAddress} className='text-decoration-none text-success me-4'>Save</Link>
                                    <Link onClick={handleCancel2} className='text-decoration-none text-danger'>Cancel</Link>
                                </>
                            ) : (
                                <Link onClick={handleEditAddress} className='text-decoration-none'>Update<i className="fas fa-pencil-alt text-primary ms-1"></i></Link>
                            )}
                        </div>
                    </div></>) }
                </div>
            </div>
            <div className='col-12 col-lg-9 col-md-8 mt-3'>
                <h2 className='text-light fw-bold text-center rounded' style={{background:'#318ce7'}}>Policy Details</h2>
                <div className='ms-2 overflow-y-scroll pe-lg-2' style={{height:'80vh'}}>
                    {/* <h4 className='text-secondary'>Customer Details</h4> */}
                    {/* new table */}
                    
                    {
                        interartingCustomerDetails ()
                    }
                </div>
            </div>

        </div>
        </div>
    );
}

export default Profile;