import React, { useState } from "react";
import filterimg from '../../assets/Images/filter.png';
import { useNavigate } from "react-router-dom";

export function Confirmationdashboard(){
    const navigate=useNavigate()
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedAdmitCard, setSelectedAdmitCard] = useState('');
    const [selectNumber, setSelectNumber] = useState('');
    const fakeData = [
        {  applicationNo: '110009997609', status: 'Approved',  applicantName:"jhon",  admitCard: 'NotGenerated',  interviewDate: '27/06/24'},
        {  applicationNo: '110009997611', status: 'NotApproved',  applicantName:"vishnu",  admitCard: 'NotGenerated',  interviewDate: '28/06/24'},
        {  applicationNo: '110009997612', status: 'Approved', applicantName:"nikhil",  admitCard: 'Generated',  interviewDate: '27/06/24' },
        {  applicationNo: '110009997613', status: 'NotApproved',  applicantName:"vamsi",  admitCard: 'NotGenerated',  interviewDate: '29/06/24'},
        {  applicationNo: '110009997614', status: 'NotApproved',  applicantName:"anil", admitCard: 'NotGenerated',  interviewDate: '1/07/24' },
        {  applicationNo: '110009997690', status: 'Approved', applicantName:"sameer",  admitCard: 'Generated',  interviewDate: '28/06/24' },
        {  applicationNo: '110009997615', status: 'Approved', applicantName:"mukul",  admitCard: 'Generated',  interviewDate: '29/06/24' },
        {  applicationNo: '110009997610', status: 'NotApproved',  applicantName:"naman",  admitCard: 'NotGenerated',  interviewDate: '30/06/24'},
        {  applicationNo: '110009997616', status: 'Approved',  applicantName:"trisul",  admitCard: 'NotGenerated',  interviewDate: '28/06/24'},
    ];
    const filteredData = fakeData.filter((item) => {
        if (selectedDate && item.interviewDate !== selectedDate) {
            return false;
        };
        if (selectedStatus && item.status !== selectedStatus) {
            return false;
        };
        if (selectedAdmitCard && item.admitCard !== selectedAdmitCard) {
            return false;
        };
        if (selectNumber && item.applicationNo !== selectNumber) {
            return false;
        }
        return true;
    });

    const handleDateChange = (e) => setSelectedDate(e.target.value);
    const handleStatusChange = (e) => setSelectedStatus(e.target.value);
    const handleAdmitCardChange = (e) => setSelectedAdmitCard(e.target.value);
    const handleNumberChange = (e) => setSelectNumber(e.target.value);

    function btnappnoclicked(applicationNo){
        navigate(`/dashboardadmin/confirmationprofile/${applicationNo}`)
    }

    return(
        <div className="container row pt-3">
            <div className="col-9" style={{ width: "100%" }}>
                <div className="btn-group mt-2 mb-5">
                    <button className="btn btn-light">
                        <img src={filterimg} alt="filter icon" />
                    </button>
                    <button className="btn btn-light">Filter By</button>
                    <button className="btn btn-light">
                        <select className="form-select" value={selectedDate} onChange={handleDateChange}>
                            <option value="">Select Date</option>
                            <option value="27/06/24">27/06/24</option>
                            <option value="28/06/24">28/06/24</option>
                            <option value="29/06/24">29/06/24</option>
                            <option value="30/06/24">30/06/24</option>
                            <option value="01/07/24">01/07/24</option>
                        </select>
                    </button>
                    <button className="btn btn-light">
                        <select className="form-select" value={selectedStatus} onChange={handleStatusChange}>
                            <option value="">Application Status</option>
                            <option value="Approved">Approved</option>
                            <option value="NotApproved">Not Approved</option>
                        </select>
                    </button>
                    <button className="btn btn-light">
                        <select className="form-select" value={selectedAdmitCard} onChange={handleAdmitCardChange}>
                            <option value="">Admit Card</option>
                            <option value="Generated">Generated</option>
                            <option value="NotGenerated">Not Generated</option>
                        </select>
                    </button>
                    <button className="btn btn-light">
                        <div className="d-flex">
                            <input
                                className="form-control"
                                placeholder="Search with Number"
                                value={selectNumber}
                                onChange={handleNumberChange}
                            />
                            <span className="bi bi-search" style={{ marginLeft: "-12%", alignContent: "center" }}></span>
                        </div>
                    </button>
                </div>
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead className="thead-light">
                            <tr>
                                <th>S.no</th>
                                <th>Application Name</th>
                                <th>Application No.</th>
                                <th>Application Status</th>

                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td onClick={()=>{btnappnoclicked(item.applicationNo)}} style={{cursor:"pointer"}}>{item.applicantName}</td>
                                    <td>{item.applicationNo}</td>
                                    <td>{item.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}