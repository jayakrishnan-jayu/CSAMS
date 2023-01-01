import { useRef, useState, useEffect, FormEvent } from 'react'
import {  Navigate,  useNavigate } from 'react-router-dom'
import { useCreateUserMutation, useLoginUserMutation } from '../../api/auth/apiConfig'
import { useAppDispatch , useAppSelector } from '../../services/hooks';
import authSlice from './authSlice';

const Login = ()=>{
    const userRef = useRef() as React.MutableRefObject<HTMLInputElement>; ;
    // const dispatch = useDispatch();
    const errRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [email, setEmail] = useState<string>('')
    const [password, setpassword] = useState<string>('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()
    let result ;  
    const [createuser] = useCreateUserMutation();
    const[LoginUser , {isLoading, isError , isSuccess}] = useLoginUserMutation();
    const dispatch = useAppDispatch();
    const selector = useAppSelector ;

    useEffect(()=>{
        userRef.current?.focus()
    },[])

    useEffect(()=>{
        setErrMsg('') 
    }, [email,password])





  

    const handleSubmit =async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault() 
        try {
            result = (await LoginUser({email,password}).unwrap())
            dispatch(authSlice.actions.getToken(result));
        } catch (error) {
            console.log(isError)
        }  
        


            
    }

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlepasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => setpassword(e.target.value)

    const content = isSuccess ? <Navigate to="/"/> : (
        <section className="login">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Employee Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Email:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    value={email}
                    onChange={handleUserInput}
                    autoComplete="off"
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={handlepasswordInput}
                    value={password}
                    required
                />
                <button>Sign In</button>
            </form>
        </section>
    )
    return isError ? <div>Auth Details Invalid.. Try Again</div> : content ;
}

export default Login ;