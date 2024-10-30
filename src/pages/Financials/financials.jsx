import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Profile from "../profile/profile";
import { useParams } from "react-router-dom";
import axios from "axios";


export function Applicantfinance() {
    // const [applicantdetails, setapplicatdetails] = useState({})
    const [btnclicked, setbtnclicked] = useState(true)
    const {applicationNo} = useParams()
    const [btnstyle, setbtnstyle] = useState("btn btn-outline-secondary")
    const [transactions, settransactions] = useState([]);
    const [Transactiondetails,setTransactionsdetails] = useState({
        Amount:'',
        Date:'',
        TransactionID:''
    })

    function btnviewtransaction() {
        setbtnclicked(false)
    }
    function btnreordatransaction() {
        setbtnclicked(true)
    }

    const Handilesubmit = async (e) => {
        e.preventDefault();
        try {
            const transactionData = {
                applicationId:applicationNo, // Add applicationId here
                Amount: Transactiondetails.Amount,
                Date: Transactiondetails.Date,
                TransactionID: Transactiondetails.TransactionID
            };
            await axios.post('http://127.0.0.1:7001/Transaction', transactionData);
            alert('Transaction details updated successfully');
            setTransactionsdetails({ Amount: '', Date: '', TransactionID: '' });
        } catch (error) {
            console.error('Error while submitting transaction details:', error);
            alert('Failed to update transaction details. Please try again.');
        }
    }
    const finduser = async () => {
        try {
            const usedata = await axios.get(`http://127.0.0.1:7001/Transaction/${applicationNo}`)
            settransactions(usedata.data)
        } catch (error) {
            console.log(error,'error while uploading transcationdetails')
        }
    }
    useEffect(() => {
        finduser()
    }, [applicationNo])
    return (
        <div>
            <div className="container row">
                <div>
                    <button className={`btn ${btnclicked ? "btn btn-secondary" : btnstyle}  ms-2 px-4 me-5 py-3`} style={{ width: "20%" }} onClick={btnreordatransaction}>Record A Transaction</button>
                    <button className={`btn ${btnclicked ? btnstyle : "btn btn-secondary"}  px-4 py-3`} style={{ width: "20%" }} onClick={btnviewtransaction}>View Transaction</button>
                </div>
                <div className="col-9" >
                    {btnclicked ?
                        <form onSubmit={(e)=>Handilesubmit(e)}>
                            <div >
                                <div>
                                    <TextField className='mt-5'
                                        style={{ width: "25%" }}
                                        id="Amount Paid"
                                        label="Amount Paid"
                                        onChange={(e) => setTransactionsdetails(prevDetails => ({
                                            ...prevDetails,
                                            Amount: e.target.value // Update only the Amount property
                                        }))}
                                        required
                                    />
                                </div>
                                <div>
                                    <TextField
                                        style={{ width: "25%" }}
                                        className='mt-5'
                                        id="outlined-password-input"
                                        label="Date"
                                        onChange={(e) => setTransactionsdetails(prevDetails => ({
                                            ...prevDetails,
                                            Date: e.target.value // Update only the Amount property
                                        }))}
                                        required

                                    />
                                </div>
                                <div>
                                    <TextField
                                        style={{ width: "25%" }}
                                        className='my-5'
                                        id="outlined-password-input"
                                        label="Transaction Id"
                                        onChange={(e) => setTransactionsdetails(prevDetails => ({
                                            ...prevDetails,
                                            TransactionID: e.target.value // Update only the Amount property
                                        }))}
                                        required
                                    />
                                </div>
                                <button className="btn text-light mb-3" style={{ backgroundColor: "#EA7139", width: "25%" }} type="submit">Submit</button>
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
                                    <tr key={index+1}>
                                        <td>{transaction.applicationId}</td>
                                        <td>{transaction.Amount}</td>
                                        <td>{transaction.createdAt}</td>
                                        <td>{transaction.TransactionID}</td>
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