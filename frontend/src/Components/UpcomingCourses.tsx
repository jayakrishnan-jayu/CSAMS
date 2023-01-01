import { Button, Pagination } from "antd"

export const UpcomingCourses = ()=>{
    return(
       
       
      <div className="ml-8 mt-10">
      
       

<div className="overflow-x-auto relative shadow-md sm:rounded-lg">
    <div className="flex justify-between items-center pb-4 bg-white">
   
       
        
      
    <table className="w-full h-[450px] text-sm text-left text-gray-800">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="p-4">
                    {/* padding */}
                </th>
                <th scope="col" className="py-3 px-6">
                    Course Name
                </th>
                <th scope="col" className="py-3 px-6">
                    Semester
                </th>
                <th scope="col" className="py-3 px-6">
                    Status
                </th>
               
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white">
                <td className="p-4 w-4">
                    <div className="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label id="checkbox-table-search-1" className="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
                    
                    <div className="pl-3">
                        <div className="text-base font-semibold text-black">18CSA234 Advanced Computer Networks</div>
                        <div className="font-normal text-gray-500"></div>
                    </div>  
                </th>
                <td className="py-4 px-6">
                    S5 CSE
                </td>
                <td className="py-4 px-6">
                    <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-400 mr-2"></div> Taken
                    </div>
                </td>
              
            </tr>
            <tr className="bg-white">
                <td className="p-4 w-4">
                    <div className="flex items-center">
                        <input id="checkbox-table-search-2" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label id="checkbox-table-search-2" className="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" className="flex items-center py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   
                    <div className="pl-3">
                        <div className="text-base font-semibold text-black">18CSA234 Advanced Computer Networks</div>
                        <div className="font-normal text-gray-500"></div>
                    </div>
                </th>
                <td className="py-4 px-6">
                    Designer
                </td>
                <td className="py-4 px-6">
                    <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div> Available
                    </div>
                </td>
               
            </tr>
            <tr className="bg-white ">
                <td className="p-4 w-4">
                    <div className="flex items-center">
                        <input id="checkbox-table-search-2" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label id="checkbox-table-search-2" className="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" className="flex items-center py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   
                    <div className="pl-3">
                        <div className="text-base font-semibold text-black">18CSA234 Advanced Computer Networks</div>
                        <div className="font-normal text-gray-500"></div>
                    </div>
                </th>
                <td className="py-4 px-6">
                    Vue JS Developer
                </td>
                <td className="py-4 px-6">
                    <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div> Available
                    </div>
                </td>
               
            </tr>
            <tr className="bg-white">
                <td className="p-4 w-4">
                    <div className="flex items-center">
                        <input id="checkbox-table-search-2" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label id="checkbox-table-search-2" className="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" className="flex items-center py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   
                    <div className="pl-3">
                        <div className="text-base font-semibold text-black">18CSA234 Advanced Computer Networks</div>
                        <div className="font-normal text-gray-500"></div>
                    </div>
                </th>
                <td className="py-4 px-6">
                    UI/UX Engineer
                </td>
                <td className="py-4 px-6">
                    <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div> Available
                    </div>
                </td>
              
              
            </tr>
            <tr className="bg-white">
                <td className="p-4 w-4">
                    <div className="flex items-center">
                        <input id="checkbox-table-search-3" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label id="checkbox-table-search-3" className="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" className="flex items-center py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   
                    <div className="pl-3">
                        <div className="text-base font-semibold text-black">Leslie Livingston</div>
                        <div className="font-normal text-gray-500">leslie@flowbite.com</div>
                    </div>
                </th>
                <td className="py-4 px-6">
                    SEO Specialist
                </td>
                <td className="py-4 px-6">
                    <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div> Taken
                    </div>
                </td>
            
            </tr>
        </tbody>
    </table>
 
    </div>
</div>
<Pagination defaultCurrent={1} total={100}  className="ml-64 mt-8"/>
</div>

       
   
       )
    }

    
