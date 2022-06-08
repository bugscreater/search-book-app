import { useState, useEffect } from "react";
import Books from "./pages/Books";
import Login from "./pages/Login";
import Bookdetails from "./pages/Bookdetails";
import {

  Routes,
  Route,
  
} from "react-router-dom";
import { useNavigate } from "react-router-dom";



function App() {
  let navigate = useNavigate();
  
  useEffect(()=>{
    if (window.localStorage.getItem("loginEmail")) {
      navigate("/Books", { replace: true });
    }    
  },[window.localStorage.getItem("loginEmail")])

 
 

  return (
    
     <div className="container d-flex align-items-center justify-content-center">
        
          
      <Routes>
        <Route path="/" element={<Login/> } />
        <Route path="/Books" element={<Books/>} />
        <Route path="/Bookdetails" element={<Bookdetails/>} />

      </Routes>
    
     </div>
   

    
  )
}

export default App;
