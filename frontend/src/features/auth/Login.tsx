import { useRef, useState, useEffect, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
import { useCreateUserMutation } from '../../api/auth/apiSlice'







const Login = ()=>{
    const userRef = useRef() as React.MutableRefObject<HTMLInputElement>; ;
    // const dispatch = useDispatch();
    const errRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [email, setEmail] = useState<string>('')
    const [password, setpassword] = useState<string>('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()

    const [createuser,{isLoading,isSuccess}] = useCreateUserMutation();
     

    useEffect(()=>{
        userRef.current?.focus()
    },[])
    //useEffect hook with empty dependency array -> runs only once

    useEffect(()=>{
        setErrMsg('') 
    }, [email,password])

  

    const handleSubmit = async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault() 

        
            const userData = await createuser({email,password}).unwrap().then((payload)=>{
                console.log("User created" + payload)
                }).catch((error)=>{
                    console.log(error);
                })
           

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