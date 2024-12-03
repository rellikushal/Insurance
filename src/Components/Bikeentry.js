import React, { useState } from 'react';
import './Bikeentry.css';
import img2 from "../images/Bike.jpg"
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer1';
import VehicleInsuranceService from './Service/VehicleInsuranceService';

const BikeEntry = () => {
  const [bikeNumber, setBikeNumber] = useState('');
  const [error, setError] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { click, customerid, profile } = location.state || {};
  console.log(profile);

  const handleBikeNumberChange = (e) => {
    setBikeNumber(e.target.value.toUpperCase());
    setError(''); // Reset error message on input change
  };

  const validateBikeNumber = (number) => {
    const regex = /^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/;
    return regex.test(number);
  };

  const getVehicleAge = (registrationDate) => {
    const currentDate = new Date();
    //const regDate = new Date(registrationDate);
    const age = currentDate.getFullYear() - registrationDate;
    return age;
  };

  const handleSearch = () => {
    if (validateBikeNumber(bikeNumber)) {
      console.log(`Searching for bike number: ${bikeNumber}`);

      VehicleInsuranceService.checkPolicyStatus(bikeNumber)
        .then(response => {
          console.log(response);
          if (response.data[0])
          {
            setErr('This bike already has an insurance policy. Login to check the details');
          } 
          else 
          {
            VehicleInsuranceService.getVehicleDetails(bikeNumber)
              .then(resp => {
                console.log(resp);
                if (resp.data) {
                  const vehicleAge = getVehicleAge(resp.data.vyear);
                  if (vehicleAge >= 15) {
                    setErr('Policy cannot be given for vehicles 15 years or older');
                  } else {
                    if (click === true) {
                      navigate("/Registration", { state: { veh: resp.data, customerid: customerid, profile: profile,click:true } });
                    } else {
                      navigate("/Registration", { state: { veh: resp.data } });
                    }
                  }
                } else {
                  setErr('Vehicle does not exist');
                }
              })
              .catch(error => {
                console.log(error);
                setErr('Vehicle does not exist');
              });
          }
        })
        .catch(error => {
          console.log(error);
          setErr('Error checking policy status');
        });
    } else {
      setError('Please enter a valid bike number (e.g. UP15AB1234)');
    }
  };

  return (
    <div className='container-fluid'>
      <Header />
      <div className='content'>
        <div className='left'>
          <img src={img2} alt='Bike Insurance' className='image' />
        </div>
        <div className='right'>
          <h4>Buy your two-wheeler insurance in <br />60 seconds!* <i className="fa-solid fa-bolt fa-xl " style={{ color: "#FFD43B" }}></i></h4>
          <h6>Plan starting @ <i className="fa-solid fa-indian-rupee-sign"></i> 1.3/day</h6>
          <div className='input-section'>
            <input
              type='text'
              placeholder='Enter bike number (e.g. UP15AB1234)'
              value={bikeNumber}
              onChange={handleBikeNumberChange}
              maxLength={10}
            />
            {error && <p className='error'>{error}</p>}
            {err && <p className='error'>{err}</p>}
            <button onClick={handleSearch}>view prices</button>
          </div>
          <div className='options'>
            Existing user <a href='/userlogin' className='option-link'>Login</a> here
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BikeEntry;


// import React, { useState } from 'react';
// import  './Bikeentry.css';
// import img2 from "../images/Bike.jpg"
// import {  useLocation, useNavigate } from 'react-router-dom';
// import Header from './Header';
// import Footer from './Footer1';
// import VehicleInsuranceService from './Service/VehicleInsuranceService';


// const BikeEntry = () => {
//   const [bikeNumber, setBikeNumber] = useState('');
//   const [error, setError] = useState('');
//   const [err, setErr] = useState('');
//   const navigate = useNavigate();
//   const location = useLocation();
//   const {click,profile} = location.state || {};
//   console.log(profile);
//   const [veh,setVeh]=useState([]);

//   const handleBikeNumberChange = (e) => {
//     setBikeNumber(e.target.value.toUpperCase());
//     setError(''); // Reset error message on input change
//   };

//   const validateBikeNumber = (number) => {
//     const regex = /^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/;
//     return regex.test(number);
//   };


//   const handleSearch = () => {
//     if (validateBikeNumber(bikeNumber)) {
//       console.log(`Searching for bike number: ${bikeNumber}`);
  
//       VehicleInsuranceService.checkPolicyStatus(bikeNumber)
//         .then(response => {
//           console.log(response);
//           if (response.data[0]) {
//             setErr('This bike already has an insurance policy. Login to check the details');
//           } else {
//             if (click === true) {
//               VehicleInsuranceService.getVehicleDetails(bikeNumber)
//                 .then(resp => {
//                   console.log(resp);
//                   if (resp.data) {
//                     navigate("/Registration", { state: { veh: resp.data, profile: profile,click:true } });
//                   } else {
//                     setErr('Vehicle does not exist');
//                   }
//                 })
//                 .catch(error => {
//                   console.log(error);
//                   setErr('Vehicle does not exist');
//                 });
//             } else {
//               VehicleInsuranceService.getVehicleDetails(bikeNumber)
//                 .then(resp => {
//                   console.log(resp);
//                   if (resp.data) {
//                     navigate("/Registration", { state: { veh: resp.data } });
//                   } else {
//                     setErr('Vehicle does not exist');
//                   }
//                 })
//                 .catch(error => {
//                   console.log(error);
//                   setErr('Vehicle does not exist');
//                 });
//             }
//           }
//         })
//         .catch(error => {
//           console.log(error);
//           setErr('Error checking policy status');
//         });
//     } else {
//       setError('Please enter a valid bike number (e.g. UP15AB1234)');
//     }
//   };


//   return (
//     <div className='container-fluid'>
//       <Header/>
//       <div className='content'>
//         <div className='left'>
//           <img src={img2} alt='Bike Insurance' className='image' />
//         </div>
//         <div className='right'>
//           <h4>Buy your two-wheeler insurance in <br />60 seconds!*** <i className="fa-solid fa-bolt fa-xl " style={{ color: "#FFD43B" }}></i></h4>
//           <h6>Plan starting @ <i className="fa-solid fa-indian-rupee-sign"></i> 1.3/day</h6>
//           <div className='input-section'>
//             <input
//               type='text'
//               placeholder='Enter bike number (e.g. UP15AB1234)'
//               value={bikeNumber}
//               onChange={handleBikeNumberChange}
//               maxLength={10}
//             />
//             {error && <p className='error'>{error}</p>}
//             {err && <p className='error'>{err}</p>}
//             <button onClick={handleSearch}>view prices</button>
           
//           </div>
//           <div className='options'>
//             Existing user <a href='/userlogin' className='option-link'>Login</a>here
//           </div>
//         </div>
//       </div>
//       <Footer/>
//     </div>
//   );
// };

// export default BikeEntry;
