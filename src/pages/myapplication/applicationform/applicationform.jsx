import React, { useState } from 'react';
import { Grid, TextField, MenuItem, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Myapplication from '../myapplication';

const ApplicationForm = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    applyFor: '',
    candidateName: '',
    fatherName: '',
    dob: '',
    gender: 'Male',
    mobileNumber: '',
    email: '',
    houseNo: '',
    postOffice: '',
    policeStation: '',
    district: '',
    city: '',
    state: '',
    postalCode: '',
    tenthschool: '',
    tenthyear: '',
    tenthpercentage: '',
    twelfthschool: '',
    twelfthyear: '',
    twelfthpercentage: '', // Corrected the typo here
    degreeschool: '',
    degreeyear: '',
    degreepercentage: '',
    // passport: '',
    // class10th: '',
    // aadhar: '',
    // files: {},
  });
  const [passport, setPassport] = useState(null);
  const [class10th, setClass10th] = useState(null);
  const [aadhar, setAadhar] = useState(null);
  const [number, setNumber] = useState(''); // New state for user's number
  const [message, setMessage] = useState('');

  const handlePassportChange = (event) => {
    setPassport(event.target.files); // Get files from the passport input
  };

  const handleClass10thChange = (event) => {
    setClass10th(event.target.files); // Get files from the class 10th certificate input
  };

  const handleAadharChange = (event) => {
    setAadhar(event.target.files); // Get files from the Aadhar input
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value); // Capture the user's number
  };

 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function handlerejectedClicked(){
    navigate('/dashboardadmin/myapplication')
    
  }
function handleapprovedClicked(){
  navigate('/dashboardadmin/myapplication')
}

  return (
    <>
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
                  label="Apply for post"
                  name="applyFor"
                  value={formData.applyFor}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>

              {/* Candidate name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Candidate name"
                  name="candidateName"
                  value={formData.candidateName}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>

              {/* Father name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Father name"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>

              {/* Date of birth */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Date of birth"
                  name="dob"
                  placeholder="DD-MM-YY"
                  value={formData.dob}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>

              {/* Gender */}
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  variant="outlined"
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Grid>

              {/* Mobile number */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Mobile number"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>

              {/* Email */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Email Id"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
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
                  label="House Number"
                  name="houseNo"
                  value={formData.houseNo}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Post office"
                  name="postOffice"
                  value={formData.postOffice}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Police station"
                  name="policeStation"
                  value={formData.policeStation}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="District"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Postal Code"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  fullWidth
                  name="tenthyear"
                  value={formData.tenthyear}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  fullWidth
                  name="tenthpercentage"
                  value={formData.tenthpercentage}
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  fullWidth
                  name="twelfthyear"
                  value={formData.twelfthyear}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  fullWidth
                  name="twelfthpercentage"
                  value={formData.twelfthpercentage}
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  fullWidth
                  name="degreeyear"
                  value={formData.degreeyear}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  fullWidth
                  name="degreepercentage"
                  value={formData.degreepercentage}
                  onChange={handleInputChange}
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
                onClick={handlerejectedClicked}
              >
                REJECTED
              </button>
              <button
                style={{ backgroundColor: "#0486AA" }}
                className='btn text-light px-5 py-2 mt-4 ms-2'
                onClick={handleapprovedClicked}
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
