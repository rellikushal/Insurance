import React,{useEffect, useState} from 'react';
 import {  useLocation, useNavigate,} from 'react-router-dom';
  import p4 from '../images/p4.jpeg'
import PropertyInsuranceService from '../Service/PropertyInsuranceService';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RamanaLogo from '../images/p4.jpeg';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Switch from '@mui/material/Switch';
import insurance from '../images/insurance.jpg';
import safe from '../images/safe.png';
import Header from '../Header';
import { toast } from 'react-toastify';

function PaymentPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  function handleGoBack(){
    window.history.back();
  }

  const location = useLocation();
  const { state } = location;

  // var mobilen = location.state?.mobileno;
  // var emailId = location.state?.emailId;

  const formData = state?.formData;
  const premiumData = state?.premiumData;

  // data from signup page :
  const email = formData?.email;
  // const mobileno = formData?.mobileno ;
  const userName=formData?.name;
  const userPassword = formData?.password;

  // data from filldetails page :
  const name = state?.userDetails?.fullname;
  const address = state?.userDetails?.currentaddress;
  const salutation = state?.userDetails?.gender;
  const pancard=state?.userDetails?.pancard;
  const dob = state?.userDetails?.dob;
 const  propertypincode = state?.userDetails?.propertypincode;
 const propertyhouseNo=state?.userDetails?.propertyhouseNo;
 const propertystreetNo = state?.userDetails?.propertystreetNo;
 const   pincode = state?.userDetails?.pincode;
 const  houseno = state?.userDetails?.houseno;
 const  streetno = state?.userDetails?.streetno;
 const Intialcity=state?.userDetails?.city;
 const PropertyCity=state?.userDetails?.propertycity;
 const Intialstate=state?.userDetails?.state;
 const Propertystate=state?.userDetails?.propertystate;
// data from premium page:
  const year = premiumData?.year;
  const premium = Math.round(premiumData?.premium);
  
  const fillDetailsAlluserRelated=state?.userDetails
  console.log(JSON.stringify(fillDetailsAlluserRelated));
  // console.log(Intialcity,Intialstate,fillDetailsAlluserRelated);
console.log(fillDetailsAlluserRelated.mobno)
  // data from structure and details page :
const marketValue = state?.marketValue;
const security = state?.security;
const buildingAge = state?.buildingAge;
const squareFeet = state?.squareFeet;
const userpincode = state?.pincode;
const effected = state?.effected;
const person = state?.person;

//  const startingCustomerId = location.state?.startingCustomerId;
const MobileNumberDta = formData.mobileno
console.log(MobileNumberDta)

const mobileno = (MobileNumberDta === "" || MobileNumberDta === undefined) ? fillDetailsAlluserRelated.mobno : MobileNumberDta;


 console.log(mobileno);
const [signUpDetails, setSignUpDetails] = useState([]);

useEffect(() => {

  if (mobileno) {
    PropertyInsuranceService.getCustomerIdByMobileNo(mobileno).then((res) => {
      setSignUpDetails(res.data);
    })
  }
  // else if (mobileno === ("" || undefined)){
  //   const MobilenumberData = fillDetailsAlluserRelated.mobno;
  //   PropertyInsuranceService.getCustomerIdByMobileNo(MobilenumberData).then((res) => {
  //     setSignUpDetails(res.data);
  //   })
  // }
}, [mobileno]);
 
  const amount = parseInt(premium) * 100 ;

  const [disabled, setDisabled] = useState(true);
 
  const [data,setData]=useState({

    payment:'',

  });
  const [details] = useState({
      paymentId:"",
      year : year,
      premium : premium ,
      customerId:"",
  })

  const [values]=useState({
    marketValue:marketValue,
    squareFeet:squareFeet,
    pincode:userpincode,
    buildingAge:buildingAge,
    effected:effected,
    security:security,
    person:person,
    customerId:"",
    paymentId:"",
});
const [feilds] = useState({
  name: userName,
  mobileno: mobileno,
  email: email,
  password: userPassword,
  customerId:"",
});
const [dataValues] = useState({
  gender: salutation,
  fullname: name,
  pancard: pancard,
  dob: dob,
  propertypincode: userpincode,
  propertyhouseNo: propertyhouseNo,
  propertystreetNo: propertystreetNo,
  propertycity:fillDetailsAlluserRelated.propertycity, 
  propertystate: fillDetailsAlluserRelated.propertystate,
  currentaddress: address,
  pincode: address === 'yes' ? userpincode : pincode,
  houseno: address === 'yes' ? propertyhouseNo : houseno,
  streetno: address === 'yes' ? propertystreetNo : streetno,
  city:address === 'yes' ? fillDetailsAlluserRelated.propertycity : fillDetailsAlluserRelated.city,
  state:address === 'yes' ? fillDetailsAlluserRelated.propertystate : fillDetailsAlluserRelated.state,
  customerId:"",
  paymentId:"",
});

const signUpRows = signUpDetails.map((details) => (
  <tr key={details.id}>
   {details.customerId}
  </tr>
));

const navigate=useNavigate("");

  //current date & term end date  for policy
  const currentDate = new Date();
  const currentDateminus = new Date();
  const day = currentDate.getDate().toString().padStart(2, '0');
  const day1 = (currentDateminus.getDate() - 1).toString().padStart(2, '0');
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Note: Month starts from 0
  const startyears = currentDate.getFullYear();
  const endyears = currentDate.getFullYear()+year;
  const formattedStartDate = `${day}/${month}/${startyears}`; 
  const formattedEndDate = `${day1}/${month}/${endyears}`; 

  const handleChange = (e) => {

    const { name, value } = e.target;
   
    setData({ ...data, [name]: value });

    setDisabled(e.target.value === "razorpay" ? false : true);
     
  };
  const signUpRowsAsString = signUpRows.map(row => row.props.children); 
 
  details.customerId = signUpRowsAsString.join(', '); 
  dataValues.customerId = signUpRowsAsString.join(', ');
  values.customerId = signUpRowsAsString.join(', ');

  console.log(Intialcity,Intialstate,fillDetailsAlluserRelated);
console.log(fillDetailsAlluserRelated.propertycity,fillDetailsAlluserRelated.propertystate);

  const handleClick=()=>{
     const var4= 'https://api.razorpay.com/v1/payments/qr_codes/qr_FuZIYx6rMbP6gs';
  const options = {
    key: 'rzp_test_Su4WV4zdBIGTmZ', 
    entity:var4,
    amount: Math.round(amount), 
    name: 'Ramana Soft Insurance Company',
    description: 'IS A INSURANCE COMPANY',
    image: p4,
    handler: function (response) 
    {
        // alert(response.razorpay_payment_id);

        const pamentdata=response.razorpay_payment_id;

        details.paymentId=pamentdata.toString();
        dataValues.paymentId=pamentdata.toString();
        values.paymentId=pamentdata.toString();

      console.log("details =>"+JSON.stringify(details));

      console.log("details =>"+JSON.stringify(details));
      console.log("feilds =>"+JSON.stringify(feilds));
      console.log("dataVales =>"+JSON.stringify(dataValues));
      console.log("values =>"+JSON.stringify(values));

      console.log(dataValues);
    PropertyInsuranceService.createPaymentData(details);
    // // PropertyInsuranceService.createCustomer(feilds);
      PropertyInsuranceService.createfillDetails(dataValues);
      PropertyInsuranceService.createDetails(values)

      toast.success("Payment SuccessFully Completed Thank You");
      toast.info("Please Login to get invoice...");
      navigate("/paymentsuccess");

      
    },
    
    prefill: {
      name: name,
      email: email,
      contact: mobileno,
    },
    notes: {
      address: address,
    },
    theme: {
      color: '#F37254',
    },
  }
  var pay = new window.Razorpay(options);
  pay.open();
}

  return (
    <div className='pay container-fluid'>
      <Header/>
      <div className='mt-5 px-3 mx-md-5 mt-lg-5 pt-4'>
        <h4 className='fw-bold'>Checkout</h4>
        <p className='py-2'>Thank you <span className='fw-bold'>{name?name:'user'}</span>&nbsp;for choosing RamanaSoft Insurance for your home insurance needs.</p>
        <p className='fw-bold text-secondary'><ArrowBackIcon className='text-primary fs-2 border rounded shadow' onClick={handleGoBack} /> &nbsp; Back to fill Data Form</p>
      </div>

      <div className='row'>
      <div className='col-12 col-md-9 mx-md-5 col-lg-7'>
        <div className="card border-success px-2 shadow mb-3 property" >
          {/* <div className="card-header bg-transparent border-success">Reference Number : <span className='fw-bold'>56445462321</span></div> */}
          <div className="card-body py-1">
            <div className='d-flex flex-lg-row flex-column flex-md-row justify-content-around'>
              <div>
                <div className='mt-1 mt-lg-5 mx-5'>
                  <img src={RamanaLogo} alt='company-logo' title='RamanaSoft insurance' className='w-50 mx-lg-1 mx-5 rounded shadow'></img>
                </div>
                <div className='mt-3'>
                  <h5 className='fw-bold text-center text-lg-start mt-lg-3'>RamanaSecure Living</h5>
                </div>
              </div>
              <div className=''>
                <div>
                  <p className='text-secondary'>Policy Period</p>
                  <p className='fw-bold'>{year?year:0}years</p>
                </div>
                
                <div>
                  <p className='text-secondary'>Policy Start Date</p>
                  <p className='fw-bold'>{formattedStartDate}</p>
                </div>
              </div>
              <div>
                <div>
                  <p className='text-secondary'>Building Sum Insured</p>
                  <p className='fw-bold'>&#8377;{marketValue?marketValue:0}</p>
                </div>
                <div className=' '>
                  <div>
                    <p className='text-secondary'>Policy End Date</p>
                    <p className='fw-bold'>{formattedEndDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer bg-transparent ">
            <div className='p-lg-2 text-center text-lg-start text-secondary'>
              <h6>Declaration : By clicking on proceed to payment I hereby declare that my house is a pucca (brick and cement) construction and I do not have any claim history.</h6>
            </div>
            <div className='row mt-2'>
              <div className='col-12 col-lg-6'>
                <p>Grand Total</p>
                <p><span className='fw-bold fs-4'>&#8377;{premium?premium:0}/-</span>(inclusive of all taxes)</p>
              </div>
              <div className='col-12 col-lg-6'>
                <div>
                  <button className='btn btn-primary mx-3 py-2 fw-bold buy mb-2 text-nowrap' onClick={handleClick}>Proceed to Payment</button>
                  <div>
                    <small>By clicking "Proceed to Payment", I accept the above Declaration and that I've personally filled out the fill data form.</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='col-12 col-lg-3 col-md-5'>
        <div>
          <img src={safe} title="no data breeching" alt='secured data' className='w-100'></img>
        </div>
      </div>
      </div>
      <div className='px-5 row'>
        <p className='text-center'>RamanaSoft Insurance Pvt.Ltd located at Aditya Trade center, Ameerpet. Hyderabad 500073.<br /> for more enquiries please contact <a href="mailto:support@ramanasoft.com">support@ramanasoft.com</a>.</p>
      </div>
      {/* {values.customerId} */}
      {/* {Intialcity} */}
    </div>
  )
}

export default PaymentPage

