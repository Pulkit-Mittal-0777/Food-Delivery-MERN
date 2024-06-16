import React,{useRef} from 'react'
import axios from 'axios'
import {useNavigate,Link} from 'react-router-dom'
const Login = () => {

   
    const emailref=useRef();
    const passwordref=useRef();
   

    const navigate=useNavigate();

    async function formhandler(e){

        e.preventDefault();

        
        const email=emailref.current.value;
        const password=passwordref.current.value;
        

        

        const res=await axios.post('http://localhost:4000/login',{email,password})
        
        try{
            
            localStorage.setItem("userEmail",email);
            
            localStorage.setItem("authToken",res.authToken);
         
            navigate('/');
        }
        catch(e){
            console.log('cannot create user')
        }
    }
    return (
        <>
            <form onSubmit={formhandler}>
                
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={emailref}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"  ref={passwordref} />
                </div>
                

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to= "/createuser" className="m-3 btn btn-danger" >i am a new User</Link>
            </form>
        </>
    )
}

export default Login