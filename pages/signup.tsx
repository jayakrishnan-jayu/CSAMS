import AmritaImage from '../assets/sample2.jpg';
import Image from 'next/image';
function signup() {
    const Signup = (
        <div className="grid grid-cols-[1fr,40rem] min-h-screen">
            <div className="flex justify-center">
                <Image
                    src="/sample2.jpg"
                    className="w-full object-cover"
                    alt="amrita"
                    width={100}
                    height={100}
                    priority
                    unoptimized
                ></Image>
            </div>
            <div className="bg-gray-300 p-10">
                <div className="font-sans font-bold text-5xl text-black mt-6 ml-6 mb-6">
                    Create an account
                </div>
                <form className="ml-5 mb-8 p-2" method="">
                    <div className="relative">
                        <input
                            type="text"
                            className="peer placeholder-transparent h-12 border-b-2 text-gray-900 focus:outline-none focus:border-rose-600 px-3 w-80 mt-1 ml-2 mb-3 border-2 border-gray-200 rounded-xl outline-none py-2"
                            placeholder="First Name"
                            required
                        ></input>
                        <br></br>
                        <label className="absolute -top-7 left-7 text-xl text-black peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-placeholder-shown:top-4 transition-all duration-150 peer-focus:-left-3 peer-focus:-top-7 peer-focus:text-black peer-focus:text-xl font-mono font-bold">
                            First Name
                        </label>
                        <br></br>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            className="peer placeholder-transparent h-12 border-b-2 text-gray-900 focus:outline-none focus:border-rose-600 px-3 w-80 mt-1 ml-2 mb-3 border-2 border-gray-200 rounded-xl outline-none py-2"
                            placeholder="Last Name"
                            required
                        ></input>
                        <br></br>
                        <label className="absolute -top-7 left-7 text-xl text-black peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-placeholder-shown:top-4 transition-all duration-150 peer-focus:-left-3 peer-focus:-top-7 peer-focus:text-black peer-focus:text-xl font-mono font-bold">
                            Last Name
                        </label>
                        <br></br>
                    </div>
                    <div className="relative">
                        <input
                            type="email"
                            className="peer placeholder-transparent h-12 border-b-2 text-gray-900 focus:outline-none focus:border-rose-600 px-3 w-80 mt-1 ml-2 mb-3 border-2 border-gray-200 rounded-xl outline-none py-2"
                            placeholder="Email"
                            required
                        ></input>
                        <br></br>
                        <label className="absolute -top-7 left-7 text-xl text-black peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-placeholder-shown:top-4 transition-all duration-150 peer-focus:-left-3 peer-focus:-top-7 peer-focus:text-black peer-focus:text-xl font-mono font-bold">
                            Email
                        </label>
                        <br></br>
                    </div>
                    <div className="relative">
                        <input
                            type="password"
                            className="peer placeholder-transparent h-12 border-b-2 text-gray-900 focus:outline-none focus:border-rose-600 px-3 w-80 mt-1 ml-2 mb-3 border-2 border-gray-200 rounded-xl outline-none py-2"
                            placeholder="Password"
                            required
                        ></input>
                        <br></br>
                        <label className="absolute -top-7 left-7 text-xl text-black peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-placeholder-shown:top-4 transition-all duration-150 peer-focus:-left-3 peer-focus:-top-7 peer-focus:text-black peer-focus:text-xl font-mono font-bold">
                            Password
                        </label>
                        <br></br>
                    </div>
                    <div className="relative mb-4">
                        <div className="grid grid-cols-2">
                            <div>
                                <label className="ml-6 text-lg font-mono font-bold">
                                    Profile Picture
                                </label>
                            </div>
                            <div>
                                <label className="w-45 items-center px-3 py-3 bg-none rounded-xl shadow-lg tracking-wide uppercase font-semibold border-2 border-black cursor-pointer hover:bg-slate-400 hover:text-white">
                                    <span className="mt-2 text-base leading-normal">
                                        Select a file
                                    </span>
                                    <input type="file" className="hidden" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="rounded-full text-white font-bold uppercase text-base px-8 py-3 mr-1 mb-1 mt-3 bg-blue-600 border-2 border-cyan-400 hover:border-blue-400 hover:bg-cyan-600"
                    >
                        Sign UP
                    </button>
                </form>
            </div>
        </div>
    );
    return Signup;
}
export default signup;
