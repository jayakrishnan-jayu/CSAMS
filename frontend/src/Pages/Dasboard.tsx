import Sidebar from "../Components/Sidebar"
import { useAppSelector } from "../services/hooks"

export function Dashboard ()
{

    //const accessToken = useAppSelector(())

   
    return (
        <div>
            <Sidebar />
        
        </div>
    )
}



const GetNewAccessToken = ()=>{
    console.log("hi");
    
}


