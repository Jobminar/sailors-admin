import profile from '../../assets/Images/dp-dummy.png'
import React, { useEffect } from "react";

const Profile = ({ applicantdetail }) => {
    return (
        <>
            <div className="row text-secondary " style={{ height: "30vh", backgroundColor: "white", boxShadow: "1px 1px 5px 4px #edf1f0  " }}>
                <div className='col-3 d-flex align-items-center'>
                    <img className='border border-1 rounded bg-secondary' src={profile} alt="Profile Pictre" style={{ width: "100%", }}></img>
                </div>
                <div className='col-9 ps-4 ' style={{ alignContent: "center" }} >
                    <dl >
                        <div className='row'>
                            <dt className='col-3'>Name:</dt>
                            <dd className='col-9'>{applicantdetail.candidateName}</dd>

                        </div>
                        <div className='row'>
                            <dt className='col-3'>Birth Date:</dt>
                            <dd className='col-9'>{applicantdetail.dob}</dd>
                        </div>
                        <div className='row'>
                            <dt className='col-3'>Email:</dt>
                            <dd className='col-9'>{applicantdetail.email}</dd>
                        </div>
                        <div className='row'>
                            <dt className='col-3'>Location:</dt>

                            <dd className='col-9'>{applicantdetail.city}</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </>
    )
}
export default Profile;
