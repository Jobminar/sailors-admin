import { useEffect, useState } from 'react';
import profile from '../../assets/Images/dp-dummy.png';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Profile from '../profile/profile';
import axios from 'axios';
import moment from 'moment';
import { useCookies } from 'react-cookie';

export function Admitcard() {
  const navigate = useNavigate();
  const param = useParams()
  const [admitcarddetails, setadmitcarddetails] = useState([{}]);
  const [time, settime] = useState('')
  const [date, setdate] = useState('')
  const [adminCookie,removeadminCookie] = useCookies(["user"]);

  const fetchdata = async () => {
    try {
      const usedata = await axios.get('http://127.0.0.1:7001/candidates')
      const users = usedata.data;
      const filteredUsers = users.find((user) => user.applicationId == param.applicationNo);
      setadmitcarddetails(filteredUsers)
    } catch (error) {
      console.error(error, 'catch error');
    }
  }

  const btngenereteadmit = async (id) => {
    const applicationstatus = {
      Apstatus: admitcarddetails?.applicationstatus?.status,
      ApOfficerName: admitcarddetails?.applicationstatus?.OfficerName,

      admitcardstatus: 'Approved',
      admitcarddate: date,
      admitcardtime: time,
      admitcardofficer: adminCookie.user,

      interviewfeedback: admitcarddetails?.interviewoutcome?.interviewFeedback,
      interviewstatus:admitcarddetails?.interviewoutcome?.status,
      interviewofficer: admitcarddetails?.interviewoutcome?.OfficerName,
  
      // Update selection letter details
      selectionletterstatus: admitcarddetails?.selectionletter?.status,
      Totalamount:admitcarddetails?.selectionletter?.TAmount,
      initialamount:admitcarddetails?.selectionletter?.InitialAmount,
      deadlinedate:admitcarddetails?.selectionletter?.DeadlineDate,
      selectionletterofficer: admitcarddetails?.selectionletter?.OfficerName,
  
      // Update confirmation letter details
      confirmationletterstatus: admitcarddetails?.confirmationletter?.status,
      JoinDate:admitcarddetails?.confirmationletter?.JoiningDate,
      instalment2amt: admitcarddetails?.confirmationletter?.InstalmentAmount2,
      instalment3amt: admitcarddetails?.confirmationletter?.InstalmentAmount3,
      instalment2dat: admitcarddetails?.confirmationletter?.InstalmentDate2,
      instalment3dat: admitcarddetails?.confirmationletter?.InstalmentDate3,
      confirmationletterofficer:  admitcarddetails?.confirmationletter?.status,
    }

    

    try {
      const response = await axios.patch(`http://localhost:7001/candidate/${id}`, applicationstatus);
      alert('response updated sucessfull')
      navigate(`/dashboardadmin/admitcardletter/${admitcarddetails.applicationId}`)
    } catch (error) {
      console.error(error);
      alert('response is not updating sucessfull')
    }
  };

  useEffect(() => {
    fetchdata();
  }, [])

  return (
    <>
      <div className='container row'>
        <div>
          <Link className='bi-arrow-left btn btn-light my-3 px-3' to='/dashboardadmin/admitcarddashboard'></Link>
        </div>
        <div >
          <div className='fw-bold fs-5 '>About</div>

          <div className="ms-2 w-75 mt-3">
            <Profile applicantdetail={admitcarddetails} />

          </div>
          <div className='text-secondary mt-4'>
            <h5>Details of {admitcarddetails.candidateName}</h5>
            <dl>
              <div className='d-flex my-4   bg-light'>
                <dt className='mx-4 col-5'>Application No.</dt>
                <dd>{admitcarddetails.applicationId}</dd>
              </div>
              <div className='d-flex my-4  bg-light '>
                <dt className='mx-4 col-5'>Application status</dt>
                <dd>{admitcarddetails?.applicationstatus?.status}</dd>
              </div>
              <div className='d-flex my-4   bg-light '>
                <dt className='mx-4 col-5'>Date of applied</dt>
                <dd>{moment(admitcarddetails.createdAt).format('YYYY-MM-DD')}</dd>
              </div>
              <div className='d-flex my-4  bg-light '>
                <dt className='mx-4 col-5 '>Date of Interview</dt>
                <dd><input className='form-control' type='date' value={moment(date).format('YYYY-MM-DD')} onChange={(e) => setdate(e.target.value)}></input></dd>
              </div>
              <div className='d-flex my-4  bg-light '>
                <dt className='mx-4 col-5'>Time of Interview</dt>
                <dd className='d-flex align-items-center'><input type='time' className='form-control' value={moment(time, "HH:mm").format("hh:mm")} onChange={(e) => settime(e.target.value)}></input></dd>
              </div>
            </dl>
          </div>
          <div className='text-center'>
            <button
              className={`btn text-light py-3 ${(admitcarddetails?.applicationstatus?.status === 'Approved') ? 'd-inline' : 'd-none'}`}
              style={{ width: "40%", backgroundColor: "#1995cc" }}
              onClick={() => btngenereteadmit(admitcarddetails.applicationId)}
            >
              Generate Admit Card
            </button>

          </div>
        </div>
      </div>
    </>
  );
}
