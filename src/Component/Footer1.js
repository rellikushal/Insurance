import React from 'react';
import './Footer1.css';

const Footer1 = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-data">
          <div>
            <p>
              We are rated 
              <br />
              <i className="fa-solid fa-star fa-fade" style={{color: `#FFD43B`}}></i>
              <i className="fa-solid fa-star fa-fade" style={{color: `#FFD43B`}}></i>
              <i className="fa-solid fa-star fa-fade" style={{color: `#FFD43B`}}></i>
              <i className="fa-solid fa-star fa-fade" style={{color: `#FFD43B`}}></i>
              <i className="fa-solid fa-star-half fa-fade" style={{color: `#FFD43B`}}></i>
            </p>
            <h6 className='googlerateing'>~Source Google review-rating</h6>
            <br/>
          </div>
          <div>
            <h5>1.2 Crore</h5>
            <p className='insurancefont1'>Bikes insured</p>
          </div> 
          <br />
          <div>
            <h5>1.7 crore</h5>
            <p className='insurancefont2'>Policies sold</p>
          </div> 
          <br />
          <div>
            <h5>20</h5>
            <p className='insurancefont3'>Insurance partners</p>
          </div> 
          <br />
        </div>
        <div>
          <div className="accordion" id="disclaimerAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                  *Disclaimer
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#disclaimerAccordion">
                <div className="accordion-body">
                  <p>
                    *Savings are based on the comparison between the highest and the lowest premium for own damage cover (excluding add-on covers) provided by different insurance companies for the same vehicle with the same IDV and same NCB.
                  </p>
                  <p>
                    **1.5/Day is the Comprehensive premium for a 2015 TVS XL Super 70cc, MH02(Mumbai) RTO with an IDV of Rs.5,895 and NCB at 50%.
                  </p>
                  <p>
                    **2/Day is the Comprehensive premium for a 2018 KTM RC 125 CC, DL8S(New Delhi) RTO with an IDV of Rs 46,842.
                  </p>
                  <p>
                    *Rs 457/- per annum is the price for the third-party motor insurance for private electric two-wheelers of not more than 3KW (non-commercial)
                  </p>
                  <p>
                    **The purchase of insurance policy is subject to our operations not being impacted by a system failure or force majeure event or for reasons beyond our control. Actual time for transaction may vary subject to additional data requirements and operational processes. requirements and operational processes.
                  </p>
                  <p>
                    #All savings and online discounts are provided by insurers as per IRDAI approved insurance plans | Standard Terms and Conditions Apply
                  </p>
                  <p>
                    RS Insurance Private Limited | CIN: U74999HR2014PTC053454 | Registered Office - Plot No.119, Sector - 44, Gurgaon, Haryana - 122001 | Registration No. 742, Valid till 09/06/2024, License category- Composite Broker. Visitors are hereby informed that their information submitted on the website may be shared with insurers. Product information is authentic and solely based on the information received from the insurer
                  </p>
                  <p>
                    For more details on risk factors, terms and conditions, please read the sales brochure carefully before concluding a sale.
                  </p>
                  <p>
                    © Copyright 2008-2024 Rsinsurance.com. All Rights Reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer1;
