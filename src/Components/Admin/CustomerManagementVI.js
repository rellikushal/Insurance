import React, { useEffect, useState } from 'react';
import VehicleInsuranceService from '../Service/VehicleInsuranceService';

function CustomerManagementPageVI() {
  const [signUpDetails, setSignUpDetails] = useState([]);
//   const [fillDetails, setFillDetails] = useState([]);
  const [premiumDetails, setPremiumDetails] = useState([]);
  const [searchCustomerId, setSearchCustomerId] = useState('');

  useEffect(() => {

    VehicleInsuranceService.getCustomerDetails().then((res) => {
      setSignUpDetails(res.data);
    });

    VehicleInsuranceService.getPolocyDetails().then((res) => {
        setPremiumDetails(res.data);
      });

  }, []);

  const handleSearchChange = (e) => {
    setSearchCustomerId(e.target.value);
  };
  
  const filteredSignUpDetails = searchCustomerId
    ? signUpDetails.filter(details => 
        ( details.customerid.toString().includes(searchCustomerId)) 
      )
    : signUpDetails;


  const idNotFound = searchCustomerId && filteredSignUpDetails.length === 0;

  const getCustomersCount = signUpDetails.length;

  return (
    <div className='container-fluid'>
      <div className='mx-4 mt-3'>
        <div className='row'>
          <h3 className='text-center bg-primary text-light rounded fw-bold'>Customer Management <i className="fa-solid fa-user ms-2"></i></h3>
          {/* <div className='col-4'>
            <h3>All Customers Details :</h3>
          </div> */}
          <div className='col-6 mb-3 mt-3'>
            <input
              type="search"
              className="form-control w-75 ms-lg-5"
              placeholder="Search by Customer ID"
              value={searchCustomerId}
              onChange={handleSearchChange}
            />
            {idNotFound && <h5 className='text-danger mt-3 text-center'>No Records Are Found.</h5>}
            {searchCustomerId && !idNotFound && (
            <h5 className="mt-3 text-success text-center">{filteredSignUpDetails.length} Records Found.</h5>
            )}
          </div>
          <div className='col-6 d-flex justify-content-end mt-3'>
            <p className='fw-semibold fs-5 me-lg-3'>Total Number of Customers : <span className='fw-bold'> &nbsp;{getCustomersCount}</span></p>
          </div>
          {/* <div className='col-6'>
            <h3>Total Number Of Customers :  &nbsp;{getCustomersCount}</h3>
          </div> */}
      </div>
      {/* <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Customer ID"
          value={searchCustomerId}
          onChange={handleSearchChange}
        />
        {idNotFound && <h5 className='text-danger mt-3'>No records were found.</h5>}
        {searchCustomerId && !idNotFound && (
        <h5 className="mt-3">{filteredSignUpDetails.length} records found.</h5>
      )}
      </div> */}
      {!idNotFound && filteredSignUpDetails.length > 0 && (
        <table className='table table-striped-columns table-bordered table-hover border-dark mt-lg-4'>
          <thead className='text-center'>
            <tr>
              <th className='text-primary'>Sl.No</th>
              <th className='text-primary'>User Name</th>
              <th className='text-primary'>User Mobile No.</th>
              <th className='text-primary'>User Email</th>
              <th className='text-primary'>Customer ID</th>
              <th className='text-primary'>No. Of Policies Taken</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {filteredSignUpDetails.map((details) => {
              const count = premiumDetails.filter(pd => pd.customerid === details.customerid).length;

              if (count > 0) {
            
                return (
                  // <tr key={details.id,index}>
                  //   <td>{index+1}</td>
                  //   <td>{details.fullName}</td>
                  //   <td>{details.mobile}</td>
                  //   <td>{details.email}</td>
                  //   <td>{details.customerid}</td>
                  //   <td>{count}</td>
                  // </tr>
                  <tr key={details.id}>
                  <td>{filteredSignUpDetails.filter(d => 
                    premiumDetails.filter(pd => pd.customerid === d.customerid).length > 0
                  ).indexOf(details) + 1}</td>
                  <td>{details.fullName}</td>
                  <td>{details.mobile}</td>
                  <td>{details.email}</td>
                  <td>{details.customerid}</td>
                  <td>{count}</td>
                </tr>
                );

              }
              return null;
            })}
          </tbody>
        </table>
      )}
      </div>
    </div>
  );
}

export default CustomerManagementPageVI;