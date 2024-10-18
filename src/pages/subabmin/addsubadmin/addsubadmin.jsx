import { useRef, useState } from 'react';
import './addsubadmin.css';

const Addsubadmin = () => {
    const [files, setFile] = useState(null);
    const fileInputRef = useRef(null);
    const [subadmindetails, setSubAdminDetails] = useState({
        name: '',
        number: '',
        email: '',
        password: ''
    });

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSubAdminDetails({ ...subadmindetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!subadmindetails.name || !subadmindetails.number || !subadmindetails.email || !subadmindetails.password || !files) {
            alert('Please fill in all fields including the photo.');
            return;
        }

        // Prepare form data to send to the server
        const formData = new FormData();
        formData.append('name', subadmindetails.name);
        formData.append('number', subadmindetails.number);
        formData.append('email', subadmindetails.email);
        formData.append('password', subadmindetails.password);
        formData.append('file', files); // Append the file


        try {
            const response = await fetch('http://localhost:7001/subadmincreate', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            if (response.ok) {
                alert(result.message);
                // Reset form
                setSubAdminDetails({
                    name: '',
                    number: '',
                    email: '',
                    password: ''
                });
                setFile(null);
                fileInputRef.current.value = '';
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was a problem submitting the form.');
        }
    };


    return (
        <div className="p-5 mx-5">
            <div className="fw-bold fs-4">Add new Sub admin</div>
            <form className='addsubadmin-form' onSubmit={handleSubmit}>
                <dt>Enter Name</dt>
                <dd>
                    <input
                        type='text'
                        className="form-control"
                        onChange={handleChange}
                        name="name"
                        value={subadmindetails.name}
                        placeholder="Enter Name"
                        required
                    />
                </dd>
                <dt>Enter Mobile no.</dt>
                <dd>
                    <input
                        type='number'
                        className="form-control"
                        onChange={handleChange}
                        name="number"
                        value={subadmindetails.number}
                        placeholder="Mobile Number"
                        required
                    />
                </dd>
                <dt>Email for login</dt>
                <dd>
                    <input
                        type='email'
                        className="form-control"
                        onChange={handleChange}
                        name="email"
                        value={subadmindetails.email}
                        placeholder="example@gmail.com"
                        required
                    />
                </dd>
                <dt>Password</dt>
                <dd>
                    <input
                        type='password'
                        className="form-control"
                        onChange={handleChange}
                        name="password"
                        value={subadmindetails.password}
                        placeholder="Password"
                        required
                    />
                </dd>
                <dt>Upload photo</dt>
                <dd
                    className="img-box fs-6 d-flex align-items-center justify-content-center"
                    style={{ cursor: "pointer", backgroundColor: "#f0f0f0" }}
                    onClick={handleClick}
                >
                    {files ? (
                        <img
                            src={files && URL.createObjectURL(files)}
                            alt={files.name}
                            style={{ width: "100%", height: "100%", borderRadius: " 10px " }}
                        />
                    ) : (
                        "upload photo"
                    )}
                </dd>
                <div className='d-flex'>
                    <div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                            accept=".jpg, .jpeg, .png"
                            required
                        />
                    </div>
                </div>
                <div className='text-center'>
                    <button className='btn w-75 text-light mt-5' style={{ backgroundColor: "#021e3d" }}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Addsubadmin;
