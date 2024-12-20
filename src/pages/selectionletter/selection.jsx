import filterimg from '../../assets/Images/filter.png'
import { useEffect, useState } from "react"
import {useCookies} from 'react-cookie'
import useFetchData from '../../Hook/Getalluser/getalluser'
import './selection.css'
// import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment'
const Selectionpage = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedAdmitCard, setSelectedAdmitCard] = useState('');
    const [selectNumber, setSelectNumber] = useState('');
    const navigate  = useNavigate('')
    const [adminCookie,removeadminCookie] = useCookies(["user"]);
    const[realdata,setRealdata]=useState([])
    const featchdata = async() =>{
        try{
            const users = await axios.get('http://127.0.0.1:7001/candidates')
            setRealdata(users.data)
        }catch(error){
            console.error(error,'catch error');
        }
    }

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
    const handleNumberChange = (e) => {
        setSelectNumber(e.target.value);
    }
    const handileclick = (e,items) =>{
        console.log(items.applicationId,'hello')
        navigate(`/dashboardadmin/selectionletter/${items.applicationId}`)
    }   
    useEffect(()=>{
        featchdata()
    },[])
    return (
        <div>
           
            <div className="container row pt-3">
            <div>
                <Link className='bi-arrow-left btn btn-light m-3 px-3' to='/dashboardadmin'></Link>
            </div>
                <div className="col-9" style={{width:"100%"}}>
                    {/* Filter */}
                    <div className="btn-group   mt-2 mb-5">
                        <button className="btn btn-light">
                            <img src={filterimg}></img>
                        </button>
                        <button className="btn btn-light">
                            Filter By
                        </button>
                        <button className="btn btn-light">
                            <input type='date' className='form-control'></input>
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
                                <option value=""> Admit Card</option>
                                <option value="Generated">Generated</option>
                                <option value="NotGenerated">NotGenerated</option>
                            </select>
                        </button>
                        <button className="btn btn-light">
                            <div className="d-flex">
                                <input className="form-control" placeholder="search with Number" vlaue={selectNumber} onChange={handleNumberChange}>

                                </input>
                                <span className="bi bi-search" style={{ marginLeft: "-12%", alignContent: "center" }}></span>

                            </div>
                        </button>
                    </div>
                    {/* table */}
                    <div className="table-responsive" >
                        <table className="table table-striped table-bordered">
                            <thead className="thead-light ">
                                <tr>
                                    <th>S.no</th>
                                    <th className="no-wrap">Applicant Name</th>
                                    <th className="no-wrap">Application No.</th>
                                    <th className="no-wrap">Application Status</th>
                                    <th className="no-wrap">Officer Name</th>
                                    <th className="no-wrap">Admit Card</th>
                                    <th className="no-wrap">Officer Name</th>
                                    <th className="no-wrap">Interview feedback</th>
                                    <th className="no-wrap">Officer Name</th>
                                    <th className="no-wrap">Selection letter</th>
                                    <th className="no-wrap">Officer Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item, index) => (
                                    <tr key={index} onClick={(e)=>handileclick(e,item)} style={{ cursor: 'pointer' }}>
                                        <td>{index + 1}</td>
                                        <td className="no-wrap">{item.candidateName}</td>
                                        <td>{item.applicationId}</td>
                                        <td style={{ cursor: 'pointer' }}>{item.applicationstatus.status}</td>
                                        <td className="no-wrap">{item.applicationstatus.OfficerName}</td> 
                                            {/* Admit Card */}
                                        <td className="no-wrap">{(item.applicationstatus.status === 'Approved')?item.admitcard.status:'Not checked' }</td>
                                        <td className="no-wrap">{item.admitcard.OfficerName}</td>
                                            {/* Interview Outcome */}
                                        <td>{(item.admitcard.status)?item.interviewoutcome.status:'Not checked'}</td>
                                        <td className="no-wrap">{item.interviewoutcome.OfficerName}</td>
                                            {/* selection Letter updates */}
                                        <td>{(item.interviewoutcome.status)?item.selectionletter.status:'Not checked'}</td>
                                        <td className="no-wrap">{item.selectionletter.OfficerName}</td>
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

export default Selectionpage;
