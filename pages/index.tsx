import Image from 'next/image';
import Link from 'next/link';

// const intervalRef = useRef<number>();

function Sidebar() {
    return (
        <div className="max-w-none max-h-0 w-auto   min-h-screen grid grid-cols-[14rem,1fr] bg-gradient-to-r from-slate-200 to bg-slate-600">
            {/* Container */}
            <div className="bg-gray-100 text-white p-10 rounded-tr-3xl rounded-tl-md rounded-b-xl">
                {/*Sidebar  */}
                <Image
                    src="/AmritaLogo.jpeg"
                    width={100}
                    height={100}
                    alt="logo"
                    unoptimized
                    priority
                ></Image>
                <div className="text-black text-lg">
                    Course Management System
                </div>
                <br />
                <br />
                <div className="flex flex-col justify-between items-start  ">
                    {/* Sidebar item 1 */}
                    <div className="flex items-center">
                        <Link href={'/Courses/Courses'}>
                            <Image
                                src="/book.svg"
                                width={30}
                                height={30}
                                alt="book"
                                unoptimized
                                priority
                            />
                            <button className="mb-3">
                                <div className="inline-block mt-3 ml-2 text-black">
                                    Courses
                                </div>
                            </button>
                        </Link>
                    </div>

                    <div className="flex items-center">
                        <Image
                            src="/mail.svg"
                            width={30}
                            height={30}
                            alt="mail"
                            unoptimized
                            priority
                        />
                        <button className="mb-3">
                            <div className="inline-block mt-3 ml-2 text-black ">
                                Messages
                            </div>
                        </button>
                    </div>

                    <div className="flex items-center">
                        <Image
                            src="/menu.svg"
                            width={30}
                            height={30}
                            alt="menu"
                            unoptimized
                            priority
                        />
                        <button className="mb-3">
                            <div className="inline-block mt-3 ml-2 text-black ">
                                Add Courses
                            </div>
                        </button>
                    </div>

                    <div className="flex items-center">
                        <Image
                            src="/search.svg"
                            width={30}
                            height={30}
                            alt="search"
                            unoptimized
                            priority
                        />
                        <button className="mb-3">
                            <div className="inline-block mt-3 ml-1 text-black  ">
                                Search Courses
                            </div>
                        </button>
                    </div>
                </div>
                <div className="bottom-0 absolute -mr-60">
                    <div className="flex items-center">
                        <Image
                            src="/log-out.svg"
                            width={30}
                            height={30}
                            alt="logout"
                            unoptimized
                            priority
                        />
                        <button className="mb-3">
                            <div className="inline-block mt-3 ml-2 text-black ">
                                Log out
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Dashboard */}
            <div>
                <div className="p-10 text-slate-800 font-bold text-3xl">
                    My Courses
                    {/* Profile Pic */}
                    <div className="flex flex-col justify-between items-start  ">
                        <div className="flex items-center -mt-16 ml-auto">
                            <div className=" mt-3  text-black ">
                                <img
                                    src="https://emojigraph.org/media/apple/woman-teacher_1f469-200d-1f3eb.png"
                                    alt=""
                                    className="w-14 h-14 object-cover rounded-full object-top"
                                />
                            </div>
                            <div className="flex flex-col">
                                <div className="text-[19px] ml-6 mt-2">
                                    Jane Doe
                                </div>
                                <div className="text-[11px] font-bold text-white ml-6">
                                    Assistant Professor
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                    {/* Course View Options */}
                    <div className="grid-flow-col text-lg text-gray-800 -mt-24">
                        <button
                            className="p-2"
                            // onClick={() => {
                            //     navigate('activecourses', { replace: true });
                            // }}
                        >
                            Active
                        </button>
                        <button
                            className="p-2"
                            // onClick={() => {
                            //     navigate('upcomingcourses', { replace: true });
                            // }}
                        >
                            Upcoming
                        </button>
                        <button
                            className="p-2"
                            // onClick={() => {
                            //     navigate('completedcourses', { replace: true });
                            // }}
                        >
                            Completed
                        </button>
                    </div>
                    {/* <Outlet /> */}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
