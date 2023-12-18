import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

function Signup(){

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [mobileNumber,setMob] = useState("");
    const [age,setAge] = useState("");
    const [error,setErr] = useState(false);
    const [emailerr,setEmailerr] = useState(false);
    const [moberr,setMoberr] = useState(false);
    const [ageErr,setAgeErr] = useState(false);
    const [passerr,setPasserr] = useState(false);
    const [confirmPasserr,setConfirmPasserr] = useState(false);
    const [confirmPass,setConfirmPass] = useState("");
    const navigate =  useNavigate();
    

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var phoneno = /^\d{1,10}$/;
    var passFormat=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;


    function Name(event) {
        const newName = event.target.value;
        setName(newName);
      
        // Update the error state based on the validation condition
        setErr(!newName);
      }
      
      function Email(event) {
        const newEmail = event.target.value;
        setEmail(newEmail);
      
        // Update the error state based on the validation condition
        setEmailerr(!mailformat.test(newEmail));
      }
      
      function Password(event) {
        const newPassword = event.target.value;
        setPassword(newPassword);
      
        // Update the error state based on the validation condition
        setPasserr(!passFormat.test(newPassword));
      }
      
      function Mob(event) {
        const newMob = event.target.value;
        setMob(newMob);
      
        // Update the error state based on the validation condition
        setMoberr(!phoneno.test(newMob));
      }
      
      function ConfirmPass(event) {
        const newConfirmPass = event.target.value;
        setConfirmPass(newConfirmPass);
      
        // Update the error state based on the validation condition
        setConfirmPasserr(newConfirmPass !== password);
      }
      
      function checkAge(event) {
        const newAge = event.target.value;
        setAge(newAge);
      
        // Update the error state based on the validation condition
        setAgeErr(newAge < 18 || newAge > 65);
      }
      
      // ...
      
      async function submit() {
        // Check if any validation errors exist
        if (error || emailerr || passerr || moberr || ageErr || confirmPasserr) {
          toast.error("Please correct the errors before submitting.", {
            position: toast.POSITION.TOP_RIGHT,
          });
          return;
        }
      
        const registrationData = {
          name,
          email,
          password,
          mobileNumber,
          age,
        };
      
        let result = await fetch("https://yogabackend.onrender.com/register", {
          method: "post",
          body: JSON.stringify(registrationData),
          headers: { 'Content-Type': 'application/json' },
        });
      
        result = await result.json();
        if (result.message === "ok") {
          localStorage.setItem("user", JSON.stringify(result.user));
          toast.success("SignUp Successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          navigate('/');
        } else {
          toast.warning(result.error, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
      
    
    return (
        <div className='register'>
            <div>
            <h1>Registered</h1>
    
            <section className="gridSignUp">
                <div >
                   <div className='flexSignup'>
                        <label>Name: </label>
                        <input className='inputBox'  type="text" name="name" placeholder="Full Name"
                        value={name} 
                        onChange={Name}
                        />
                   </div>
                        {error && !name && <span className="error">Enter valid name</span>}
                </div>
                <div>
                    <div className='flexSignup'>
                        <label>Email: </label>
                        <input className='inputBox' type="email" name="email" placeholder="Your Email" 
                            value={email}
                        onChange={Email}
                        />
                    </div>
                    {emailerr && <span className="error">Enter valid Email</span>}
                    {error && !email && <span className="error">Enter valid Email</span>}
                </div>
                <div>
                    <div className='flexSignup'>
                        <label>Phone No.: </label>
                        <input className='inputBox' type="text" name="number" placeholder="Phone Number" 
                        value={mobileNumber}
                        onChange={Mob}
                        />
                    </div>
                    {moberr && <span className="error">Enter valid Mobile No.</span>}
                    {error && !mobileNumber && <span className="error">Enter valid Mobile No.</span>}
                </div>

                <div>
                    <div className='flexSignup'>  
                        <label>Age: </label>
                        <input className='inputBox' type="number" name="number" placeholder="Age" 
                        value={age}
                        onChange={checkAge}
                        />
                    </div>
                    {ageErr && <span className="error">Age should be in range 18-65</span>}
                    {error && !age && <span className="error">Age should be in range 18-65</span>}
                </div>

                <div>
                    <div className='flexSignup'>
                        <label>Password:</label>
                        <input 
                            type="password" 
                            className='inputBox'
                            placeholder="Password" 
                            value={password}
                            onChange={Password} 
                        />
                    </div>
                    {error && !password && <span className="error">Enter valid Password</span>}
                    {passerr && <span className="error">Enter valid Password</span>}
                </div>

                <div>
                    <div className='flexSignup'>
                        <label>Confirm Password:</label>
                        <input 
                            type="password" 
                            className='inputBox'
                            placeholder="Password" 
                            value={confirmPass}
                            onChange={ConfirmPass} 
                        />
                    </div>
                    {error && !confirmPass && <span className="error">Enter valid Password</span>}
                    {confirmPasserr && <span className="error">Check Password</span>}
                </div>
                
            </section>
            <button className="button" onClick={submit}>Sign Up</button>
            </div>
        </div>
    )
}

export default Signup;