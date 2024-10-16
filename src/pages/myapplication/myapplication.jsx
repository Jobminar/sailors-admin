import { useNavigate } from 'react-router-dom';
import filterimg from '../../assets/Images/filter.png'
import { useEffect, useState } from "react"
import axios from 'axios'
import moment from 'moment'
import { Applicantprofile } from '../applicantprofile/applicantprofile';
import { Cookie } from '@mui/icons-material';
import { useCookies } from 'react-cookie';
const Myapplication = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedAdmitCard, setSelectedAdmitCard] = useState('');
    const [selectNumber, setSelectNumber] = useState('')
    const [interviewOutcome, setinterviewOutcome] = useState('')
    const today = new Date().toISOString().split("T")[0];
    const [realdata, setRealdata] = useState([])
    const[cookie,setcookie,removecookie]=useCookies()
    const fakeData = [
        { sno: 1, applicationNo: '999999999999', status: true, admitCard: 'NotGenerated', interviewOutcome: 'Approved', interviewDate: '27/06/24' },
        { sno: 2, applicationNo: '110009997611', status: false , admitCard: 'NotGenerated', interviewOutcome: 'NA', interviewDate: '28/06/24' },
        { sno: 3, applicationNo: '110009997612', status: true, admitCard: 'Generated', interviewOutcome: 'NA', interviewDate: '27/06/24' },
        { sno: 4, applicationNo: '110009997613', status: false, admitCard: 'NotGenerated', interviewOutcome: 'Approved', interviewDate: '29/06/24' },
        { sno: 5, applicationNo: '110009997614', status: true, admitCard: 'NotGenerated', interviewOutcome: 'NA', interviewDate: '1/07/24' },
        { sno: 6, applicationNo: '110009997690', status: false, admitCard: 'Generated', interviewOutcome: 'Approved', interviewDate: '28/06/24' },
        { sno: 7, applicationNo: '110009997615', status: true, admitCard: 'Generated', interviewOutcome: 'NA', interviewDate: '29/06/24' },
        { sno: 8, applicationNo: '110009997610', status: false, admitCard: 'NotGenerated', interviewOutcome: 'Approved', interviewDate: '30/06/24' },
        { sno: 9, applicationNo: '110009997616', status: true, admitCard: 'NotGenerated', interviewOutcome: 'NA', interviewDate: '28/06/24' },
    ];
    async function fetchapplicationdata() {
        try {
            const response = await axios.get("http://127.0.0.1:7000/candidate")
            setRealdata(response.data);
            console.log(realdata);
        }

        catch (err) { console.log(err) };
    }

    useEffect(() => {
        fetchapplicationdata();
    }, [])



    const filteredData = realdata.filter((item) => {
        if (selectedDate && item.interviewDate !== selectedDate) {
            return false
        };
        if (selectedStatus && item.status !== selectedStatus) {
            return false
        };
        if (selectedAdmitCard && item.admitCard !== selectedAdmitCard) {
            return false
        };
        if (selectNumber && item.applicationNo !== selectNumber) {
            return false;
        }

        return true;
    });

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    const handleAdmitCardChange = (e) => {
        setSelectedAdmitCard(e.target.value);
    };

    const rollNoClicked = (applicationNo) => {
        navigate(`/dashboardadmin/applicantprofile/${applicationNo}`);
    };

    const applicationStatusClicked=(applicationNo)=>{

        navigate(`/dashboardadmin/applicationform`);
    }
    return (
        <div>

            <div className="container row pt-3">

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
                                onChange={handleDateChange}
                                min="2024-10-12"  
                                max={today}  
                            />
                        </button>
                        <button className="btn btn-light">
                            <select className="form-select" value={selectedStatus} onChange={handleStatusChange}>
                                <option value="">Application Status</option>
                                <option value="Approved">Approved</option>
                                <option value="NotApproved">NotApproved</option>
                            </select>
                        </button>
                        <button className="btn btn-light">
                            <select className="form-select" value={selectedAdmitCard} onChange={handleAdmitCardChange}>
                                <option value="">Admit Card</option>
                                <option value="Generated">Generated</option>
                                <option value="NotGenerated">NotGenerated</option>
                            </select>
                        </button>
                        <button className="btn btn-light">
                            <select className="form-select" value={interviewOutcome} onChange={handleAdmitCardChange}>
                                <option value="">Interview Outcomes</option>
                                <option value="">Approved</option>
                                <option value="">NotGenerated</option>
                            </select>
                        </button>
                    </div>
                    <div className="table-responsive" >
                        <table className="table table-striped table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th>S.No</th>
                                    <th>Application No.</th>
                                    <th>Application Status</th>
                                    <th>Admit Card</th>
                                    <th>Interview Outcomme</th>
                                    <th>Officer Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fakeData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td onClick={() => rollNoClicked(item.applicationNo)} style={{ cursor: 'pointer' }}>
                                            {item.applicationNo}
                                        </td>
                                        <td onClick={()=>applicationStatusClicked(item.applicationNo)} style={{ cursor: 'pointer' }}>{item.status ? "Approved" : "Rejected"}</td>
                                        <td>{item.admitCard ? "Generated" : "N/A"}</td>
                                        <td>{item.interviewOutcome ? "Approved" : "N/A"}</td>
                                        <td>{cookie.admin}</td>
                                        <img src=''></img>
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
