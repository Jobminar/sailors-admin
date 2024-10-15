import profile from '../../assets/Images/dp-dummy.png'

export function Userprofile({applicantdetails}){
    return(
        <>
             <div className='mt-5 ps-4 d-flex align-items-center ' >
                        <div className="row text-secondary " style={{ height: "30vh", backgroundColor: "white", boxShadow: "1px 1px 5px 4px #edf1f0  " }}>
                            <div className='col-3 d-flex align-items-center'>
                                <img className='border border-1 rounded bg-secondary' src={profile} alt="Profile Pictre" style={{ width: "100%", }}></img>
                            </div>
                            <div className='col-9 ps-4 ' style={{ alignContent: "center" }} >
                                <dl >
                                    <div className='row'>
                                        <dt className='col-3'>Name:</dt>
                                        <dd className='col-9'>{applicantdetails.name}</dd>

                                    </div>
                                    <div className='row'>
                                        <dt className='col-3'>Birth Date:</dt>
                                        <dd className='col-9'>{applicantdetails.DOB}</dd>
                                    </div>
                                    <div className='row'>
                                        <dt className='col-3'>Email:</dt>
                                        <dd className='col-9'>{applicantdetails.Gmail}</dd>
                                    </div>
                                    <div className='row'>
                                        <dt className='col-3'>Location:</dt>

                                        <dd className='col-9'>{applicantdetails.Location}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
        </>
    )
}