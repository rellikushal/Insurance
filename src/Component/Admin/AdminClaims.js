import React, { useEffect, useState } from 'react'
import PropertyInsuranceService from '../Service/PropertyInsuranceService'
import { Modal } from 'react-bootstrap';

const AdminClaimsPage = () => {

  const [claims, setClaims] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await PropertyInsuranceService.adminClaimsget();
        console.log(res.data);
        setClaims(res.data); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  const [productData, setProductData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Start with the first image
  const [loading, setLoading] = useState(true);

  // Function to fetch image data
  const fetchImageData = async () => {
    setLoading(true);
    try {
      const response = await PropertyInsuranceService.claimImages();
      setProductData(response.data);
      console.log(response.data)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching image data', error);
      setLoading(false);
    }
  };

  // Initial fetch when the component mounts
  // useEffect(() => {
  //   fetchImageData();
  // }, []);

  // Handle "Next" button click
  const handleNext = () => {
    if (productData && currentIndex < productData.images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Handle "Previous" button click
  const handlePrevious = () => {
    if (productData && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentImage = productData ? productData.images[currentIndex] : null;

 const [images,setImages]=useState(false);


const handleImage=()=>
{
  fetchImageData();
  setImages(true)
  
}
  
  return (
    <div>AdminClaimsPage
    <table className='table table-striped-columns table-bordered table-hover border-dark mt-lg-4'>
      <thead>
        <tr>
          <th>ID</th>
          <th>holderName</th>
          <th>email</th>
          <th>mobileNumber</th>
          <th>policyId</th>
          <th>customerId</th>
          <th>propertyValue</th>
          <th>witnessStatement</th>
          <th>repairEstimates</th>
          <th>description</th>
          <th>dateOfIncident</th>
          <th>causeOfLoss</th>
          <th>address</th>
          <th>additionalDetails</th>
          <th>images</th>
          {/* Add more headers as necessary */}
        </tr>
      </thead>
      <tbody>
        {claims.map((claim,index) => (
          <tr key={claim.id}>
            <td>{index+1}</td>
            <td>{claim.holderName}</td>
            <td>{claim.email}</td>
            <td>{claim.mobileNumber}</td>
            <td>{claim.policyId}</td>
            <td>{claim.customerId}</td>
            <td>{claim.propertyValue}</td>
            <td>{claim.witnessStatement}</td>
            <td>{claim.repairEstimates}</td>
            <td>{claim.description}</td>
            <td>{claim.dateOfIncident}</td>
            <td>{claim.causeOfLoss}</td>
            <td>{claim.address}</td>
            <td>{claim.additionalDetails}</td>
            <td><button className='btn btn-primary px-4 py-2' onClick={handleImage}>View</button></td>
            
            {/* Add more cells as necessary */}
          </tr>
        ))}
      </tbody>
    </table>

    <div>
    <Modal show={images}  className="m-5">
    <Modal.Body >
      {loading ? (
        <p>Loading...</p>
      ) : currentImage ? (
        <div>
          <img src={currentImage.url} alt={`Image ${currentIndex + 1}`} style={{ width: '600px', height: '400px' }} />
          <p>{currentImage.imageStatus}</p>
          <div>
            <button onClick={handlePrevious} disabled={currentIndex === 0}>Previous</button>
            <button onClick={handleNext} disabled={currentIndex === productData.images.length - 1}>Next</button>
           
          </div>
        </div>
       
      ) : (
        <div>
        <p>No image data available.</p>
       
        </div>
      )}
      </Modal.Body>
        </Modal>
    </div>
    </div>
  );
};

export default AdminClaimsPage