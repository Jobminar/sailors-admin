import { useEffect, useState } from 'react'
import './applicantprofile.css'
import profile from '../../assets/Images/dp-dummy.png'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Profile from '../profile/profile'


export function Applicantprofile() {
    const navigate = useNavigate()
    const [userdata, setuserdata] = useState({})
    const params = useParams()
    const fetchdata = async () => {
        try {
            const usedata = await axios.get('http://127.0.0.1:7000/candidate')
            const users = usedata.data;
            const filteredUsers = users.find((user) => user.applicationId === parseInt(params.applicationNo));
            setuserdata(filteredUsers)
        } catch (error) {
            console.error(error, 'catch error');
        }
    }
    const applicantprofileapplication = () => {
        navigate(`/dashboardadmin/applicantprofileapplication/${userdata.applicationId}`)
    }
    const applicantfinanceclick = () => {
        navigate(`/dashboardadmin/applicantfinance/${userdata.applicationId}`)
    }
    useEffect(() => {
        fetchdata()
    }, [])
    return (
        <>
            <div className='container row'>
                <div className='col-9 p-4'>
                    <div className='fw-bold fs-5 mb-3 '>About</div>
                    <Profile applicantdetail={userdata} />
                    <div >
                        <div  >
                            <button style={{ width: "250px" }} className='my-5 btn btn-light applicantprofile  text-secondary p-3 fw-bold' onClick={applicantprofileapplication} >My Applications</button>

                        </div>
                        <div  >
                            <button style={{ width: "250px" }} className='my-5 btn btn-light applicantprofile  text-secondary fw-bold p-3' onClick={applicantfinanceclick}>
                                Financials
                            </button >
                        </div>

                        <div >
                            <button style={{ width: "250px" }} className='my-5 btn btn-light applicantprofile fw-bold text-secondary  p-3'>
                                Documents from user
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}