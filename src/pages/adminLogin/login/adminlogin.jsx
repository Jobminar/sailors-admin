import axios from "axios"
import { Formik,Form,Field,ErrorMessage } from "formik"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import * as yup from 'yup'

const Adminlogin  = () => {
    const navigate = useNavigate('')
    const [adminCookie, setCookie, removeCookie] = useCookies(["user"]);
    return(
        <>
            <div className="d-flex justify-content-center align-items-center bg-dark" style={{height:'100vh',width:'100%'}}>
                <div className="bg-light border border-1 rounded-3" style={{padding:'20px 80px'}}>
                    <div className="fw-medium fs-2 p-2">Log In to Admin Panel</div>
                    <div className="mb-5 text-center">Enter your mail and Password below</div>
                    <Formik 
                        initialValues={{adminEmail:'',adminPassword:''}}
                        validationSchema={yup.object({
                            adminEmail:yup.string().email('Invalid Email').required('Email is required'),
                            adminPassword:yup.string().required('Password is required'),
                        })}
                        onSubmit={async(values, { setSubmitting }) => {
                            try{
                                await axios.post('http://localhost:7001/loginmainsubadmin',values)
                                setCookie('user', values.adminEmail);
                                navigate('/dashboardadmin/myapplication')
                            }catch(error){
                                console.log(error)
                            }
                        }}
                    >
                        {
                            form=><Form>
                                <dl>
                                    <dt>Email</dt>
                                    <dd><Field type='input' className='form-control' name='adminEmail' placeholder='Enter Your Email' /></dd>
                                    <dd className="text-danger"><ErrorMessage name='adminEmail' /></dd>
                                    <dt>Password</dt>
                                    <dd><Field type='password' className='form-control' name='adminPassword' placeholder='Enter Your Password' /></dd>
                                    <dd className="text-danger"><ErrorMessage name='adminpassword' /></dd>
                                    <dd><button className="btn btn-dark py-2 px-5 w-100 mt-3" type='submit' >Submit</button></dd>
                                </dl>
                            </Form>
                        }
                    </Formik>
                </div>

            </div>
        </>
    )
}
export default Adminlogin