import { Link } from "react-router-dom"
import AmritaLogo from "../assets/AmritaLogo.jpeg" ;
import CoursesLogo from "../assets/book.svg" ;
import MessagesLogo from "../assets/mail.svg"
import LogoutLogo from "../assets/log-out.svg"

const Sidebar = () => {

    const sidebar = (
        <div className="max-w-none w-auto  min-h-screen grid grid-cols-[14rem,1fr]">
        <div className="bg-gray-300 text-white p-10 rounded-lg">
        <div className="">
        <img src={AmritaLogo}></img>
        <div className="text-black text-sm">Course Management System</div>
        </div>
        <br />
        <br />
        <div className="flex flex-col justify-between items-start  ">

        <div className="flex items-center">
           
            <img src={CoursesLogo} className= "" />
            
                <button className="mb-3">
               <div className="inline-block mt-3 ml-2 text-black " >Courses</div>
               </button>
            </div>
           
           <div className="flex items-center">
           
           <img src={MessagesLogo} className= "" />
           
               <button className="mb-3">
              <div className="inline-block mt-3 ml-2 text-black " >Messages</div>
              </button>
           </div>
           </div>
           </div>
        
           <div className="flex items-center mt-auto -ml-48">
           <div className=""></div>
           <img src={LogoutLogo} className= "" />
           
               <button className="mb-3">
              <div className="inline-block mt-3 ml-2 text-black " >Log out</div>
              </button>
           </div>
            
           
       
        
        

</div>
    )
    return sidebar
}
export default Sidebar