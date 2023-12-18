import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

const Login = () => {
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if(auth) {
            navigate('/');
        }
    },[]);

    function Email(event){
        setEmail(event.target.value);
    }

    function Password(event){
        setPassword(event.target.value);
    }

    async function handleLogin(){
        let result = await fetch("https://yogabackend.onrender.com/login",{
            method:"post",
            body:JSON.stringify({email,password}),
            headers:{'Content-Type': 'application/json'}
        });
        result = await result.json();
        if(result.message==="ok"){
            localStorage.setItem("user",JSON.stringify(result.user));
            toast.success("Login Successfully!", {
                position: toast.POSITION.TOP_RIGHT,
            });
            navigate('/');
        }else{
            toast.warning(result.error, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }

    }

  return (
    <div className='login'> 
            <div >
            <h1>Login</h1>
            
            <input 
                type="email" 
                className='inputBox'
                placeholder="Email" 
                value={email}
                onChange={Email}
             />
            <input 
                type="password" 
                className='inputBox'
                placeholder="Password" 
                value={password}
                onChange={Password} 
            />
            <button onClick={handleLogin} className="button">Login</button>
            
        </div>
    </div>
  )
}

export default Login;