import { BrowserRouter, Routes, Route } from "react-router-dom";
import InterviewSchedule from "./pages/interviewfeadback/interviewfeadback";
import { Applicantprofile } from "./pages/applicantprofile/applicantprofile";
import { Applicantprofileapplication } from "./pages/applicantprofileapplications/applicantprofileapplication";
import { Admitcard } from "./pages/admitcard/admitcard";
import { Dashboardadmin } from "./pages/dashboardadmin/dashboardadmin";
import Myapplication from "./pages/myapplication/myapplication";
import { Headeradmin } from "./components/headeradmin/headeradmin";
import Selectionpage from "./pages/selectionletter/selection";
import SelectionProfile from "./pages/selectionprofile/selectionprofile";
import { Selectionletterhead } from "./pages/letters/selectionletterhead/selectionletterhead";
import Enquires from "./pages/Enquires/enquires";
import { Applicantfinance } from "./pages/Financials/financials";
import Admitcarddashboard from "./pages/admitcard/admitcarddashboard";
import Confirmationdashboard from "./pages/confirmation/confirmationdashboard";
import { Confirmationprofile } from "./pages/confirmation/confirmationprofile";
import { Confirmationletterhead } from "./pages/confirmation/confirmationletter";
import { Admitcardletterhead } from "./pages/admitcard/admitcardletter";
import ApplicationForm from "./pages/myapplication/applicationform/applicationform";
import Subadmin from "./pages/subadmin/subadmin";
import Addsubadmin from "./pages/subabmin/addsubadmin/addsubadmin";
import Interoutcome from "./pages/interviewfeadback/interviewoutcome";
import Adminprofile from "./pages/subadmin/adminprofile/adminprofile";
import Documentuser from "./components/documentsuser/documentuser";
import { Usercomments } from "./pages/usercomment/usercomments";
import Adminlogin from "./pages/adminLogin/login/adminlogin";
import { useCookies } from "react-cookie";

const Routing = () => {

  const [adminCookie, setcookie] = useCookies(["user"]);


  return (
    <>
      <BrowserRouter>

        {
          (adminCookie.user) ? 
          <div>
            <Headeradmin />
            <Routes>

              <Route path="/" element={<Dashboardadmin />} />
              <Route path="/dashboardadmin" element={<Dashboardadmin />}>
                <Route path="myapplication" element={<Myapplication />} />
                <Route path="admitcard/:applicationNo" element={<Admitcard />} />
                <Route path="admitcardletter/:applicationNo" element={<Admitcardletterhead />} />
                <Route path="admitcarddashboard" element={<Admitcarddashboard />} />
                <Route path="interviewSchedule" element={<InterviewSchedule />} />
                <Route path="applicationstatus/:id" element={<ApplicationForm />} />
                <Route path="applicantprofile" element={<Applicantprofile />} />
                <Route path="applicantprofile/:applicationNo" element={<Applicantprofile />} >
                  <Route path="applicantprofileapplication" element={<Applicantprofileapplication />} />
                  <Route path="applicantfinance" element={<Applicantfinance />} />
                  <Route path="applicantcomment" element={<Usercomments />} />
                </Route>
                <Route path="selectionletter" element={<Selectionpage />} />
                <Route path="selectionletter/:id" element={<SelectionProfile />} />
                <Route path="selectionletter/:id/letter" element={<Selectionletterhead />} />
                <Route path="confirmationdashboard" element={<Confirmationdashboard />} />
                <Route path="confirmationprofile/:applicationNo" element={<Confirmationprofile />} />
                <Route path="confirmationletter/:applicationNo" element={<Confirmationletterhead />} />
                <Route path="enquires" element={<Enquires />} />
                <Route path="adminprofile/:id" element={<Subadmin />} />
                <Route path="subadmin/addadmin/:adminId" element={<Addsubadmin />} />
                <Route path="subadmin/addadmin/" element={<Addsubadmin />} />
                <Route path="interviewSchedule/:id" element={<Interoutcome />} />
                <Route path="subadmin" element={<Adminprofile />} />
              </Route>
              <Route path="/documentuser" element={<Documentuser />} />
            </Routes>
          </div> : <div>
            <Routes>
              <Route path="/" element={<Adminlogin />} />
            </Routes>
          </div>
        }



      </BrowserRouter>
    </>
  );
};

export default Routing;
