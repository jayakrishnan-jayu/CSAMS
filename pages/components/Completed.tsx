import Image from 'next/image';
import Link from 'next/link';

function Completed() {
    const Completed = (
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
                <div className="flex flex-col justify-between items-start">
                    {/* Sidebar item 1 */}
                    <div className="flex items-center">
                        <Image
                            src="/book.svg"
                            width={25}
                            height={25}
                            alt="book"
                            unoptimized
                            priority
                        />
                        <Link href={'/Courses'}>
                            <div className="mb-3 inline-block mt-3 ml-2 text-black">
                                Courses
                            </div>
                        </Link>
                    </div>

                    <div className="flex items-center">
                        <Image
                            src="/mail.svg"
                            width={25}
                            height={25}
                            alt="mail"
                            unoptimized
                            priority
                        />
                        <Link href={'/Messages'}>
                            <div className="mb-3 inline-block mt-3 ml-2 text-black ">
                                Messages
                            </div>
                        </Link>
                    </div>

                    <div className="flex items-center">
                        <Image
                            src="/menu.svg"
                            width={25}
                            height={25}
                            alt="menu"
                            unoptimized
                            priority
                        />
                        <Link href={'/Add'}>
                            <div className="mb-3 inline-block mt-3 ml-2 text-black ">
                                Add Courses
                            </div>
                        </Link>
                    </div>

                    <div className="flex items-center">
                        <Image
                            src="/search.svg"
                            width={25}
                            height={25}
                            alt="search"
                            unoptimized
                            priority
                        />
                        <Link href={'/Search'}>
                            <div className="mb-3 inline-block mt-3 ml-1 text-black  ">
                                Search Courses
                            </div>
                        </Link>
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
                        <Link href={'/logout'}>
                            <div className="mb-3 inline-block mt-3 ml-2 text-black ">
                                Log out
                            </div>
                        </Link>
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
                        <Link href="/components/Active" className="p-3">
                            Active
                        </Link>
                        <Link href="/components/Upcoming" className="p-3">
                            Upcoming
                        </Link>
                        <Link href="/components/Completed" className="p-3">
                            Completed
                        </Link>
                    </div>
                    <div>Completed page</div>
                </div>
            </div>
        </div>
    );
    return Completed;
}
export default Completed;
