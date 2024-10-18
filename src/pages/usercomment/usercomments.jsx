// import { Typography } from "@mui/material";
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export function Usercomments(){
    const param = useParams()
    async function  getComments(){
        const usedata=await axios.get('http://127.0.0.1:7001/candidates')
        const users= usedata.data;

    }
    useEffect(()=>{
        getComments();
    },[getComments])

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
            <p className='mt-2 mb-5 py-1 px-2' style={{border:"1px solid black"}}>
        undefined
            </p>
        </div>
    )
}