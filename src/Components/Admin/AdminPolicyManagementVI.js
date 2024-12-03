import React, { useEffect, useState } from 'react';
import VehicleInsuranceService from '../Service/VehicleInsuranceService';

function AdminPolicyManagementVI() {
  const [premiumDetails, setPremiumDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    VehicleInsuranceService.getPolocyDetails().then((res) => {
      setPremiumDetails(res.data);
    });
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredDetails = premiumDetails.filter((detail, index) => {
    const policyId = `RSI404VI0${index + 1}`;
    return (
      policyId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      detail.customerid.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div>
      <div className='mt-lg-4'>
        <input 
          type="text" 
          placeholder="Search by Policy ID or Customer ID" 
          value={searchQuery} 
          onChange={handleSearch} 
          className="form-control mb-3"
        />
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
              const policyId = `RSI404VI0${index + 1}`;
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{policyId}</td>
                  <td>{detail.customerid}</td>
                  <td>{detail.vprice}</td>
                  <td>₹ {detail.premiumAmount} /-</td>
                  {/* <td>{detail.idv} Years</td> */}
                  <td>{detail.idv} </td>
                  <td>{detail.vyear}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminPolicyManagementVI;