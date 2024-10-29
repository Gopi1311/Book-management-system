import React, {useState}from 'react'
import {Link,useNavigate} from 'react-router-dom'
import Signupvalidation from './signupValidation'

import Axios from 'axios'
function Signup() {
    const [values,setValues]=useState({
        name:'',
        email:'',
        password:''
    });

    const [error,setError]= useState({})
const handleInput=(event)=>{
    setValues(prev=>({...prev,[event.target.name]:event.target.value}))
}
    const navigate = useNavigate();
    const handleSubmit=(event)=>{
        event.preventDefault();
        setError(Signupvalidation(values));
        if(error.name==="" && error.email==="" && error.password===""){
                Axios.post('http://localhost:8081/Signup',values)
                .then(res=>{
                        navigate('/');
                })
                .catch(err => console.log(err));
        }
    }
  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
        
      <div className="bg-white p-3 rounded w-25">
        <h2>Sign-up</h2>  
        <form action="" onSubmit={handleSubmit}>
        <div className="mb-3 ">
                <label htmlFor="Name"><strong>UserName</strong></label>
                <input type='text' placeholder='Enter UserName'className='form-control rounded-0' name='name' onChange={handleInput} />
                {error.name && <span className="text-danger">{error.name}</span>}
            </div>
            <div className="mb-3 ">
                <label htmlFor="email"><strong>E-mail</strong></label>
                <input type='email' placeholder='Enter Email'className='form-control rounded-0' name='email' onChange={handleInput} />
                {error.email && <span className="text-danger">{error.email}</span>}
            </div>
            <div className="mb-3 ">
                <label htmlFor="pass"><strong>Password</strong></label>
                <input type='password' placeholder='Enter Password' className='form-control rounded-0'name='password' onChange={handleInput} />
                {error.password && <span className="text-danger">{error.password}</span>}
            </div>
            <p className="p mt-3">
            <label>
              <input
                type="checkbox"
                required
                className="form-check-input me-3 "
              />
              I agree to the terms and conditions.
            </label>
          </p>
            <button  type="submit" className="btn btn-success w-100">Signup</button>
            
            <Link to='/' className="btn  btn-secondary w-100 mt-3" >Login</Link>
        </form>
        </div>
    </div>
  )
}

export default Signup
