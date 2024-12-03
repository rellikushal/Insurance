import axios from "axios";

const url = "http://localhost:9096";


class VehicleInsuranceService {
    

    //bikeentry.js
    static getVehicleDetails(vnumber){
        const INSURANCE_API_BASE_URL = url+"/vehicle/get/"+vnumber;
        return axios.get(INSURANCE_API_BASE_URL);
    }

    //bikeentry.js
    static checkPolicyStatus(vnumber){
        const INSURANCE_API_BASE_URL = url+"/payment/fetchPolocyByVnumber/"+vnumber;
        return axios.get(INSURANCE_API_BASE_URL);
    }
  
    //secondpage.js pamentpage.js reviewpage.js
    static getCustomerDetailsByMobile(mobile){
        const INSURANCE_API_BASE_URL = url+"/customer/get/"+mobile;
        return axios.get(INSURANCE_API_BASE_URL);
    }

    //secondpage.js
    static getCustomerDetailsByEmail(email){
        const INSURANCE_API_BASE_URL = url+"/customer/getByEmail/"+email;
        return axios.get(INSURANCE_API_BASE_URL);
    }

    //secondpage.js
    static createCustomer(feilds){
        const INSURANCE_API_BASE_URL = url+"/customer/add";
        return axios.post(INSURANCE_API_BASE_URL, feilds);
    }

    // otp's  secondpage.js userlogin.js reviewpage.js 
    static sendMobileOtp(mobile){
        const INSURANCE_API_BASE_URL = url+"/vehicle/sendOtp?mobile="+mobile;
        return axios.get(INSURANCE_API_BASE_URL);
    }
gm
    // otp's secondpage.js 
    static sendEmailOtpForRegisteration(email){
        const INSURANCE_API_BASE_URL = url+"/vehicle/sendEmailOtpForRegistration/"+email;
        return axios.post(INSURANCE_API_BASE_URL);
    }

    // otp's reviewpage.js
    static sendEmailOtpForUpdation(email){
        const INSURANCE_API_BASE_URL = url+"/vehicle/sendEmailOtpForUpdation/"+email;
        return axios.post(INSURANCE_API_BASE_URL);
    }

    //thirdpage.js 
    static getQuoteData(price,vyear){
        const INSURANCE_API_BASE_URL = url+"/vehicle/calculate?price="+price+"&vyear="+vyear;
        return axios.get(INSURANCE_API_BASE_URL);
    }

    static sendEmailQuote(toEmail,vnumber,price,idv,premiumAmount){
        const INSURANCE_API_BASE_URL = url+"/vehicle/sendEmail?toEmail="+toEmail+"&vnumber="+vnumber+"&price="+price+"&idv="+idv+"&premiumAmount="+premiumAmount;
        return axios.post(INSURANCE_API_BASE_URL);
    }

    //payment.js 
    static createPayment(feilds){
        const INSURANCE_API_BASE_URL = url+"/payment/add";
        return axios.post(INSURANCE_API_BASE_URL, feilds);
    }

    static getPaymentDetailsByCustomerId(customerid){
        const INSURANCE_API_BASE_URL = url+"/payment/get/"+customerid;
        return axios.get(INSURANCE_API_BASE_URL);
    }

    static updateCustomerMobileNumber(customerid,mobile){
        const INSURANCE_API_BASE_URL = url+"/customer/updatemobile/"+customerid+"/"+mobile;
        return axios.put(INSURANCE_API_BASE_URL);
    }

    static updateCustomerEmailNumber(customerid,email){
        const INSURANCE_API_BASE_URL = url+"/customer/updateemail/"+customerid+"/"+email;
        return axios.put(INSURANCE_API_BASE_URL);
    }

}

export default VehicleInsuranceService