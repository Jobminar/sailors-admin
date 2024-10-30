// import { Typography } from "@mui/material";
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function Usercomments(){
    const {applicationNo} = useParams()
    const [user,setuser] = useState({})

    const GetComments = async()=>{
        const usedata= await axios.get(`http://127.0.0.1:7001/candidate/${applicationNo}`)
        setuser(usedata.data)
    }
    useEffect(()=>{
        GetComments();
    },[GetComments])

    return(
        <div className='w-75'>
           <Typography
              variant="h6"
              component="h2"
              className="text-light p-2"
              sx={{ mb: 2, bgcolor: '#0486AA' }}
            >
              User comments
            </Typography>
            <div className='card p-2'>
                {(user?.interviewoutcome?.interviewFeedback)?user?.interviewoutcome?.interviewFeedback:'NO comments'}
            </div>
        </div>
    )
}