import { useRef, useState, useEffect, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
import { useCreateUserMutation, useLoginUserMutation } from '../../api/auth/apiConfig'
import { useAppDispatch } from '../../services/hooks';
import { setCredentials, Token, User } from './authSlice';







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
    const[LoginUser , {isLoading, isError}] = useLoginUserMutation(); 

   

    const dispatch = useAppDispatch();

    useEffect(()=>{
        userRef.current?.focus()
    },[])
    //useEffect hook with empty dependency array -> runs only once

    useEffect(()=>{
        setErrMsg('') 
    }, [email,password])


    useEffect(() => {
            handleSubmit
      }, [isLoading, isError  ])
    


  

    const handleSubmit =async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault() 
        try {
           result = (await LoginUser({email,password}).unwrap())
            console.log(result);
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


    const content = isLoading ? <h1>Loading...</h1> : (
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

    return content ;
    

}

export default Login ;