import React from 'react';
import { useRef, useState, useEffect} from 'react';
import "./Login.css";
import ProductDataService from "../../services/products";


const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])
    
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const info = JSON.stringify({ 
            name: user,
            email: email,
            password: pwd,
            password_confirmation: pwd
        });
        ProductDataService.postSignup(info)
            .then(response => {
                console.log("no err");
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
                
            });
        setEmail('');
        setUser('');
        setPwd('');
        setSuccess(true);
    }

  return (
    <>
        {success ? (
            <section>
                <h1>Your account has been created!</h1>
                <br />
                <p>
                    
                </p>
            </section>
        ) : (
    <section>
      <p ref={errRef} className={errMsg ? "errmsg" :
      "offscreen"} aria-live="assertive">{errMsg}</p>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input 
            type="text" 
            id="email"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
        />

        <label htmlFor="username">Username:</label>
        <input 
            type="text" 
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
        />

        <label htmlFor="password">Password:</label>
        <input 
            type="password" 
            id="password"
            ref={userRef}
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
        />
        <button>Sign Up</button>
      </form>
      
    </section>
        )}
        </>
  )
}

export default Login
