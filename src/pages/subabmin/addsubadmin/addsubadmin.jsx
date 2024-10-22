import { useRef, useState, useEffect } from 'react';
import './addsubadmin.css';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Addsubadmin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isEditing = location.state && location.state.admin;
    const [files, setFile] = useState(isEditing ? isEditing.photoId : null);
    const fileInputRef = useRef(null);
    
    // Validation schema using Yup
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        number: Yup.string()
            .required('Mobile number is required')
            .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string().required('Password is required'),
        photo: Yup.mixed().required('A file is required'),
    });

    // Initial values for the form
    const initialValues = {
        name: isEditing ? isEditing.name : '',
        number: isEditing ? isEditing.number : '',
        email: isEditing ? isEditing.email : '',
        password: isEditing ? isEditing.password : '',
        photo: null,
        checklist: {
            MyApplication: isEditing ? isEditing.checklist.MyApplication : false,
            AdmitCard: isEditing ? isEditing.checklist.AdmitCard : false,
            InterviewFeedback: isEditing ? isEditing.checklist.InterviewFeedback : false,
            SelectionLetter: isEditing ? isEditing.checklist.SelectionLetter : false,
            ConfirmationLetter: isEditing ? isEditing.checklist.ConfirmationLetter : false,
            Financials: isEditing ? isEditing.checklist.Financials : false,
        },
    };

    useEffect(() => {
        if (isEditing) {
            setFile(isEditing.photoId); // Pre-fill file if editing
        }
    }, [isEditing]);

    const handleClick = () => {
        fileInputRef.current.click();
    };
    const handleFileChange = (event, setFieldValue) => {
        const file = event.target.files[0];
        setFile(file);
        setFieldValue('photo', file);
    };

    const handleSubmit = async (values, { resetForm }) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('number', values.number);
        formData.append('email', values.email);
        formData.append('password', values.password);
        
        // Only append the file if it's a new File object
        if (values.photo instanceof File) {
            formData.append('file', values.photo);
        }
    
        // Append checklist values
        Object.entries(values.checklist).forEach(([key, value]) => {
            formData.append(key, value ? 'true' : 'false');
        });
    
        try {
            let response;
            if (isEditing) {
                response = await axios.put(`http://localhost:7001/subadmin/${isEditing._id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            } else {
                response = await axios.post('http://localhost:7001/subadmincreate', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }
    
            if (response.status === 200) {
                alert(response.data.message);
                resetForm();
                setFile(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
                navigate('/dashboardadmin/subadmin'); // Navigate back to the admin list after saving
            } else {
                alert('Error: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was a problem submitting the form.');
        }
    };
    return (
        <div className="container">
            <div className='m-1'>
                <Link className='bi-arrow-left btn btn-light my-3 px-3' to='/dashboardadmin/subadmin'></Link>
            </div>
            <h2 className="text-center">{isEditing ? 'Edit Subadmin' : 'Add New Subadmin'}</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue }) => (
                    <Form className='addsubadmin-form'>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Enter Name</label>
                            <Field
                                type='text'
                                className="form-control"
                                name="name"
                                placeholder="Enter Name"
                            />
                            <ErrorMessage name="name" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="number" className="form-label">Enter Mobile no.</label>
                            <Field
                                type='text' // Changed to text to avoid unwanted behavior for leading zeros
                                className="form-control"
                                name="number"
                                placeholder="Mobile Number"
                            />
                            <ErrorMessage name="number" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email for login</label>
                            <Field
                                type='email'
                                className="form-control"
                                name="email"
                                placeholder="example@gmail.com"
                            />
                            <ErrorMessage name="email" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <Field
                                type='password'
                                className="form-control"
                                name="password"
                                placeholder="Password"
                            />
                            <ErrorMessage name="password" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Upload Photo</label>
                            <div className="img-box fs-6 d-flex align-items-center justify-content-center" style={{ cursor: "pointer", backgroundColor: "#f0f0f0" }} onClick={handleClick}>
                                {isEditing && !files instanceof File ? (
                                    <img
                                        src={`http://localhost:7001/fileById/${isEditing.photoId}`}
                                        alt="Admin"
                                        style={{ width: "100%", height: "100%", borderRadius: "10px" }}
                                    />
                                ) : files ? (
                                    <img
                                        src={files instanceof File ? URL.createObjectURL(files) : `http://localhost:7001/fileById/${files}`}
                                        alt="Selected"
                                        style={{ width: "100%", height: "100%", borderRadius: "10px" }}
                                    />
                                ) : (
                                    "Click to upload image"
                                )}
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={(event) => handleFileChange(event, setFieldValue)}
                                style={{ display: "none" }}
                                accept=".jpg, .jpeg, .png"
                            />
                            <ErrorMessage name="photo" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Permissions</label>
                            <div className='d-flex flex-wrap'>
                                {Object.keys(initialValues.checklist).map((key) => (
                                    <div key={key} className="form-check alert alert-dark w-25 m-1">
                                        <Field
                                            type="checkbox"
                                            className="form-check-input m-1"
                                            name={`checklist.${key}`}
                                        />
                                        <label className="form-check-label"> {key}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='text-center'>
                            <button type='submit' className='btn btn-primary w-50 py-3 mt-4'>
                                {isEditing ? 'Update Subadmin' : 'Submit'}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Addsubadmin;
