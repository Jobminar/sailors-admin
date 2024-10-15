import React, { useEffect, useState } from "react";
import profileimg from '../../assets/Images/dp-dummy.png'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Subadmin = () => {
    const[userDetail,setuserDetail] = useState([])
    const fetchdata =  async() =>{
        try{
            const userdata = await axios.get('http://127.0.0.1:7000/candidate')
            const users = userdata.data;
            const filteredUsers = users.find((user) => user.applicationId === 1265736140);
            console.log(filteredUsers)
            setuserDetail(filteredUsers)
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchdata()
    },[])
    return (
        <>
            <div style={{padding:'40px'}}>
                <div className="d-flex justify-content-between" >
                    <div>
                        <div className="p-3 border border-1 mt-5 shadow">
                            <img src={profileimg} alt="pic" style={{width:'150px',height:'150px',borderRadius:'50%'}} />
                        </div>
                    </div>
                    <div className="text-end">
                        <Link className="btn btn-outline-primary" to='/dashboardadmin/subadmin/addadmin'>Add New Sub Admin</Link>
                        <br />
                        <div className="btn-group mt-4 border border-1">
                            <button className=" btn btn-outline-light btn btn-outline-light bi-funnel text-dark p-3 border border-1 "></button>
                            <button className="btn btn-outline-light text-dark border border-1">Filter BY</button>
                            <select  className="btn border-0">
                                <option value="-1">Sub Admin</option>
                                <option value="subadmin1">Sub Admin1</option>
                                <option value="subadmin2">Sub Admin2</option>
                                <option value="subadmin3">Sub Admin3</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="mt-5 fs-5">
                    <div className="row p-3">
                        <div className="col-1">
                            Name
                        </div>
                        <div className=" ps-4 col text-dark-emphasis">
                            {userDetail.candidateName}
                        </div>
                    </div>
                    <div className="row p-3">
                        <div className="col-1">
                            Mobile:
                        </div>
                        <div className=" ps-4 col text-dark-emphasis">
                            {userDetail.mobileNumber}
                        </div>
                    </div>
                    <div className="row p-3">
                        <div className="col-1">
                            Eamil
                        </div>
                        <div className=" ps-4 col text-dark-emphasis">
                            {userDetail.email}
                        </div>
                    </div>
                    <div className="row p-3">
                        <div className="col-1">
                            Addresh
                        </div>
                        <div className=" ps-4 col text-dark-emphasis">
                            {userDetail.city}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Subadmin;
