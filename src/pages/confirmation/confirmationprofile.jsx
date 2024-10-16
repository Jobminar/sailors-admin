import { useState } from 'react'
import './confirmationletter.css'
import profile from '../../assets/Images/dp-dummy.png'
import { useNavigate } from 'react-router-dom'
import Profile from '../profile/profile'
export function Confirmationprofile() {
    const navigate=useNavigate();
    const [applicantdetails, setapplicatdetails] = useState({ name: "Nikhil Raj", DOB: "29/08/2001", Gmail: "Nikhilraj2908@gmail.com", Location: "Vidisha" })
    function btncnfrmletter(item)
    {
            navigate(`/dashboardadmin/confirmationletter/${item}`) 
    }
    return (
        <>
            <div className='container row'>
                <div className='col-9 ' style={{ width: "100%"}}>
                    <div className='fw-bold fs-5 '>About</div>
                    <Profile applicantdetails={applicantdetails} />
                    <div className='fw-bold fs-5 mt-3'>Details of {applicantdetails.name}</div>
                    <div className='mt-4 text-secondary'>
                        <div className='row py-1 mb-3 bg-light'>
                            <dt className='col-3'>Application No.</dt>
                            <dd className='col-3'>12324</dd>
                        </div>
                        <div className='row py-1 mb-3 bg-light'>
                            <dt className='col-3'>Application Status</dt>
                            <dd className='col-3'>Approved</dd>
                        </div >
                        <div className='row py-1 mb-3 bg-light'>
                            <dt className='col-3'>Date of applied</dt>
                            <dd className='col-3'>xx-xx-xxxx</dd>
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
                        <button className='btn text-light  py-3 px-4 ' style={{ backgroundColor: "#0878aa" }} onClick={()=>btncnfrmletter(applicantdetails.name)}>Generate Confirmation latter</button>
                    </div>
                </div>
            </div>

        </>
    )
}