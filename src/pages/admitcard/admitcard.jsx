import { useEffect, useState } from 'react';
import profile from '../../assets/Images/dp-dummy.png';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Profile from '../profile/profile';
import axios from 'axios';
import moment from 'moment';

export function Admitcard() {
  const navigate = useNavigate();
  const param = useParams()
  const [admitcarddetails, setadmitcarddetails] = useState([{}]);
  function btngenereteadmit(details) {
    navigate(`/dashboardadmin/admitcardletter/${admitcarddetails.applicationId}`)
  }
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
          <Profile  applicantdetail={admitcarddetails} />

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
                <dd>{admitcarddetails.applicationstatus ? 'Approved' : 'Not Approved'}</dd>
              </div>
              <div className='d-flex my-4   bg-light '>
                <dt className='mx-4 col-5'>Date of applied</dt>
                <dd>{moment(admitcarddetails.createdAt).format('YYYY-MM-DD')}</dd>
              </div>
              <div className='d-flex my-4  bg-light '>
                <dt className='mx-4 col-5 '>Date of Interview</dt>
                <dd><input className='form-control' type='date'></input></dd>
              </div>
              <div className='d-flex my-4  bg-light '>
                <dt className='mx-4 col-5'>Time of Interview</dt>
                <dd className='d-flex align-items-center'><input type='time' className='form-control'></input></dd>
              </div>
            </dl>
          </div>
          <div className='text-center'>
            <button className='btn text-light  py-3 ' style={{ width: "40%", backgroundColor: "#1995cc" }} onClick={() => btngenereteadmit(admitcarddetails)}>Generate Admit card</button>
          </div>
        </div>
      </div>
    </>
  );
}
