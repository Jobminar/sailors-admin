import React, { useEffect, useState } from "react";
import filterimg from '../../assets/Images/filter.png';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import moment from 'moment'
import { useCookies } from "react-cookie";

const Admitcarddashboard = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedAdmitCard, setSelectedAdmitCard] = useState('');
    const [selectNumber, setSelectNumber] = useState('');
    const navigate=useNavigate();
    const [userdata,setuserdata] = useState([])
    const [adminCookie,removeadminCookie] = useCookies(["user"]);
    const featchdata  = async ()=>{
        try{
            const values = await axios.get('http://127.0.0.1:7001/candidates')
            setuserdata(values.data)

        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        featchdata();
    },[])

    const filteredData = userdata.filter((item) => {
        if (selectedDate && moment(item.createdAt).format('YYYY-MM-DD') !== selectedDate) {
            return false;
        };
        if (selectedStatus && (item.applicationstatus?'Approved':'Not Approved') !== selectedStatus) {
            return false;
        };
        if (selectedAdmitCard && (item.applicationstatus?'Generated':'Not Generated') !== selectedAdmitCard) {
            return false;
        };
        if (selectNumber && item.candidateName !== selectNumber) {
            return false;
        }
        return true;
    });

    const handleDateChange = (e) => setSelectedDate(e.target.value);
    const handleStatusChange = (e) => setSelectedStatus(e.target.value);
    const handleAdmitCardChange = (e) => setSelectedAdmitCard(e.target.value);
    const handleNumberChange = (e) => setSelectNumber(e.target.value);

    function btnappnoclicked(applicationNO){
        navigate(`/dashboardadmin/admitcard/${applicationNO}`)
    }
    return (
        <div className="container row pt-3">
            <div>
                <Link className='bi-arrow-left btn btn-light my-3 px-3' to='/dashboardadmin/admitcarddashboard'></Link>
            </div>
            <div className="col-9" style={{ width: "100%" }}>
                <div className="btn-group mt-2 mb-5">
                    <button className="btn btn-light">
                        <img src={filterimg} alt="filter icon" />
                    </button>
                    <button className="btn btn-light">Filter By</button>
                    <button className="btn btn-light">
                        <select className="form-select" value={selectedDate} onChange={handleDateChange}>
                            <option value="">Select Date</option>
                            {userdata.map((item, index) =><option value={moment(item.createdAt).format('YYYY-MM-DD')}>{moment(item.createdAt).format('YYYY-MM-DD')}</option> )}
                        </select>
                    </button>
                    <button className="btn btn-light">
                        <select className="form-select" value={selectedStatus} onChange={handleStatusChange}>
                            <option value="">Application Status</option>
                            {filteredData.map((item, index) => <option value={(item.applicationstatus)?'Approved':'Not Approved'}>{(item.applicationstatus)?'Approved':'Not Approved'}</option>)}
                        </select>
                    </button>
                    <button className="btn btn-light">
                        <select className="form-select" value={selectedAdmitCard} onChange={handleAdmitCardChange}>
                            <option value="">Admit Card</option>
                            {filteredData.map((item, index) => <option value={(item.applicationstatus)?'Generated':'Not Generated'}>{(item.applicationstatus)?'Approved':'Not Generated'}</option>)}
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
                                <th>Officer Name</th>
                                <th>Admit card</th>
                                <th>Officer Name</th>

                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td onClick={()=>{btnappnoclicked(item.applicationId)}} style={{cursor:"pointer"}}>{item.candidateName}</td>
                                    <td>{item.applicationId}</td>
                                    <td>{(item.applicationstatus)?'Approved':'Reject'}</td>
                                    <td>{adminCookie.user}</td>
                                    <td>Admit Card</td>
                                    <td>{adminCookie.user}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Admitcarddashboard;
