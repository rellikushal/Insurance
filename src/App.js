import React, { useEffect } from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import AdminPage from './Component/AdminPage';
import Login from './Component/Login';
import LoginPage from './Component/LoginPage';
import StrucureAndDetails from './Component/StrucureAndDetails';
import GetQuote from './Component/GetQuote';
import FilldetailsPage from './Component/FilldetailsPage';
import PaymentPage from './Component/PaymentComponent/PaymentPage';
import {gapi} from 'gapi-script';
import Profile from './Component/Profile';
import ProtectedRoutes from './utils/ProtectedRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorPage from './Component/ErrorPage';
import PaymentSuccessPage from './Component/PaymentComponent/PaymentSuccess';
import AdminLoginCredentials from './Component/Admin/AdminLoginCredentials';
import AdminHomePage from './Component/Admin/AdminHome';
import ContextMain from './Component/UseContext/ContextMain';
import CustomerManagementPage from './Component/Admin/CustomerManagement';
import PolicyManagementPage from './Component/Admin/PolicyManagement';
import AdminPaymentsPage from './Component/Admin/AdminPayments';
import AdminClaimsPage from './Component/Admin/AdminClaims';
import AdminNotificationsPage from './Component/Admin/AdminNotifications';
import PremiumAccess from './Component/Admin/AdminPremium';
import Claims from './Component/Claims';
import Login1 from './Component/Login1';
import MyAccount from './Component/MyAccount';
// import Login from './Components/Login';
import Bikeentry from './Components/Bikeentry';
import SecondPage from './Components/SecondPage';
import ThirdPage from './Components/ThirdPage';
import Payment from './Components/Payment';
import UserLogin from './Components/UserLogin';
import ReviewPage from './Components/ReviewPage';
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaymentSuccessPag from './Components/PaymentSuccessPag';

// import Login from './Components/Login';
// import Bikeentry from './Components/Bikeentry';
// import SecondPage from './Components/SecondPage';
// import ThirdPage from './Components/ThirdPage';
// import Payment from './Components/Payment';
// import UserLogin from './Components/UserLogin';
// import ReviewPage from './Components/ReviewPage';
// import PaymentSuccessPage from './Components/PaymentSuccessPage';
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminNotificationspage from './Component/Admin/AdminNotifications';
import AdminNotificationspageVI from './Components/Admin/AdminNotificationVI';

import AdminLoginCredentialsVI from './Components/Admin/AdminLoginCredentialsVI';
import AdminHomePageVI from './Components/Admin/AdminHomeVI';
import AdminPaymentsPageVI from './Components/Admin/AdminPaymentsPageVI';
import AdminPolicyManagementVI from './Components/Admin/AdminPolicyManagementVI';
import CustomerManagementPageVI from './Components/Admin/CustomerManagementVI';

const clientId = "246541673533-e90kj0pumgndrmt51j27v853d3pkon00.apps.googleusercontent.com";

function App() {


  useEffect(() => {
    function start() {
    gapi.client.init({
    clientid: clientId,
    scope: ""
    })
  };
   
    gapi.load('client:auth2', start);
});


  return (
    <div >
      <Router>
        <ContextMain>
        <div>
          <Routes>
            <Route exact path="/" element={<Login/>}/>
              <Route exact path="/property" element={<StrucureAndDetails/>}/>
              <Route path="/getQuote" element={<GetQuote/>}/>
              <Route path="/*" element={<ErrorPage/>}/>

            <Route element={<ProtectedRoutes/>}>
              <Route exact path="/login" element={<LoginPage/>}/>
              <Route path="/admin" element={<AdminPage/>}/>
              <Route path="/fill" element={<FilldetailsPage/>}/>
              <Route path="/payment" element={<PaymentPage/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/paymentsuccess" element={<PaymentSuccessPage/>}/>
              <Route path="/adminhome" element={<AdminHomePage/>}/>
            <Route path="/admincustomer" element={<CustomerManagementPage/>}/>
            <Route path="/adminpolicy" element={<PolicyManagementPage/>}/>
            <Route path="/adminpayments" element={<AdminPaymentsPage/>}/>
            <Route path="/adminclaims" element={<AdminClaimsPage/>}/>
            <Route path="/adminnotifications" element={<AdminNotificationspage/>}/>
            <Route path="/adminlogin" element={<AdminLoginCredentials/>}/>
            <Route path="/login1" element={<Login1/>}/>
            <Route path="/adminpremium" element={<PremiumAccess/>}/>
            <Route path="/claims" element={<Claims/>}/>
            <Route path="/myaccount" element={<MyAccount/>}/>
            {/* <Route path="/adminpremium" element={<PremiumAccess/>}/> */}
            </Route>

            <Route path='/' element={<Login/>}/>
         <Route path='/Bikeentry' element={<Bikeentry/>}/>
         <Route path='/Registration' element={<SecondPage/>}/>
         <Route path='/Quotation' element={<ThirdPage/>}/>
         <Route path='/paymentVI' element={<Payment/>}/>
         <Route path='/userlogin' element={<UserLogin/>}/>
         <Route path='/PaymentSuccessPage' element={<PaymentSuccessPag/>}/>
         <Route path='/userProfile' element={<ReviewPage/>}/>



         <Route path='/adminVI' element={<AdminLoginCredentialsVI/>}/>
         <Route path='adminHomeVI' element={<AdminHomePageVI/>}/>
         <Route path='/adminpolicyVI' element={<AdminPolicyManagementVI/>}/>
         <Route path='/admincustomerVI' element={<CustomerManagementPageVI/>}/>
         <Route path='/adminpaymentsVI' element={<AdminPaymentsPageVI/>}/>
         <Route path='/adminnotificationsVI' element={<AdminNotificationspageVI/>}/>


          </Routes>
        </div>
        </ContextMain>
      </Router>
    <ToastContainer autoClose={5000} />
    </div>
  )
}

export default App

