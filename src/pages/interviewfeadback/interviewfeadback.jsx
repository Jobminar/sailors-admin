import filterimg from '../../assets/Images/filter.png'
import { useState } from "react"
import './interviewfeadback.css'
const InterviewSchedule = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedAdmitCard, setSelectedAdmitCard] = useState('');
    const [selectNumber, setSelectNumber] = useState('')
    const fakeData = [
        { sno: 1, applicationNo: '110009997609', status: 'Approved', admitCard: 'NotGenerated', download: 'Download', interviewDate: '27/06/24' },
        { sno: 2, applicationNo: '110009997611', status: 'NotApproved', admitCard: 'NotGenerated', download: 'Download', interviewDate: '28/06/24' },
        { sno: 3, applicationNo: '110009997612', status: 'Approved', admitCard: 'Generated', download: 'Download', interviewDate: '27/06/24' },
        { sno: 4, applicationNo: '110009997613', status: 'NotApproved', admitCard: 'NotGenerated', download: 'Download', interviewDate: '29/06/24' },
        { sno: 5, applicationNo: '110009997614', status: 'NotApproved', admitCard: 'NotGenerated', download: 'Download', interviewDate: '1/07/24' },
        { sno: 6, applicationNo: '110009997690', status: 'Approved', admitCard: 'Generated', download: 'Download', interviewDate: '28/06/24' },
        { sno: 7, applicationNo: '110009997615', status: 'Approved', admitCard: 'Generated', download: 'Download', interviewDate: '29/06/24' },
        { sno: 8, applicationNo: '110009997610', status: 'NotApproved', admitCard: 'NotGenerated', download: 'Download', interviewDate: '30/06/24' },
        { sno: 9, applicationNo: '110009997616', status: 'Approved', admitCard: 'NotGenerated', download: 'Download', interviewDate: '28/06/24' },
    ];
    const filteredData = fakeData.filter((item) => {
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
    return (
        <div>
           
            <div className="container row pt-3">
              
                <div className="col-9" style={{width:"100%"}}>
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
                    <div className="table-responsive" >
                        <table className="table table-striped table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th>S.no</th>
                                    <th>Application No.</th>
                                    <th>Application Status</th>
                                    <th>Admit Card</th>
                                    <th>Download Admit Card</th>
                                    <th>Interview Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.sno}</td>
                                        <td>{item.applicationNo}</td>
                                        <td>{item.status}</td>
                                        <td>{item.admitCard}</td>
                                        <td>
                                            <a href="#" className="btn btn-link">{item.download}</a>
                                        </td>
                                        <td>{item.interviewDate}</td>
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

export default InterviewSchedule;
