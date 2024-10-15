import { useState } from "react";
import TextField from '@mui/material/TextField';
import { Userprofile } from '../../components/userprofile/userprofile';
export function Applicantfinance() {
    const [applicantdetails, setapplicatdetails] = useState({ name: "Nikhil ahirwar", DOB: "29/08/2001", Gmail: "Nikhilraj2908@gmail.com", Location: "Vidisha" })
    const [btnclicked, setbtnclicked] = useState(true)
    const [transactions, settransactions] = useState([
        { sNo: "01", amountPaid: "xxxxx/-", date: "xx-xx-xxxx", transactionId: "110009997610" },
        { sNo: "02", amountPaid: "xxxxx/-", date: "xx-xx-xxxx", transactionId: "110009997611" },
        { sNo: "03", amountPaid: "xxxxx/-", date: "xx-xx-xxxx", transactionId: "110009997612" },
        { sNo: "04", amountPaid: "xxxxx/-", date: "xx-xx-xxxx", transactionId: "110009997613" }
    ]);
    const [btnstyle, setbtnstyle] = useState("btn btn-outline-secondary")
    function btnviewtransaction() {
        setbtnclicked(false)
    }
    function btnreordatransaction() {
        setbtnclicked(true)
    }
    return (
        <div>
            <div className="container row mt-2" style={{ height: "90vh", overflow: "scroll", }}>
                <div className="col-9 " style={{ width: "100%" }}>
                    <div className='fw-bold fs-5 '>About</div>
                    <Userprofile applicantdetails={applicantdetails} />
                    <button className="ms-2 me-4 mt-5 mb-5 btn py-3 " style={{ width: "20%", backgroundColor: "#c9e4ed" }}>Finance</button>
                    <button className="mx-4 mt-5 mb-5 btn py-3 " style={{ width: "20%", backgroundColor: "#c9e4ed" }}>My Applications</button>
                    <button className="mx-4 mt-5 mb-5 btn py-3 " style={{ width: "20%", backgroundColor: "#c9e4ed" }}>Documents from user</button>
                    <div>
                        <button className={`btn ${btnclicked ? "btn btn-secondary" : btnstyle}  ms-2 px-4 me-5 py-3`} style={{ width: "20%" }} onClick={btnreordatransaction}>Record A Transaction</button>
                        <button className={`btn ${btnclicked ? btnstyle : "btn btn-secondary"}  px-4 py-3`} style={{ width: "20%" }} onClick={btnviewtransaction}>View Transaction</button>
                    </div>
                    {btnclicked ?
                        <form>
                            <div >
                                <div>
                                    <TextField className='mt-5'
                                        style={{ width: "25%" }}
                                        id="Amount Paid"
                                        label="Amount Paid"
                                    />
                                </div>
                                <div>
                                    <TextField
                                        style={{ width: "25%" }}
                                        className='mt-5'
                                        id="outlined-password-input"
                                        label="Date"

                                    />
                                </div>
                                <div>
                                    <TextField
                                        style={{ width: "25%" }}
                                        className='my-5'
                                        id="outlined-password-input"
                                        label="Transaction Id"
                                    />
                                </div>
                                <button className="btn text-light mb-3" style={{backgroundColor:"#EA7139",width: "20%" }}>Submit</button>
                            </div>
                        </form>
                        :
                        <table className="mt-5 table table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">S.no</th>
                                    <th scope="col">Amount paid</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Transaction ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((transaction, index) => (
                                    <tr key={index}>
                                        <td>{transaction.sNo}</td>
                                        <td>{transaction.amountPaid}</td>
                                        <td>{transaction.date}</td>
                                        <td>{transaction.transactionId}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </div>
    )
}