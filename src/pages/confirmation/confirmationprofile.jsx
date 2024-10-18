import { useState } from 'react'
import './confirmationletter.css'
import profile from '../../assets/Images/dp-dummy.png'
import { useNavigate, useParams } from 'react-router-dom'
import useUserById from '../../Hook/finduser/findalluser'
import Profile from '../profile/profile'


export function Confirmationprofile() {
    const navigate=useNavigate();
    const param = useParams();
    const {user:applicantdetails, loading, error} =  useUserById('http://127.0.0.1:7001/candidates',param.applicationNo);
    function btncnfrmletter()
    {
        navigate(`/dashboardadmin/confirmationletter/${param.applicationNo}`) 
    }
    return (
        <>
            <div className='container row'>
                <div className='col-9 '>
                    <div className='fw-bold fs-5 '>About</div>
                    <Profile applicantdetail={applicantdetails} />
                    <div className='fw-bold fs-5 mt-3'>Details of {applicantdetails.candidateName}</div>
                    <div className='mt-4 text-secondary'>
                        <div className='row py-1 mb-3 bg-light'>
                            <dt className='col-3'>Application No.</dt>
                            <dd className='col-3'>{applicantdetails.applicationId}</dd>
                        </div>
                        <div className='row py-1 mb-3 bg-light'>
                            <dt className='col-3'>Application Status</dt>
                            <dd className='col-3'>{applicantdetails.applicationstatus?'Approved':'Not Approved'}</dd>
                        </div >
                        <div className='row py-1 mb-3 bg-light'>
                            <dt className='col-3'>Date of applied</dt>
                            <dd className='col-3'>{applicantdetails.createdAt}</dd>
                        </div>
                        <div className='row py-1 mb-3 bg-light'>
                            <dt className='col-3'>2nd Instalment</dt>
                            <dd className='col-3'> xxxxx/-</dd>
                            <dd className='col-3'><input className='form-control' type='date'></input></dd>
                        </div>
                        <div className='row  py-1 mb-3 bg-light'>
                            <dt className='col-3'>3nd Instalment</dt>
                            <dd className='col-3'>xxxxx/-</dd>
                            <dd className='col-3 '><input className='form-control bg-transparent' type='date'></input></dd>
                        </div>
                        <div className='row py-1 mb-3 bg-light'>
                            <dt className='col-6'>3nd Instalment</dt>
                            <dd className='col-3'><input className='form-control' type='date'></input></dd>
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