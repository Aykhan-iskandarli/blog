import AdminPrivateComponent from "components/admin/admin-private.component";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Admin = () => {
  return (
    <div>
      <AdminPrivateComponent>
        <h2>Admin Dashboard</h2>
      </AdminPrivateComponent>
    </div>
  );
};

export default Admin;
