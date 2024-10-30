import { useState } from 'react'
import './confirmationletter.css'
import profile from '../../assets/Images/dp-dummy.png'
import { useNavigate, useParams } from 'react-router-dom'
import useUserById from '../../Hook/finduser/findalluser'
import Profile from '../profile/profile'
import moment from 'moment'
import { useCookies } from 'react-cookie'
import axios from 'axios'


export function Confirmationprofile() {
    const navigate=useNavigate();
    const {applicationNo:id}= useParams();
    const {user:applicantdetails, loading, error} =  useUserById('http://127.0.0.1:7001/candidates',id);
    const [JoiningDate,SetJoiningDate] = useState('')
    const [Instalment2amt,setInstalment2amt] = useState('')
    const [Instalment3amt,setInstalment3amt] = useState('')
    const [Instalment2dat,setInstalment2dat] = useState('')
    const [Instalment3dat,setInstalment3dat] = useState('')
    const [adminCookie,removeadminCookie] = useCookies(["user"]);

    const btncnfrmletter= async()=>{
        const userdata = {
            // Update application status
            Apstatus: applicantdetails?.applicationstatus?.status,
            ApOfficerName: applicantdetails?.applicationstatus?.OfficerName,
        
            // Update admit card details
            admitcardstatus: applicantdetails?.admitcard?.status,
            admitcarddate: applicantdetails?.admitcard?.date,
            admitcardtime: applicantdetails?.admitcard?.time,
            admitcardofficer: applicantdetails?.admitcard?.OfficerName,
        
            // Update interview outcome details
            interviewfeedback: applicantdetails?.interviewoutcome?.interviewFeedback,
            interviewstatus:applicantdetails?.interviewoutcome?.status,
            interviewofficer: applicantdetails?.interviewoutcome?.OfficerName,
        
            // Update selection letter details
            selectionletterstatus:applicantdetails?.selectionletter?.status ,
            Totalamount:applicantdetails?.selectionletter?.TAmount,
            initialamount:applicantdetails?.selectionletter?.InitialAmount,
            deadlinedate:applicantdetails?.selectionletter?.DeadlineDate,
            selectionletterofficer: applicantdetails?.selectionletter?.OfficerName,
        
            // Update confirmation letter details
            confirmationletterstatus:'Approved',
            JoinDate:JoiningDate,
            instalment2amt:(applicantdetails?.confirmationletter?.InstalmentAmount2)?applicantdetails?.confirmationletter?.InstalmentAmount2:Instalment2amt,
            instalment3amt:(applicantdetails?.confirmationletter?.InstalmentAmount3)?applicantdetails?.confirmationletter?.InstalmentAmount3:Instalment3amt,
            instalment2dat:(applicantdetails.confirmationletter?.InstalmentDate2)?applicantdetails.confirmationletter?.InstalmentDate2:Instalment2dat,
            instalment3dat:(applicantdetails.confirmationletter?.InstalmentDate3)?applicantdetails.confirmationletter?.InstalmentDate3:Instalment3dat,
            confirmationletterofficer: adminCookie.user,

          };
        console.log(userdata,'userd data in conformationletter')
          try {
            const response = await axios.patch(`http://localhost:7001/candidate/${id}`, userdata);
            alert('Response updated successfully');
            console.log(response);
            navigate(`/dashboardadmin/confirmationletter/${id}`) 
          } catch (error) {
            console.error(error);
            alert('Response update failed');
          }
    }
    return (
        <>
            <div className='container row'>
                <div className='col-9 '>
                    <div className='fw-bold fs-5 '>About</div>
                    <Profile applicantdetail={applicantdetails} />
                    <div className='fw-bold fs-5 mt-3'>Details of {applicantdetails?.candidateName}</div>
                    <div className='mt-4 text-secondary'>
                        <div className='row py-1 mb-3 bg-light'>
                            <dt className='col-3'>Application No.</dt>
                            <dd className='col-3'>{applicantdetails?.applicationId}</dd>
                        </div>
                        <div className='row py-1 mb-3 bg-light'>
                            <dt className='col-3'>Application Status</dt>
                            <dd className='col-3'>{applicantdetails?.applicationstatus?.status}</dd>
                        </div>
                        <div className='row py-1 mb-3 bg-light'>
                            <dt className='col-3'>AdmitCard Status</dt>
                            <dd className='col-3'>{applicantdetails?.admitcard?.status}</dd>
                        </div>
                        <div className='row py-1 mb-3 bg-light'>
                            <dt className='col-3'>Interview Status</dt>
                            <dd className='col-3'>{applicantdetails?.interviewoutcome?.status}</dd>
                        </div>
                        <div className='row py-1 mb-3 bg-light'>
                            <dt className='col-3'>Interview Date</dt>
                            <dd className='col-3'>{applicantdetails?.admitcard?.date}</dd>
                        </div>
                        <div className='row py-1 mb-3 bg-light'>
                            <dt className='col-3'>Interview Time</dt>
                            <dd className='col-3'>{applicantdetails?.admitcard?.time}</dd>
                        </div>
                        <div className='row py-1 mb-3 bg-light'>
                            <dt className='col-3'>Date of applied</dt>
                            <dd className='col-3'>{moment(applicantdetails?.createdAt).format('YYYY-MM-DD')}</dd>
                        </div>
                        <div className='row py-1 mb-3 bg-light'>
                            <dt className='col-3'>Joining Date</dt>
                            <dd className='col-3'><input type="date" onChange={(e)=>SetJoiningDate(e.target.value)} className='form-control' /></dd>
                            
                        </div>
                        <div className='row py-1 mb-3 bg-light'>
                            <dt className='col-3'>TotalAmount</dt>
                            <dd className='col-3'>{applicantdetails?.selectionletter?.TAmount} /-</dd>
                        </div>
                        <div className='row py-1 mb-3 bg-light'>
                            <dt className='col-3'>1nd Instalment</dt>
                            <dd className='col-3'>{applicantdetails?.selectionletter?.InitialAmount} /-</dd>
                            <dd className='col-3'>{applicantdetails?.selectionletter?.DeadlineDate}</dd>
                        </div>
                        <div className='row  py-1 mb-3 bg-light'>
                            <dt className='col-3'>2nd Instalment</dt>
                            <dd className='col-3'><input type="text" onChange={(e)=>setInstalment2amt(e.target.value)} placeholder='XXXX/-' className='form-control' /></dd>
                            <dd className='col-3 '><input className='form-control bg-transparent'  onChange={(e)=>setInstalment2dat(e.target.value)} type='date'></input></dd>
                        </div>
                        <div className='row py-1 mb-3 bg-light'>
                            <dt className='col-3'>3nd Instalment</dt>
                            <dd className='col-3'><input type="text" value={Instalment3amt} onChange={(e)=>setInstalment3amt(e.target.value)} placeholder='XXXX/-' className='form-control' /></dd>
                            <dd className='col-3'><input className='form-control'  onChange={(e)=>setInstalment3dat(e.target.value)} type='date'></input></dd>
                        </div>
                    </div>
                    <div className='text-center'>
                        <button className='btn text-light  py-3 px-4 ' style={{ backgroundColor: "#0878aa" }} onClick={()=>btncnfrmletter()}>Generate Confirmation latter</button>
                    </div>
                </div>
            </div>

        </>
    )
}