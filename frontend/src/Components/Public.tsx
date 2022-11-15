import { Link } from "react-router-dom"
import AmritaLogo from "../assets/AmritaLogo.jpeg" ;
import CoursesLogo from "../assets/book.svg" ;
import MessagesLogo from "../assets/mail.svg"

const Public = () => {

    const content = (
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
        

</div>
    )
    return content
}
export default Public