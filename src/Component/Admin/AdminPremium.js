import React, { useEffect, useState } from 'react';
import PropertyInsuranceService from '../Service/PropertyInsuranceService';
import { Modal } from 'react-bootstrap';
import p3 from '../images/p3.jpeg';

function PremiumAccess() {
  const [formData, setFormData] = useState({
    p1: '',
    p2: '',
    p3: '',
    p4: '',
    p5: '',
    p6: '',
    p7: '',
    p8: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [premiumDetails, setPremiumDetails] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    PropertyInsuranceService.getPremiumAllDetails()
      .then((res) => {
        setPremiumDetails(res.data);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    PropertyInsuranceService.addPremiumDetails(formData)
      .then((res) => {
        console.log(res.data);
        if (res.data === "aded") {
          PropertyInsuranceService.setPremiumDetails();
          setShowForm(false);
          setFormData({
            p1: '',
            p2: '',
            p3: '',
            p4: '',
            p5: '',
            p6: '',
            p7: '',
            p8: ''
          });
          window.location.reload();
        }
      })
      .catch(() => {});
  };

  const handleAddButtonClick = () => {
    setShowForm(true);
  };

  const handleCloseButtonClick = () => {
    setShowForm(false);
  };

  const handleSetPremiumValues = (id) => {
    console.log("hi");
    console.log(id);
    console.log('clicked');
    PropertyInsuranceService.setPremiumDetails(id).then((res)=>{console.log(res)}).catch(()=>{});
  };

  console.log(premiumDetails);

  return (
    <div className="container-fluid">
      <div>
        <div className='mx-4 mt-3'>
          <h3 className='text-center bg-primary text-light rounded fw-bold'>
            Premium Calculations <i className="fa-solid fa-hand-holding-dollar ms-1"></i>
          </h3>
          <div className='d-flex justify-content-end me-5 my-2'>
            <button className='btn btn-success px-4' onClick={handleAddButtonClick}>
              Add
            </button>
          </div>
          <table className="table table-striped table-bordered table-hover border-dark mt-lg-4">
            <thead className="text-center">
              <tr>
                <th className="text-primary">ID</th>
                <th className="text-primary">Base Premium Rate</th>
                <th className="text-primary">Rate for Buildings 0 to 5 Years</th>
                <th className="text-primary">Rate for Buildings 5 to 10 Years</th>
                <th className="text-primary">Rate for Buildings 10 to 15 Years</th>
                <th className="text-primary">Rate for Buildings 15 to 20 Years</th>
                <th className="text-primary">Rate for Buildings 20 to 25 Years</th>
                <th className="text-primary">Rate with Security</th>
                <th className="text-primary">Rate without Security</th>
                <th className="text-primary">Max Value</th>
                <th className="text-primary">Min Value</th>
                <th className="text-primary">Select to calculate Premium Amount for user</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {premiumDetails.map((data, index) => (
                <tr key={index}>
                  <td>{data.id}</td>
                  <td>{data.p1}</td>
                  <td>{data.p2}</td>
                  <td>{data.p3}</td>
                  <td>{data.p4}</td>
                  <td>{data.p5}</td>
                  <td>{data.p6}</td>
                  <td>{data.p7}</td>
                  <td>{data.p8}</td>
                  <td><strong>{(parseFloat(data.p1) + parseFloat(data.p6) + parseFloat(data.p8)).toFixed(4)}</strong></td>
                  <td><strong>{(parseFloat(data.p1) + parseFloat(data.p2) + parseFloat(data.p7)).toFixed(4)}</strong></td>
                  <td>
                    <button
                      className="btn btn-primary px-3"
                      onClick={() => handleSetPremiumValues(data.id)}
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <Modal show={showForm} onHide={handleCloseButtonClick} className='mt-5'>
            <Modal.Header closeButton>
              <img src={p3} alt='logo' className='rounded' style={{ height: '40px' }} />
            </Modal.Header>
            <Modal.Body className=''>
              <div className=''>
                <h4 className='text-center rounded fw-semibold p-3'>Add Premium Calculation</h4>
                <form onSubmit={handleSubmit} className='p-4'>
                  {Object.keys(formData).map((key) => (
                    <div key={key} className='mb-3'>
                      <div className='row align-items-center'>
                        <div className='col-6'>
                          <label className='form-label fw-semibold'>
                            {key === 'p1' ? 'Base Premium Rate :'
                              : key === 'p2' ? 'Rate for Buildings 0 to 5 Years :'
                                : key === 'p3' ? 'Rate for Buildings 5 to 10 Years :'
                                  : key === 'p4' ? 'Rate for Buildings 10 to 15 Years :'
                                    : key === 'p5' ? 'Rate for Buildings 15 to 20 Years :'
                                      : key === 'p6' ? 'Rate for Buildings 20 to 25 Years :'
                                        : key === 'p7' ? 'Rate with Security :'
                                          : 'Rate without Security :'}
                          </label>
                        </div>
                        <div className='col-6'>
                          <input
                            type="number"
                            className='form-control'
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className='d-flex justify-content-between'>
                    <button type="submit" className='btn btn-primary'>Submit</button>
                    <button type="button" className='btn btn-secondary' onClick={handleCloseButtonClick}>Close</button>
                  </div>
                </form>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default PremiumAccess;