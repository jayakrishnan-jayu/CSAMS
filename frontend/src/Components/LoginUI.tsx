import AmritaImage from "../assets/sample2.jpg";

const LoginUI=()=>{
    const Login=(
        <div className="grid grid-cols-[40rem,1fr] min-h-screen">
            <div className="bg-gray-300 p-10">
                <div className="text-black text-5xl font-bold mt-16 ml-6 font-sans">Login</div>
                <form className="mt-20 ml-8 mb-8 p-2" method="">
                    <div className="relative">
                        <input className="peer placeholder-transparent h-12 border-b-2 text-gray-900 focus:outline-none focus:border-rose-600 px-3 w-80 mt-1 ml-2 mb-3 border-2 border-gray-200 rounded-xl outline-none py-2" placeholder="Email" required></input><br></br>
                        <label className="absolute -top-7 left-3 text-xl text-black peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-placeholder-shown:top-4 transition-all duration-150 peer-focus:-left-3 peer-focus:-top-7 peer-focus:text-black peer-focus:text-xl font-mono font-bold">Email*</label><br></br>
                    </div>
                    <div className="relative">
                    <input className="peer placeholder-transparent h-12 border-b-2 text-gray-900 focus:outline-none focus:border-rose-600 px-3 w-80 mt-1 ml-2 mb-3 border-2 border-gray-200 rounded-xl outline-none py-2" placeholder="Min 8 characters" min={'8'} required></input><br></br>
                    <label className="absolute -top-7 left-3 text-xl text-black peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-placeholder-shown:top-4 transition-all duration-150 peer-focus:-left-3 peer-focus:-top-7 peer-focus:text-black peer-focus:text-xl font-mono font-bold">Password*</label><br></br>
                    </div>
                    <button className="rounded-full text-white font-bold uppercase text-base px-8 py-3 mr-1 mb-1 mt-3 bg-blue-600 border-2 border-cyan-400 hover:border-blue-400 hover:bg-cyan-600">Login</button>
                </form>
                <div className="text-grey-100">Don't have an account? <a href="/signup" className="font-display max-w-sm text-lg leading-tight"><span className="text-black font-semibold"> Click here</span></a> to SignUP</div>
                <div className="mt-36 ml-4 font-bold">©️ 2022</div>
            </div>
            <div className="flex justify-center">
                <img className="w-full object-cover" src={AmritaImage}></img>
            </div>
        </div>
        
    )

    return Login ;

}

export default LoginUI;