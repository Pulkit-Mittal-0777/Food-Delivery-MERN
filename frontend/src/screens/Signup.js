import React, { useRef } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
const Signup = () => {

    const nameref = useRef();
    const emailref = useRef();
    const passwordref = useRef();
    const addressref = useRef();

    const navigate = useNavigate();

    async function formhandler(e) {

        e.preventDefault();

        const name = nameref.current.value;
        const email = emailref.current.value;
        const password = passwordref.current.value;
        const location = addressref.current.value;

        console.log(name);
        console.log(email);
        console.log(password);
        console.log(location);

        await axios.post('http://localhost:4000/createuser', { name, email, password, location })

        try {
            // console.log(res.data);
            const res = await axios.post('http://localhost:4000/login', { email, password })

            try {

                localStorage.setItem("userEmail", email);

                localStorage.setItem("authToken", res.authToken);

                navigate('/');
            }
            catch (e) {
                console.log('cannot create user')
            }
        }
        catch (e) {
            console.log('cannot create user')
        }
    }
    return (
        <>
            <form onSubmit={formhandler}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" ref={nameref} />

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={emailref} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" ref={passwordref} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                    <input type="text" className="form-control" id="exampleInputPassword1" ref={addressref} />
                </div>

                <button type="submit" className="m-3 btn btn-primary">Submit</button>
                <Link to="/login" className="m-3 btn btn-danger" >Already a User</Link>
            </form>
        </>
    )
}

export default Signup