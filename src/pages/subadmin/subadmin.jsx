import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const Subadmin = () => {
    const [userDetail, setUserDetail] = useState({});
    const [allSubadmins, setAllSubadmins] = useState([]);
    const { id } = useParams(); // Destructure param for better readability
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate('')

    const fetchData = async () => {
        try {
            const { data: users } = await axios.get('http://127.0.0.1:7001/subadmin');
            const filteredUser = users.find((user) => user.number === id);
            setAllSubadmins(users);
            setUserDetail(filteredUser);
            return filteredUser; // Return the filtered user for further use
        } catch (err) {
            console.error(err);
            setError('Failed to fetch user details.');
        }
    };

    const handleShowFile = async (photoId) => {
        if (!photoId) return; // Avoid unnecessary calls if no photoId

        try {
            const response = await axios.get(`http://localhost:7001/fileById/${photoId}`, {
                responseType: 'blob',
            });
            const fileURL = URL.createObjectURL(new Blob([response.data]));
            setFile(fileURL);
        } catch (err) {
            console.error('Error fetching file:', err);
            setError('Failed to fetch the file.');
        }
    };
    const Handilechange= (e)=>{
        const adminnumbver =  e.target.value;
        navigate(`/dashboardadmin/adminprofile/${adminnumbver}`)
    }

    useEffect(() => {
        const fetchDataAndFile = async () => {
            const user = await fetchData();
            if (user) {
                handleShowFile(user.photoId);
            }
        };
        fetchDataAndFile();
    }, [id]);

    const checklistItems = userDetail.checklist
        ? Object.entries(userDetail.checklist).map(([key, value]) => (
            <div className="alert alert-info w-25 m-1" key={key}>
                {value ? '✔️' : '❌'} {key}
            </div>
        ))
        : [];

    return (
        <div style={{ padding: '40px' }}>
            <div>
                <div className="row text-secondary rounded-3 p-3" style={{ height: "30vh", width: '100%', backgroundColor: "white", boxShadow: "1px 1px 5px 4px #edf1f0" }}>
                    <div className='col-2 align-content-center'>
                        <img src={file} alt="Uploaded file" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
                    </div>
                    <div className='col-5' style={{ alignContent: "center" }}>
                        <dl>
                            {['name', 'email', 'number', 'password'].map((field, index) => (
                                <div className='row' key={index}>
                                    <dt className='col-3'>{field.charAt(0).toUpperCase() + field.slice(1)}:</dt>
                                    <dd className='col-9'>{userDetail[field]}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                    <div className="text-end col-5">
                        <Link className="btn btn-outline-primary" to='/dashboardadmin/subadmin/addadmin'>Add New Sub Admin</Link>
                        <br />
                        <div className="btn-group mt-4 border border-1">
                            <button className="btn btn-outline-light bi-funnel text-dark p-3 border border-1"></button>
                            <button className="btn btn-outline-light text-dark border border-1">Filter BY</button>
                            <select className="btn border-0" onChange={(e)=>Handilechange(e)}>
                                <option value="-1">Sub Admin</option>
                                {allSubadmins.map((subadmin, i) => (
                                    <option key={i} value={subadmin.number} className="text-start">{subadmin.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-5 ">
                <h3>Permision</h3>
                <div className="d-flex flex-wrap">
                    {checklistItems}
                </div>
            </div>
        </div>
    );
}

export default Subadmin;
