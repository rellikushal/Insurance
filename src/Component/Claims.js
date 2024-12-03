import React, { useContext, useEffect, useState } from 'react';
import Header from './Header';
import './Claims.css';
import axios from 'axios';
import PropertyInsuranceService from './Service/PropertyInsuranceService';
import { RsContextCreater } from './UseContext/ContextMain';

const Claims = () => {
  const { detailsCon } = useContext(RsContextCreater);
  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
  });
  const [signUpDetails, setSignUpDetails] = useState([]);
  const [StrucutureDetails, setStructureDetails] = useState([]);
  const [fillDetails, setFilldetails] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [imageError, setImageError] = useState(''); // State for image errors
  const [errors, setErrors] = useState({});

  const storedMobileNumber = detailsCon.loginMobNoCon;

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const res = await PropertyInsuranceService.getCustomerIdByMobileNo(storedMobileNumber);
        setSignUpDetails(res.data);
        const customerId = res.data[0]?.customerId;
        if (customerId) {
          const structureRes = await PropertyInsuranceService.getStructureDetailsByCustomerId(customerId);
          setStructureDetails(structureRes.data);
          const fillRes = await PropertyInsuranceService.getFillDetailsByCustomerId(customerId);
          setFilldetails(fillRes.data);
          const paymentRes = await PropertyInsuranceService.getPaymentDetailsByCustomerId(customerId);
          setPaymentDetails(paymentRes.data);
        }
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };
    fetchCustomerData();
  }, []);

  const [claimsData, setClaimsData] = useState({
    dateOfIncident: '',
    description: '',
    causeOfLoss: '',
    repairEstimates: '',
    additionalDetails: '',
    witnessStatement: '',
    policyId: '',
    customerId: '',
    holderName: '',
    mobileNumber: storedMobileNumber,
    email: '',
    propertyValue: '',
    address: '',
  });

  useEffect(() => {
    if (fillDetails.length > 0 && paymentDetails.length > 0) {
      setClaimsData({
        ...claimsData,
        holderName: fillDetails[0]?.fullname,
        customerId:paymentDetails[0]?.customerId,
        propertyValue:StrucutureDetails[0]?.marketValue,
        policyId: paymentDetails[0]?.id,
        email: signUpDetails[0]?.email,
        address: JSON.stringify({
          houseNo: fillDetails[0]?.propertyhouseNo,
          streetNo: fillDetails[0]?.propertystreetNo,
          city: fillDetails[0]?.propertycity,
          state: fillDetails[0]?.propertystate,
          pincode: fillDetails[0]?.propertypincode,
        }),
      });
    }
  }, [fillDetails, paymentDetails, signUpDetails]);

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      // Check for duplicate image
      const isDuplicate = Object.values(images).some(
        (image) => image && image.name === files[0].name
      );
      if (isDuplicate) {
        setImageError('Duplicate images are not allowed.');
      } else {
        setImageError('');
        setImages({ ...images, [name]: files[0] });
      }
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.length <= 1000) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
      setClaimsData({ ...claimsData, [name]: value });
    } else {
      setErrors(prevErrors => ({ ...prevErrors, [name]: 'Text cannot exceed 1000 characters' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for errors before submitting
    const newErrors = {};
    if (!claimsData.description) newErrors.description = 'Description is required';
    if (!claimsData.causeOfLoss) newErrors.causeOfLoss = 'Cause of Loss is required';
    if (Object.values(images).some(image => image && Object.values(images).filter(img => img?.name === image?.name).length > 1)) {
      newErrors.images = 'Duplicate images detected';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      console.error('Form has errors:', newErrors);
      return;
    }

    const product = new FormData();
    product.append('propertyclaimentity', JSON.stringify(claimsData));

    Object.keys(images).forEach((key) => {
      if (images[key]) {
        product.append('files', images[key]);
      }
    });

    try {
      const response = await axios.post('http://122.169.207.194:9092/api/propertyclaimentitys/uploadinservice', product, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Success:', response.data);alert("The data has been submitted for the admin's approval.");// Reset the form fields
     // Reset form fields
    setClaimsData({
      dateOfIncident: '',
      description: '',
      causeOfLoss: '',
      repairEstimates: '',
      additionalDetails: '',
      witnessStatement:'' ,
    });

    window.location.reload();
    } catch (error) {
      console.error('Error submitting claim:', error);
    }
  };

  return (
    <div className='container-fluid'>
      <Header />
      <div className='mt-5 row'>
        <div className='col-4 mt-3 '>
          <h3 className='text-center text-light rounded px-2 py-1' style={{ background: '#318ce7' }}>Policy Holder Details</h3>
          <div className='ms-3'>
            <p className='my-1'><span className='fw-semibold'>Policy Number &nbsp; : </span><span className='fw-bold text-dark'>RSI404PI0{paymentDetails[0]?.id}</span></p>
            <p className='my-1'><span className='fw-semibold'>Name &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;: </span><span className='fw-bold text-dark'>{fillDetails[0]?.fullname}</span></p>
            <p className='my-1'><span className='fw-semibold'>Property Value &nbsp; : </span><span className='fw-bold text-dark'>{StrucutureDetails[0]?.marketValue}</span></p>
            <p className='my-1'><span className='fw-semibold'>Mobile Number : </span><span className='fw-bold text-dark'>{storedMobileNumber}</span></p>
            <p className='my-1'><span className='fw-semibold'>Mail Id &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;: </span><span className='fw-bold text-dark'>{signUpDetails[0]?.email}</span></p>
            <div className='d-flex'>
              <p className="card-text fw-semibold col-4">
                Address &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;:
              </p>
              <span className="fw-bold col-8">
                {fillDetails[0]?.propertyhouseNo}, 
                {fillDetails[0]?.propertystreetNo},&nbsp;
                {fillDetails[0]?.propertycity}, &nbsp;
                {fillDetails[0]?.propertystate}, 
                {fillDetails[0]?.propertypincode}
              </span>
            </div>
          </div>
        </div>
        <div className='col-8 mt-3'>
          <form className='mx-2' onSubmit={handleSubmit}>
            <h3 className='text-center text-light rounded px-2 py-1' style={{ background: '#318ce7' }}>Claims Details</h3>
            <div className="my-1 mx-3 d-flex">
              <label className="form-label fw-semibold me-2 mt-1">Date Of Incident:</label>
              <input type="date" name="dateOfIncident" className="form-control fw-bold w-25 ms-1" value={claimsData.dateOfIncident} required onChange={handleChange} />
            </div>
            <div className="my-1 mx-3 fw-semibold me-2">
              <label className="form-label">Description Of Incident:</label>
              <textarea name="description" className="form-control w-75 ms-3" required rows="4" value={claimsData.description} onChange={handleChange}></textarea>
              {errors.description && <p className="text-danger">{errors.description}</p>}
            </div>
            <div className="my-1 mx-3 fw-semibold me-2">
              <label className="form-label">Cause Of Loss/Damage:</label>
              <textarea name="causeOfLoss" className="form-control w-75 ms-3" rows="3" required value={claimsData.causeOfLoss} onChange={handleChange}></textarea>
              {errors.causeOfLoss && <p className="text-danger">{errors.causeOfLoss}</p>}
            </div>
            <div className="my-1 mx-3 fw-semibold me-2">
              <label className="form-label mb-3">Photographs of Damage:</label>
              <div className="d-flex justify-content-evenly">
                {Object.keys(images).map((key, index) => (
                  <div key={index} className="image-upload">
                    <label htmlFor={key}>
                      {images[key] ? (
                        <img src={URL.createObjectURL(images[key])} alt="Uploaded" className='' />
                      ) : (
                        <span className='fw-bold fs-3'>+</span>
                      )}
                    </label>
                    <input
                      id={key}
                      type="file"
                      name={key}
                      accept="image/*"
                      onChange={handleImageChange}
                      className=''
                    />
                  </div>
                ))}
              </div>
              {imageError && <p className="text-danger text-center mt-2">{imageError}</p>}
            </div>

            <div className="my-1 mt-2 mx-3 fw-semibold">
              <label className="form-label">Repair estimates/Invoicing:</label>
              <textarea name="repairEstimates" className="form-control w-75 ms-3" rows="3" value={claimsData.repairEstimates} onChange={handleChange} required></textarea>
              {errors.repairEstimates && <p className="text-danger">{errors.repairEstimates}</p>}
            </div>
            <div className="my-1 mt-2 mx-3 fw-semibold">
              <label className="form-label">Any additional Details that support the claim:</label>
              <textarea name="additionalDetails" className="form-control w-75 ms-3" rows="3" value={claimsData.additionalDetails} onChange={handleChange} required></textarea>
              {errors.additionalDetails && <p className="text-danger">{errors.additionalDetails}</p>}
            </div>
            <div className="my-1 mt-2 mx-3 fw-semibold">
              <label className="form-label">Witness Statement (if applicable):</label>
              <textarea name="witnessStatement" className="form-control w-75 ms-3" rows="3" value={claimsData.witnessStatement} onChange={handleChange} required></textarea>
              {errors.witnessStatement && <p className="text-danger">{errors.witnessStatement}</p>}
            </div>
            <div className='my-3 d-flex justify-content-center'>
              <button type="submit" className="btn btn-primary px-2">Submit Claim</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Claims;