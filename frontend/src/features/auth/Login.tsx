import { useRef, useState, useEffect, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'






const Login = ()=>{
    const userRef = useRef() as React.MutableRefObject<HTMLInputElement>; ;
    const dispatch = useDispatch();
    const errRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()

    const[login , {isLoading}] = useLoginMutation();
     

    useEffect(()=>{
        userRef.current?.focus()
    },[])
    //useEffect hook with empty dependency array -> runs only once

    useEffect(()=>{
        setErrMsg('') 
    }, [user,pwd])

  

    const handleSubmit = async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault() 

        try{
            const userData = await login({user,pwd}).unwrap()
            dispatch(setCredentials({ ...userData, user }))
            setUser('');
            setPwd('');
            navigate('/welcome');
        }
        catch(err:any){
            if (!err?.originalStatus) {
                // isLoading: true until timeout occurs
                setErrMsg('No Server Response');
            } else if (err.originalStatus === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.originalStatus === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current?.focus()
        }

    }

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => setUser(e.target.value)

    const handlePwdInput = (e: React.ChangeEvent<HTMLInputElement>) => setPwd(e.target.value)


    const content = isLoading ? <h1>Loading...</h1> : (
        <section className="login">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

            <h1>Employee Login</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    value={user}
                    onChange={handleUserInput}
                    autoComplete="off"
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={handlePwdInput}
                    value={pwd}
                    required
                />
                <button>Sign In</button>
            </form>
        </section>
    )
   


    return content ;
    

}

export default Login ;