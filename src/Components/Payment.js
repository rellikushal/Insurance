import React, { useState, useEffect } from 'react';
import './Payment.css';
import Header from './Header';
import Footer from './Footer1';
import { useLocation, useNavigate } from 'react-router-dom';
import VehicleInsuranceService from './Service/VehicleInsuranceService';

function Payment() {
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { cData, idv, premiumAmount, price, vname,vyear,vnumber, userName } = location.state || {};

console.log(cData);
  const [customerData, setCustomerData] = useState({
    paymentid: '',
    customerid: '',
    vnumber: '',
    vprice: '',
    vname: '',
    idv: '',
    vyear: '',
    premiumAmount: ''
  });

  

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handlePay = () => {
    if (selectedOption === 'Razorpay') {
      const amount = premiumAmount * 100; // Amount in paise (e.g., 1000 paise = ₹10)
      const userDetails = {
        fullName: userName,
        email: cData.email,
        mobile: cData.mobile,
        propertyflatNbr: '504',
        propertyStreet: 'S.R nagar',
        propertyPincode: '500038',
      };

      const options = {
        key: 'rzp_test_Su4WV4zdBIGTmZ',
        key_secret: 'EmH6eToe5CvCfAfgfADREv3C',
        amount: amount,
        name: 'RS Insurance Company',
        description: 'Product/Service Description',
        handler: function (response) {
          const updatedCustomerData = {
            paymentid: response.razorpay_payment_id,
            customerid: cData.customerid,
            vnumber: vnumber,
            vprice: price,
            vname: vname,
            idv,
            vyear: vyear,
            premiumAmount
          };
          setCustomerData(updatedCustomerData);
        },
        prefill: {
          name: userDetails.fullName,
          email: userDetails.email,
          contact: userDetails.mobile,
        },
        notes: {
          address: `${userDetails.propertyflatNbr}, ${userDetails.propertyStreet}, ${userDetails.propertyPincode}`,
        },
        theme: {
          color: '#F37254',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    }
  };

  useEffect(() => {
    if (customerData.paymentid) {
      sendPaymentDetails();
    }
  }, [customerData]);

  const sendPaymentDetails = async () => {
    try {
      console.log(customerData);
      const response = await VehicleInsuranceService.createPayment(customerData);
      //const response = await axios.post(`http://192.168.1.47:9090/payment/add`, customerData);
      if (response.status === 200) {
        navigate('/PaymentSuccessPage');
      } else {
        console.log('Failed to send payment details');
      }
    } catch (error) {
      console.error('Error sending payment details:', error);
    }
  };

  return (
    <div className='payment-main'>
      <Header />
      <h5 className='payment-header'><b>Welcome To The Payment Page</b></h5>
      <div className='payment-container'>
        <div>Choose Payment Options:</div>
        <label>
          <input
            className='c'
            type="radio"
            name="paymentOption"
            value="Razorpay"
            onChange={handleOptionChange}
          />
          Razorpay
        </label>
        <label>
          <input
            className='c'
            type="radio"
            name="paymentOption"
            value="UPI"
            onChange={handleOptionChange}
          />
          UPI
        </label>
        <label>
          <input
            className='c'
            type="radio"
            name="paymentOption"
            value="Other Options"
            onChange={handleOptionChange}
          />
          Other Options
        </label>
        <button className='submit' onClick={handlePay} disabled={selectedOption !== 'Razorpay'}>Pay</button>
      </div>
      <Footer />
    </div>
  );
}

export default Payment;


// import React, { useState, useEffect } from 'react';
// import './Payment.css';
// import Header from './Header';
// import Footer from './Footer1';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import VehicleInsuranceService from './Service/VehicleInsuranceService';

// function Payment() {
//   const [selectedOption, setSelectedOption] = useState('');
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { formData, idv, premiumAmount, price, veh, userName } = location.state || {};

//   const [cuid, setCuid] = useState('');
//   const [customerData, setCustomerData] = useState({
//     paymentid: '',
//     customerid: '',
//     vnumber: '',
//     vprice: '',
//     vname: '',
//     idv: '',
//     vyear: '',
//     premiumAmount: ''
//   });

//   useEffect(() => {
//     const fetchCustomerData = async () => {
//       try {
//         // const response = await axios.get(`http://192.168.1.2:9096/customer/get/${formData.mobile}`);
//         const response = await VehicleInsuranceService.getCustomerDetailsByMobile(formData.mobile);
//             if (response.status === 200) {
//           setCuid(response.data.customerid);
//         } else {
//           console.log('Failed to get customer data');
//         }
//       } catch (error) {
//         console.error('Error getting customer data:', error);
//       }
//     };

//     if (formData.mobile) {
//       fetchCustomerData();
//     }
//   }, [formData.mobile]);

//   const handleOptionChange = (event) => {
//     setSelectedOption(event.target.value);
//   };

//   const handlePay = () => { 
//     if (selectedOption === 'Razorpay') {
//       const amount = premiumAmount * 100; // Amount in paise (e.g., 1000 paise = ₹10)
//       const userDetails = {
//         fullName: userName,
//         email: formData.email,
//         mobile: formData.mobile,
//         propertyflatNbr: '504',
//         propertyStreet: 'S.R nagar',
//         propertyPincode: '500038',
//       };

//       const options = {
//         key: 'rzp_test_Su4WV4zdBIGTmZ',
//         key_secret: 'EmH6eToe5CvCfAfgfADREv3C',
//         amount: amount,
//         name: 'RS Insurance Company',
//         description: 'Product/Service Description',
//         handler: function (response) {
//           const updatedCustomerData = {
//             paymentid: response.razorpay_payment_id,
//             customerid: cuid,
//             vnumber: formData.vnumber,
//             vprice: price,
//             vname: veh.vname,
//             idv,
//             vyear: veh.vyear,
//             premiumAmount
//           };
//           setCustomerData(updatedCustomerData);
//         },
//         prefill: {
//           name: userDetails.fullName,
//           email: userDetails.email,
//           contact: userDetails.mobile,
//         },
//         notes: {
//           address: `${userDetails.propertyflatNbr}, ${userDetails.propertyStreet}, ${userDetails.propertyPincode}`,
//         },
//         theme: {
//           color: '#F37254',
//         },
//       };

//       const razorpay = new window.Razorpay(options);
//       razorpay.open();
//     }
//   };

//   useEffect(() => {
//     if (customerData.paymentid) {
//       sendPaymentDetails();
//     }
//   }, [customerData]);

//   const sendPaymentDetails = async () => {
//     try {
//       // const response = await axios.post(`http://192.168.1.2:9096/payment/add`, customerData);
//       const response = await VehicleInsuranceService.createPayment(customerData);
//       if (response.status === 200) {
//         navigate('/7');
//       } else {
//         console.log('Failed to send payment details');
//       }
//     } catch (error) {
//       console.error('Error sending payment details:', error);
//     }
//   };

//   return (
//     <div className='payment-main'>
//       <Header />
//       <h5 className='payment-header'><b>Welcome To The Payment Page</b></h5>
//       <div className='payment-container'>
//         <div>Choose Payment Options:</div>
//         <label>
//           <input
//             className='c'
//             type="radio"
//             name="paymentOption"
//             value="Razorpay"
//             onChange={handleOptionChange}
//           />
//           Razorpay
//         </label>
//         <label>
//           <input
//             className='c'
//             type="radio"
//             name="paymentOption"
//             value="UPI"
//             onChange={handleOptionChange}
//           />
//           UPI
//         </label>
//         <label>
//           <input
//             className='c'
//             type="radio"
//             name="paymentOption"
//             value="Other Options"
//             onChange={handleOptionChange}
//           />
//           Other Options
//         </label>
//         <button className='submit' onClick={handlePay} disabled={selectedOption !== 'Razorpay'}>Pay</button>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default Payment;
