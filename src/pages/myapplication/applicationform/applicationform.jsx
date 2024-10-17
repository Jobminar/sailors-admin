import React, { useEffect, useState } from 'react';
import { Grid, TextField, MenuItem, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Myapplication from '../myapplication';

const ApplicationForm = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({});
  const params = useParams()
  const Getuserdata = async()=>{
    try{
      const values = await axios.get('http://127.0.0.1:7000/candidate');
      const userdata = values.data
      const finduser = userdata.find((user)=> user.applicationId  === parseInt(params.id));
      setFormData(finduser) 
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    Getuserdata()
  },[])

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
              sx={{ mb: 2, bgcolor: '#0486AA' }}
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
                />
              </Grid>

              {/* Date of birth */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="dob"
                  placeholder="DD-MM-YY"
                  value={formData.dob}
                  variant="outlined"
                />
              </Grid>

              {/* Gender */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="dob"
                  placeholder="DD-MM-YY"
                  value={formData.gender}
                  variant="outlined"
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
                />
              </Grid>
            </Grid>

            {/* Address of Candidates */}
            <Typography
              variant="h6"
              component="h2"
              className="text-light p-2 mt-5"
              sx={{ mb: 2, bgcolor: '#0486AA' }}
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
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="postOffice"
                  value={formData.postOffice}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="policeStation"
                  value={formData.policeStation}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="district"
                  value={formData.district}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="city"
                  value={formData.city}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="state"
                  value={formData.state}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="postalCode"
                  value={formData.postalCode}
                  variant="outlined"
                />
              </Grid>
            </Grid>

            {/* Educational Qualification */}
            <Typography
              variant="h6"
              component="h2"
              className="text-light p-2 mt-5"
              sx={{ mb: 2, bgcolor: '#0486AA' }}
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
              sx={{ mb: 2, bgcolor: '#0486AA' }}
            >
              UPLOAD PICTURE (*Select image of less than 2mb)
            </Typography>
            <Grid>
              <Grid>Upload your passport size picture (.jpg)</Grid>
              <hr></hr>
              <Grid>Upload your 10th class certificate</Grid>
              <hr></hr>
              <Grid>Upload your 12th class certificate</Grid>
            </Grid>


            <div className="d-flex justify-content-between">
              <button
                style={{ backgroundColor: "#0486AA" }}
                className="btn  text-light px-5 py-2 mt-4"
                // onClick={handlerejectedClicked}
              >
                REJECTED
              </button>
              <button
                style={{ backgroundColor: "#0486AA" }}
                className='btn text-light px-5 py-2 mt-4 ms-2'
                // onClick={handleapprovedClicked}
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
