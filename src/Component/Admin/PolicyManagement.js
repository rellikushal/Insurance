import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyInsuranceService from '../Service/PropertyInsuranceService';

function PolicyManagementPage() {

  const [structureDetails, setStructureDetails] = useState([]);
  const [signUpDetails, setSignUpDetails] = useState([]);
  const [fillDetails, setFillDetails] = useState([]);
  const [premiumDetails, setPremiumDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    PropertyInsuranceService.getAllDetails().then((res) => {
      setStructureDetails(res.data);
    });

    PropertyInsuranceService.getCustomer().then((res) => {
      setSignUpDetails(res.data);
    });

    PropertyInsuranceService.getfillDetails().then((res) => {
      setFillDetails(res.data);
    });

    PropertyInsuranceService.getPaymentData().then((res) => {
      setPremiumDetails(res.data);
    });
  }, []);

  let navigate = useNavigate();

  const HandleNewPolicy = () => {
    var i = 1;
    var emailId = signUpDetails[0].email;
    var mobileno = signUpDetails[0].email;
    navigate('/property', { state: { i, mobileno, emailId } });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredDetails = fillDetails.filter(detail => {
    const policyId = `RSI404PI0${fillDetails.indexOf(detail) + 1}`;
    return detail.customerId.includes(searchTerm) || policyId.includes(searchTerm);
  });

  // const [id,setId] = useState("");
  // const id = "Id Was Not Found";

 const idNotFound = searchTerm && filteredDetails.length === 0;

 const getPolicyCount = premiumDetails.length;

 console.log(structureDetails);
 console.log(premiumDetails);
 console.log(structureDetails);
 console.log(signUpDetails);

  return (
    <div className='container-fluid'>
      <div className='mx-4 mt-3'>
       <div className='row'>
          <h3 className='text-center bg-primary text-light rounded fw-bold'>Policy Management <i className="fa-solid fa-address-card ms-2"></i></h3>
          {/* <div className='col-4'>
          <h3>All Customers Details :</h3>
          </div> */}
           <div className='col-6 mb-3 mt-3'>
              <input
                type="search"
                className="form-control w-75 ms-lg-5"
                placeholder="Search by Customer ID or Policy ID"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              {idNotFound && <h5 className='text-danger mt-3 text-center'>No Records Are Found.</h5>}
              {searchTerm && !idNotFound && (
                <h5 className="mt-3 text-success text-center">{filteredDetails.length} Records Found. </h5>
              )}
          </div>
          <div className='col-6 d-flex justify-content-end mt-3'>
            <p className='fw-semibold fs-5 me-lg-3'>Total Number of Policies : <span className='fw-bold'> &nbsp;{getPolicyCount}</span></p>
          </div>
       </div>
        <div className='mt-lg-4'>
          {filteredDetails.length === 0 ? (
            // setId("Id Was Not Found")
            <h3 className="text-center fw-bold text-secondary mt-4">
              {/* <button onClick={HandleNewPolicy} className='btn btn-link fw-bold fs-4'>Buy any policy</button> */}
              {/* <h5 className='text-danger'>{id}</h5> */}
            </h3>
          ) : (
            <table className='table table-striped-columns table-bordered table-hover border-dark'>
              <thead className='text-center'>
                <tr>
                  <th className='text-primary'>Sl.No</th>
                  <th className='text-primary'>Policy ID</th>
                  <th className='text-primary'>Customer ID</th>
                  <th className='text-primary'>Name</th>
                  <th className='text-primary'>Property Value</th>
                  <th className='text-primary'>Property Address</th>
                  <th className='text-primary'>Premium Amount</th>
                  <th className='text-primary'>No. of Years</th>
                  <th className='text-primary'>Age of the Building</th>
                  {/* <th>Invoice</th> */}
                  {/* <th>Starting Date</th>
                  <th>Ending Date</th> */}
                </tr>
              </thead>
              <tbody className='text-center'>
                {filteredDetails.map((detail, index) => {
                  const structureDetail = structureDetails.find(sd => sd.customerId === detail.customerId);
                  const premiumDetail = premiumDetails.find(pd => pd.customerId === detail.customerId);
                  const policyId = `RSI404PI0${fillDetails.indexOf(detail) + 1}`;
                  let customerId = premiumDetail?.customerId;
                  // let first8Digits = customerId ? customerId.substring(0, 8) : null;
                  // let lasst4Digits = first8Digits.substring(0,4);
                  // let yearSum = parseInt(lasst4Digits) + parseInt(premiumDetails[index]?.year);
                  // let RemainingDigits = first8Digits.substring(4,8);
                  // let EndingDate = yearSum + RemainingDigits ;
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{policyId}</td>
                      <td>{premiumDetail?.customerId}</td>
                      <td>{detail.fullname}</td>
                      <td>{structureDetail?.marketValue}</td>
                      <td>
                        {detail.propertyhouseNo}, {detail.propertystreetNo}, {detail.propertycity}, {detail.propertystate}, {detail.propertypincode}
                      </td>
                      <td>₹ {premiumDetails[index]?.premium} /-</td>
                      <td>{premiumDetails[index]?.year} Years</td>
                      <td>{structureDetails[index]?.buildingAge}</td>
                      {/* <td>
                        <a className='btn btn-success' href={`http://localhost:9092/api/v1/create/${premiumDetails[index]?.paymentId}`} download='invoice' target='_blank'>
                          <i className="fa-solid fa-download me-2"></i>Invoice
                        </a>
                      </td> */}
                      {/* <td>{first8Digits}</td>
                      <td>{EndingDate}</td> */}
                      {/* <td></td>
                      <td></td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default PolicyManagementPage;
