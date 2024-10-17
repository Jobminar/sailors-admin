import Profile from "../profile/profile";
import useUserById from '../../Hook/finduser/findalluser'
import { Link, useParams } from "react-router-dom";

const Interoutcome = () => {
    const param = useParams()
    const { user, loading, error } = useUserById('http://127.0.0.1:7000/candidate', param.id)
    console.log(user)
    return (
        <>
            <div>
                <Link className='bi-arrow-left btn btn-light m-3 px-3' to='/dashboardadmin/interviewSchedule'></Link>
            </div>
            <div className="ms-3">
                <b>Application number:</b> <span className=" text-dark-emphasis">{user.applicationId}</span>
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
                <textarea class="form-control border border-dark border-2" id="interviewFeedback" rows="7" placeholder="Enter feedback here"></textarea>

                <div className="d-flex justify-content-center ">
                    <button
                        style={{ backgroundColor: "#0486AA" }}
                        className="btn  text-light px-5 py-2 mt-4 mx-5"
                    // onClick={handlerejectedClicked}
                    >
                        REJECTED
                    </button>
                    <button
                        style={{ backgroundColor: "#0486AA" }}
                        className='btn text-light px-5 py-2 mt-4 ms-2 mx-5'
                    >
                        APPROVED
                    </button>
                </div>
            </div>

        </>
    )
}
export default Interoutcome;