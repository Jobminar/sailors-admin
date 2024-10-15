import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Profile from '../profile/profile';

const SelectionProfile = () => {
    const [applicantdetails, setApplicantDetails] = useState([])
    const [show, setShow] = useState('d-none')
    const [date, setDate] = useState(null)
    const params = useParams()
    const navigate = useNavigate('')
    const fetchdata = async () => {
        try {
            const usedata = await axios.get('http://127.0.0.1:7000/candidate')
            const users = usedata.data;
            const filteredUsers = users.find((user) => user.applicationId === parseInt(params.id));
            setApplicantDetails(filteredUsers)
        } catch (error) {
            console.error(error, 'catch error');
        }
    }

    const HandileSelect = (e) => {
        const selected = e.target.value
        if (selected === 'Approved') {
            setShow('d-block')
        } else {
            setShow('d-none')
        }
    }

    const HandileGenerate = () =>{
        navigate(`/dashboardadmin/selectionletter/${applicantdetails.applicationId}/letter`)
    }
    
    useEffect(() => {
        fetchdata()
    }, [])

    return (
        <div>
            <div className="row mt-2 container">
                <div className="col-9 w-100">
                    <div className='fw-bold fs-5 '>About</div>
                    <div className='mt-5 ps-4 d-flex align-items-center'  >
                        <Profile applicantdetail={applicantdetails} />
                    </div>
                    <button className="ms-2 mt-5 mb-2 px-4 btn  fw-bold">Details of {applicantdetails.candidateName} </button>
                    <div className='row bg-dark-subtle mx-3 fs-5 rounded-2 py-3 mb-3'>
                        <div className='col-6'>
                            Application number
                        </div>
                        <div className='col-6'>
                            3316329708
                        </div>
                    </div>
                    <div className='row bg-dark-subtle mx-3 fs-5 rounded-2 py-3 mb-3'>
                        <div className='col-6'>
                            Application Status
                        </div>
                        <div className='col-6'>
                            <select className='form-select bg-transparent' onChange={HandileSelect}>
                                <option value="-1">select</option>
                                <option value="Approved">Approved</option>
                                <option value="Reject">Reject</option>
                            </select>
                        </div>
                    </div>
                    <div className='row bg-dark-subtle mx-3 fs-5 rounded-2 py-3 mb-3'>
                        <div className='col-6'>
                            Date of applied

                        </div>
                        <div className='col-6'>
                            xxxx
                        </div>
                    </div>
                    <div className='row bg-dark-subtle mx-3 fs-5 rounded-2 py-3 mb-3'>
                        <div className='col-6'>
                            Initial Amount
                        </div>
                        <div className='col-6'>
                            <input type="text" name="Initialamount" className='form-control bg-transparent' placeholder='Enter  Initial Amount' />

                        </div>
                    </div>
                    <div className='row bg-dark-subtle mx-3 fs-5 rounded-2 py-3 mb-3'>
                        <div className='col-6'>
                            Deadline date
                        </div>
                        <div className='col-6'>
                            <input type="date" name="Deadline" className='form-control bg-transparent' onChange={(e) => setDate(e.target.value)} />
                        </div>
                    </div>
                    <div className={`text-center  ${show}`}>
                        <button className='btn btn-info py-3 fs-4' onClick={HandileGenerate}>Generate Selection Letter</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectionProfile;