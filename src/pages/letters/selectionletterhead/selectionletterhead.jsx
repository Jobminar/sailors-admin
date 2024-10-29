import axios from "axios";
import leterheadheader from "../../../assets/Images/leterheadheader.png";
import "./selectionletterhead.css";
import {useEffect, useRef, useState} from "react";
import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom";

export function Selectionletterhead(param) {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [user,setusers] = useState({})
  const params = useParams()
  
  const fetchdata = async () => {
    try {
        const usedata = await axios.get('http://127.0.0.1:7001/candidates')
        const users = usedata.data;
        const filteredUsers = users.find((user) => user.applicationId === parseInt(params.id));
        setusers(filteredUsers)
    } catch (error) {
        console.error(error, 'catch error');
    }
}
  useEffect(()=>{
    fetchdata()
  },[])
  return (
    <div className="d-flex justify-content-center">
      <div className="modalfade" id="selectionlettermodal">
        <button onClick={reactToPrintFn} className="btn btn-warning">Print</button>
        <div className="p-3" ref={contentRef}>
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
                Ref no: <strong>{user.applicationId}</strong>
              </p>
              <p>
                Name: <strong>{user.candidateName}</strong>
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
                  before given date Rs.<strong>{user?.selectionletter?.InitialAmount}</strong>/- 
                  <strong> {user?.selectionletter?.DeadlineDate}</strong>. For your seat
                  conformation. Reporting Date will be known to you after your
                  seat registration
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
