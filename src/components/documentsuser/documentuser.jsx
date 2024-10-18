import React, { useEffect, useState } from 'react';
import { Grid, TextField, MenuItem, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
const Documentuser = ({ userdetails }) => {
  const [photo, setPhoto] = useState(null);
  const [class10photo, setclass10Photo] = useState(null);
  const [aadharphoto, setaadharPhoto] = useState(null);

  const fetchFileById = async (id, setFileState) => {
    if (!id) {
      return;
    }

    try {
      const response = await axios.get(`http://localhost:7001/fileById/${id}`, {
        responseType: 'blob',
      });
      const fileURL = URL.createObjectURL(new Blob([response.data]));
      setFileState(fileURL);
    } catch (err) {
      console.error('Error fetching file:', err);
    }
  };

  useEffect(() => {
    console.log(userdetails);
    if (userdetails.passport || userdetails.class10th || userdetails.aadhar) {
      fetchFileById(userdetails.passport, setPhoto);
      fetchFileById(userdetails.class10th, setclass10Photo);
      fetchFileById(userdetails.aadhar, setaadharPhoto);
    }
  }, [userdetails]);

 
  return (
    <>
      <div className=" p-sm-0 d-flex justify-content-center">
        <div className=" w-100 px-5 p-sm-0">
          <div className=" fs-2 text-center">
          </div>
          <Box>
            {/* uploadfiles */}
            <Typography
              variant="h6"
              component="h2"
              className="text-light p-2"
              sx={{ mb: 2,mb:4, bgcolor: '#0486AA' }}
            >
              User documents Details
            </Typography>
            <Grid>
              <Grid className=' col-12 d-flex justify-content-between align-items-center '>
                <div >
                  Uploaded  passport size picture (.jpg)
                </div>
                <img className=' rounded' src={photo} alt="passport photo" height="90" />
              </Grid>
              <hr></hr>
              <Grid className=' col-12 d-flex justify-content-between align-items-center my-4'>
                <div >
                Uploaded 10th class certificate(.jpg)
                </div>
                <img className=' rounded' src={class10photo} alt="10th Class Certificate" width="90" />
              </Grid>
              <hr></hr>
              <Grid className=' col-12 d-flex justify-content-between align-items-center my-4'>
                <div>Uploaded aadhar Card (.jpg)</div>
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
 