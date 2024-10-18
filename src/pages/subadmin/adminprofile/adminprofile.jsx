import React from "react"

const Adminprofile = () => {
    return (
        <>
            <div>
                WEllcome to admin profile
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
                        <tr>
                            <td>1</td>
                            <td>Vishnu Patel</td>
                            <td>patel@gmail.com</td>
                            <td>153694554</td>
                            <td>xxxx</td>
                            <td>xxxx</td>
                            <td className="text-center"><span className="bi-trash btn btn-danger"></span></td>
                            <td className="text-center"><span className="bi bi-pencil-square btn btn-warning "></span></td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </>
    )
}
export default Adminprofile