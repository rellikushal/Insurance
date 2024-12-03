import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate } from 'react-router-dom'
import {  integerRege6,  pincode,  regexmarketValue, regexpropertyValues } from './RegularExpressions'
import TextField from '@mui/material/TextField';
import { Tooltip, IconButton, InputAdornment } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import Property from '../Component/images/property.jpg'
import RoofingIcon from '@mui/icons-material/Roofing';
import '../App.css';
import numWords from 'num-words';

import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Modal } from 'react-bootstrap';
import Header from './Header';

export default function StrucureAndDetails() {

  const navigate=useNavigate();

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])


  const [showState , setshowState] = useState(false);
  const [showState1 , setshowState1] = useState(false);
  const clickClose =()=> {setshowState(false);
    setValues((prevValues) => ({
      ...prevValues,
      effected: ''
    }));
  }
  const clickClose1 =()=> {setshowState1(false);
    setValues((prevValues) => ({
      ...prevValues,
      person:''
    }));
  }

  useEffect(() => {
    // Retrieve values from sessionStorage on component mount

    const storedValues = JSON.parse(sessionStorage.getItem('formValues')) || {};
    setValues((prevValues) => ({ ...prevValues, ...storedValues }));
  }, []);

  const location = useLocation();
  var i = location.state?.i;

  const [values,setValues]=useState({
      marketValue:"",
      squareFeet:"",
      pincode:"",
      buildingAge:"",
      effected:"",
      security:"",
      person:""
  });

     var mobileno = location.state?.mobileno;
     var emailId = location.state?.emailId;

        const [validationErrors,setValidationErrors]=useState({
          marketValue:"",
          squareFeet:"",
          pincode:"",
          buildingAge:"",
          effected:"",
          security:"",
          person:""
        });

      const onSubmit=(e)=>
      {
          const {name,value}=e.target;
          setValues({...values,[name]:value}); 
          e.preventDefault();

          // validation1
          if (name === "marketValue") {
            if (!regexmarketValue.test(value)) {
              setValidationErrors({ ...validationErrors, [name]: "The market value should be 'between 1 lakh and 100 crores.'" });
            } else {
              setValidationErrors({ ...validationErrors, [name]: "" });
            }
          }

          // validation --2 :
          else if (name === "squareFeet") {
            if (!regexpropertyValues.test(value)) {
              setValidationErrors({ ...validationErrors, [name]: "The square feet value should be 100 to 99,999." });
            } else {
              setValidationErrors({ ...validationErrors, [name]: "" });
            }
          }

          // validation --3 :

          else if (name === "pincode") {
            if (!pincode.test(value)) {
              setValidationErrors({ ...validationErrors, [name]: "Please provide a valid 6-digit PIN code." });
            } else {
              setValidationErrors({ ...validationErrors, [name]: "" });
            }
          }

          // validation -- 4 :
          else if (name === "buildingAge") {
            if (value === "1") {
              setValidationErrors({ ...validationErrors, [name]: "Please select any option " });
            } else {
              setValidationErrors({ ...validationErrors, [name]: "" });
            }
          }


            // validation for floods :
            else if(name === "effected") 
            {
              if(value === "Yes")
              {
                
                    setshowState(true);
                    setValues(
                      (prevValues) => ({
                        ...prevValues,
                        [name]: value,
                      }),
                      {...values,value:""}
                  );  
                  
              }
            }

            else if(name === "person")
            {
              if(value === "No" ){
                setshowState1(true);
                setValues(
                  (prevValues) => ({
                    ...prevValues,
                    [name]: value,
                  }),
                  {...values,value:""}
              );                
            }
            }

           e.preventDefault(); 

      }

      


      const handleClick=(e)=>
  {
    e.preventDefault();
    if(regexmarketValue.test(values.marketValue) &&  regexpropertyValues.test(values.squareFeet) && integerRege6.test(values.pincode))
    {
      // Save values to sessionStorage before navigating
      sessionStorage.setItem('formValues', JSON.stringify(values));
        navigate("/getQuote",{state:{formValues : values,i,emailId,mobileno}});
     

      // console.log("values =>"+JSON.stringify(values));
      // PropertyInsuranceService.createDetails(values)
      
     }
  }
  function HandleMarketValue(e) {
    const inputValue = e.target.value;
  
    // If input is empty, allow it to update
    if (inputValue === "") {
      onSubmit(e);
      return;
    }
  
    // Check the length and numerical value
    if (inputValue.length <= 10) {
      const numericalValue = parseFloat(inputValue.replace(/,/g, ''));
      if (numericalValue <= 1000000000) {
        onSubmit(e);
      }
    }
  }
  function HandleSqftValue(e){
     const inputValue = e.target.value;
     if (inputValue.length <=5){
      onSubmit(e);
     }
  }
  function HandlePincodeValue(e){
     const inputValue = e.target.value;
     if (inputValue.length <=6){
      onSubmit(e);
     }
  }

  const convertToText = (num) => {
    try {
      return numWords(num);
    } catch (error) {
      console.error("Error converting number to words:", error);
      return "hundred crore";
    }
  };

  return (
    <>
      <Header/>
    <div className='mt-lg-5 pt-lg-3 mt-5 pt-2 property px-1 px-lg-2'>
          <div> <h2 className='text-center fw-bold text-success pt-lg-2 pt-4 'style={{fontFamily:'verdana'}}> PROPERTY DETAILS <RoofingIcon className='fs-1'/></h2></div>

          <form  onSubmit={handleClick} class='form-horizatol'  >
            <div className='row container-fluid'>

            
  <div className='col-12 col-lg-6 px-2 mt-3 sdborder line'style={{borderRight:'6px solid #ccc',borderRadius:'4px'}}>
    <h3 className='text-center mb-5 fw-bold bg-primary rounded text-white p-1 px-2 mx-lg-3 me-lg-4' >Structure And Details </h3>
    <div className="form-group ms-lg-5">
      <div className="">
        <TextField
          id="outlined-textarea"
          label="Current Market Value (Rs.)"
          placeholder="Min 100000RS/-"
          type="text"
          name='marketValue'
          size='medium'
          className="col-12 col-sm-9 bg-light "
          maxLength={9}
          required
          value={values.marketValue}
          onChange={HandleMarketValue}
          onKeyPress={(e) => {
            const { key, target: { value } } = e;
            if (value === '' && key === '0') {
              e.preventDefault();
              return;
            }
            const isValidInput = /[0-9]/;
            if (!isValidInput.test(key)) {
              e.preventDefault();
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title='current value for the property' placement='left' arrow>
                  <IconButton aria-label="info" edge="end">
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
      </div>
      {values.marketValue && <span className='fw-semibold text-secondary text-start'><small>Rs.{convertToText(parseFloat(values.marketValue))} only</small></span>}
      <small className='text-nowrap'>
      {validationErrors.marketValue && <p className="text-danger mx-5 fs-6 fw-bold">{validationErrors.marketValue}</p>}</small>
    </div>

    <div className="form-group ms-lg-5 mt-3">
      <div className="">
        <TextField
          id="outlined-textarea"
          label="Carpet Area(sqft):"
          placeholder="Min 100sqft."
          type="text"
          name='squareFeet'
          maxLength={5}
          required
          className="col-12 col-sm-9 bg-light "
          value={values.squareFeet}
          onChange={HandleSqftValue}
          onKeyPress={(e) => {
            const isValidInput = /[0-9]/;
            if (!isValidInput.test(e.key)) {
              e.preventDefault();
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="measurements of the property" placement='left' arrow>
                  <IconButton aria-label="info" edge="end">
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
      </div><small>
      {validationErrors.squareFeet && <p className="text-danger mx-5 fw-bold">{validationErrors.squareFeet}</p>}</small> 
    </div>

    <div className="form-group ms-lg-5 mt-lg-3">
      <div className="">
        <TextField
          id="outlined-textarea"
          label="Pincode:"
          placeholder=""
          type="text"
          name='pincode'
          maxLength={6}
          required
          className="col-12 col-sm-9 bg-light"
          value={values.pincode}
          onChange={HandlePincodeValue}
          onKeyPress={(e) => {
            const isValidInput = /[0-9]/;
            if (!isValidInput.test(e.key)) {
              e.preventDefault();
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Area pincode of the property" placement='left' arrow>
                  <IconButton aria-label="info" edge="end">
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <small>
      {validationErrors.pincode && <span className="text-danger mx-5 fw-bold">{validationErrors.pincode}</span>}</small>
    </div>

    <div className="form-group ms-lg-5 mt-3 fw-bold">
      <label htmlFor="age" className="control-label text-secondary">&#9900; Age Of The Building</label>
      <span>
        <select id='age' required name='buildingAge' style={{ borderRadius: '10px' }} value={values.buildingAge} onChange={onSubmit} className='ms-lg-2 ms-3 py-2 px- fw-bold bg-light text-center'>
        <option value="">Select</option>
          <option value="0 to 5 Years">0 to 5 Years</option>
          <option value="5 to 10 Years">5 to 10 Years</option>
          <option value="10 to 15 Years">10 to 15 Years</option>
          <option value="15 to 20 Years">15 to 20 Years</option>
          <option value="20 to 25 Years">20 to 25 Years</option>
        </select>
        {validationErrors.buildingAge && <span className="text-danger">{validationErrors.buildingAge}</span>}
      </span>
      <br></br>
    </div>

    <div className="form-group ms-lg-5 mt-2">
      <label htmlFor="effect" className="control-label mt-2 fw-bold text-secondary">&#9900; Has Your Property Effected With Floods in Last 5years &nbsp;
      <span>
        <select id='effect' name='effected' className='ms-lg-2 px-3 py-2 fw-bold bg-light' style={{ borderRadius: '10px' }} required value={values.effected} onChange={onSubmit}>
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {validationErrors.effected && <span className="text-danger">{validationErrors.effected}</span>}
      </span>
      </label>
    </div>
  </div>

  <div className='col-12 col-lg-6 mt-3'>
    <div className=''>
      <h3 className='fw-bold text-center bg-primary rounded text-white p-1 ms-2 me-lg-4'>&nbsp; Security Measurement Details</h3>
    </div>

  <div className="form-group ms-5 mt-lg-3">
    <label htmlFor='security' className="control-label col-lg-4 col-md-4 col-sm-6 col-6 my-4 fw-bold text-secondary fs-5">&#9900; 24/7 Security </label>
    <span>
      <select id='security' name='security' style={{ borderRadius: '10px'}} value={values.security} className='fw-bold px-3 ms-3 py-2 bg-light' onChange={onSubmit} required>
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
      {validationErrors.security && <span className="text-danger">{validationErrors.security}</span>}
    </span>
    <br></br>
  </div>

  <div className="form-group ms-5">
    <label htmlFor='person' className="control-label col-lg-4 col-md-4 col-sm-6 col-6 mb-4 fw-bold text-secondary text-nowrap fs-5">&#9900; Salaried Person </label>
    <span>
      <select className='px-3 ms-3 py-2 fw-bold bg-light' id='person' style={{ borderRadius: '10px' }} name='person' value={values.person} onChange={onSubmit} required>
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
      {validationErrors.person && <span className="text-danger">{validationErrors.person}</span>}
    </span>
  </div>
  <div className='ms-5 mx-lg-1 mt-lg-4 mt-2'>
    <img src={Property} className='mx-lg-5 mx-5 w-50 rounded shadow' title='Home Insurance' alt="home insurance"></img>
  </div>
</div>
  </div>
{/* {i} */}
<div className='text-center ms-3'>
<button className='btn btn-primary mt-5 fs-5 px-5 fw-bold' > View Quotes </button>
{/* <hr></hr>
<p className='text-center pb-3'>RamanaSoft Insurance Company offers comprehensive insurance solutions focused on integrity, innovation, and customer satisfaction. With a commitment to excellence and social responsibility, we strive to be a leading provider in the industry, meeting the evolving needs of our customers while maintaining financial stability and regulatory compliance.</p> */}
</div>
          </form>
<div className='rounded pb-0 mt-3'>
  <p className='text-center fw-bold'><span className='text-danger'>RamanaSoft</span> @ 2024</p>
</div>


             <div className='mx-auto my-auto'>
    <Modal show={showState} onHide={clickClose} className='text-center'>
                <Modal.Body>
              
               <Tooltip title={<span className='fw-bold'>flood effected properties are not considered for the insurance</span>} placement='bottom'arrow>      
                 <IconButton aria-label="info" edge="end" className='text-primary'>
                  <InfoIcon />
                 </IconButton>
                 </Tooltip>
                
                  <h4 className='mt-4'>As per the Terms and Conditions your Property Insurance Rejected </h4>
                  <button className='btn btn-outline-primary my-5 fw-bold' onClick={clickClose}>Close</button>
                  </Modal.Body>
                
            </Modal>
    <Modal show={showState1} onHide={clickClose1} className='text-center'>
                <Modal.Body>
              
               <Tooltip title={<span className='fw-bold'>Only salaried persons are considered for the insurance</span>} placement='bottom'arrow>      
                 <IconButton aria-label="info" edge="end" className='text-primary'>
                  <InfoIcon />
                 </IconButton>
                 </Tooltip>
                
                  <h4 className='mt-4'>As per the Terms and Conditions your Property Insurance Rejected </h4>
                  <button className='btn btn-outline-primary my-5 fw-bold' onClick={clickClose1}>Close</button>
                  </Modal.Body>
                
            </Modal>
    </div>

  
    </div>
    </>
  )
}