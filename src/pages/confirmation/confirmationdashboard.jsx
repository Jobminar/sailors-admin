// import React, { useState } from "react";
// import filterimg from '../../assets/Images/filter.png';
// import { useNavigate } from "react-router-dom";

// export function Confirmationdashboard(){
//     const navigate=useNavigate()
//     const [selectedDate, setSelectedDate] = useState('');
//     const [selectedStatus, setSelectedStatus] = useState('');
//     const [selectedAdmitCard, setSelectedAdmitCard] = useState('');
//     const [selectNumber, setSelectNumber] = useState('');
//     const fakeData = [
//         {  applicationNo: '110009997609', status: 'Approved',  applicantName:"jhon",  admitCard: 'NotGenerated',  interviewDate: '27/06/24'},
//         {  applicationNo: '110009997611', status: 'NotApproved',  applicantName:"vishnu",  admitCard: 'NotGenerated',  interviewDate: '28/06/24'},
//         {  applicationNo: '110009997612', status: 'Approved', applicantName:"nikhil",  admitCard: 'Generated',  interviewDate: '27/06/24' },
//         {  applicationNo: '110009997613', status: 'NotApproved',  applicantName:"vamsi",  admitCard: 'NotGenerated',  interviewDate: '29/06/24'},
//         {  applicationNo: '110009997614', status: 'NotApproved',  applicantName:"anil", admitCard: 'NotGenerated',  interviewDate: '1/07/24' },
//         {  applicationNo: '110009997690', status: 'Approved', applicantName:"sameer",  admitCard: 'Generated',  interviewDate: '28/06/24' },
//         {  applicationNo: '110009997615', status: 'Approved', applicantName:"mukul",  admitCard: 'Generated',  interviewDate: '29/06/24' },
//         {  applicationNo: '110009997610', status: 'NotApproved',  applicantName:"naman",  admitCard: 'NotGenerated',  interviewDate: '30/06/24'},
//         {  applicationNo: '110009997616', status: 'Approved',  applicantName:"trisul",  admitCard: 'NotGenerated',  interviewDate: '28/06/24'},
//     ];
//     const filteredData = fakeData.filter((item) => {
//         if (selectedDate && item.interviewDate !== selectedDate) {
//             return false;
//         };
//         if (selectedStatus && item.status !== selectedStatus) {
//             return false;
//         };
//         if (selectedAdmitCard && item.admitCard !== selectedAdmitCard) {
//             return false;
//         };
//         if (selectNumber && item.applicationNo !== selectNumber) {
//             return false;
//         }
//         return true;
//     });

//     const handleDateChange = (e) => setSelectedDate(e.target.value);
//     const handleStatusChange = (e) => setSelectedStatus(e.target.value);
//     const handleAdmitCardChange = (e) => setSelectedAdmitCard(e.target.value);
//     const handleNumberChange = (e) => setSelectNumber(e.target.value);

//     function btnappnoclicked(applicationNo){
//         navigate(`/dashboardadmin/confirmationprofile/${applicationNo}`)
//     }

//     return(
//         <div className="container row pt-3">
//             <div className="col-9" style={{ width: "100%" }}>
//                 <div className="btn-group mt-2 mb-5">
//                     <button className="btn btn-light">
//                         <img src={filterimg} alt="filter icon" />
//                     </button>
//                     <button className="btn btn-light">Filter By</button>
//                     <button className="btn btn-light">
//                         <select className="form-select" value={selectedDate} onChange={handleDateChange}>
//                             <option value="">Select Date</option>
//                             <option value="27/06/24">27/06/24</option>
//                             <option value="28/06/24">28/06/24</option>
//                             <option value="29/06/24">29/06/24</option>
//                             <option value="30/06/24">30/06/24</option>
//                             <option value="01/07/24">01/07/24</option>
//                         </select>
//                     </button>
//                     <button className="btn btn-light">
//                         <select className="form-select" value={selectedStatus} onChange={handleStatusChange}>
//                             <option value="">Application Status</option>
//                             <option value="Approved">Approved</option>
//                             <option value="NotApproved">Not Approved</option>
//                         </select>
//                     </button>
//                     <button className="btn btn-light">
//                         <select className="form-select" value={selectedAdmitCard} onChange={handleAdmitCardChange}>
//                             <option value="">Admit Card</option>
//                             <option value="Generated">Generated</option>
//                             <option value="NotGenerated">Not Generated</option>
//                         </select>
//                     </button>
//                     <button className="btn btn-light">
//                         <div className="d-flex">
//                             <input
//                                 className="form-control"
//                                 placeholder="Search with Number"
//                                 value={selectNumber}
//                                 onChange={handleNumberChange}
//                             />
//                             <span className="bi bi-search" style={{ marginLeft: "-12%", alignContent: "center" }}></span>
//                         </div>
//                     </button>
//                 </div>
//                 <div className="table-responsive">
//                     <table className="table table-striped table-bordered">
//                         <thead className="thead-light">
//                             <tr>
//                                 <th>S.no</th>
//                                 <th>Application Name</th>
//                                 <th>Application No.</th>
//                                 <th>Application Status</th>

//                             </tr>
//                         </thead>
//                         <tbody>
//                             {filteredData.map((item, index) => (
//                                 <tr key={index}>
//                                     <td>{index+1}</td>
//                                     <td onClick={()=>{btnappnoclicked(item.applicationNo)}} style={{cursor:"pointer"}}>{item.applicantName}</td>
//                                     <td>{item.applicationNo}</td>
//                                     <td>{item.status}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     )
// }

import { Link, useNavigate } from 'react-router-dom';
import filterimg from '../../assets/Images/filter.png'
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie";
import axios from 'axios'

const Confirmationdashboard = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedAdmitCard, setSelectedAdmitCard] = useState('');
    const [SelectNumber,setSelectNumber] = useState(null)
    const [Conformationletter,setConformationletter] = useState('')
    const today = new Date().toISOString().split("T")[0];
    const [usersdata, setusersdata] = useState([])
    const [adminCookie,removeadminCookie] = useCookies(["user"]);

    const fetchdata = async () => {
        try {
            const values = await axios.get('http://127.0.0.1:7000/candidate')
            setusersdata(values.data)
        } catch (error) {
            console.log(error)
        }
    }
    console.log(usersdata.map((item) => item.applicationstatus, 'hello'))
    useEffect(() => {
        fetchdata();
    }, [])



    const filteredData = usersdata.filter((item) => {
        if (selectedDate && item.interviewDate !== selectedDate) {
            return false
        };
        if (selectedStatus && (item.applicationstatus ? 'Approved' : 'Not Approved') !== selectedStatus) {
            return false
        };
        if (selectedAdmitCard && (item.applicationstatus ? 'Generated' : 'Not Generated') !== selectedAdmitCard) {
            return false
        };
        if (Conformationletter && (item.applicationstatus ? 'Generated' : 'Not Generated') !== Conformationletter) {
            return false;
        }

        return true;
    });
    const rollNoClicked = (applicationNo) => {
        navigate(`/dashboardadmin/confirmationprofile/${applicationNo}`);
    };
    return (
        <div>

            <div className="container row pt-3">
                <div>
                    <Link className='bi-arrow-left btn btn-light m-3 px-3' to='/dashboardadmin/myapplication'></Link>
                </div>
                <div className="col-9" style={{ width: "100%" }}>
                    <div className="btn-group   mt-2 mb-5">
                        <button className="btn btn-light">
                            <img src={filterimg}></img>
                        </button>
                        <button className="btn btn-light">
                            Filter By
                        </button>
                        <button className="btn btn-light">
                            <input
                                className="form-control"
                                type="date"
                                value={selectedDate}
                                onChange={(e) => { setSelectedDate(e.target.value) }}
                                min="2024-10-12"
                                max={today}
                            />
                        </button>
                        <button className="btn btn-light">
                            <select className="form-select" value={selectedAdmitCard} onChange={(e) => { setSelectedAdmitCard(e.target.value) }}>
                                <option value="">Admit Card</option>
                                {
                                    [...new Set(usersdata.map(item => (item.applicationstatus) ? 'Generated' : 'Not Generated'))].map(item => (
                                        <option value={item}>{item}</option>
                                    ))
                                }
                            </select>
                        </button>
                        <button className="btn btn-light">
                        <div className="d-flex">
                            <input
                                className="form-control"
                                placeholder="Number"
                                value={SelectNumber}
                                onChange={(e)=>setSelectNumber(e.target.value)}
                            />
                            <span className="bi bi-search" style={{ marginLeft: "-12%", alignContent: "center" }}></span>
                        </div>
                    </button>
                    </div>
                    <div className="table-responsive" >
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>S.no</th>
                                    <th>Name</th>
                                    <th className="no-wrap">Application No.</th>
                                    <th className="no-wrap">Application Status</th>
                                    <th>OfficerName</th>
                                    <th className="no-wrap">Admit Card</th>
                                    <th>InterviewDate</th>
                                    <th>OfficerName</th>
                                    <th className="no-wrap">Interview outcomme</th>
                                    <th>OfficerName</th>
                                    <th className="no-wrap">Selcection Letter</th>
                                    <th>OfficerName</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td className="no-wrap">{item.candidateName}</td>
                                        <td onClick={() => rollNoClicked(item.applicationId)} style={{ cursor: 'pointer' }}>
                                            {item.applicationId}
                                        </td>
                                        <td style={{ cursor: 'pointer' }}>{item.applicationstatus ? "Approved" : "Rejected"}</td>
                                        <td className="no-wrap">{adminCookie.user}</td>
                                        <td>{item.applicationstatus ? "Generated" : "N/A"}</td>
                                        <td>21-10-2024</td>
                                        <td className="no-wrap">{adminCookie.user}</td>
                                        <td>{item.applicationstatus ? "Approved" : "N/A"}</td>
                                        <td className="no-wrap">{adminCookie.user}</td>
                                        <td>{item.applicationstatus ? "Generated" : "N/A"}</td>
                                        <td className="no-wrap">{adminCookie.user}</td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Confirmationdashboard;
