import { Link } from "react-router-dom"
import AmritaLogo from "../assets/AmritaLogo.jpeg" ;
import CoursesLogo from "../assets/book.svg" ;
import MessagesLogo from "../assets/mail.svg"
import LogoutLogo from "../assets/log-out.svg"
import MenuLogo from "../assets/menu.svg" ;
import SearchLogo from "../assets/search.svg"

const Sidebar = () => {

    const sidebar = (
// 
        <div className="max-w-none w-auto   min-h-screen grid grid-cols-[14rem,1fr] bg-gradient-to-r from-slate-200 to bg-slate-600"> 
        {/* Container */}
        <div className="bg-gray-100 text-white p-10 rounded-tr-3xl rounded-tl-md rounded-b-xl">
            {/*Sidebar  */}
        <img src={AmritaLogo} ></img>
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

           <div className="flex items-center">
           
           <img src={SearchLogo} className= "" />
           
               <button className="mb-3">
              <div className="inline-block mt-3 ml-2 text-black  " >Search Courses</div>
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
        {/* Profile Pic */}
        <div className="flex flex-col justify-between items-start  ">
        <div className="flex items-center -mt-16 ml-auto">
           
          
           
               
              <div className=" mt-3  text-black " >
                <img src="https://emojigraph.org/media/apple/woman-teacher_1f469-200d-1f3eb.png" alt="" className="w-14 h-14 object-cover rounded-full object-top" />
              </div>
                <div className="text-[16px] ml-4 mt-2">Raj Vikram</div>
              </div>
             
           </div>

       


     {/* <div className="flex absolute right-24 -mt-12 mb-4">
        <img src="https://emojigraph.org/media/apple/woman-teacher_1f469-200d-1f3eb.png" className=" w-14 h-14 object-cover rounded-full object-top border-black" alt="" />
        <div className="inline-block text-sm left-16 p-2"></div>
        <div className="text-[14px] mt-2 p-2">Jane</div>
     </div> */}
        <br />
        <br />
        {/* Course View Options */}
    <div className="grid-flow-col text-lg text-gray-800 -mt-24">
        <button className="p-2" >All</button>
        <button className="p-2">Active</button>
        <button className="p-2">Upcoming</button>
        <button className="p-2">Completed</button>
    </div>
    <div className="block max-w-sm p-6 bg-orange-700 border border-gray-200 rounded-lg shadow-md">
     <div> S3 BCA Regular</div>
    <h5 className="text-[12px]  tracking-tight text-white">18CSA334 Advanced Java & J2EE Programming</h5>
</div>

<div className="block max-w-sm p-6 bg-yellow-400 border border-gray-200 rounded-lg shadow-md mt-2">
     <div> S1 BCA Data Science</div>
    <h5 className="text-[12px]  tracking-tight text-white">18CSA334 Advanced Java & J2EE Programming</h5>
</div>

<div className="block max-w-sm p-6 bg-blue-800 border border-gray-200 rounded-lg shadow-md mt-2">
     <div> S1 CSE</div>
    <h5 className="text-[12px]  tracking-tight text-white">18CSA334 Advanced Java & J2EE Programming</h5>
</div>

<div className="block max-w-sm p-6 bg-green-700 border border-gray-200 rounded-lg shadow-md mt-2">
     <div> S5 MCA</div>
    <h5 className="text-[12px]  tracking-tight text-white">18CSA314 Advanced Operating System</h5>
</div>

    
        </div>
 
      
                        
</div>



    )
    return sidebar
}
export default Sidebar