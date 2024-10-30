import "./admitcardletter.css";
import leterheadheader from "../../assets/Images/letterheadheader.png";
import mainImageBg from "../../assets/Images/bgleterheadconfrm.png";
import {useEffect, useRef, useState} from "react";
import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom";
import axios from "axios";

export function Admitcardletterhead() {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [user,setUser] = useState({})
  const param = useParams()
  const fetchdata = async () => {
    try {
      const usedata = await axios.get('http://127.0.0.1:7001/candidates')
      const users = usedata.data;
      const filteredUsers = users.find((user) => user.applicationId == param.applicationNo);
      setUser(filteredUsers)
    } catch (error) {
      console.error(error, 'catch error');
    }
  }
  useEffect(() => {
    fetchdata();
  }, [])
  return (
    <>
      <div className="d-flex justify-content-center   ">
        <div className="modalfade" id="selectionlettermodal">
        <button onClick={reactToPrintFn} className="btn btn-warning">Print</button>
          <div className="p-2" ref={contentRef}>
            <div className="modal-head">
              <img
                src={leterheadheader}
                alt="letterhead"
                style={{ width: "100%", padding: "5px" }}
              ></img>
            </div>
            <hr></hr>
            <div className="modal-body main-image p-4">
              <div>
                <h5 className="text-center leterheadtitle">Interview Letter</h5>
                <p className="interview-letter-first-para my-3 text-center">
                  We are delighted to inform you that you have been shortlisted
                  for an interview with SailorsWave for the position of Job
                  Title. Your qualifications and experience have greatly
                  impressed us, and we believe you could be a valuable addition to
                  our team.
                </p>
                <div className="mx-5 ">
                  <div>
                    <p>Application No: <strong>{user.applicationId}</strong></p>
                    <p>Name of Candidate: <strong>{user.candidateName}</strong></p>
                    <p>Father Name: <strong>{user.fatherName}</strong></p>
                  </div>
                  <div>
                    <img
                      src={mainImageBg}
                      alt="main-image"
                      className="background-image"
                    />
                  </div>
                  <div>
                    <p>
                      <strong>Schedule:</strong>
                    </p>
                    <p>Date of Interview: <strong>{user?.admitcard?.date}</strong></p>
                    <p>Interview Time: <strong>{user?.admitcard?.time}</strong></p>
                    <p>Result: Announced on <strong>24-06-2024</strong></p>
                  </div>
                  <div>
                    <p>
                      <strong>Interview center:</strong>
                    </p>
                    <p>
                      11-15-14, Office Space No: 508,Prajay Princeton Towers,
                      Doctors Colony, Saroornagar, L B Nagar, Hyderabad, Telangana
                      - 500035.
                    </p>
                    <p>Mobile: 7994703181,</p>
                    <p>For more enquiries : 8790695737.</p>
                  </div>
                  <div>
                    <p>
                      <strong>Instructions:</strong>
                    </p>
                    <ul>
                      <li className="my-3">
                        The candidate is requiredd to bring his Interview letter
                        in the Interview centre Every Candidate is required to
                        reach the Center at least half an hour earlier from the
                        reporting time.
                      </li>
                      <li className="my-3">
                        Boxes, Tiffin, Bags, Books, Camera, Calculator, Cell
                        phones and such other gazettes are strictly prohibited in
                        the examination hall.
                      </li>
                      <li className="my-3">
                        Unfair means, nuisance or such any other activities on
                        part of any candidate may lead to disqualify of his/her
                        candidates.
                      </li>
                      <li>
                        The Candidates are required to bring all Education
                        documents and Resume.The Candidates are required to bring
                        passport if they have/ Carry Original Aadhar card.
                      </li>
                    </ul>
                    <p className="my-4">
                      <strong>
                        NOTE: - This is a tentative schedule for conduct of
                        examination, declaration of result and dates for
                        counseling and admission. Selection Committee reserves the
                        right to change these dates and the same will be notified.
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className="footerBg">
                <div className="shape1 p-2 d-flex ">
                  <span className="d-flex">
                    <div className="bi bi-telephone-fill text-light mx-4">
                      +91 7994703181
                    </div>
                    <div className="bi bi-envelope-fill text-light">
                      sailorswaveshipmanagement@gmail.com
                    </div>
                  </span>
                  <span className="shape3"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
