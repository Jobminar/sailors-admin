import axios from 'axios';
import profile from '../../assets/Images/dp-dummy.png'
import React, { useEffect, useState } from "react";
import moment from 'moment';
const Profile = ({ applicantdetail }) => {
  const [photo, setPhoto] = useState(null);

    const fetchFileById = async (id, setFileState) => {
        if (!id) {
         
          return;
        }
    
        try {
          const response = await axios.get(`http://localhost:7001/fileById/${id}`, {
            responseType: 'blob',
          });
          const fileURL = URL.createObjectURL(new Blob([response.data]));
          setFileState(fileURL);
        } catch (err) {
          console.error('Error fetching file:', err);
          
        }
      };
      useEffect(() => {
        if (applicantdetail?.passport) {
          fetchFileById(applicantdetail?.passport, setPhoto);
        }
      }, [applicantdetail]);
    
    return (
        <>
            <div className="row text-secondary rounded-3 " style={{ height: "30vh", backgroundColor: "white", boxShadow: "1px 1px 5px 4px #edf1f0  " }}>
                <div className='col-3 d-flex align-items-center p-2 ' style={{height:"100%",width:"23vh"}} >
                    <img className='border border-1 rounded bg-secondary' src={photo} alt="Profile Pictre" style={{ width:"100%",height:'90%' }}></img>
                </div>
                <div className='col-9 ps-4 ' style={{ alignContent: "center" }} >
                    <dl >
                        <div className='row'>
                            <dt className='col-3'>Name:</dt>
                            <dd className='col-9'>{applicantdetail?.candidateName}</dd>
                        </div>
                        <div className='row'>
                            <dt className='col-3'>Birth Date:</dt>
                            <dd className='col-9'>{moment(applicantdetail?.dob).format('DD-MM-YYYY')}</dd>
                        </div>
                        <div className='row'>
                            <dt className='col-3'>Email:</dt>
                            <dd className='col-9'>{applicantdetail?.email}</dd>
                        </div>
                        <div className='row'>
                            <dt className='col-3'>Location:</dt>

                            <dd className='col-9'>{applicantdetail?.city}</dd>
                        </div>
                        <div className='row'>
                            <dt className='col-3'>Phone Number:</dt>

                            <dd className='col-9'>{applicantdetail?.mobileNumber}</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </>
    )
}
export default Profile;
