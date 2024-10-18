import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Profile from "../profile/profile";
import { useParams } from "react-router-dom";
import axios from "axios";
export function Applicantfinance() {
    const [applicantdetails, setapplicatdetails] = useState({})
    const [btnclicked, setbtnclicked] = useState(true)
    const params = useParams()
    const [btnstyle, setbtnstyle] = useState("btn btn-outline-secondary")
    const [transactions, settransactions] = useState([
        { sNo: "01", amountPaid: "xxxxx/-", date: "xx-xx-xxxx", transactionId: "110009997610" },
        { sNo: "02", amountPaid: "xxxxx/-", date: "xx-xx-xxxx", transactionId: "110009997611" },
        { sNo: "03", amountPaid: "xxxxx/-", date: "xx-xx-xxxx", transactionId: "110009997612" },
        { sNo: "04", amountPaid: "xxxxx/-", date: "xx-xx-xxxx", transactionId: "110009997613" }
    ]);
    function btnviewtransaction() {
        setbtnclicked(false)
    }
    function btnreordatransaction() {
        setbtnclicked(true)
    }
    const finduser = async () => {
        try {
            const usedata = await axios.get('http://127.0.0.1:7000/candidate')
            const users = usedata.data;
            const findUsers = users.find((user) => user.applicationId === parseInt(params.id));
            const filterusers = users.filter((user) => user.applicationId === parseInt(params.id))
            settransactions(filterusers)
            setapplicatdetails(findUsers)

            console.log(params)
        } catch (error) {

        }
    }
    useEffect(() => {
        finduser()
    }, [])
    return (
        <div>
            <div className="container row">
                <div>
                    <button className={`btn ${btnclicked ? "btn btn-secondary" : btnstyle}  ms-2 px-4 me-5 py-3`} style={{ width: "20%" }} onClick={btnreordatransaction}>Record A Transaction</button>
                    <button className={`btn ${btnclicked ? btnstyle : "btn btn-secondary"}  px-4 py-3`} style={{ width: "20%" }} onClick={btnviewtransaction}>View Transaction</button>
                </div>
                <div className="col-9" >
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
                                <button className="btn text-light mb-3" style={{ backgroundColor: "#EA7139", width: "25%" }}>Submit</button>
                            </div>
                        </form>
                        :
                        <table className="table table-bordered mt-4">
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