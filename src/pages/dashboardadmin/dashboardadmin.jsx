import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Adminsidebar } from "../../components/adminsidebar/adminsidebar";

export function Dashboardadmin() {
  const [selectedItem, setSelectedItem] = useState("dashboardadmin");
  return (
    <div>
      <div style={{ display: "flex" }}>
          <Adminsidebar selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
        <div style={{ width: "100%", overflow: "scroll", height: "90vh" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
