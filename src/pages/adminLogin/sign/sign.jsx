import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';

const Adminsign = () => {
    const navigate = useNavigate(); // Corrected usage
    const [adminCookie, setCookie] = useCookies(["user"]);

    const handleSignIn = () => { // Corrected function name
        navigate('/login');
    }

    return (
        <>
            <div className="d-flex justify-content-center align-items-center bg-dark" style={{ height: '100vh', width: '100%' }}>
                <div className="bg-light border border-1 rounded-3 w-25 p-4">
                    <div className="fw-medium fs-2 p-2">Create an Account</div>
                    <div className="mb-5 text-center">Create an Account to continue</div>
                    <Formik
                        initialValues={{ adminEmail: '', adminPassword: '', termsAccepted: false }}
                        validationSchema={yup.object({
                            adminEmail: yup.string().email('Invalid Email').required('Email is required'),
                            adminPassword: yup.string().required('Password is required'),
                            termsAccepted: yup.boolean().oneOf([true], 'Please accept the terms and conditions'), // Corrected name
                        })}
                        onSubmit={async(values, { setSubmitting }) => {
                            try{
                                await axios.post('http://localhost:7001/mainsubadmin',values)
                                setCookie('user', values.adminEmail);
                                navigate('/')
                            }catch(error){
                                console.log(error)
                            }
                        }}
                    >
                        {() => (
                            <Form>
                                <dl className="mb-5 rounded-3">
                                    <dd>Email</dd>
                                    <dd><Field type='input' className='form-control' name='adminEmail' placeholder='' /></dd>
                                    <dd className="text-danger"><ErrorMessage name='adminEmail' /></dd>
                                    <dd>Password</dd>
                                    <dd><Field type='password' className='form-control' name='adminPassword' placeholder='Enter Your Password' /></dd>
                                    <dd className="text-danger"><ErrorMessage name='adminPassword' /></dd>
                                    <dd>
                                        <Field type='checkbox' className='form-check-input' name='termsAccepted' />
                                        <label htmlFor='termsAccepted' className="ps-2"> I accept the terms and conditions</label>
                                    </dd>
                                    <dd className="text-danger"><ErrorMessage name="termsAccepted" /></dd>
                                </dl>
                                <div className="mt-5 text-center">
                                    <button className="btn btn-dark py-2 px-5 w-75 mt-3" type='submit'>Submit</button>
                                </div>
                                <div className="d-flex justify-content-around align-items-center">
                                    <div>Already have an account?</div> 
                                    <div className="btn btn-link" onClick={handleSignIn}>Login</div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
}

export default Adminsign;
