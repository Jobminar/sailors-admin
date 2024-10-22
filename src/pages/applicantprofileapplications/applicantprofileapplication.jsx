import { useNavigate, useParams } from 'react-router-dom';

import { useEffect, useState } from "react";

import axios from 'axios';
export function Applicantprofileapplication() {
    const [applicantdetails, setapplicatdetails] = useState({})
    const param = useParams()
    const [data, setdata] = useState([{}])
    const navigate = useNavigate('')
    const fetchdata = async () => {
        try {
            const usedata = await axios.get('http://127.0.0.1:7001/candidates')
            const users = usedata.data;
            const finduser = users.find((user) => user.applicationId === parseInt(param.applicationNo));
            const filteruser = users.filter((user) => user.applicationId === parseInt(param.applicationNo));
            setdata(filteruser)
            setapplicatdetails(finduser)
        } catch (error) {
            console.error(error, 'catch error');
        }
        // console.log(param, 'filter')
    }
    const Handilenavigate = (id) =>{
        navigate(`/dashboardadmin/applicationstatus/${id}`)
    }
    useEffect(() => {
        fetchdata()
    }, [])
    return (
        <div>
            <div className="container row mt-2">
                <div className="col-9 ">
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered " >
                            <thead>
                                <tr>
                                    <th>S.no</th>
                                    <th>Application No.</th>
                                    <th>Application Status</th>
                                    <th>Admit Card</th>
                                    <th>Officer Name</th>
                                    <th>Selection Letter</th>
                                    <th>Officer Name</th>
                                    <th>Confirmation Letter</th>
                                    <th>Officer Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td onClick={()=>Handilenavigate(item.applicationId)}>{item.applicationId}</td>
                                        <td>{item.applicationstatus ? 'Approved' : 'Rejected'}</td>
                                        <td>{item.admitCard}</td>
                                        <td>{item.officerName}</td>
                                        <td>{item.selectionLetter}</td>
                                        <td>{item.officerName}</td>
                                        <td>{item.confirmationLetter}</td>
                                        <td>{item.officerName}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}