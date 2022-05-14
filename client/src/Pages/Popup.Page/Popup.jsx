import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import '../Popup.Page/Popup.css';
import axios from 'axios'
import {  useToast } from '@chakra-ui/toast'
import { Redirect } from 'react-router'
function Popup(){
    const toast = useToast()
    const [verify,setVerify]=useState('')
    const [code, setCode] = useState('')
    const [openPopup,setOpenPopup]=useState(true);
    const history = useHistory()
    const handleApi=async (e) =>{
        e.preventDefault()
        const { data } = await axios.get("/api/auth/verify/"+code+"")
        console.log(data)
        if(data.message === "Verification Failed"){
            <Redirect to="/signup" />
          toast(
            {
              title: "Verification Failed",
              description: "Please Enter the Code again",
              status: "info",
              duration: 9000,
              isClosable: true,
              position: "bottom-right"
            }
          )
        }
        else{
            toast(
                {
                  title: "Verification Succcess",
                  description: "Welcome",
                  status: "info",
                  duration: 9000,
                  isClosable: true,
                  position: "bottom-right"
                }
              )
              console.log("till here")
              setOpenPopup(false)
              history.push('/login');
             
        }
        }
    return(
        <>
     {/* <div className='popback'>
        <div className='containers'>
            <div className='heading'>
            <h2>Enter the verification code </h2></div>
       <div>
       <input className='text'></input>
       </div>
            <div className='content'>
               
            <button className='text'>Submit Code</button>
            </div>
        </div></div> */}





        <div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="modal-box">
                {/* <button type="button" class="btn btn-primary btn-lg show-modal" data-toggle="modal" data-target="#myModal">
                  Login Form
                </button> */}

                <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content clearfix">
                             <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                            <div class="modal-body">
                                <h3 class="title">Verification Code</h3>
                                <p class="deion">Enter your verification code received on email id</p>
                                <div class="form-group">
                                    <span class="input-icon"><i class="fa fa-user"></i></span>
                                    <input type="text" value={code} onChange={e => setCode(e.target.value)} class="form-control" placeholder="Enter code here"/>
                                </div>
                                <button class="btn" onClick={handleApi}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

        </>);
}
 export default Popup;