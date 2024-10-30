import Profile from "../profile/profile";
import useUserById from '../../Hook/finduser/findalluser'
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState } from "react";
import axios from "axios";

const Interoutcome = () => {
    const {id} = useParams()
    const { user, loading, error } = useUserById('http://127.0.0.1:7001/candidates', id)
    const [adminCookie,removeadminCookie] = useCookies(["user"]);
    const [feedback,setfeedback] = useState('')
    const navigate = useNavigate('')
    const HandileUpdate = async(id,status)=>{
        const userdata = {
            // Update application status
            Apstatus: user?.applicationstatus?.status,
            ApOfficerName: user?.applicationstatus?.OfficerName,
        
            // Update admit card details
            admitcardstatus: user?.admitcard?.status,
            admitcarddate: user?.admitcard?.date, // Include admit card date
            admitcardtime: user?.admitcard?.time, // Include admit card time
            admitcardofficer: user?.admitcard?.OfficerName,
        
            // Update interview outcome details
            interviewfeedback:feedback, // Include interview feedback
            interviewstatus:status,
            interviewofficer: adminCookie.user,
        
            // Update selection letter details
            selectionletterstatus: user?.selectionletter.status,
            Totalamount:user?.selectionletter?.TotalAmount,
            initialamount:user?.selectionletter?.InitialAmount,
            deadlinedate:user?.selectionletter?.DeadlineDate,
            selectionletterofficer: user?.selectionletter.OfficerName,
        
            // Update confirmation letter details
            confirmationletterstatus: user?.confirmationletter.status,
            JoinDate:user?.confirmationletter?.JoiningDate,
            instalment2amt: user?.confirmationletter.InstalmentAmount2,
            instalment3amt: user?.confirmationletter.InstalmentAmount3,
            instalment2dat: user?.confirmationletter.InstalmentDate2,
            instalment3dat: user?.confirmationletter.InstalmentDate3,
            confirmationletterofficer:  user?.confirmationletter.status,
          };
          try {
            const response = await axios.patch(`http://localhost:7001/candidate/${id}`, userdata);
            alert('Response updated successfully');
            console.log(response);
            navigate('/dashboardadmin/myapplication');
          } catch (error) {
            console.error(error);
            alert('Response update failed');
          }
    }
    return (
        <>
            <div>
                <Link className='bi-arrow-left btn btn-light m-3 px-3' to='/dashboardadmin/interviewSchedule'></Link>
            </div>
            <div className="ms-3">
                <b>Application number:</b> <span className=" text-dark-emphasis">{id}</span>
            </div>
            <div className="row mx-3">
                <div className="col-9 p-3 ">
                    <Profile applicantdetail={user} />
                </div>
                <div>

                </div>
            </div>
            <div className="ms-3">
                <b>Interview feedback</b>
                <textarea class="form-control border border-dark border-2" value={feedback} onChange={(e)=>{setfeedback(e.target.value)}} id="interviewFeedback" rows="7" placeholder="Enter feedback here"></textarea>

                <div className="d-flex justify-content-center ">
                    <button
                        style={{ backgroundColor: "#0486AA" }}
                        className="btn  text-light px-5 py-2 mt-4 mx-5"
                        onClick={()=>HandileUpdate(id,'Rejected')}
                    >
                        REJECTED
                    </button>
                    <button
                        style={{ backgroundColor: "#0486AA" }}
                        className='btn text-light px-5 py-2 mt-4 ms-2 mx-5'
                        onClick={()=>HandileUpdate(id,'Approved')}
                    >
                        APPROVED
                    </button>
                </div>
            </div>

        </>
    )
}
export default Interoutcome;