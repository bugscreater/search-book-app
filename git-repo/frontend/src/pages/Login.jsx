import {GoogleLogin} from 'react-google-login';
import { gapi } from 'gapi-script';
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'


function Login(){
    let navigate = useNavigate();
    useEffect(() => {
        function start() {
          gapi.client.init({
            clientId: '199565205664-2ltm55l5sf0d4h3172okaol1420b1g5l.apps.googleusercontent.com',
            scope: 'email',
          });
        }
    
        gapi.load('client:auth2', start);
      }, []);

    async function handlesuccess(res){
        
       
        window.localStorage.setItem("loginEmail", res.profileObj.email);
        let email = window.localStorage.getItem("loginEmail");

        // Save  the User in database if its new user
        try {
          const config = {
            headers: {
              "content-type": "application/json",
            },
          };

          const { data } = await axios.post(
            "/login",
            {email:email,searchHistory:[]},
            config
          );
    
          
        } catch (error) {
          alert("Something went wrong please try again!");
          console.log(error)
        }

        navigate("/Books",{ replace: true });
       
    }

    function hanldefailure(res){
        console.log(res);
    }

    return (
        <div className='container'>
            <h2>Login to my-book-app</h2>
            <GoogleLogin
             clientId='199565205664-2ltm55l5sf0d4h3172okaol1420b1g5l.apps.googleusercontent.com'
             buttonText='Login with google'
             onSuccess={handlesuccess}
             onFailure = {hanldefailure}
             cookiePolicy={'single_host_origin'}
             style = {{marginTop:'100px'}}
             isSignedIn={true}

            />

           
        </div>
    )

}




export default Login