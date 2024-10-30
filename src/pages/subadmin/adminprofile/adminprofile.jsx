import React from "react";
import useFetchData from '../../../Hook/Getalluser/getalluser';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useCookies } from "react-cookie";

const Adminprofile = () => {
    const { data, error, isLoading } = useFetchData('http://localhost:7001/subadmin');
    const [adminCookie, setCookie, removeCookie] = useCookies(["user"]);

    const navigate = useNavigate();

    const Handilenavigate = (num) => {
        navigate(`/dashboardadmin/adminprofile/${num}`);
    }

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this subadmin?");
        if (confirmDelete) {
            try {
                const response = await axios.delete(`http://localhost:7001/subadmin/${id}`);
                alert(response.data.message);
                // Reload to fetch updated data
                window.location.reload();
            } catch (error) {
                console.error('Error deleting subadmin:', error);
                alert('Error deleting subadmin');
            }
        }
    };

    const handleEdit = (admin) => {
        navigate('/dashboardadmin/subadmin/addadmin', { state: { admin } }); // Pass admin details
    }
    const HandilLogout = ()=>{
        removeCookie('user')
        navigate('/')
    }

    return (
        <>
            <div className="m-3">
                <div className="text-end align-content-center">
                    <div>
                        <button className="btn btn-outline-danger px-3 me-2 mb-2" onClick={HandilLogout}>Logout</button>
                        <Link className="btn btn-outline-primary mb-2" to='/dashboardadmin/subadmin/addadmin'>Add New Sub Admin</Link></div>
                </div>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Subadmin Name</th>
                            <th>Login Email</th>
                            <th>Password</th>
                            <th>Phone Number</th>
                            <th>Photo</th>
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((admin, i) => (
                            <tr key={admin._id}>
                                <td onClick={() => Handilenavigate(admin.number)}>{i + 1}</td>
                                <td onClick={() => Handilenavigate(admin.number)}>{admin.name}</td>
                                <td onClick={() => Handilenavigate(admin.number)}>{admin.email}</td>
                                <td onClick={() => Handilenavigate(admin.number)}>{admin.password}</td>
                                <td onClick={() => Handilenavigate(admin.number)}>{admin.number}</td>
                                <td onClick={() => Handilenavigate(admin.number)}>
                                    {admin.photoId ? (
                                        <img
                                            src={`http://localhost:7001/fileById/${admin.photoId}`}
                                            alt={admin.name}
                                            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                                        />
                                    ) : (
                                        'No Image'
                                    )}
                                </td>
                                <td className="text-center">
                                    <span
                                        className="bi-trash btn btn-danger"
                                        onClick={() => handleDelete(admin._id)} // Pass the admin ID for deletion
                                    ></span>
                                </td>
                                <td className="text-center">
                                    <span
                                        className="bi bi-pencil-square btn btn-warning"
                                        onClick={() => handleEdit(admin)} // Pass admin details to edit
                                    ></span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Adminprofile;
