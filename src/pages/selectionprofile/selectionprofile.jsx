import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Profile from '../profile/profile';
import moment from 'moment'

const SelectionProfile = () => {
    const [applicantdetails, setApplicantDetails] = useState([])
    const [show, setShow] = useState('d-none')
    const [date, setDate] = useState(null)
    const params = useParams()
    const navigate = useNavigate('')
    // const today = moment().format('YYYY-MM-DD');
    const fetchdata = async () => {
        try {
            const usedata = await axios.get('http://127.0.0.1:7001/candidates')
            const users = usedata.data;
            const filteredUsers = users.find((user) => user.applicationId === parseInt(params.id));
            setApplicantDetails(filteredUsers)
        } catch (error) {
            console.error(error, 'catch error');
        }
    }

    const HandileSelect = (e) => {
        if(applicantdetails.applicationstatus) {
            setShow('d-block')
        } else {
            setShow('d-none')
        }
    }

    const HandileGenerate = () =>{
        navigate(`/dashboardadmin/selectionletter/${applicantdetails.applicationId}/letter`)
    }
    
    useEffect(() => {
        HandileSelect()
        fetchdata()
    }, [HandileSelect,fetchdata])

    return (
        <div>
            <div className="row mt-2 container">
            <div>
                <Link className='bi-arrow-left btn btn-light my-3 px-3' to='/dashboardadmin/selectionletter'></Link>
            </div>
                <div className="col-9 w-100">
                    <div className='fw-bold fs-5 '>About</div>
                    <div className="w-75 ps-2 mt-3">
                    <Profile applicantdetail={applicantdetails} />
                    </div>
                    <button className=" mt-5 mb-2 px-4 btn  fw-bold">Details of {applicantdetails.candidateName} </button>
                    <div className='row bg-light mx-3 fs-5 rounded-2 py-3 mb-3'>
                        <div className='col-6'>
                            Application number
                        </div>
                        <div className='col-6'>
                            {applicantdetails.applicationId}
                            {/* 3316329708 */}
                        </div>
                    </div>
                    <div className='row bg-light mx-3 fs-5 rounded-2 py-3 mb-3'>
                        <div className='col-6'>
                            Application Status
                        </div>
                        <div className='col-6'>
                            {(applicantdetails.applicationstatus)?'Approved':'Reject'}
                        </div>
                    </div>
                    <div className='row bg-light mx-3 fs-5 rounded-2 py-3 mb-3'>
                        <div className='col-6'>
                            Date of applied

                        </div>
                        <div className='col-6'>
                        {moment(applicantdetails.createdAt).format('YYYY-MM-DD')}
                        </div>
                    </div>
                    <div className='row bg-light mx-3 fs-5 rounded-2 py-3 mb-3'>
                        <div className='col-6'>
                            Initial Amount
                        </div>
                        <div className='col-6'>
                            <input type="text" name="Initialamount" className='form-control bg-transparent' placeholder='Enter  Initial Amount' />

                        </div>
                    </div>
                    <div className='row bg-light mx-3 fs-5 rounded-2 py-3 mb-3'>
                        <div className='col-6'>
                            Deadline date
                        </div>
                        <div className='col-6'>
                            <input type="date" name="Deadline" min={moment().format('YYYY-MM-DD')} className='form-control bg-transparent' onChange={(e) => setDate(e.target.value)} />
                        </div>
                    </div>
                    <div className={`text-center  ${show}`}>
                        <button className='btn py-3 fs-4' style={{backgroundColor:'#0486aa'}} onClick={HandileGenerate}>Generate Selection Letter</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectionProfile;