import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const Subadmin = () => {
    const [userDetail, setuserDetail] = useState([])
    const param = useParams()
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const fetchdata = async () => {
        try {
            const userdata = await axios.get('http://127.0.0.1:7001/subadmin')
            const users = userdata.data;
            const filteredUsers = users.find((user) => user.number === param.id);
            setuserDetail(filteredUsers)
        } catch (error) {
            console.log(error)
        }
    }

    const handleShowFile = async () => {
        try {
            const response = await axios.get(`http://localhost:7001/fileById/${userDetail.photoId}`, {
                responseType: 'blob',
            });

            const fileURL = URL.createObjectURL(new Blob([response.data]));
            setFile(fileURL);
        } catch (err) {
            console.error('Error fetching file:', err);
            setError('Failed to fetch the file.');
        }
    };
    useEffect(() => {
        handleShowFile()
        fetchdata()
    }, [handleShowFile, fetchdata])
    return (
        <>
            <div style={{ padding: '40px' }}>
                <div className="d-flex justify-content-between" >
                    <div className="row text-secondary rounded-3 p-3" style={{ height: "30vh", width: '100%', backgroundColor: "white", boxShadow: "1px 1px 5px 4px #edf1f0  " }}>
                        <div className='col-2 align-content-center'>
                            <img src={file} alt="Uploaded file" style={{ width: '150px', height: '150px', }} />
                        </div>
                        <div className='col-5' style={{ alignContent: "center" }} >
                            <dl >
                                <div className='row'>
                                    <dt className='col-3'>Name:</dt>
                                    <dd className='col-9'>{userDetail.name}</dd>
                                </div>
                                <div className='row'>
                                    <dt className='col-3'>Email:</dt>
                                    <dd className='col-9'>{userDetail.email}</dd>
                                </div>
                                <div className='row'>
                                    <dt className='col-3'>Number:</dt>

                                    <dd className='col-9'>{userDetail.number}</dd>
                                </div>
                                <div className='row'>
                                    <dt className='col-3'>password</dt>
                                    <dd className='col-9'>{userDetail.password}</dd>
                                </div>
                            </dl>
                        </div>
                        <div className="text-end col-5">
                            <Link className="btn btn-outline-primary" to='/dashboardadmin/subadmin/addadmin'>Add New Sub Admin</Link>
                            <br />
                            <div className="btn-group mt-4 border border-1">
                                <button className=" btn btn-outline-light btn btn-outline-light bi-funnel text-dark p-3 border border-1 "></button>
                                <button className="btn btn-outline-light text-dark border border-1">Filter BY</button>
                                <select className="btn border-0">
                                    <option value="-1">Sub Admin</option>
                                    <option value="subadmin1">Sub Admin1</option>
                                    <option value="subadmin2">Sub Admin2</option>
                                    <option value="subadmin3">Sub Admin3</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-3 mt-5">
                    
                </div>
            </div>
        </>
    )
}
export default Subadmin;
