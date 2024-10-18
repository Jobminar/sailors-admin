import { useEffect, useState } from 'react'
import './applicantprofile.css'
import profile from '../../assets/Images/dp-dummy.png'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Profile from '../profile/profile'
import Documentuser from '../../components/documentsuser/documentuser'


export function Applicantprofile() {
    const navigate = useNavigate()
    const [userdata, setuserdata] = useState({})
    const [documentuser, setdocumentuser] = useState(false);
    const params = useParams()
    const fetchdata = async () => {
        try {
            const usedata = await axios.get('http://127.0.0.1:7001/candidates')
            const users = usedata.data;
            const filteredUsers = users.find((user) => user.applicationId === parseInt(params.applicationNo));
            setuserdata(filteredUsers)
        } catch (error) {
            console.error(error, 'catch error');
        }
    }
    const applicantprofileapplication = () => {
        setdocumentuser(false)

        navigate(`/dashboardadmin/applicantprofile/${userdata.applicationId}/applicantprofileapplication`)
    }
    const applicantfinanceclick = () => {
        setdocumentuser(false)

        navigate(`/dashboardadmin/applicantprofile/${userdata.applicationId}/applicantfinance`)
    }
    const userdocumentclicked = () => {
        setdocumentuser(true)
    }
    const applicantcommentlick=()=>{
        setdocumentuser(false)

        navigate(`/dashboardadmin/applicantprofile/${userdata.applicationId}/applicantcomment`)
  
    }
    useEffect(() => {
        fetchdata()
    }, [])
    return (
        <>
            <div className='container row'>
                <div>
                    <Link className='bi-arrow-left btn btn-light my-3 px-3' to='/dashboardadmin/myapplication'></Link>
                </div>
                <div className='col-9 ps-4'>
                    <div className='fw-bold fs-5 mb-3 '>About</div>
                    <Profile applicantdetail={userdata} />
                    <div className='d-flex' >
                        <div  >
                            <button style={{ width: "225px" }} className='my-5 btn btn-light applicantprofile  text-secondary p-3 fw-bold' onClick={applicantprofileapplication} >My Applications</button>

                        </div>
                        <div  >
                            <button style={{ width: "225px" }} className='my-5 btn btn-light applicantprofile  text-secondary fw-bold p-3' onClick={applicantfinanceclick}>
                                Financials
                            </button >
                        </div>
                        <div >

                            <button
                                style={{ width: "225px" }}
                                className='my-5 btn btn-light applicantprofile fw-bold text-secondary  p-3'
                                onClick={() => userdocumentclicked(userdata)}>
                                Documents from user
                            </button>
                        </div>
                        <div >
                            <button style={{ width: "225px" }} className='my-5 btn btn-light applicantprofile fw-bold text-secondary  p-3' onClick={applicantcommentlick}>
                                comments
                            </button>
                        </div>
                    </div>
                </div>
                <hr />
                {
                    documentuser ?
                        <div className='w-75'>
                            <Documentuser userdetails={userdata} />
                        </div> :
                        <div>
                            <Outlet />
                        </div>
                }
                <div>
                </div>
            </div>

        </>
    )
}