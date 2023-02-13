import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="bg-slate-700 max-h-screen max-w-screen overflow-x-hidden overflow-y-hidden">
      <div className="flex flex-col justify-center items-center h-screen w-screen">
        <div className="">
          <Image
            src="/AmritaLogo.jpeg"
            width={130}
            height={130}
            alt="logo"
            unoptimized
            priority
          />
        </div>
        <br />
        <div className="text-slate-50 text-lg font-medium">
          <p>You need to login to access Amrita CSAMS</p>
        </div>
        <br />
        <div className="">
          <Link
            href="/api/auth/login"
            className="mx-5 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
