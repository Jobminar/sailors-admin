import { useState } from 'react'
import './applicantprofile.css'
import profile from '../../assets/Images/dp-dummy.png'
import { useNavigate } from 'react-router-dom'
import { Userprofile } from '../../components/userprofile/userprofile'
export function Applicantprofile() {
    const navigate = useNavigate()
    const [applicantdetails, setapplicatdetails] = useState({ name: "Nikhil ahirwar", DOB: "29/08/2001", Gmail: "Nikhilraj2908@gmail.com", Location: "Vidisha" })
    const applicantprofileapplication = () => {
        navigate('/dashboardadmin/applicantprofileapplication') ////////////////////with parameter applicant application no will come and then  we will get the applicant application details from the database
    }
    const applicantfinanceclick = () => {

        navigate('/dashboardadmin/applicantfinance')
    }
    return (
        <>
            <div className='container row'>
                <div className='col-9 ' style={{ width: "100%" }}>
                    <div className='fw-bold fs-5 '>About</div>
                    <Userprofile applicantdetails={applicantdetails} />

                    <div >
                        <div >
                            <button style={{ width: "250px"}} className='my-5 btn btn-light applicantprofile fw-bold text-secondary  p-3'>
                                Documents from user
                            </button>
                        </div>
                        <div  >
                            <button style={{ width: "250px" }} className='my-5 btn btn-light applicantprofile  text-secondary fw-bold p-3' onClick={applicantfinanceclick}>
                                Financials
                            </button >
                        </div>
                        <div  >
                            <button style={{ width: "250px" }} className='my-5 btn btn-light applicantprofile  text-secondary p-3 fw-bold' onClick={applicantprofileapplication} >My Applications</button>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}