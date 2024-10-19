import { Formik,Form,Field,ErrorMessage } from "formik"
import { useNavigate } from "react-router-dom"
import * as yup from 'yup'

const Adminsign  = () => {
    const navigate = useNavigate('')
    const Handilesign = () =>{
        navigate('/adminsign')
    }
    return(
        <>
            <div className="d-flex justify-content-center align-items-center bg-dark" style={{height:'90vh',width:'100%'}}>
                <div className="bg-light border border-1 rounded-3" style={{padding:'20px 80px'}}>
                    <div className="fw-medium fs-2 p-2">Create a Account</div>
                    <div className="mb-5 text-center">Create a Account to continue</div>
                    <Formik 
                        initialValues={{adminEmail:'',adminPassword:''}}
                        validationSchema={yup.object({
                            adminEmail:yup.string().email('Invalid Email').required('Email is required'),
                            adminPassword:yup.string().required('Password is required'),
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            console.log(values);
                            alert(values)
                        }}
                    >
                        {
                            form=><Form>
                                <dl>
                                    <dt>Email</dt>
                                    <dd><Field type='input' className='form-control' name='adminEmail' placeholder='Enter Your Email' /></dd>
                                    <dd><ErrorMessage name='adminEmail' /></dd>
                                    <dt>Password</dt>
                                    <dd><Field type='password' className='form-control' name='adminPassword' placeholder='Enter Your Password' /></dd>
                                    <dd><ErrorMessage name='adminpassword' /></dd>
                                    <dt>
                                        <Field type='checkbox' name='termsAccepted' />
                                        <label htmlFor='termsAccepted'> I accept the terms and conditions</label>
                                    </dt>
                                    <dd><button className="btn btn-dark py-2 px-5 w-100 mt-3" type='submit' >Submit</button></dd>
                                    <dd className="d-flex justify-content-around"><div>Don't have accout?</div> <div onClick={Handilesign}>Sing</div></dd>
                                </dl>
                            </Form>
                        }
                    </Formik>
                </div>

            </div>
        </>
    )
}
export default Adminsign