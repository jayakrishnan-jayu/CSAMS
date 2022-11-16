import { Link } from "react-router-dom"
import AmritaLogo from "../assets/AmritaLogo.jpeg" ;
import CoursesLogo from "../assets/book.svg" ;
import MessagesLogo from "../assets/mail.svg"
import LogoutLogo from "../assets/log-out.svg"
import MenuLogo from "../assets/menu.svg" ;

const Sidebar = () => {

    const sidebar = (
// 
        <div className="max-w-none w-auto   min-h-screen grid grid-cols-[14rem,1fr] bg-gradient-to-r from-slate-400 to bg-slate-600"> 
        {/* Container */}
        <div className="bg-gray-300 text-white p-10 rounded-tr-3xl rounded-tl-md rounded-b-xl">
            {/*Sidebar  */}
        <img src={AmritaLogo}></img>
        <div className="text-black text-sm">Course Management System</div>
    
        <br />
        <br />
        <div className="flex flex-col justify-between items-start  ">
        {/* Sidebar item 1 */}
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
         
           <div className="flex items-center">
           
           <img src={MenuLogo} className= "" />
           
               <button className="mb-3">
              <div className="inline-block mt-3 ml-2 text-black " >Add Courses</div>
              </button>
           </div>
         

           </div>
         

         
           <div className="bottom-0 absolute -mr-60">
            <div className="flex items-center">
           <img src={LogoutLogo} className= "" />
               <button className="mb-3">
              <div className="inline-block mt-3 ml-2 text-black " >Log out</div>
              </button>
              </div>          
           </div>
           </div>
     
     {/* Main Dashboard */}
          
     <div className="p-10 text-gray-100 font-bold text-3xl">
        My Courses
        <br />
        <br />
    <div className="grid-flow-col text-lg ">
        <button className="p-2" >All</button>
        <button className="p-2">Active</button>
        <button className="p-2">Upcoming</button>
        <button className="p-2">Completed</button>
    </div>
        </div>
 
           
                               
                        
</div>



    )
    return sidebar
}
export default Sidebar