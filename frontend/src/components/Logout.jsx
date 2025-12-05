import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";


const Logout = () => {
   const navigate = useNavigate();
   const {logout} = useAuth();
   logout();
   navigate("/login");

    // return (
    //     <div>Logouts</div>
    // )
}

export default Logout