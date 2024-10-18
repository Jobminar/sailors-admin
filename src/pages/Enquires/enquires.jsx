import axios from "axios";
import React, { useEffect, useState } from "react";

const Enquires = () => {
    const [candidates, setcandidates] = useState([])
    const fetchdata = async () => {
        try {
            const users = await axios.get('http://127.0.0.1:7001/candidates')
            setcandidates(users.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchdata()
    }, [])
    return (
        <>
            <div className="d-felx justify-content-center align-content-center p-4" style={{ height: '80vh' }}>
                {
                    candidates.map((candidate, index) => <div className="p-3">
                        <b className="p-1">{candidate.candidateName}</b>
                        <div style={{ color: 'gray' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur cum cumque sequi omnis labore assumenda natus deserunt odio corporis asperiores est, saepe quidem ad atque itaque eveniet doloribus ut dignissimos.</div>
                        <small>{candidate.email}</small>
                        <hr className="my-3" />
                    </div>)
                }
            </div>
        </>
    )
}
export default Enquires;
