import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Profile from "../profile/profile";
import { useParams } from "react-router-dom";
import axios from "axios";
export function Applicantfinance() {
    const [applicantdetails, setapplicatdetails] = useState({})
    const [btnclicked, setbtnclicked] = useState(true)
    const params = useParams()
    const [transactions, settransactions] = useState([]);
    const [btnstyle, setbtnstyle] = useState("btn btn-outline-secondary")
    function btnviewtransaction() {
        setbtnclicked(false)
    }
    function btnreordatransaction() {
        setbtnclicked(true)
    }
    const finduser = async() =>{
        try{
            const usedata = await axios.get('http://127.0.0.1:7000/candidate')
            const users = usedata.data;
            const findUsers = users.find((user) => user.applicationId === parseInt(params.id));
            const filterusers = users.filter((user)=> user.applicationId === parseInt(params.id))
            settransactions(filterusers)
            setapplicatdetails(findUsers)

            console.log(params)
        }catch(error){

        }
    }
    useEffect(()=>{
        finduser()
    },[])
    return (
        <div>
            <div className="container row">
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
                                <button className="btn text-light mb-3" style={{backgroundColor:"#EA7139",width: "25%" }}>Submit</button>
                            </div>
                        </form>
                        :
                        <table className="table table-bordered">
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