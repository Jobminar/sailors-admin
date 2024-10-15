import profile from '../../assets/Images/dp-dummy.png'
import { useState } from "react";
export function Applicantprofileapplication() {
    const [applicantdetails, setapplicatdetails] = useState({ name: "Nikhil ahirwar", DOB: "29/08/2001", Gmail: "Nikhilraj2908@gmail.com", Location: "Vidisha" })
    const [data, setdata] = useState([
        {
            id: 1,
            applicationNo: "11000997610",
            status: "Approved",
            admitCard: "Generated",
            officerName: "Kiran Reddy",
            selectionLetter: "Generated",
            confirmationLetter: "Generated",
        },
        {
            id: 2,
            applicationNo: "11000997610",
            status: "Approved",
            admitCard: "Generated",
            officerName: "Kiran Reddy",
            selectionLetter: "Generated",
            confirmationLetter: "Generated",
        },
        {
            id: 3,
            applicationNo: "11000997610",
            status: "Approved",
            admitCard: "Generated",
            officerName: "Kiran Reddy",
            selectionLetter: "Generated",
            confirmationLetter: "Generated",
        },
        {
            id: 4,
            applicationNo: "11000997610",
            status: "Approved",
            admitCard: "Generated",
            officerName: "Kiran Reddy",
            selectionLetter: "Generated",
            confirmationLetter: "Generated",
        }
    ])

    return (
        <div>
            <div className="container row mt-2">
                <div className="col-9 " style={{width:"100%"}}>
                    <div className='fw-bold fs-5 '>About</div>
                    <div className='mt-5 ps-4 d-flex align-items-center ' >
                        <div className="row text-secondary " style={{ height: "30vh", backgroundColor: "white", boxShadow: "1px 1px 5px 4px #edf1f0  " }}>
                            <div className='col-3 d-flex align-items-center'>
                                <img className='border border-1 rounded bg-secondary' src={profile} alt="Profile Pictre" style={{ width: "100%", }}></img>
                            </div>
                            <div className='col-9 ps-4 ' style={{ alignContent: "center" }} >
                                <dl >
                                    <div className='row'>
                                        <dt className='col-3'>Name:</dt>
                                        <dd className='col-9'>{applicantdetails.name}</dd>

                                    </div>
                                    <div className='row'>
                                        <dt className='col-3'>Birth Date:</dt>
                                        <dd className='col-9'>{applicantdetails.DOB}</dd>
                                    </div>
                                    <div className='row'>
                                        <dt className='col-3'>Email:</dt>
                                        <dd className='col-9'>{applicantdetails.Gmail}</dd>
                                    </div>
                                    <div className='row'>
                                        <dt className='col-3'>Location:</dt>

                                        <dd className='col-9'>{applicantdetails.Location}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                    <button className="ms-2 mt-5 mb-5 btn py-3 " style={{ width: "20%", backgroundColor: "#c9e4ed" }}>Applications</button>

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
                                    <td>{item.applicationNo}</td>
                                    <td>{item.status}</td>
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