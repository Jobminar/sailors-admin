import React from "react"
import useFetchData from '../../../Hook/Getalluser/getalluser'
import { useNavigate } from "react-router-dom"

const Adminprofile = () => {
    const { data, error, isLoading } = useFetchData('http://localhost:7001/subadmin')
    const navigate = useNavigate('')
    console.log(data)
    const Handilenavigate = (num) => {
        navigate(`/dashboardadmin/adminprofile/${num}`)
    }
    return (
        <>
            <div className="m-3">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Subadmin Name</th>
                            <th>Login mail</th>
                            <th>password</th>
                            <th>PhoneNumber</th>
                            <th>Photo</th>
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((admin, i) =>
                                <tr key={i}>
                                    <td>{i+1}</td>
                                    <td onClick={()=>Handilenavigate(admin.number)}>{admin.name}</td>
                                    <td>{admin.email}</td>
                                    <td>{admin.password}</td>
                                    <td>{admin.number}</td>
                                    <td>xxxx</td>
                                    <td className="text-center"><span className="bi-trash btn btn-danger"></span></td>
                                    <td className="text-center"><span className="bi bi-pencil-square btn btn-warning "></span></td>
                                </tr>)
                        }
                    </tbody>

                </table>
            </div>
        </>
    )
}
export default Adminprofile