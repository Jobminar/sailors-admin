import filterimg from '../../assets/Images/filter.png'
import { useState } from "react"
import { useEffect } from 'react';
import './selection.css'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
const Selectionpage = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedAdmitCard, setSelectedAdmitCard] = useState('');
    const [selectNumber, setSelectNumber] = useState('');
    const [realdata,setRealdata] = useState([])
    const navigate  = useNavigate('')
    const params = useParams({
        applicationId:''
    })

    const featchdata = async() =>{
        try{
            const users = await axios.get('http://127.0.0.1:7000/candidate')
            setRealdata(users.data)
        }catch(error){
            console.error(error,'catch error');
        }
    }

    const filteredData = realdata.filter((item) => {
        if (selectedDate && item.interviewDate !== selectedDate) {
            return false
        };
        if (selectedStatus && item.status !== selectedStatus) {
            return false
        };
        if (selectedAdmitCard && item.admitCard !== selectedAdmitCard) {
            return false
        };
        if (selectNumber && item.applicationNo !== selectNumber) {
            return false;
        }

        return true;
    });

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    const handleAdmitCardChange = (e) => {
        setSelectedAdmitCard(e.target.value);
    };
    const handleNumberChange = (e) => {
        setSelectNumber(e.target.value);
    }
    const handileclick = (e,items) =>{
        console.log(items.applicationId,'hello')
        navigate(`/dashboardadmin/selectionletter/${items.applicationId}`)
    }   

    useEffect(()=>{
        featchdata()
    },[])
    return (
        <div>
           
            <div className="container row pt-3">
              
                <div className="col-9" style={{width:"100%"}}>
                    {/* Filter */}
                    <div className="btn-group   mt-2 mb-5">
                        <button className="btn btn-light">
                            <img src={filterimg}></img>
                        </button>
                        <button className="btn btn-light">
                            Filter By
                        </button>
                        <button className="btn btn-light">
                            <select className="form-select" value={selectedDate} onChange={handleDateChange}>
                                <option value="">Select Date</option>
                                <option value="27/06/24">27/06/24</option>
                                <option value="28/06/24">28/06/24</option>
                                <option value="29/06/24">29/06/24</option>
                                <option value="30/06/24">30/06/24</option>
                                <option value="01/07/24">01/07/24</option>
                            </select>
                        </button>
                        <button className="btn btn-light">
                            <select className="form-select" value={selectedStatus} onChange={handleStatusChange}>
                                <option value="">Application Status</option>
                                <option value="Approved">Approved</option>
                                <option value="NotApproved">NotApproved</option>
                            </select>
                        </button>
                        <button className="btn btn-light">
                            <select className="form-select" value={selectedAdmitCard} onChange={handleAdmitCardChange}>
                                <option value=""> Admit Card</option>
                                <option value="Generated">Generated</option>
                                <option value="NotGenerated">NotGenerated</option>
                            </select>
                        </button>
                        <button className="btn btn-light">
                            <div className="d-flex">
                                <input className="form-control" placeholder="search with Number" vlaue={selectNumber} onChange={handleNumberChange}>

                                </input>
                                <span className="bi bi-search" style={{ marginLeft: "-12%", alignContent: "center" }}></span>

                            </div>
                        </button>
                    </div>
                    {/* table */}
                    <div className="table-responsive" >
                        <table className="table table-striped table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th>S.no</th>
                                    <th>Applicant Name</th>
                                    <th>Application No.</th>
                                    <th>Application Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td onClick={(e)=>handileclick(e,item)}>{item.candidateName}</td>
                                        <td>{item.applicationId}</td>
                                        {/* <td>{item.status}</td> */}
                                        <td>Approved</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Selectionpage;
