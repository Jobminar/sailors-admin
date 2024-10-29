import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import './adminsidebar.css'
import DashboardImage from '../../assets/Images/Dashboard.png'
export function Adminsidebar({ selectedItem, setSelectedItem }) { 
    const navigate = useNavigate();
    
    const handleItemClick = useCallback((e) => {
        const newValue = e.target.getAttribute('value');
        console.log(newValue,'check only name')
        if(newValue=="dashboardadmin"){
            navigate('/dashboardadmin')
        }else{
            navigate(`/dashboardadmin/${newValue}`);
        }
        setSelectedItem(newValue);
         
    }, [navigate, setSelectedItem]);

    function getItemStyle(item) {
        return item === selectedItem ? { backgroundColor: '#F97D3D', color: 'white' } : {};
    }

    return (
        <div className="col-2">
            <div className="admitcard-container1">
                <h1
                    className="list-heading p-3 my-3"
                    value="myapplication"
                    onClick={handleItemClick}
                    style={getItemStyle("myapplication")}
                ><span className="bi bi-person-fill fs-4 mx-3"></span>
                    My Applications
                </h1>

                <h1
                    className="list-heading p-3 my-3"
                    value="admitcarddashboard"
                    onClick={handleItemClick}
                    style={getItemStyle("admitcarddashboard")}
                ><span className="bi bi-person-vcard-fill fs-4 mx-3"></span>
                    Admit Card
                </h1>

                <h1
                    className="list-heading p-3 my-3"
                    value="interviewSchedule"
                    onClick={handleItemClick}
                    style={getItemStyle("interviewSchedule")}
                ><span className="bi bi-chat-square-text-fill fs-4 mx-3"></span>
                    Interview Feedback
                </h1>

                <h1
                    className="list-heading p-3 my-3"
                    value="selectionletter"
                    onClick={handleItemClick}
                    style={getItemStyle("selectionletter")}
                >
                    <span className="bi bi-envelope-check fs-4 mx-3"></span> Selection letter
                </h1>

                <h1
                    className="list-heading p-3 my-3"
                    value="confirmationdashboard"
                    onClick={handleItemClick}
                    style={getItemStyle("confirmationdashboard")}
                >
                    <span className="bi bi-envelope-open-fill fs-4 mx-3"></span> Confirmation letter
                </h1>

                <h1
                    className="list-heading p-3 my-3"
                    value="enquires"
                    onClick={handleItemClick}
                    style={getItemStyle("enquires")}
                >
                    <span className="bi bi-menu-up fs-4 mx-3"></span> Enquires
                </h1>
                <h1
                    className="list-heading p-3 my-3"
                    value="subadmin"
                    onClick={handleItemClick}
                    style={getItemStyle("addsubadmin")}
                >
                    <span className="bi bi-people-fill fs-4 mx-3"></span> Sub Admin
                </h1>
            </div>
        </div>
    );
}
