import React, { useEffect, useState } from 'react';
import { Grid, TextField, MenuItem, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Myapplication from '../myapplication';
import moment from 'moment';
import { useCookies } from 'react-cookie';
const ApplicationForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({});
  const [photo, setPhoto] = useState(null);
  const [class10photo, setclass10Photo] = useState(null);
  const [aadharphoto, setaadharPhoto] = useState(null);
  const [error, setError] = useState(null);
  const params = useParams()
  const [adminCookie,removeadminCookie] = useCookies(["user"]);

  const Getuserdata = async () => {
    try {
      const values = await axios.get('http://127.0.0.1:7001/candidates');
      const userdata = values.data
      const finduser = userdata.find((user) => user.applicationId === parseInt(params.id));
      setFormData(finduser)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchFileById = async (id, setFileState) => {
    if (!id) {
      setError('File ID is missing.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:7001/fileById/${id}`, {
        responseType: 'blob',
      });
      const fileURL = URL.createObjectURL(new Blob([response.data]));
      setFileState(fileURL);
      setError(null); // Clear any previous error
    } catch (err) {
      console.error('Error fetching file:', err);
      setError('Failed to fetch the file.');
    }
  };

  useEffect(() => {
    Getuserdata()
  }, [])
  
  useEffect(() => {
    if (formData.passport || formData.class10th || formData.aadhar) {
      fetchFileById(formData.passport, setPhoto);
      fetchFileById(formData.class10th, setclass10Photo);
      fetchFileById(formData.aadhar, setaadharPhoto);
    }
  }, [formData]);

  const HandileUpdatestaus = async (id,status) => {
    const applicationstatus = {
      Apstatus:status,
      ApOfficerName:adminCookie.user,

      admitcardstatus:formData.admitcard.status,
      admitcardofficer:formData.admitcard.OfficerName,

      interviewdate:formData.interviewoutcome.date,
      interviewtime:formData.interviewoutcome.time,
      interviewofficer:formData.interviewoutcome.OfficerName,

      selectionletterstatus:formData.selectionletter.status,
      selectionletterofficer:formData.selectionletter.OfficerName,

      confirmationletterstatus:formData.confirmationletter.status,
      confirmationletterofficer:formData.confirmationletter.OfficerName,
    }
    try {
      const response = await axios.patch(`http://localhost:7001/candidate/${id}`,applicationstatus);
      alert('response updated sucessfull')
      console.log(response);
      navigate('/dashboardadmin/myapplication')
    } catch (error) {
      console.error(error);
      alert('response is not updating sucessfull')
    }
  };


  return (
    <>
      <Link className='bi-arrow-left btn btn-light ms-3 mt-2' to='/dashboardadmin/myapplication'></Link>
      <div className="p-3 p-sm-0 d-flex justify-content-center">
        <div className=" w-75 px-5 p-sm-0">
          <div className="p-4 mb-3 fs-2 text-center">
            <div>Application Form for Merchant Navy</div>
            <div>Application for Admission in Marine Training</div>
          </div>
          <Box
            p={2}
            borderColor="primary.main"
            style={{ backgroundColor: '#F8F9FA' }}
          >
            {/* Personal Details */}
            <Typography
              variant="h6"
              component="h2"
              className="text-light p-2"
              sx={{ mb: 2,mb:4, bgcolor: '#0486AA' }}
            >
              Personal Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} style={{ display: 'flex', alignItems: 'center' }}>
                <div className="fw-medium me-2">Apply for post</div>
                <TextField
                  required
                  name="applyFor"
                  value={formData.applyFor}
                  variant="outlined"
                  label="Apply For" 
                  InputLabelProps={{
                    shrink: true, 
                  }}
                />
              </Grid>
              {/* Candidate name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="candidateName"
                  value={formData.candidateName}
                  variant="outlined"
                  label="Candidate Name" 
                  InputLabelProps={{
                    shrink: true, 
                  }}
                />

              </Grid>

              {/* Father name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="fatherName"
                  value={formData.fatherName}
                  variant="outlined"
                  label="Father Name" 
                  InputLabelProps={{
                    shrink: true, 
                  }}
                />
              </Grid>

              {/* Date of birth */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="dob"
                  placeholder="DD-MM-YY"
                  value={formData.dob?moment(formData.dob).format('DD-MM-YYYY'):""}
                  variant="outlined"
                  label="Date-of-Birth" 
                  InputLabelProps={{
                    shrink: true, 
                  }}
                />
              </Grid>

              {/* Gender */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="gender"
                  value={formData.gender}
                  variant="outlined"
                  label="Gender" 
                  InputLabelProps={{
                    shrink: true, 
                  }}
                />
              </Grid>

              {/* Mobile number */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  variant="outlined"
                  label="Mobile Number" 
                  InputLabelProps={{
                    shrink: true, 
                  }}
                />
              </Grid>

              {/* Email */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="email"
                  value={formData.email}
                  variant="outlined"
                  label="Email" 
                  InputLabelProps={{
                    shrink: true, 
                  }}
                />
              </Grid>
            </Grid>

            {/* Address of Candidates */}
            <Typography
              variant="h6"
              component="h2"
              className="text-light p-2 mt-5"
              sx={{ mt: 2,mb:4, bgcolor: '#0486AA' }}
            >
              Address of Candidates
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="houseNo"
                  value={formData.houseNo}
                  variant="outlined"
                  label="House No" 
                  InputLabelProps={{
                    shrink: true, 
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="postOffice"
                  value={formData.postOffice}
                  variant="outlined"
                  label="Post Office" 
                  InputLabelProps={{
                    shrink: true, 
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="policeStation"
                  value={formData.policeStation}
                  variant="outlined"
                  label="Police Station" 
                  InputLabelProps={{
                    shrink: true, 
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="district"
                  value={formData.district}
                  variant="outlined"
                  label="District" 
                  InputLabelProps={{
                    shrink: true, 
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="city"
                  value={formData.city}
                  variant="outlined"
                  label="City" 
                  InputLabelProps={{
                    shrink: true, 
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="state"
                  value={formData.state}
                  variant="outlined"
                  label="State" 
                  InputLabelProps={{
                    shrink: true, 
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="postalCode"
                  value={formData.postalCode}
                  variant="outlined"
                  label="Postal Code" 
                  InputLabelProps={{
                    shrink: true, 
                  }}
                />
              </Grid>
            </Grid>

            {/* Educational Qualification */}
            <Typography
              variant="h6"
              component="h2"
              className="text-light p-2 mt-5"
              sx={{ mb: 2,mb:4, bgcolor: '#0486AA' }}
            >
              Educational Qualification
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3}>
                <div className=" text-dark-subtle fw-medium">Exam passed</div>
              </Grid>
              <Grid item xs={12} sm={3}>
                <div className=" text-dark-subtle fw-medium">
                  School/college
                </div>
              </Grid>
              <Grid item xs={12} sm={3}>
                <div className=" text-dark-subtle fw-medium">
                  Year of passing
                </div>
              </Grid>
              <Grid item xs={12} sm={3}>
                <div className=" text-dark-subtle fw-medium">Percentage%</div>
              </Grid>

              {/* 10th Qualification */}
              <Grid item xs={12} sm={3}>
                <div className=" text-dark-subtle fw-medium">10 th</div>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  fullWidth
                  name="tenthschool"
                  value={formData.tenthschool}
                  variant="outlined"
                 
                  
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  fullWidth
                  name="tenthyear"
                  value={formData.tenthyear}
                  variant="outlined"
                 
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  fullWidth
                  name="tenthpercentage"
                  value={formData.tenthpercentage}
                  variant="outlined"
                
                />
              </Grid>

              {/* 12th Qualification */}
              <Grid item xs={12} sm={3}>
                <div className=" text-dark-subtle fw-medium">12 th</div>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  fullWidth
                  name="twelfthschool"
                  value={formData.twelfthschool}
                  variant="outlined"
                 
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  fullWidth
                  name="twelfthyear"
                  value={formData.twelfthyear}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  fullWidth
                  name="twelfthpercentage"
                  value={formData.twelfthpercentage}
                  variant="outlined"
                  
                />
              </Grid>

              {/* Degree Qualification */}
              <Grid item xs={12} sm={3}>
                <div className=" text-dark-subtle fw-medium">Degree</div>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  fullWidth
                  name="degreeschool"
                  value={formData.degreeschool}
                  variant="outlined"
                  
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  fullWidth
                  name="degreeyear"
                  value={formData.degreeyear}
                  variant="outlined"
                  
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  fullWidth
                  name="degreepercentage"
                  value={formData.degreepercentage}
                  variant="outlined"
                  
                />
              </Grid>
            </Grid>
            {/* uploadfiles */}
            <Typography
              variant="h6"
              component="h2"
              className="text-light p-2 mt-5"
              sx={{ mb: 2,mb:4, bgcolor: '#0486AA' }}
            >
              UPLOAD PICTURE (*Select image of less than 2mb)
            </Typography>
            <Grid>
              <Grid className=' col-6 d-flex justify-content-between align-items-center my-4'>
                <div >
                  Upload your passport size picture (.jpg)
                </div>
                <img className=' rounded' src={photo} alt="passport photo" height="90" />
              </Grid>
              <hr></hr>
              <Grid className=' col-6 d-flex justify-content-between align-items-center my-4'>
                <div >
                  Upload your 10th class certificate(.jpg)
                </div>
                <img className=' rounded' src={class10photo} alt="10th Class Certificate" width="90" />
              </Grid>
              <hr></hr>
              <Grid className=' col-6 d-flex justify-content-between align-items-center my-4'>
                <div>Upload your aadhar Card (.jpg)</div>
                <img className=' rounded' src={aadharphoto} alt="aadhar card" width="90" />
              </Grid>
            </Grid>


            <div className="d-flex justify-content-between">
              <button
                style={{ backgroundColor: "#0486AA" }}
                className="btn  text-light px-5 py-2 mt-4"
                onClick={()=>HandileUpdatestaus(formData.applicationId,'Rejected')}
              >
                REJECTED
              </button>
              <button
                style={{ backgroundColor: "#0486AA" }}
                className='btn text-light px-5 py-2 mt-4 ms-2'
                onClick={()=>HandileUpdatestaus(formData.applicationId,'Approved')}
              >
                APPROVED
              </button>
            </div>
          </Box>
        </div>
      </div>
    </>
  );
};

export default ApplicationForm;
