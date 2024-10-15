import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import leterheadheader from "../../../assets/Images/leterheadheader.png";
import "./selectionletterhead.css";
import axios from "axios";

export function Selectionletterhead() {
  const params = useParams()
  const [param, setParma] = useState([])
  const fetchdata = async () => {
    try {
      const usedata = await axios.get('http://127.0.0.1:7000/candidate')
      const users = usedata.data;
      const filteredUsers = users.find((user) => user.applicationId === parseInt(params.id));
      console.log(filteredUsers)
      setParma(filteredUsers)
    } catch (error) {
      console.error(error, 'catch error');
    }
  }

  const Handileprint = () => {
    window.print()
  }

  useEffect(() => {
    fetchdata()
  }, [])
  return (
    <div className="d-flex justify-content-center" >
      <div className="modalfade" id="selectionlettermodal" >
        <div >
          <div className="modal-head">
            <img
              src={leterheadheader}
              alt="letterhead"
              style={{ width: "100%" }}
            ></img>
          </div>
          <hr></hr>
          <div className="modal-body ">
            <div>
              <h5 className="text-center leterheadtitle">SELECTION LETTER</h5>
              <p>
                Ref no: <strong>MM/{param.city}/{param.applicationId}</strong>
              </p>
              <p>
                Name: <strong>{param.candidateName}</strong>
              </p>
              <p>
                Welcome to <strong>SAILORSWAVE-SHIP MANAGEMENT PVT LTD</strong>{" "}
              </p>
              <div className="modal-body-leterhead-selectionhead">
                <div className="mb-4">
                  We are pleased to inform you that this has reference for your
                  application, After verifying you're all documents/ certificates
                  with you. You have selected to join in Merchant Navy as Engine
                  crew/Deck crew/ Seaman. As a fresher you need to undergo for a
                  short term training. Which we will provide you under Directorate
                  of General Shipping Government (DG SHIPPING). Please check your
                  Reference number for the further Assistance.
                </div>
                <div className="mb-4">
                  We are providing you Pre sea basic training. Which includes
                  Theoretical, Practical, and Safety training. During this
                  training period candidates can learn about machinery mechanism,
                  engine mechanism, machinery operating system, engine operating
                  system, Navigation duties, swimming, Watch keeping and work shop
                  practices, Knowledge of shipping industry, Personality
                  development. And also STCW & Security Certificates.
                </div>
                <div className="mb-4">
                  After completion of training we will provide you shipping
                  license, Identification number (INDos Number) by Directorate of
                  General Shipping Government (DG SHIPPING), We are providing 100%
                  assured placement assistance for every candidate who ever
                  successfully completed the training under Makira Marine Services
                  Pvt. Ltd.
                </div>
                <div className="mb-4">
                  Total training charges will be 50000/-. Which you can pay by 3
                  installments. Course fee, Food, Accommodation, Travelling
                  expenses (Two way) and also Medical & Physical
                </div>
                <div className="mb-4">
                  After completion of Pre sea training, candidates can join in the
                  Ship as a trainee. During those training period, candidates will
                  get stipend (15000-25000 INR approx & Overtime benefits, Trip
                  allowances depends as per the company norms) with free food and
                  accommodation.
                </div>
                <div>
                  After successful completion of 9/12/18 months of on board sea
                  services, candidates will get a much better salary as depends
                  upon the candidates Performance and hard work. We will not
                  accept any kind of Cheque/DD. You have to pay the initial amount
                  before given date Rs.10000/-25-7-2024. For your seat
                  conformation. Reporting Date will be known to you after your
                  seat registration
                </div>
              </div>
              {/* <button className="bi-printer fs-4 fw-medium mt-5 btn btn-warning" data-bs-toggle='modal' data-target='#PrintLetter'> Take Print</button> */}
            </div>
          </div>
        </div>
        <div id="buttonContainer" className="mt-4">
          <button className="btn btn-warning" data-bs-target="#register" data-bs-toggle="modal"  >take print</button>
        </div>
        <div className="modal fade" id="register">
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content">
              <div className="modal-head">
                <img
                  src={leterheadheader}
                  alt="letterhead"
                  style={{ width: "100%" }}
                ></img>
              </div>
              <hr></hr>
              <div className="modal-body">
                <div>
                  <div>
                    <button className="btn btn-warning" onClick={Handileprint} >Get Print</button>
                  </div>
                  <h5 className="text-center leterheadtitle">SELECTION LETTER</h5>
                  <p>
                    Ref no: <strong>MM/{param.city}/{param.applicationId}</strong>
                  </p>
                  <p>
                    Name: <strong>{param.candidateName}</strong>
                  </p>
                  <p>
                    Welcome to <strong>SAILORSWAVE-SHIP MANAGEMENT PVT LTD</strong>
                  </p>
                  <div>
                    <div className="mb-4">
                      We are pleased to inform you that this has reference for your
                      application, After verifying you're all documents/ certificates
                      with you. You have selected to join in Merchant Navy as Engine
                      crew/Deck crew/ Seaman. As a fresher you need to undergo for a
                      short term training. Which we will provide you under Directorate
                      of General Shipping Government (DG SHIPPING). Please check your
                      Reference number for the further Assistance.
                    </div>
                    <div className="mb-4">
                      We are providing you Pre sea basic training. Which includes
                      Theoretical, Practical, and Safety training. During this
                      training period candidates can learn about machinery mechanism,
                      engine mechanism, machinery operating system, engine operating
                      system, Navigation duties, swimming, Watch keeping and work shop
                      practices, Knowledge of shipping industry, Personality
                      development. And also STCW & Security Certificates.
                    </div>
                    <div className="mb-4">
                      After completion of training we will provide you shipping
                      license, Identification number (INDos Number) by Directorate of
                      General Shipping Government (DG SHIPPING), We are providing 100%
                      assured placement assistance for every candidate who ever
                      successfully completed the training under Makira Marine Services
                      Pvt. Ltd.
                    </div>
                    <div className="mb-4">
                      Total training charges will be 50000/-. Which you can pay by 3
                      installments. Course fee, Food, Accommodation, Travelling
                      expenses (Two way) and also Medical & Physical
                    </div>
                    <div className="mb-4">
                      After completion of Pre sea training, candidates can join in the
                      Ship as a trainee. During those training period, candidates will
                      get stipend (15000-25000 INR approx & Overtime benefits, Trip
                      allowances depends as per the company norms) with free food and
                      accommodation.
                    </div>
                    <div>
                      After successful completion of 9/12/18 months of on board sea
                      services, candidates will get a much better salary as depends
                      upon the candidates Performance and hard work. We will not
                      accept any kind of Cheque/DD. You have to pay the initial amount
                      before given date Rs.10000/-25-7-2024. For your seat
                      conformation. Reporting Date will be known to you after your
                      seat registration
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
