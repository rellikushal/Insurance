import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import PropertyInsuranceService from './Service/PropertyInsuranceService';


function LoginPage()
 {

  const location = useLocation();
  const { state } = location;
  const [mobileno, setMobileNo] = useState(state?.values?.mobileno || '');


  // const [id,setId]=useState("");
  // const mobilenoid = mobileno;

  const [signUpDetails, setSignUpDetails] = useState([]);
  const [StrucutureDetails,setStructureDetails] = useState([]);
  const [fillDetails,setFilldetails] = useState([]);
  const [pamentDetails,setPaymentDetails] = useState([]);
 
  // const signUpRows = 
  signUpDetails.map((details) => (
    <tr key={details.id}>
     {details.customerId}
    </tr>
  ));

  // const signUpRowsAsString = signUpRows.map(row => row.props.children); 
// const customerid = signUpRowsAsString;

   
  const handleClick=(e) => {
    e.preventDefault();
    if (mobileno) {
      
      PropertyInsuranceService.getCustomerIdByMobileNo(mobileno)
        .then((res) => {
          setSignUpDetails(res.data);
          const customerId = res.data[0]?.customerId; // Assuming customerId is present in the response
          if (customerId) {
            PropertyInsuranceService.getStructureDetailsByCustomerId(customerId)
              .then((res) => {
                setStructureDetails(res.data);
              })
              PropertyInsuranceService.getFillDetailsByCustomerId(customerId).then((res) => {
                setFilldetails(res.data);
              })
              PropertyInsuranceService.getPaymentDetailsByCustomerId(customerId).then((res) => {
                setPaymentDetails(res.data);
              })
              .catch((error) => {
               
              });
          }
        })
        .catch((error) => {
      
        });
        
    }
  };


  useEffect(() => {
    // Retrieve mobileno from link parameters if available
    const searchParams = new URLSearchParams(location.search);
    const mobileParam = searchParams.get('mobileno');
    if (mobileParam) {
      setMobileNo(mobileParam);
    }
  }, [location]);

 
  return (
     <div className="container">
      <div className="row">
        <div className="col-md-3">
    
          <div className="side-nav  mt-5">
          <Link onClick={handleClick} className='mt-5'><h5>view customer Property details</h5></Link>
            <Link><h5>update customer PropertyAddres </h5></Link>
            <Link><h5>change/update password</h5></Link>
          </div>
        </div>
        <div className="col-md-9">
          {/* Main Content */}
          <div className="main-content">
            <h1>Customer Details</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>User Mobile No</th>
                  <th>User MailId</th>
                  <th>Property Value</th>
                  <th>Address</th>
                  <th>NO OF Years</th>
                  <th>Premium Amount</th>
                  <th>Customer ID</th>
                </tr>
              </thead>


    <tbody>
      { 
      signUpDetails.map((signUpDetail, index) => (
        <>
          {pamentDetails.map((paymentDetail, paymentIndex) => (
            <>
              {0 === paymentIndex && (
                
                <tr key={`${index}-${paymentIndex}`}>
                  <td>{fillDetails[index]?.fullname}</td>
                  <td>{signUpDetail?.mobileno}</td>
                  <td>{signUpDetail?.email}</td>
                  <td>{StrucutureDetails[index]?.marketValue}</td>
                  <td>Address</td> {/* Placeholder for address data */}
                  <td>{paymentDetail?.year}</td>
                  <td>{paymentDetail?.premium}</td>
                  <td>{signUpDetail?.customerId}</td>
                </tr>
              )}
            </>
          ))}
        </>
      ))}
   
      {signUpDetails.map((signUpDetail, index) => (
        <>
          {pamentDetails.map((paymentDetail, paymentIndex) => (
            <>
              {1 === paymentIndex && (
                <tr key={`${index}-${paymentIndex}`}>
                  <td>{fillDetails[index]?.fullname}</td>
                  <td>{signUpDetail?.mobileno}</td>
                  <td>{signUpDetail?.email}</td>
                  <td>{StrucutureDetails[index]?.marketValue}</td>
                  <td>Address</td> {/* Placeholder for address data */}
                  <td>{paymentDetail?.year}</td>
                  <td>{paymentDetail?.premium}</td>
                  <td>{signUpDetail?.customerId}</td>
                </tr>
              )}
            </>
          ))}
        </>
      ))}
      {signUpDetails.map((signUpDetail, index) => (
        <>
          {pamentDetails.map((paymentDetail, paymentIndex) => (
            <>
              {2 === paymentIndex && (
                <tr key={`${index}-${paymentIndex}`}>
                  <td>{fillDetails[index]?.fullname}</td>
                  <td>{signUpDetail?.mobileno}</td>
                  <td>{signUpDetail?.email}</td>
                  <td>{StrucutureDetails[index]?.marketValue}</td>
                  <td>Address</td> {/* Placeholder for address data */}
                  <td>{paymentDetail?.year}</td>
                  <td>{paymentDetail?.premium}</td>
                  <td>{signUpDetail?.customerId}</td>
                </tr>
              )}
            </>
          ))}
        </>
      ))}
      {signUpDetails.map((signUpDetail, index) => (
        <>
          {pamentDetails.map((paymentDetail, paymentIndex) => (
            <>
              {3 === paymentIndex && (
                <tr key={`${index}-${paymentIndex}`}>
                  <td>{fillDetails[index]?.fullname}</td>
                  <td>{signUpDetail?.mobileno}</td>
                  <td>{signUpDetail?.email}</td>
                  <td>{StrucutureDetails[index]?.marketValue}</td>
                  <td>Address</td> {/* Placeholder for address data */}
                  <td>{paymentDetail?.year}</td>
                  <td>{paymentDetail?.premium}</td>
                  <td>{signUpDetail?.customerId}</td>
                </tr>
              )}
            </>
          ))}
        </>
      ))}
      {signUpDetails.map((signUpDetail, index) => (
        <>
          {pamentDetails.map((paymentDetail, paymentIndex) => (
            <>
              {5 === paymentIndex && (
                <tr key={`${index}-${paymentIndex}`}>
                  <td>{fillDetails[index]?.fullname}</td>
                  <td>{signUpDetail?.mobileno}</td>
                  <td>{signUpDetail?.email}</td>
                  <td>{StrucutureDetails[index]?.marketValue}</td>
                  <td>Address</td> {/* Placeholder for address data */}
                  <td>{paymentDetail?.year}</td>
                  <td>{paymentDetail?.premium}</td>
                  <td>{signUpDetail?.customerId}</td>
                </tr>
              )}
            </>
          ))}
        </>
      ))}
      {signUpDetails.map((signUpDetail, index) => (
        <>
          {pamentDetails.map((paymentDetail, paymentIndex) => (
            <>
              {6 === paymentIndex && (
                <tr key={`${index}-${paymentIndex}`}>
                  <td>{fillDetails[index]?.fullname}</td>
                  <td>{signUpDetail?.mobileno}</td>
                  <td>{signUpDetail?.email}</td>
                  <td>{StrucutureDetails[index]?.marketValue}</td>
                  <td>Address</td> {/* Placeholder for address data */}
                  <td>{paymentDetail?.year}</td>
                  <td>{paymentDetail?.premium}</td>
                  <td>{signUpDetail?.customerId}</td>
                </tr>
              )}
            </>
          ))}
        </>
      ))}
      {signUpDetails.map((signUpDetail, index) => (
        <>
          {pamentDetails.map((paymentDetail, paymentIndex) => (
            <>
              {7 === paymentIndex && (
                <tr key={`${index}-${paymentIndex}`}>
                  <td>{fillDetails[index]?.fullname}</td>
                  <td>{signUpDetail?.mobileno}</td>
                  <td>{signUpDetail?.email}</td>
                  <td>{StrucutureDetails[index]?.marketValue}</td>
                  <td>Address</td> {/* Placeholder for address data */}
                  <td>{paymentDetail?.year}</td>
                  <td>{paymentDetail?.premium}</td>
                  <td>{signUpDetail?.customerId}</td>
                </tr>
              )}
            </>
          ))}
        </>
      ))}
      {signUpDetails.map((signUpDetail, index) => (
        <>
          {pamentDetails.map((paymentDetail, paymentIndex) => (
            <>
              {8 === paymentIndex && (
                <tr key={`${index}-${paymentIndex}`}>
                  <td>{fillDetails[index]?.fullname}</td>
                  <td>{signUpDetail?.mobileno}</td>
                  <td>{signUpDetail?.email}</td>
                  <td>{StrucutureDetails[index]?.marketValue}</td>
                  <td>Address</td> {/* Placeholder for address data */}
                  <td>{paymentDetail?.year}</td>
                  <td>{paymentDetail?.premium}</td>
                  <td>{signUpDetail?.customerId}</td>
                </tr>
              )}
            </>
          ))}
        </>
      ))}
    </tbody>
  </table>
</div>

</div>

{/* <div >

<h5> User Name :  {fillDetails.map(details=><span>{details.fullname}</span>)}</h5>    
<h5> user Mobileno :  {signUpDetails.map(details=><span>{details.mobileno}</span>)}</h5> 
<h5> user MailId :  {signUpDetails.map(details=><span>{details.email}</span>)}</h5> 
<h5> Property Value :  {StrucutureDetails.map(details=><span>{details.marketValue}</span>)}</h5> 
<h5> user Mobileno :  {signUpDetails.map(details=><span>{details.mobileno}</span>)}</h5> 
<h5>Address : </h5>
<h5> NO OF Years :  {pamentDetails.map(details=><span>
  <td>{details.year}</td>
  </span>)}</h5> 
<h5> premium Amount :  {pamentDetails.map(details=><span><td>{details.premium}</td></span>)}</h5> 
<h5> customerID :  { signUpDetails.map(details=><span>{details.customerId}</span>)}</h5> 

</div> */}

    {/* {signUpRowsAsString}
    {customerid} */}
    {/* {mobileno} */}
    </div>
    </div>
  )
}

export default LoginPage
