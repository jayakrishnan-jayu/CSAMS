import { useRef, useState, useEffect, FormEvent } from 'react'

import { Link, Navigate, redirect, Route, useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
import { useCreateUserMutation, useLoginUserMutation } from '../../api/auth/apiConfig'
import { Dashboard } from '../../Pages/Dasboard';
import { useAppDispatch , useAppSelector } from '../../services/hooks';
// import { setCredentials, Token, User } from './authSlice';
import { store } from '../../store';
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
    //useEffect hook with empty dependency array -> runs only once

    useEffect(()=>{
        setErrMsg('') 
    }, [email,password])


    // useEffect(() => {
    //         handleSubmit
           
    //   }, [isLoading, isError , isSuccess  ])
    


  

    const handleSubmit =async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault() 
        try {
            result = (await LoginUser({email,password}).unwrap())
            // console.log(result["tokenAuth"]["payload"].exp);
            // console.log(result["tokenAuth"]["refreshToken"]);
            dispatch(authSlice.actions.getToken(result));
        
            //d25e68cfb20d8808f63d164576ef6ee079a43f6f
         
            if(result)
            {
                console.log("Succesful!!!");
                // NavigateToDashBoard();
                
            }
           
        } catch (error) {
            console.log(isError)
        }  
        // await (LoginUser({email,password}).unwrap()).then((payload:any)=>
        //     console.log("User created: ", + payload)
        // ).catch((error:any)=>{
        //     console.log(error +  "Error")
        // })
            // const userData = await createuser({email,password}).unwrap().then((payload)=>{
            //     console.log("User created" + payload)
            //     }).catch((error)=>{
            //         console.log(error);
            //     })x 


            
    }

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)

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
   


    // const handleSubmit = async(): Promise<void> =>{ 

 //   }

    return isError ? <div>Auth Details Invalid.. Try Again</div> : content ;
    

}

export default Login ;