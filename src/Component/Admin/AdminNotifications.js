import React, { useEffect, useState } from 'react';
import PropertyInsuranceService from '../Service/PropertyInsuranceService';

function AdminNotificationspage() {
    const [detailsForEmail, setDetailsForEmail] = useState([]);
    const [detailsForMobile, setDetailsForMobile] = useState([]);
    const [mobileData, setMobileData] = useState("");
    const [emailData, setEmailData] = useState("");
    const [searchTermEmail, setSearchTermEmail] = useState('');
    const [searchTermMobile, setSearchTermMobile] = useState('');
    const [searchTermEmailinHistory, setSearchTermEmailinHistory] = useState('');
    const [searchTermMobileinHistory, setSearchTermMobileinHistory] = useState('');

    useEffect(() => {
        PropertyInsuranceService.getAllDetailsOfMobile()
            .then((res) => {
                setDetailsForMobile(res.data);
            })
            .catch((error) => console.error('Error fetching mobile details:', error));

        PropertyInsuranceService.getAllDetailsofEmail()
            .then((res) => {
                setDetailsForEmail(res.data);
            })
            .catch((error) => console.error('Error fetching email details:', error));
    }, []);

    const filteredDetailsForEmail = detailsForEmail
        .filter(detail => detail.status === 'request')
        .filter(detail => detail.customerId?.toString().toLowerCase().includes(searchTermEmail.toLowerCase()));

    const filteredDetailsForEmailinHistory = detailsForEmail
        .filter(detail => detail.status === 'approved' || detail.status === 'rejected')
        .filter(detail => detail.customerId?.toString().toLowerCase().includes(searchTermEmailinHistory.toLowerCase()));

    const filteredDetailsForMobile = detailsForMobile
        .filter(detail => detail.status === 'request')
        .filter(detail => detail.customerId?.toString().toLowerCase().includes(searchTermMobile.toLowerCase()));

    const filteredDetailsForMobileinHistory = detailsForMobile
        .filter(detail => detail.status === 'approved' || detail.status === 'rejected')
        .filter(detail => detail.customerId?.toString().toLowerCase().includes(searchTermMobileinHistory.toLowerCase()));

    const handleClickEmail = (customerId, statusValue) => {
        PropertyInsuranceService.getAllDetailsofEmailFindByCustomerId(customerId)
            .then((res) => {
                setEmailData(res.data);
                const data = {
                    status: statusValue,
                    email: res.data.email
                };
                PropertyInsuranceService.upDateStatusForEmail(customerId, data)
                    .then((res) => {
                        setMobileData(res.data);
                    })
                    .catch((error) => console.error('Error updating email status:', error));
            })
            .catch((error) => console.error('Error fetching email details:', error));
    };

    const handleClickMobile = (customerId, statusValue) => {
        PropertyInsuranceService.getAllDetailsOfMobileFindByCustomerId(customerId)
            .then((res) => {
                setMobileData(res.data);
                const data = {
                    status: statusValue,
                    mobileNo: res.data.mobileNo
                };
                PropertyInsuranceService.upDateStatusForMobile(customerId, data)
                    .then((res) => {
                        setMobileData(res.data);
                    })
                    .catch((error) => console.error('Error updating mobile status:', error));
            })
            .catch((error) => console.error('Error fetching mobile details:', error));
    };

    const [emailNotification, setEmailNotification] = useState(true);
    const [mobileNotification, setMobileNotification] = useState(false);
    const [history, setHistory] = useState(false);

    const handleEmailBtn = () => {
        setEmailNotification(true);
        setMobileNotification(false);
        setHistory(false);
    };

    const handleMobileBtn = () => {
        setEmailNotification(false);
        setMobileNotification(true);
        setHistory(false);
    };

    const handleHistoryBtn = () => {
        setEmailNotification(false);
        setMobileNotification(false);
        setHistory(true);
    };

    console.log (detailsForEmail);
    console.log(detailsForMobile);
    console.log(mobileData);
    console.log(emailData);

    return (
        <div className='container-fluid'>
            <div className='mx-2 mt-3'>
                <h3 className='text-center bg-primary text-light rounded fw-bold'>Notifications <i className="fa-solid fa-bell ms-2"></i></h3>
                <div className="container mt-4 row">
                    <div className='col-3 px-4 py-3'>
                        <div className='d-flex flex-column'>
                            <button className='btn btn-primary my-1 fw-bold shadow' onClick={handleEmailBtn}>Email Notifications</button>
                            <button className='btn btn-primary my-1 fw-bold shadow' onClick={handleMobileBtn}>Mobile Notifications</button>
                            <button className='btn btn-primary my-1 fw-bold shadow' onClick={handleHistoryBtn}>Notification's History</button>
                        </div>
                    </div>
                    <div className='col-9'>
                        {emailNotification && (
                            <>
                                <h4 className='my-1 mt-3 text-secondary fw-bold'>Email Notifications :</h4>
                                <div className="d-flex justify-content-start mb-3 mt-2 ms-2">
                                    <input
                                        type="text"
                                        placeholder="Search by Customer ID"
                                        className="form-control w-25"
                                        value={searchTermEmail}
                                        onChange={(e) => setSearchTermEmail(e.target.value)}
                                    />
                                </div>
                                <table className='table table-striped-columns table-bordered table-hover border-dark mt-lg-4 ms-2'>
                                    <thead className='text-center'>
                                        <tr>
                                            <th className='text-primary'>ID</th>
                                            <th className='text-primary'>Customer ID</th>
                                            <th className='text-primary'>Email Id</th>
                                            <th className='text-primary'>Status</th>
                                            <th className='text-primary'>Date</th>
                                            <th className='text-primary'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-center'>
                                        {filteredDetailsForEmail.map((detail) => (
                                            <tr key={detail.id}>
                                                <td>{detail.id}</td>
                                                <td>{detail.customerId || 'N/A'}</td>
                                                <td>{detail.email}</td>
                                                <td>{detail.status}</td>
                                                <td>{new Date(detail.date).toLocaleString()}</td>
                                                <td className='mx-2 my-2'>
                                                    <button className='btn-link bg-primary' onClick={() => handleClickEmail(detail.customerId, "approved")}>Approved</button>
                                                    <button className='btn-link bg-danger' onClick={() => handleClickEmail(detail.customerId, "rejected")}>Rejected</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        )}

                        {mobileNotification && (
                            <>
                                <h4 className='my-1 mt-3 text-secondary fw-bold'>Mobile Notifications :</h4>
                                <div className="d-flex justify-content-start mb-3 mt-2 ms-2">
                                    <input
                                        type="text"
                                        placeholder="Search by Customer ID"
                                        className="form-control w-25"
                                        value={searchTermMobile}
                                        onChange={(e) => setSearchTermMobile(e.target.value)}
                                    />
                                </div>
                                <table className='table table-striped-columns table-bordered table-hover border-dark mt-lg-4 ms-2'>
                                    <thead className='text-center'>
                                        <tr>
                                            <th className='text-primary'>ID</th>
                                            <th className='text-primary'>Customer ID</th>
                                            <th className='text-primary'>Mobile Number</th>
                                            <th className='text-primary'>Status</th>
                                            <th className='text-primary'>Date</th>
                                            <th className='text-primary'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-center'>
                                        {filteredDetailsForMobile.map((detail) => (
                                            <tr key={detail.id}>
                                                <td>{detail.id}</td>
                                                <td>{detail.customerId}</td>
                                                <td>{detail.mobileNo}</td>
                                                <td>{detail.status}</td>
                                                <td>{new Date(detail.date).toLocaleString()}</td>
                                                <td className='mx-2 my-2'>
                                                    <button className='btn-link bg-primary' onClick={() => handleClickMobile(detail.customerId, "approved")}>Approved</button>
                                                    <button className='btn-link bg-danger' onClick={() => handleClickMobile(detail.customerId, "rejected")}>Rejected</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        )}

                        {
                            history && 
                            <>
                                <h4 className='my-1 mt-3 text-secondary fw-bold'>Email Notifications :</h4>
                                <div className="d-flex justify-content-start mb-3 mt-2 ms-2">
                                    <input
                                        type="text"
                                        placeholder="Search by Customer ID"
                                        className="form-control w-25"
                                        value={searchTermEmailinHistory}
                                        onChange={(e) => setSearchTermEmailinHistory(e.target.value)}
                                    />
                                </div>
                                <table className='table table-striped-columns table-bordered table-hover border-dark mt-lg-4 ms-2'>
                                    <thead className='text-center'>
                                        <tr>
                                            <th className='text-primary'>ID</th>
                                            <th className='text-primary'>Customer ID</th>
                                            <th className='text-primary'>Email Id</th>
                                            <th className='text-primary'>Status</th>
                                            <th className='text-primary'>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-center'>
                                        {filteredDetailsForEmailinHistory.map((detail) => (
                                            <tr key={detail.id}>
                                                <td>{detail.id}</td>
                                                <td>{detail.customerId || 'N/A'}</td>
                                                <td>{detail.email}</td>
                                                <td>{detail.status}</td>
                                                <td>{new Date(detail.date).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <h4 className='my-1 mt-3 text-secondary fw-bold'>Mobile Notifications :</h4>
                                <div className="d-flex justify-content-start mb-3 mt-2 ms-2">
                                    <input
                                        type="text"
                                        placeholder="Search by Customer ID"
                                        className="form-control w-25"
                                        value={searchTermMobileinHistory}
                                        onChange={(e) => setSearchTermMobileinHistory(e.target.value)}
                                    />
                                </div>
                                <table className='table table-striped-columns table-bordered table-hover border-dark mt-lg-4 ms-2'>
                                    <thead className='text-center'>
                                        <tr>
                                            <th className='text-primary'>ID</th>
                                            <th className='text-primary'>Customer ID</th>
                                            <th className='text-primary'>Mobile Number</th>
                                            <th className='text-primary'>Status</th>
                                            <th className='text-primary'>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-center'>
                                        {filteredDetailsForMobileinHistory.map((detail) => (
                                            <tr key={detail.id}>
                                                <td>{detail.id}</td>
                                                <td>{detail.customerId}</td>
                                                <td>{detail.mobileNo}</td>
                                                <td>{detail.status}</td>
                                                <td>{new Date(detail.date).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminNotificationspage;