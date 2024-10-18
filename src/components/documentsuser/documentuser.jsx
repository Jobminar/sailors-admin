import React, { useEffect, useState } from 'react';
import { Grid, TextField, MenuItem, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Myapplication from '../myapplication';
import moment from 'moment';
const Documentuser = ({ userdetails }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({});
  const [photo, setPhoto] = useState(null);
  const [class10photo, setclass10Photo] = useState(null);
  const [aadharphoto, setaadharPhoto] = useState(null);
  const [error, setError] = useState(null);
  const params = useParams()
  console.log(formData.passport);

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
    if (userdetails.passport || userdetails.class10th || userdetails.aadhar) {
      fetchFileById(userdetails.passport, setPhoto);
      fetchFileById(userdetails.class10th, setclass10Photo);
      fetchFileById(userdetails.aadhar, setaadharPhoto);
    }
  }, [formData]);

  const handleapprovedClicked = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:7001/candidate/${id}`, {
        applicationStatus: true, 
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Link className='bi-arrow-left btn btn-light ms-3 mt-2' to='/dashboardadmin/myapplication'></Link>
      <div className="p-3 p-sm-0 d-flex justify-content-center">
        <div className=" w-75 px-5 p-sm-0">
          <div className="p-4 mb-3 fs-2 text-center">
          </div>
          <Box>
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
          </Box>
        </div>
      </div>
    </>
  );
};

export default Documentuser;
 