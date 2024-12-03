import React, { useEffect, useState } from 'react';
import VehicleInsuranceService from '../Service/VehicleInsuranceService';

function PolicyManagementPageVI() {
  const [premiumDetails, setPremiumDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    VehicleInsuranceService.getPolocyDetails().then((res) => {
      setPremiumDetails(res.data);
    });
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredDetails = premiumDetails.filter((detail) => {
    const policyId = `RSI404VI0${premiumDetails.indexOf(detail) + 1}`;
    const custid = detail.customerid.toString();
    return (
      (custid.includes(searchTerm)) ||
      policyId.includes(searchTerm)
    );
  });

  const idNotFound = searchTerm && filteredDetails.length === 0;
  const getPolicyCount = premiumDetails.length;

  return (
    <div className='container-fluid'>
      <div className='mx-4 mt-3'>
        <div className='row'>
          <h3 className='text-center bg-primary text-light rounded fw-bold'>
            Policy Management <i className="fa-solid fa-address-card ms-2"></i>
          </h3>
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
              <h5 className="mt-3 text-success text-center">{filteredDetails.length} Records Found.</h5>
            )}
          </div>
          <div className='col-6 d-flex justify-content-end mt-3'>
            <p className='fw-semibold fs-5 me-lg-3'>
              Total Number of Policies : <span className='fw-bold'> &nbsp;{getPolicyCount}</span>
            </p>
          </div>
        </div>
        <div className='mt-lg-4'>
          {filteredDetails.length === 0 ? (
            <h3 className="text-center fw-bold text-secondary mt-4">
              {/* <button onClick={HandleNewPolicy} className='btn btn-link fw-bold fs-4'>Buy any policy</button> */}
            </h3>
          ) : (
            <table className='table table-striped-columns table-bordered table-hover border-dark'>
              <thead className='text-center'>
                <tr>
                  <th className='text-primary'>Sl.No</th>
                  <th className='text-primary'>Policy ID</th>
                  <th className='text-primary'>Customer ID</th>
                  <th className='text-primary'>Property Value</th>
                  <th className='text-primary'>Premium Amount</th>
                  <th className='text-primary'>IDV</th>
                  <th className='text-primary'>Registration Year</th>
                </tr>
              </thead>
              <tbody className='text-center'>
                {filteredDetails.map((detail, index) => {
                  const policyId = `RSI404VI0${premiumDetails.indexOf(detail) + 1}`;
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{policyId}</td>
                      <td>{detail.customerid}</td>
                      <td>{detail.vprice}</td>
                      <td>₹ {detail.premiumAmount} /-</td>
                      <td>{detail.idv} Years</td>
                      <td>{detail.vyear}</td>
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

export default PolicyManagementPageVI;