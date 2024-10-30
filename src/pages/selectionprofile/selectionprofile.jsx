import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Profile from '../profile/profile';
import moment from 'moment'
import { useCookies } from "react-cookie";


//.................................................Reportinf date and traning date should update......................................

const SelectionProfile = () => {
    const [applicantdetails, setApplicantDetails] = useState([])
    const [show, setShow] = useState('d-none')
    const [date, setDate] = useState(0)
    const [TotalAmount,setTotalAmount] = useState(null)
    const [Amount,setAmount] = useState(null)
    const {id} = useParams()
    const navigate = useNavigate('')
    const [adminCookie,removeadminCookie] = useCookies(["user"]);

    const fetchdata = async () => {
        try {
            const usedata = await axios.get('http://127.0.0.1:7001/candidates')
            const users = usedata.data;
            const filteredUsers = users.find((user) => user.applicationId === parseInt(id));
            setApplicantDetails(filteredUsers)
        } catch (error) {
            console.error(error, 'catch error');
        }
    }

    const HandileSelect = () => {
        if(applicantdetails?.applicationstatus?.status === 'Approved') {
            setShow('d-block')
        } else {
            setShow('d-none')
        }
    }

    const HandileGenerate = async (s) =>{
        navigate(`/dashboardadmin/selectionletter/${applicantdetails.applicationId}/letter`)
        const userdata = {
            // Update application status
            Apstatus: applicantdetails?.applicationstatus?.status,
            ApOfficerName: applicantdetails.applicationstatus.OfficerName,
        
            // Update admit card details
            admitcardstatus: applicantdetails?.admitcard?.status,
            admitcarddate: applicantdetails?.admitcard?.date,
            admitcardtime: applicantdetails?.admitcard?.time,
            admitcardofficer: applicantdetails?.admitcard?.OfficerName,
        
            // Update interview outcome details
            interviewfeedback: applicantdetails?.interviewoutcome?.interviewFeedback, // Include interview feedback
            interviewstatus:applicantdetails?.interviewoutcome?.status,
            interviewofficer: applicantdetails?.interviewoutcome?.OfficerName,
        
            // Update selection letter details
            selectionletterstatus: s,
            Totalamount:TotalAmount,
            initialamount:Amount,
            deadlinedate:date,
            selectionletterofficer: adminCookie.user,

            // Update confirmation letter details
            confirmationletterstatus: applicantdetails?.confirmationletter?.status,
            JoinDate:applicantdetails?.confirmationletter?.JoiningDate,
            instalment2amt: applicantdetails?.confirmationletter?.InstalmentAmount2,
            instalment3amt: applicantdetails?.confirmationletter?.InstalmentAmount3,
            instalment2dat: applicantdetails?.confirmationletter?.InstalmentDate2,
            instalment3dat: applicantdetails?.confirmationletter?.InstalmentDate3,
            confirmationletterofficer:  applicantdetails?.confirmationletter?.status,
          };
          try {
            const response = await axios.patch(`http://localhost:7001/candidate/${id}`, userdata);
            alert('Response updated successfully');
            navigate(`/dashboardadmin/selectionletter/${applicantdetails.applicationId}/letter`)
          } catch (error) {
            console.error(error);
            alert('Response update failed');
          }
    }
    
    useEffect(() => {
        HandileSelect()
        fetchdata()
    }, [HandileSelect,fetchdata])

    return (
        <div>
            <div className="row mt-2 container">
            <div>
                <Link className='bi-arrow-left btn btn-light my-3 px-3' to='/dashboardadmin/selectionletter'></Link>
            </div>
                <div className="col-9 w-100">
                    <div className='fw-bold fs-5 '>About</div>
                    <div className="w-75 ps-2 mt-3">
                    <Profile applicantdetail={applicantdetails} />
                    </div>
                    <button className=" mt-5 mb-2 px-4 btn  fw-bold">Details of {applicantdetails.candidateName} </button>
                    <div className='row bg-light mx-3 fs-5 rounded-2 py-3 mb-3'>
                        <div className='col-6'>
                            Application number
                        </div>
                        <div className='col-6'>
                            {applicantdetails.applicationId}
                            {/* 3316329708 */}
                        </div>
                    </div>
                    <div className='row bg-light mx-3 fs-5 rounded-2 py-3 mb-3'>
                        <div className='col-6'>
                            Application Status
                        </div>
                        <div className='col-6'>
                            {applicantdetails?.applicationstatus?.status}
                        </div>
                    </div>
                    <div className='row bg-light mx-3 fs-5 rounded-2 py-3 mb-3'>
                        <div className='col-6'>
                            AdmintCard Status
                        </div>
                        <div className='col-6'>
                            {applicantdetails?.admitcard?.status}
                        </div>
                    </div>
                    <div className='row bg-light mx-3 fs-5 rounded-2 py-3 mb-3'>
                        <div className='col-6'>
                            InterviewOutcome Status
                        </div>
                        <div className='col-6'>
                            {applicantdetails?.interviewoutcome?.status}
                        </div>
                    </div>
                    <div className='row bg-light mx-3 fs-5 rounded-2 py-3 mb-3'>
                        <div className='col-6'>
                            InterviewDate
                        </div>
                        <div className='col-6'>
                            {applicantdetails?.admitcard?.date}
                        </div>
                    </div>
                    <div className='row bg-light mx-3 fs-5 rounded-2 py-3 mb-3'>
                        <div className='col-6'>
                            InterviewTime
                        </div>
                        <div className='col-6'>
                            {applicantdetails?.admitcard?.time}
                        </div>
                    </div>
                    <div className='row bg-light mx-3 fs-5 rounded-2 py-3 mb-3'>
                        <div className='col-6'>
                            Date of applied
                        </div>
                        <div className='col-6'>
                            {moment(applicantdetails.createdAt).format('YYYY-MM-DD')}
                        </div>
                    </div>
                    <div className='row bg-light mx-3 fs-5 rounded-2 py-3 mb-3'>
                        <div className='col-6'>
                            Total Amount
                        </div>
                        <div className='col-6'>
                            <input type="text" name="Totalamount" className='form-control bg-transparent w-50' placeholder='Enter Total Amount' onChange={(e)=>{setTotalAmount(e.target.value)}} />
                        </div>
                    </div>
                    <div className='row bg-light mx-3 fs-5 rounded-2 py-3 mb-3'>
                        <div className='col-6'>
                            Initial Amount
                        </div>
                        <div className='col-6'>
                            <input type="text" name="Initialamount" className='form-control bg-transparent w-50' placeholder='Enter  Initial Amount' onChange={(e)=>{setAmount(e.target.value)}} />
                        </div>
                    </div>
                    <div className='row bg-light mx-3 fs-5 rounded-2 py-3 mb-3'>
                        <div className='col-6'>
                            Deadline date
                        </div>
                        <div className='col-6'>
                            <input type="date" name="Deadline" min={moment().format('YYYY-MM-DD')} onChange={(e) => setDate(e.target.value)}  className='form-control bg-transparent w-50'/>
                        </div>
                    </div>
                    <div className={`text-center  ${show}`}>
                        <button className='btn text-light py-3 fs-4' style={{backgroundColor:'#0878aa'}} onClick={()=>HandileGenerate('Generated')}>Generate Selection Letter</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectionProfile;