import React, { useEffect, useState } from 'react';
import VehicleInsuranceService from '../Service/VehicleInsuranceService';

function AdminPaymentsPageVI() {
//   const [structureDetails, setStructureDetails] = useState([]);
//   const [signUpDetails, setSignUpDetails] = useState([]);
//   const [fillDetails, setFillDetails] = useState([]);
  const [premiumDetails, setPremiumDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // PropertyInsuranceService.getAllDetails().then((res) => {
    //   setStructureDetails(res.data);
    // });

    // PropertyInsuranceService.getCustomer().then((res) => {
    //   setSignUpDetails(res.data);
    // });

    // PropertyInsuranceService.getfillDetails().then((res) => {
    //   setFillDetails(res.data);
    // });

    VehicleInsuranceService.getPolocyDetails().then((res) => {
      setPremiumDetails(res.data);
    });
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredDetails = searchTerm
    ? premiumDetails.filter(details => 
        details.customerid.toString().includes(searchTerm) || `RSI404PI0${details.id}`.includes(searchTerm)
      )
    : premiumDetails ;

  const idNotFound = searchTerm && filteredDetails.length === 0;

  return (
    <div className='container-fluid'>
      <div className='mx-4 mt-3'>
        <div className='row'>
          <h3 className='text-center bg-primary text-light rounded fw-bold'>Payments & Transactions <i className="fa-solid fa-file-invoice ms-2"></i></h3>
          {/* <div className='col-4'>
                <h3>All Customers Payment Details :</h3>
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
              <h5 className="text-success mt-3 text-center">{filteredDetails.length} Records Found.</h5>
              )}
          </div>
          <div className='col-6 d-flex justify-content-end mt-3'>
            <p className='fw-semibold fs-5 me-lg-3'>Total Number of Customers : <span className='fw-bold'> &nbsp;{premiumDetails.length}</span></p>
          </div>
          {/* <div className='col-6'>
      <h3>Total Number Of Payments :  &nbsp;{premiumDetails.length}</h3>
        </div> */}
      </div>
      {/* <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Customer ID or Policy ID"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {idNotFound && <h5 className='text-danger mt-3'>No records were found.</h5>}
      </div>
      <div>
      {searchTerm && !idNotFound && (
        <h5 className="mt-3">{filteredDetails.length} records found.</h5>
      )}
      </div> */}
      {!idNotFound && filteredDetails.length > 0 && (
        <table className='table table-striped-columns table-bordered table-hover border-dark mt-lg-4'>
          <thead className='text-center'>
            <tr>
              <th className='text-primary'>Sl.No</th>
              <th className='text-primary'>Customer ID</th>
              <th className='text-primary'>Payment ID</th>
              <th className='text-primary'>Premium Amount</th>
              <th className='text-primary'>No. Of Years</th>
              <th className='text-primary'>Policy ID</th>
              {/* <th className='text-primary'>Current Date</th> */}
            </tr>
          </thead>
          <tbody className='text-center'>
            {filteredDetails.map((details,index) => (
              <tr key={details.id}>
                <td>{index + 1}</td>
                <td>{details.customerid}</td>
                <td>{details.paymentid}</td>
                <td>₹ {details.premiumAmount} /-</td>
                <td>{details.vyear}</td>
                <td>RSI404PI0{details.id}</td>
                {/* <td></td> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>
    </div>
  );
}

export default AdminPaymentsPageVI;