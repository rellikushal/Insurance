import React, { useContext, useEffect, useState } from 'react'
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';
import { FormLabel, TextField } from '@mui/material';
import { pincode, regexAgeOfProperty, regexEmail, regexmarketValue, regexMobileNo, regexUsername } from './RegularExpressions';
import PropertyInsuranceService from './Service/PropertyInsuranceService';
import { RsContextCreater } from './UseContext/ContextMain';
import { Modal } from 'react-bootstrap';
import RamanaLogo from './images/p4.jpeg';
import axios from 'axios';
import HealthIn from './images/healthin.png';
import VehicleIn from './images/vehiclein.png';
import propertyIn from './images/homein.png';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

const MyAccount = () => {

    let navigate = useNavigate();

    const {detailsCon} = useContext(RsContextCreater)

    const [dashboard,setDashboard] = useState(true);
    const [claims,setClaims] = useState(false);
    const [profile,setProfile] = useState(false);

    const [dashboardData,setDashboardData] = useState(null);
    const [claimsdData,setClaimsdData] = useState(null);

    const [profilePersonal,setProfilePersonal] = useState(true);
    const [profileFamily,setProfileFamily] = useState(false);
    const [profileAssets,setProfileAssets] = useState(false);
    
    
    const HandleDashboard = () => {
        setDashboard(true);
        setClaims(false);
        setProfile(false)
    }

    const HandleClaims = () => {
        setDashboard(false);
        setClaims(true);
        setProfile(false)
    }
    
    const HandleProfile = () => {
        setDashboard(false);
        setClaims(false);
        setProfile(true)
    }
    
    const HandleNewPolicyDashBoard = () =>{
        navigate('/login1');
    }
    
    const HandleProfilePersonal = () =>{
        setProfilePersonal(true);
        setProfileFamily(false);
        setProfileAssets(false);
    }
    
    const HandleProfileFamily = () =>{
        setProfilePersonal(false);
        setProfileFamily(true);
        setProfileAssets(false);
    }
    
    const HandleProfileAssets = () =>{
        setProfilePersonal(false);
        setProfileFamily(false);
        setProfileAssets(true);
    }
    
    // from here profile personal details
    
    const [fillDetails, setFilldetails] = useState([]);
    const [isEditingMobile, setIsEditingMobile] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [enteredOtp,SetEnterOtp]=useState("");
    const [data, setData] = useState("");
    const [otpSent1, setOtpSent1] = useState(false);
    const [signUpDetails, setSignUpDetails] = useState([]);
    const [notVerified, setNotVerified] = useState('');
    const [otp, setOtp] = useState('');
    const [verified, setVerified] = useState(false);

    const [validationErrors, setValidationErrors] = useState({
        name: '',
        mobileno: '',
        email: ''
    });

    const [contact, setContact] = useState({
        id: '',
        name: '',
        mobileno: '',
        email: '',
    });

    const storedMobileNumber = detailsCon.loginMobNoCon;
    const [customerId,setCustomerId] = useState();
    // console.log(customerId);
    
    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const res = await PropertyInsuranceService.getCustomerIdByMobileNo(storedMobileNumber);
                setSignUpDetails(res.data);
                const customerId = res.data[0]?.customerId;
                setCustomerId(customerId)
                if (customerId) {
                    try {
                        const fillRes = await PropertyInsuranceService.getFillDetailsByCustomerId(customerId);
                        setFilldetails(fillRes.data);
                        const paymentRes = await PropertyInsuranceService.getPaymentDetailsByCustomerId(customerId);
                        setDashboardData(paymentRes.data);
                    } catch (error) {
                        console.error('Error fetching fill details:', error);
                    }
                }
            } catch (error) {
                console.error('Error fetching customer ID:', error);
            }
        };

        fetchCustomerData();
    }, [storedMobileNumber]);

    const HandlePropertyMA = () =>{
        navigate('/profile')
    }

    useEffect(() => {
        try {
             setContact({
            ...contact,
            email: signUpDetails[0]?.email,
            mobileno: signUpDetails[0]?.mobileno,
            name: fillDetails[0]?.fullname,
        });
        
        } catch (error) {
        console.log("error occured",error);
        }
       
    }, [signUpDetails,fillDetails]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in contact) {
            setContact({
                ...contact,
                [name]: value
            });
        }

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
            default:
                break;
        } 
        }

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

            const handleEditMobile = (e) => {
                e.preventDefault();
                setIsEditingMobile(true);
            };

            const handleEditEmail = (e) => {
                e.preventDefault();
                setIsEditingEmail(true);
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

                    const handleSaveMobile = () => {
                        // e.preventDefault();
                        if (regexMobileNo.test(contact.mobileno)) {
                            var id=signUpDetails[0].id;
                        var mobno=contact.mobileno;
                console.log(id,mobno)
                if (id && mobno) {
                    PropertyInsuranceService.updateCustomerByMobileNo(id, mobno)
                        .then((res) => {
                            console.log("details:", res.data);
                            const updateResponse = res.data;
                            console.log(updateResponse);
                            setIsEditingMobile(false);
                        })
                        .catch((error) => {
                            console.error(error); 
                        });
                } else {
                    console.error("ID or mobile number is missing");
                }
                        }
                    };

            const renderOTPFieldOrButton = () => {
                if (otpSent) {
                    return (
                        <div>
                            {/* <label>Enter OTP:</label> */}
                            <TextField
                                id="outlined-basic"
                                placeholder='Enter OTP'
                                label="OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <button onClick={handleVerifyOTP} className='btn btn-success mt-2'>Verify</button>
                        </div>
                    );
                }
            };

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
            
            const handleSaveEmail = () => {
                // e.preventDefault();
                const email=contact.email
                if (regexEmail.test(email)) {
                    var id = signUpDetails[0]?.id;
                    var emailId=contact.email;
                    PropertyInsuranceService.updateCustomerByEmailId(id,emailId).then((res) => {
                        console.log("details :"+ res.data);
                        const updateResponse = res.data;
                        console.log(updateResponse);
                        setIsEditingEmail(false);
                    }).catch((error) => {
                        console.error();
                    });
                }
            };

            const renderOTPFieldOrButton1 = () => {
                if (otpSent1) {
                    return (
                        <div>
                            {/* <label>Enter OTP:</label> */}
                            <TextField
                                id="outlined-basic"
                                placeholder='Enter OTP'
                                label="OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <button onClick={handleVerifyOTP1} className='btn btn-success'>Verify</button>
                            {/* <p>{notVerified}</p> */}
                        </div>
                    );
                }
            };

    // from here family details
    const [familyMembers, setFamilyMembers] = useState([]);
    const [submitted, setSubmitted] = useState(null);
    const [errors, setErrors] = useState([]);
  
    const handleSelect = (index, value) => {
      const newFamilyMembers = [...familyMembers];
      newFamilyMembers[index].relation = value;
      setFamilyMembers(newFamilyMembers);
    };
  
    const handleNameChange = (index, value) => {
      const newFamilyMembers = [...familyMembers];
      newFamilyMembers[index].name = value;
      if (value.trim().length < 3) {
        setErrors(prevErrors => {
          const newErrors = [...prevErrors];
          newErrors[index] = { ...newErrors[index], name: 'Name must be at least 3 characters long.' };
          return newErrors;
        });
      } else {
        setErrors(prevErrors => {
          const newErrors = [...prevErrors];
          if (newErrors[index]) {
            delete newErrors[index].name;
          }
          return newErrors;
        });
      }
      setFamilyMembers(newFamilyMembers);
    };
  
    const handleDobChange = (index, value) => {
      const newFamilyMembers = [...familyMembers];
      newFamilyMembers[index].dob = value;
      setFamilyMembers(newFamilyMembers);
    };
  
    const handleRemoveMember = (index) => {
      const newFamilyMembers = familyMembers.filter((_, i) => i !== index);
      setFamilyMembers(newFamilyMembers);
    };
  
    const handleAddChild = (index) => {
      const newFamilyMembers = [...familyMembers];
      newFamilyMembers[index].children.push({ name: '', dob: '' });
      setFamilyMembers(newFamilyMembers);
    };
  
    const handleChildNameChange = (index, childIndex, value) => {
      const newFamilyMembers = [...familyMembers];
      newFamilyMembers[index].children[childIndex].name = value;

      if (value.trim().length < 3) {
        setErrors(prevErrors => {
          const newErrors = [...prevErrors];
          newErrors[index] = { ...newErrors[index], name: 'Name must be at least 3 characters long.' };
          return newErrors;
        });
      } else {
        setErrors(prevErrors => {
          const newErrors = [...prevErrors];
          if (newErrors[index]) {
            delete newErrors[index].name;
          }
          return newErrors;
        });
      }
      setFamilyMembers(newFamilyMembers);
    };
  
    const handleChildDobChange = (index, childIndex, value) => {
      const newFamilyMembers = [...familyMembers];
      newFamilyMembers[index].children[childIndex].dob = value;
      setFamilyMembers(newFamilyMembers);
    };

    const familyData ={
        customerId,
        familyMembers
    }
    // console.log(customerId);
    const handleSaveMembers = async (e) => {
        e.preventDefault();
        for (const member of familyMembers) {
            // console.log(member);
           
            const payload = {
                            relation: member.relation,
                            dob: member.dob,
                            name: member.name,
                            customerId: customerId, // Include the customerId for each member
                        };
                        const data = JSON.stringify(payload)
                        if (member.children && member.children.length > 0) {
                            for (const child of member.children) {
                                const payload = {
                                    relation: member.relation,
                                    dob: child.dob,
                                    name: child.name,
                                    customerId: customerId,
                                };
                                const data = JSON.stringify(payload);
                                try {
                                    // console.log(data);
                                    const response = await axios.post('http://122.169.207.194:9092/api/customer/relations', data, {
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                    });
                                    console.log(response);
                                } catch (error) {
                                    console.error('Error posting data:', error);
                                }
                            }
                        }
                        
            try {
                const response = await axios.post('http://122.169.207.194:9092/api/customer/relations', data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response);
            } catch (error) {
                console.error('Error posting data:', error);
            }
        }
        
    };
    

  
    const handleAddMemberWithRelation = (relation) => {
      if (relation && !familyMembers.some(member => member.relation === relation)) {
        const newFamilyMembers = [...familyMembers, { relation, name: '', dob: '', children: [] }];
        setFamilyMembers(newFamilyMembers);
      }
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            // console.log(customerId);
            const response = await PropertyInsuranceService.getFamilyData(customerId);
            setSubmitted(response.data);
          } catch (error) {
            console.error('Error fetching property asset data:', error);
          }
        };
      
        if (customerId) {
          fetchData();
        }
      }, [customerId]);
  

    // from here Assets

    const [assetsPropertyData,setAssetsPropertyData] = useState(null);
    const [assetsVehicleData,setAssetsVehicleData] = useState(null);
    const [showPropertyAsset,setShowPropertyAsset] = useState(false);
    const [showVehicleAsset,setShowVehicleAsset] = useState(false);

    const [propertyfield,setPropertyfield] = useState({
        city : '',
        pincode : '',
        ageOfProperty : '',
        structureValue : '',
        customerId
    })
    propertyfield.customerId = customerId;

    const [vehiclefield,setVehiclefield] = useState({
        registerNo : '',
        make : '',
        model : '',
        variant : '',
        fuel : '',
        regYear : ''
    })

    const handleClose = () => setShowPropertyAsset(false);
    const handleClose1 = () => setShowVehicleAsset(false);

    const HandlePropertyAssetModel = () =>{
        setShowPropertyAsset(true)
    }

    const HandleVehicleAssetModel = () =>{
        setShowVehicleAsset(true)
    }

    const [validationerrproperty,setValidationErrProperty] = useState({
        city:'',
        pincode:'',
        ageofproperty:'',
        structurevalue:''
    })

    const PropertyChange = (e) => {
        const { name, value } = e.target;
        setPropertyfield({ ...propertyfield, [name]: value });
    
        if (name === 'city') {
            if (!regexUsername.test(value)) {
                setValidationErrProperty({ ...validationerrproperty, [name]: 'Invalid city name' });
            } else {
                setValidationErrProperty({ ...validationerrproperty, [name]: '' });
            }
        } else if (name === 'pincode') {
            if (!pincode.test(value)) {
                setValidationErrProperty({ ...validationerrproperty, [name]: 'Invalid pincode' });
            } else {
                setValidationErrProperty({ ...validationerrproperty, [name]: '' });
            }
        } else if (name === 'ageOfProperty') {
            if (!regexAgeOfProperty.test(value)) { // You might need a different regex for ageOfProperty
                setValidationErrProperty({ ...validationerrproperty, [name]: 'Invalid age of property' });
            } else {
                setValidationErrProperty({ ...validationerrproperty, [name]: '' });
            }
        } else if (name === 'structureValue') {
            if (!regexmarketValue.test(value)) {
                setValidationErrProperty({ ...validationerrproperty, [name]: 'Invalid structure value' });
            } else {
                setValidationErrProperty({ ...validationerrproperty, [name]: '' });
            }
        }
    }

    const AssetChange = (e) =>{
        const { name, value } = e.target;
        setVehiclefield({ ...vehiclefield, [name]: value });
    }

    const handleSubmitPropertyAsset = async (e) => {
        e.preventDefault();
        console.log(propertyfield);
        try {
          const response = await axios.post(`http://122.169.207.194:9092/api/properties`, propertyfield);
          console.log('Data saved:', response.data);
          handleClose();
        } catch (error) {
          console.error('Error saving data:', error);
        }
      };

      useEffect(() => {
        const fetchData = async () => {
          try {
            // Fetch the property asset data
            const response = await PropertyInsuranceService.getPropertyAssetData(customerId);
            // console.log(response.data);
            // Set the state with the fetched data
            setAssetsPropertyData(response.data);
          } catch (error) {
            // Handle errors here
            console.error('Error fetching property asset data:', error);
          }
        };
      
        // Only call fetchData if customerId is defined
        if (customerId) {
          fetchData();
        }
      }, [customerId]);
      

    const handleSubmitVehicleAsset = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('YOUR_BACKEND_ENDPOINT', vehiclefield);
          console.log('Data saved:', response.data);
          handleClose1();
        } catch (error) {
          console.error('Error saving data:', error);
        }
      };

  return (
    <div className='container-fluid' style={{background:'#edeafb',height:'100%',minHeight:'100vh'}}>
        <Header/>
        <div className='row mt-3'>
            <h2 className='text-primary text-center mt-5'>My Account <i className="fa-solid fa-user-pen ms-2"></i></h2>
            <div className='col-2 px-4 py-3'>
                <div className='d-flex flex-column'>
                    <button className='btn btn-primary my-1 fw-bold shadow' onClick={HandleDashboard}>Dash Board</button>
                    <button className='btn btn-primary my-1 fw-bold shadow' onClick={HandleClaims}>Claims</button>
                    <button className='btn btn-primary my-1 fw-bold shadow' onClick={HandleProfile}>Profile</button>
                </div>
            </div>
            <div className='col-10'>
                <div className='mt-2 ms-4'>
                    <h4 className='ms-5'>Hello ...., <span className='fw-bold text-primary'></span></h4>
                    {
                        dashboard && 
                        <>
                            {
                                dashboardData === null ? (
                                    <div className='ms-5'>
                                        <h6 className='ms-5'>You don't have any policies yet ? Click here to <button className='btn btn-link fw-bold' onClick={HandleNewPolicyDashBoard}>Get any policy</button></h6>
                                    </div>
                                ) : (
                                    <div className='ms-5'>
                                        <p className='ms-5 fw-semibold'>To view your policies please click on respective field </p>
                                        <div className=' d-flex justify-content-evenly mt-lg-1 py-lg-0 py-2 lbdiv'>
            <div className='lbcard'>
              {/* <Link to='/property'className=' text-decoration-none ' > */}
                <div class="card shadow bg-light" style={{width:'8rem'}}>
                  <div class="card-body">
                  <span className='text-white ms-2 fw-bold bg-success rounded px-2 py-1'>New <NewReleasesIcon/></span>
                  <img src={propertyIn} alt="..." className="img-fluid aspect-ratio-4-3 mx-1" onClick={HandlePropertyMA}/>
                  {/* <a href="#" class="btn btn-primary mx-5 fw-bold text-nowrap shadow mt-2">Property Insurance</a> */}
                  </div>
                </div>
              {/* </Link> */}
              <h6 className='text-center mt-1'>Property Insurance</h6>
            </div>
            <div>
            <div class="card shadow bg-light" style={{width:'8rem'}}>
              <div class="card-body">
              <span className='text-white ms-2 fw-bold bg-success rounded px-2 py-1'>New <NewReleasesIcon/></span>
              <img src={HealthIn} alt="..." className="img-fluid aspect-ratio-4-3 w-100 mx-1 "/>
                {/* <a href="#" class="btn btn-primary mx-5 fw-bold text-nowrap shadow mt-2 disabled">Health Insurance</a> */}
              </div>
            </div>
            <h6 className='text-center mt-1'>Health Insurance</h6>
            </div>
          <div>
            <div class="card shadow bg-light" style={{width:' 8rem'}}>
              <div class="card-body">
              <span className='text-white ms-2 fw-bold bg-success rounded px-2 py-1'>New <NewReleasesIcon/></span>
              <img src={VehicleIn} alt="..." className="img-fluid aspect-ratio-4-3 w-100 mx-1 "/>
                {/* <a href="#" class="btn btn-primary mx-5 fw-bold text-nowrap shadow mt-2 disabled">Vehicle Insurance</a> */}
              </div>
            </div>
            <h6 className='text-center mt-1'>Vehicle Insurance</h6>
          </div>
          </div>
                                        {/* <div className='ms-5 mt-3 d-flex justify-content-evenly'>
                                            <button className='btn btn-primary' onClick={HandlePropertyMA}>Property</button>

                                            <button className='btn btn-primary'>Vehicle</button>

                                            <button className='btn btn-primary'>Health</button>
                                        </div> */}
                                    </div>
                                )
                            }
                        </>
                    }
                </div>
                <div className='mt-2 ms-4'>
                    {
                        claims && 
                        <>
                            {
                                claimsdData === null ? (
                                    <div className='ms-5'>
                                        <h5 className='ms-5 mt-4'>Your not claimed any policy until now !</h5>
                                    </div>
                                ):(
                                    <p>hhhhh</p>
                                )
                            }
                        </>
                    }
                </div>
                <div className='mt-2 ms-4'>
                    {
                        profile && 
                        <>
                            <div className='ms-5'>
                                <h5 className='ms-5 mt-2 text-center'>Manage Your Profile <i className="fa-solid fa-pen ms-2"></i></h5>
                                <div className='mt-4 d-flex justify-content-around rounded shadow' style={{background:'#5a547a'}}>
                                    <div className='p-2'>
                                    {/* <i className="fa-solid fa-arrow-right mt-2"></i> */}
                                        <button className='btn fw-bold text-light shadow' onClick={HandleProfilePersonal}>Personal Details</button>
                                    </div>
                                    <div className='p-2'>
                                        <button className='btn fw-bold text-light shadow' onClick={HandleProfileFamily}>Family Details</button>
                                    </div>
                                    <div className='p-2'>
                                        <button className='btn fw-bold text-light shadow' onClick={HandleProfileAssets}>Assets</button>
                                    </div>
                                </div>
                                <div>
                                    <div className='mt-4' style={{marginLeft:'15rem'}}>
                                        {
                                            profilePersonal &&
                                            <div className='mt-3 mx-5'>
                                                <div className='ms-2 row'>
                                                    <FormLabel className='mt-3 fw-semibold col-2'>Name</FormLabel>
                                                    <TextField
                                                        className='col-4'
                                                        id="outlined-disabled-input"
                                                        name='name'
                                                        value={fillDetails[0]?.fullname}
                                                        defaultValue={fillDetails[0]?.fullname}        
                                                        InputProps={{
                                                            disabled:true,
                                                            className:'fw-bold text-secondary mb-1',
                                                        }}
                                                    />
                                                </div>
                                                <div className='ms-2 my-1 mt-3 row'>
                                                    <FormLabel className='mt-3 fw-semibold col-2'>Mobile No</FormLabel>
                                                    {isEditingMobile ? (
                                                            <TextField
                                                                type="text"
                                                                className='col-4'
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
                                                        ) : (
                                                        <TextField
                                                            className='col-4'
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
                                                    <p className='mt-3 col-6'>
                                                    {isEditingMobile ? (
                                                        <>
                                                            <Link onClick={handleSendOTP} className='me-4 text-decoration-none text-success ms-3'>Send OTP</Link>
                                                            <Link onClick={handleCancel} className='text-decoration-none text-danger'>Cancel</Link>
                                                        </>

                                                    ) : (
                                                        <Link onClick={handleEditMobile} className=" text-decoration-none ms-3">
                                                        Update <i className="fas fa-pencil-alt text-primary"></i>
                                                        </Link>
                                                    )}
                                                    </p>
                                                    <div className="text-center my-2 col-6">
                                                        {renderOTPFieldOrButton()}
                                                    </div>
                                                    <div>{data === "Mobile number exists" && <h5 style={{ color: 'red' }}>{data}</h5>}</div>
                                                    <small>
                                                        {isEditingMobile && validationErrors.mobileno && <span className="ms-3 error text-danger">{validationErrors.mobileno}</span>}
                                                    </small>
                                                </div>
                                                <div className='ms-2 row'>
                                                    <FormLabel className='mt-3 fw-semibold col-2'>E-Mail</FormLabel>
                                                    {isEditingEmail ? (
                                                        <TextField
                                                            type="text"
                                                            className='col-4'
                                                            name="email"
                                                            // label="E-Mail"
                                                            variant="outlined"
                                                            value={contact.email}
                                                            onChange={handleChange}
                                                            inputProps={{maxLength : 100}}
                                                        />
                                                        ) : (
                                                            <TextField
                                                                className='col-4'
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
                                                    <p className='mt-3 col-6'>
                                                        {isEditingEmail ? (
                                                            <>
                                                                <Link 
                                                                onClick={handleSendOTP1}
                                                                className='me-4 text-decoration-none text-success ms-3'>SendOTP</Link>
                                                                <Link 
                                                                onClick={handleCancel1}
                                                                className='text-decoration-none text-danger'
                                                                >Cancel</Link>
                                                            </>
                                                            ) : (
                                                                <Link onClick={handleEditEmail} className="text-decoration-none ms-3">Update <i className="fas fa-pencil-alt text-primary"></i></Link>
                                                        )}
                                                    </p>
                                                    <small>
                                                    {isEditingEmail && validationErrors.email && <span className="ms-5 error text-danger">{validationErrors.email}</span>}
                                                    {data === "Email is exists" && <h5 className='text-danger'>{data}</h5>}</small>
                                                    <div className="text-center my-2">
                                                        {renderOTPFieldOrButton1()}
                                                    </div>
                                                </div> 
                                            </div>
                                        }
                                    </div>
                                    <div>
                                        {
                                            profileFamily &&
                                            <div className='mt-2'>
      <form onSubmit={handleSaveMembers}>
        <div className='d-flex align-items-center'>
          <h6 className='fw-semibold'>Add family member</h6>
          <select
            className='ms-lg-2 py-2 px-2 fw-bold bg-light'
            style={{ borderRadius: '10px' }}
            onChange={(e) => handleAddMemberWithRelation(e.target.value)}
            required
          >
            <option value='' selected>Select</option>
            {['spouse', 'son', 'daughter', 'father', 'mother', 'brother', 'sister', 'grandfather', 'grandmother']
              .filter(relation => !familyMembers.some(member => member.relation === relation))
              .map((relation, index) => (
                <option key={index} value={relation}>{relation.charAt(0).toUpperCase() + relation.slice(1)}</option>
              ))
            }
          </select>
        </div>
        {familyMembers.map((member, index) => (
          <div key={index} className='d-flex flex-column mt-2'>
            <div className='d-flex justify-content-between mx-5'>
              <h6 className='fw-semibold mt-2'>{member.relation}</h6>
              {familyMembers.length > 1 && (
                <button type='button' onClick={() => handleRemoveMember(index)} className='ms-2 btn btn-danger me-5'>Remove</button>
              )}
            </div>
            <div className='d-flex mt-2'>
              <input
                type='text'
                className='form-control mt-2 w-25 mx-5'
                placeholder='Name'
                value={member.name}
                onChange={(e) => handleNameChange(index, e.target.value)}
                required
              />
              <input
                type='date'
                className='form-control mt-2 w-25 mx-3'
                placeholder='Date of Birth'
                value={member.dob}
                onChange={(e) => handleDobChange(index, e.target.value)}
                required
                />
            </div>
                {errors[index]?.name && <div className="text-danger ms-5 mt-3">{errors[index].name}</div>}
            {(member.relation === 'son' || member.relation === 'daughter') && (
              <>
                {member.children.map((child, childIndex) => (
                  <div key={childIndex} className='d-flex mt-2'>
                    <input
                      type='text'
                      className='form-control mt-2 w-25 mx-5'
                      placeholder='Name'
                      value={child.name}
                      onChange={(e) => handleChildNameChange(index, childIndex, e.target.value)}
                      required
                    />
                    <input
                      type='date'
                      className='form-control mt-2 w-25 mx-3'
                      placeholder='Date of Birth'
                      value={child.dob}
                      onChange={(e) => handleChildDobChange(index, childIndex, e.target.value)}
                      required
                      />
                      {errors[index]?.children?.[childIndex]?.name && <div className="text-danger">{errors[index].children[childIndex].name}</div>}
                  </div>
                ))}
                <div className='d-flex justify-content-end mx-5'>
                  <button type='button' className='btn btn-primary mt-2 me-5' onClick={() => handleAddChild(index)}>Add Child</button>
                </div>
              </>
            )}
          </div>
        ))}
        <div className='d-flex justify-content-evenly mt-4'>
          <button type='submit' className='btn btn-success'>Save</button>
        </div>
      </form>
      <h3>Family Members</h3>
      {
        submitted.map((item)=>(
            <div className='mt-2 row shadow rounded p-3'>
                <p className='my-1 col'><span className='fw-semibold'>Name : </span><span className='fw-bold text-dark'>{item.name}</span></p>
                <p className='my-1 col'><span className='fw-semibold'>Relation : </span><span className='fw-bold text-dark'>{item.relation}</span></p>
                <p className='my-1 col'><span className='fw-semibold'>Date of Birth : </span><span className='fw-bold text-dark'>{item.dob}</span></p>
            </div>
        ))
      }
    </div>
          }
                                    </div>
                                    <div>
                                        {
                                            profileAssets &&
                                            <div className='container-fluid mt-2 row'>
                                                <div className='col-6'>
                                                    <div className='d-flex justify-content-between'>
                                                        <h4 className='text-secondary fw-bold ms-2'>Home <i className="fa-solid fa-house"></i></h4>
                                                        <button className='btn btn-info me-5' onClick={HandlePropertyAssetModel}>Add</button>
                                                    </div>
                                                    {
                                                        assetsPropertyData === null ? (
                                                            <>
                                                                <h5 className='mt-3 ms-3'>
                                                                You have not added any property yet 
                                                                </h5>
                                                            </>
                                                        ) : (
                                                            <>
                                                            {
                                                                assetsPropertyData.map((item)=>(
                                                                    <div className='ms-3 mt-2 p-3 rounded shadow' style={{width:'20rem'}}>
                                                                        <p className='my-1 '><span className='fw-semibold'>Property Value : </span><span className='fw-bold text-dark'>{item.structureValue}</span></p>
                                                                        <p className='my-1'><span className='fw-semibold'>Property Age &nbsp;&nbsp; : </span><span className='fw-bold text-dark'>{item.ageOfProperty}</span></p>
                                                                        <p className='my-1'><span className='fw-semibold'>City &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; : </span><span className='fw-bold text-dark'>{item.city}</span></p>
                                                                        <p className='my-1'><span className='fw-semibold'>Pincode &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; : </span><span className='fw-bold text-dark'>{item.pincode}</span></p>
                                                                    </div>
                                                                ))
                                                            }
                                                            </>
                                                        )
                                                    }
                                                </div>
                                                <div className='col-6'>
                                                    <div className='d-flex justify-content-between'>
                                                        <h4 className='text-secondary fw-bold ms-2'>Vehicle <i className="fa-solid fa-motorcycle"></i></h4>
                                                        <button className='btn btn-info me-5' onClick={HandleVehicleAssetModel}>Add</button>
                                                    </div>
                                                    {
                                                        assetsVehicleData === null ? (
                                                            <>
                                                                <h5 className='mt-3 ms-3'>
                                                                You have not added any Vehicle yet 
                                                                </h5>
                                                            </>
                                                        ) : (
                                                            <></>
                                                        )
                                                    }
                                                </div>        
        <Modal show={showPropertyAsset} onHide={handleClose}>
          <Modal.Header closeButton  >
            <Modal.Title ><h3 className='text-center fw-bold text-secondary'><img src={RamanaLogo} alt='logo' className='rounded' style={{ width: '60px', height: '40px' }}></img></h3></Modal.Title>
          </Modal.Header>
          <Modal.Body className='mx-5'>
          <form onSubmit={handleSubmitPropertyAsset} className=''>
    <div>
        <input
            placeholder=" City"
            name='city'
            required
            value={propertyfield.city}
            onChange={PropertyChange}
            className='ps-2 fw-bold ms-3'
            style={{width: '70%', height: '7vh', borderRadius: '.3em', border: '1px solid black'}}
            maxLength={40}
        />
        {validationerrproperty.city && <p className="text-danger">{validationerrproperty.city}</p>}
    </div>
    <div className='mt-2'>
        <input
            placeholder=" Pincode"
            name='pincode'
            required
            value={propertyfield.pincode}
            onChange={PropertyChange}
            className='ps-2 fw-bold ms-3'
            style={{width: '70%', height: '7vh', borderRadius: '.3em', border: '1px solid black'}}
            onKeyPress={(e) => {
                const isValidInput = /[0-9]/;
                if (!isValidInput.test(e.key)) {
                  e.preventDefault();
                }
              }}
            maxLength={40}
        />
        {validationerrproperty.pincode && <p className="text-danger">{validationerrproperty.pincode}</p>}
    </div>
    <div className='mt-2'>
        <input
            placeholder=" Age of Property"
            name='ageOfProperty'
            required
            value={propertyfield.ageOfProperty}
            onChange={PropertyChange}
            className='ps-2 fw-bold ms-3'
            style={{width: '70%', height: '7vh', borderRadius: '.3em', border: '1px solid black'}}
            onKeyPress={(e) => {
                const isValidInput = /[0-9]/;
                if (!isValidInput.test(e.key)) {
                  e.preventDefault();
                }
              }}
            maxLength={40}
        />
        {validationerrproperty.ageofproperty && <p className="text-danger">{validationerrproperty.ageofproperty}</p>}
    </div>
    <div className='mt-2'>
        <input
            placeholder=" Structure value"
            name='structureValue'
            required
            value={propertyfield.structureValue}
            onChange={PropertyChange}
            className='ps-2 fw-bold ms-3'
            style={{width: '70%', height: '7vh', borderRadius: '.3em', border: '1px solid black'}}
            onKeyPress={(e) => {
                const isValidInput = /[0-9]/;
                if (!isValidInput.test(e.key)) {
                  e.preventDefault();
                }
              }}
            maxLength={40}
        />
        {validationerrproperty.structureValue && <p className="text-danger">{validationerrproperty.structureValue}</p>}
    </div>
    <div className='d-flex justify-content-between my-2 mt-3'>
        <button className='btn btn-success' type='submit'>Save</button>
        <button className='btn btn-danger' type='button' onClick={handleClose}>Cancel</button>
    </div>
</form>

          </Modal.Body>
        </Modal>

        <Modal show={showVehicleAsset} onHide={handleClose1}>
          <Modal.Header closeButton  >
            <Modal.Title ><h3 className='text-center fw-bold text-secondary'><img src={RamanaLogo} alt='logo' className='rounded' style={{ width: '60px', height: '40px' }}></img></h3></Modal.Title>
          </Modal.Header>
          <Modal.Body className='mx-5'>
            <form onSubmit={handleSubmitVehicleAsset} className=''>
                <div className=''>
                    <input
                        placeholder=" Registration No."
                        name='registerno'
                        required
                        value={vehiclefield.registerNo}
                        onChange={AssetChange}
                        className='ps-2 fw-bold ms-3'
                        style={{width: '70%', height: '7vh', borderRadius: '.3em', border: '1px solid black'}}
                        maxLength={40}
                    />
                </div>
                <div className='mt-2'>
                    <input
                        placeholder=" Company"
                        name='company'
                        required
                        value={vehiclefield.make}
                        onChange={AssetChange}
                        className='ps-2 fw-bold ms-3'
                        style={{width: '70%', height: '7vh', borderRadius: '.3em', border: '1px solid black'}}
                        maxLength={40}
                    />
                </div>
                <div className='mt-2'>
                    <input
                        placeholder=" Model"
                        name='model'
                        required
                        value={vehiclefield.model}
                        onChange={AssetChange}
                        className='ps-2 fw-bold ms-3'
                        style={{width: '70%', height: '7vh', borderRadius: '.3em', border: '1px solid black'}}
                        maxLength={40}
                    />
                </div>
                <div className='mt-2'>
                    <input
                        placeholder=" Variant"
                        name='variant'
                        required
                        value={vehiclefield.variant}
                        onChange={AssetChange}
                        className='ps-2 fw-bold ms-3'
                        style={{width: '70%', height: '7vh', borderRadius: '.3em', border: '1px solid black'}}
                        maxLength={40}
                    />
                </div>
                <div className='mt-2'>
                    <input
                        placeholder=" Fuel Type"
                        name='fuel'
                        required
                        value={vehiclefield.fuel}
                        onChange={AssetChange}
                        className='ps-2 fw-bold ms-3'
                        style={{width: '70%', height: '7vh', borderRadius: '.3em', border: '1px solid black'}}
                        maxLength={40}
                    />
                </div>
                <div className='mt-2'>
                    <input
                        placeholder=" Registration Year"
                        name='regyear'
                        required
                        value={vehiclefield.regYear}
                        onChange={AssetChange}
                        className='ps-2 fw-bold ms-3'
                        style={{width: '70%', height: '7vh', borderRadius: '.3em', border: '1px solid black'}}
                        maxLength={40}
                    />
                </div>
                
                <div className='d-flex justify-content-between my-2 mt-3'>
                    <button className='btn btn-success' type='submit'>Save</button>
                    <button className='btn btn-danger' onClick={handleClose1}>Cancel</button>
                </div>
            </form>
          </Modal.Body>
        </Modal>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default MyAccount;