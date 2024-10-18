import { Link, useNavigate } from 'react-router-dom';
import filterimg from '../../assets/Images/filter.png'
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie";
import axios from 'axios'
import moment from 'moment'
import { Applicantprofile } from '../applicantprofile/applicantprofile';
import { Cookie } from '@mui/icons-material';
import './myapplication.css'

const Myapplication = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedAdmitCard, setSelectedAdmitCard] = useState('');
    const [interviewOutcome, setinterviewOutcome] = useState('')
    const [SelectNumber,setSelectNumber] = useState(null)
    const [Selectionletter,setSelecionletter] = useState('')
    const [Conformationletter,setConformationletter] = useState('')
    const today = new Date().toISOString().split("T")[0];
    const [usersdata, setusersdata] = useState([])
    const [adminCookie,removeadminCookie] = useCookies(["user"]);

    const fetchdata = async () => {
        try {
            const values = await axios.get('http://127.0.0.1:7001/candidates')
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
        if (interviewOutcome && (item.applicationstatus ? 'Approved' : 'Not Approved') !== interviewOutcome) {
            return false;
        }
        if (SelectNumber && item.applicationId != SelectNumber) {
            return false;
        }
        if (Selectionletter && (item.applicationstatus ? 'Approved' : 'Not Approved') !== Selectionletter) {
            return false;
        }
        if (Conformationletter && (item.applicationstatus ? 'Generated' : 'Not Generated') !== Conformationletter) {
            return false;
        }

        return true;
    });
    const rollNoClicked = (applicationNo) => {
        navigate(`/dashboardadmin/applicantprofile/${applicationNo}`);
    };

    const applicationStatusClicked = (applicationNo) => {

        navigate(`/dashboardadmin/applicationstatus/${applicationNo}`);
    }
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
                            <select className="form-select" value={selectedStatus} onChange={(e) => { setSelectedStatus(e.target.value) }}>
                                <option value="">Application Status</option>
                                {
                                    [...new Set(usersdata.map(item => (item.applicationstatus) ? 'Approved' : 'Not Approved'))].map(item => (
                                        <option value={item}>{item}</option>
                                    ))
                                }
                            </select>
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
                            <select className="form-select" value={interviewOutcome} onChange={(e) => { setinterviewOutcome(e.target.value) }}>
                                <option value="">Interview Outcomes</option>
                                {
                                    [...new Set(usersdata.map(item => (item.applicationstatus) ? 'Approved' : 'Not Approved'))].map(item => (
                                        <option value={item}>{item}</option>
                                    ))
                                }
                            </select>
                        </button>
                        <button className="btn btn-light">
                            <select className="form-select" value={interviewOutcome} onChange={(e) => { setSelecionletter(e.target.value) }}>
                                <option value="">Selection Letter</option>
                                {
                                    [...new Set(usersdata.map(item => (item.applicationstatus) ? 'Approved' : 'Not Approved'))].map(item => (
                                        <option value={item}>{item}</option>
                                    ))
                                }
                            </select>
                        </button>
                        <button className="btn btn-light">
                            <select className="form-select" value={interviewOutcome} onChange={(e) => { setConformationletter(e.target.value) }}>
                                <option value="">Conformation Letter</option>
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
                                    <th className="no-wrap">Conformation Letter</th>
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
                                        <td onClick={() => applicationStatusClicked(item.applicationId)} style={{ cursor: 'pointer' }}>{item.applicationstatus ? "Approved" : "Rejected"}</td>
                                        <td className="no-wrap">{adminCookie.user}</td>
                                        <td>{item.applicationstatus ? "Generated" : "N/A"}</td>
                                        <td>21-10-2024</td>
                                        <td className="no-wrap">{adminCookie.user}</td>
                                        <td>{item.applicationstatus ? "Approved" : "N/A"}</td>
                                        <td className="no-wrap">{adminCookie.user}</td>
                                        <td>{item.applicationstatus ? "Generated" : "N/A"}</td>
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

export default Myapplication;
