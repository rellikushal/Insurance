import React, { Component } from 'react'
import PropertyInsuranceService from './Service/PropertyInsuranceService';

export default class AdminPage extends Component {

  constructor(props)
  {
      super(props);

      this.state={
          structureDetails:[],
          signUpDetails:[],
          fillDetails:[],
          premiumDetails:[]
      }
  }

  componentDidMount(){
    PropertyInsuranceService.getAllDetails().then((res)=>
  {
      this.setState({structureDetails:res.data});
  })

  PropertyInsuranceService.getCustomer().then((res)=>{
    this.setState({signUpDetails:res.data});
  })

  PropertyInsuranceService.getfillDetails().then((res)=>{
    this.setState({fillDetails:res.data});
  })

  PropertyInsuranceService.getPaymentData().then((res)=>{
    this.setState({premiumDetails:res.data});
  })
}

  render() {
    return (
      <div>
        <h1 className='text-primary text-center'>welcome To The AdminPage</h1>
        <div className='container my-5'>
          <h3> StrucutureDetails :</h3>
      <table className='text-center table table-striped table-bordered' >
          <thead>
            <tr>
              <th>Id</th>
              <th>Property Value </th>
              <th>SquareFeet</th>
              <th>Pincode</th>
              <th>Age Of The Building</th>
              <th>Security</th>
              <th>PaymentID</th>
              <th>customerID</th>
            </tr>
          </thead>
          <tbody>
      
             {
              this.state.structureDetails.map(
                details=>
                <tr key={details.id}>
                    <td>{details.id}</td>
                    <td>{details.marketValue}</td>
                    <td>{details.squareFeet}</td>
                    <td>{details.pincode}</td>
                    <td>{details.buildingAge}</td>
                    <td>{details.security}</td>
                    <td>{details.paymentId}</td>
                    <td>{details.customerId}</td>
                </tr>
              )
             }
         
          </tbody>
      </table>
    </div>

    <div className='container my-5'>
          <h3> Customer Signup Details :</h3>
      <table className='text-center table table-striped table-bordered' >
          <thead>
            <tr>
              <th>Id</th>
              <th>UserName</th>
              <th>UserMobileNo</th>
              <th>UserEmail</th>
              <th>UserPassword</th>
              <th>customerID</th>
            </tr>
          </thead>
          <tbody>
      
             {
              this.state.signUpDetails.map(
                details=>
               
                <tr key={details.id}>
                    <td>{details.id}</td>
                    <td>{details.name}</td>
                    <td>{details.mobileno}</td>
                    <td>{details.email}</td>
                    <td>{details.password}</td>
                    <td>{details.customerId}</td>
                </tr>
              )
             }
         
          </tbody>
      </table>
    </div>
    <div className='container my-5'>
          <h3> Customer And Property Address Details :</h3>
      <table className='text-center table table-striped table-bordered' >
          <thead>
            <tr>
            <th>Id</th>
              <th>Full Name </th>
              <th>PanCard No</th>
              <th>Date Of Birth</th>
              <th>Current Address</th>
              <th>propertypincode</th>
              <th>propertyhouseNo</th>
              <th>propertystreetNo</th>
              <th>Pincode</th>
              <th>House No</th>
              <th>Street</th>
              <th>PaymentID</th>
              <th>customerID</th>
            </tr>
          </thead>
          <tbody>
          
             {
              this.state.fillDetails.map(
                details=>
                <tr key={details.id}>
                    <td>{details.id}</td>
                    <td>{details.fullname}</td>
                    <td>{details.pancard}</td>
                    <td>{details.dob}</td>
                    <td>{details.currentaddress}</td>
                    <td>{details.propertypincode}</td>
                     <td>{details.propertyhouseNo}</td>
                     <td>{details.propertystreetNo}</td>
                     <td>{details.pincode}</td>
                     <td>{details.houseno}</td>
                     <td>{details.streetno}</td>
                     <td>{details.paymentId}</td>
                     <td>{details.customerId}</td>
                </tr>
              )
             }
         
          </tbody>
      </table>
    </div>

    <div className='container my-5'>
          <h3> Year Premium details :</h3>
      <table className='text-center table table-striped table-bordered' >
          <thead>
            <tr>
            <th>Id</th>
             <th>No of Years</th>
             <th>Premium Amount</th>
             <th>PaymentID</th>
             <th>customerID</th>
            </tr>
          </thead>
          <tbody>
          
             {
              this.state.premiumDetails.map(
                details=>
                <tr key={details.id}>
                    <td>{details.id}</td>
                    <td>{details.year}</td>
                    <td>{details.premium}</td>
                    <td>{details.paymentId}</td>
                    <td>{details.customerId}</td>
                </tr>
              )
             }
         
          </tbody>
      </table>
    </div>
    
      </div>
    )
  }
}
